from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Student, Instructor, Panel, Group, ThesisSubmission, Feedback, Document, DocumentFeedback, DefenseSchedule
from .serializers import GroupSerializer, ThesisSubmissionSerializer, FeedbackSerializer, DocumentSerializer, DocumentFeedbackSerializer, DefenseScheduleSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

class GroupDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Try as Student
        try:
            student = Student.objects.get(user=user)
            group = Group.objects.filter(students=student).first()
            if group:
                serializer = GroupSerializer(group)
                return Response(serializer.data)
        except Student.DoesNotExist:
            pass

        # Try as Instructor
        try:
            instructor = Instructor.objects.get(user=user)
            group = Group.objects.filter(adviser=instructor).first()
            if group:
                serializer = GroupSerializer(group)
                return Response(serializer.data)
        except Instructor.DoesNotExist:
            pass

        # Try as Panel
        try:
            panel = Panel.objects.get(user=user)
            group = Group.objects.filter(panel=panel).first()
            if group:
                serializer = GroupSerializer(group)
                return Response(serializer.data)
        except Panel.DoesNotExist:
            pass

        return Response({'detail': 'No group found for this user.'}, status=status.HTTP_404_NOT_FOUND)

class GroupCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        name = request.data.get('name')
        student_ids = request.data.get('student_ids', [])
        topic = request.data.get('topic', '')
        adviser_id = request.data.get('adviser_id')
        panel_id = request.data.get('panel_id')

        group = Group.objects.create(
            name=name,
            topic=topic,
            adviser_id=adviser_id,
            panel_id=panel_id,
        )
        if student_ids:
            group.students.set(student_ids)
        group.save()
        serializer = GroupSerializer(group)
        return Response(serializer.data)

from rest_framework.views import APIView
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.contrib.auth.models import User
from .models import Student

class StudentSignupView(APIView):
    parser_classes = [JSONParser]
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        profile_pic = request.data.get('profilePic')
        if not all([name, email, password, profile_pic]):
            return Response({'detail': 'All fields required.'}, status=400)
        # check if user already exists
        if User.objects.filter(username=email).exists():
            return Response({'detail': 'Email already registered.'}, status=409)
        # Create Django user (inactive by default)
        user = User.objects.create_user(username=email, email=email, password=password, is_active=False)
        student = Student.objects.create(user=user, full_name=name)
        # Save profile_pic (as base64 string in a field, or extend Student w/ ImageField in production)
        # For now, not saved to disk. To store, use file uploads.
        return Response({'detail': 'Student registered. Pending approval.'}, status=201)

class ThesisSubmissionView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user = request.user
        try:
            student = Student.objects.get(user=user)
            group = Group.objects.filter(students=student).first()
            submissions = ThesisSubmission.objects.filter(group=group)
        except Student.DoesNotExist:
            return Response({'detail': 'Not a student.'}, status=403)
        serializer = ThesisSubmissionSerializer(submissions, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        try:
            student = Student.objects.get(user=user)
            group = Group.objects.filter(students=student).first()
        except Student.DoesNotExist:
            return Response({'detail': 'Not a student.'}, status=403)
        topic = request.data.get('topic')
        file = request.data.get('file')
        submission = ThesisSubmission.objects.create(
            group=group,
            student=student,
            topic=topic,
            file=file,
            status="Pending"
        )
        serializer = ThesisSubmissionSerializer(submission)
        return Response(serializer.data)

class ApproveThesisView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, submission_id):
        user = request.user
        try:
            instructor = Instructor.objects.get(user=user)
        except Instructor.DoesNotExist:
            return Response({'detail': 'Not an instructor.'}, status=403)
        try:
            submission = ThesisSubmission.objects.get(id=submission_id, group__adviser=instructor)
        except ThesisSubmission.DoesNotExist:
            return Response({'detail': 'Submission not found.'}, status=404)
        statusval = request.data.get('status')
        if statusval not in ["Approved", "Rejected"]:
            return Response({'detail': 'Status must be Approved or Rejected.'}, status=400)
        submission.status = statusval
        submission.save()
        return Response({'detail': f'Submission {statusval}.'})

class FeedbackView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, group_id):
        feedbacks = Feedback.objects.filter(group_id=group_id)
        serializer = FeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def post(self, request, group_id):
        user = request.user
        try:
            instructor = Instructor.objects.get(user=user)
        except Instructor.DoesNotExist:
            return Response({'detail': 'Not an instructor.'}, status=403)
        content = request.data.get('content')
        feedback = Feedback.objects.create(
            group_id=group_id,
            content=content,
            created_by=instructor
        )
        serializer = FeedbackSerializer(feedback)
        return Response(serializer.data)

class DocumentView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        user = request.user
        try:
            student = Student.objects.get(user=user)
            group = Group.objects.filter(students=student).first()
            documents = Document.objects.filter(group=group)
        except Student.DoesNotExist:
            return Response({'detail': 'Not a student.'}, status=403)
        serializer = DocumentSerializer(documents, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        try:
            student = Student.objects.get(user=user)
            group = Group.objects.filter(students=student).first()
        except Student.DoesNotExist:
            return Response({'detail': 'Not a student.'}, status=403)
        title = request.data.get('title')
        file = request.data.get('file')
        document = Document.objects.create(
            group=group,
            student=student,
            title=title,
            file=file,
            status="Pending Review"
        )
        serializer = DocumentSerializer(document)
        return Response(serializer.data)

class DocumentFeedbackView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, document_id):
        feedbacks = DocumentFeedback.objects.filter(document_id=document_id)
        serializer = DocumentFeedbackSerializer(feedbacks, many=True)
        return Response(serializer.data)

    def post(self, request, document_id):
        user = request.user
        try:
            instructor = Instructor.objects.get(user=user)
        except Instructor.DoesNotExist:
            return Response({'detail': 'Not an instructor.'}, status=403)
        content = request.data.get('content')
        document = Document.objects.get(id=document_id)
        feedback = DocumentFeedback.objects.create(
            document=document,
            group=document.group,
            content=content,
            created_by=instructor
        )
        serializer = DocumentFeedbackSerializer(feedback)
        return Response(serializer.data)

class DefenseScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, group_id=None):
        if group_id:
            schedules = DefenseSchedule.objects.filter(group_id=group_id)
        else:
            schedules = DefenseSchedule.objects.all()
        serializer = DefenseScheduleSerializer(schedules, many=True)
        return Response(serializer.data)

    def post(self, request):
        group_id = request.data.get('group_id')
        datetime = request.data.get('datetime')
        panel_ids = request.data.get('panel_ids', [])
        group = Group.objects.get(id=group_id)
        schedule = DefenseSchedule.objects.create(
            group=group,
            datetime=datetime,
        )
        if panel_ids:
            schedule.panels.set(panel_ids)
        schedule.save()
        serializer = DefenseScheduleSerializer(schedule)
        return Response(serializer.data)
