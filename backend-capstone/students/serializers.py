from rest_framework import serializers
from .models import Student, Instructor, Panel, Group
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Student
        fields = ["id", "full_name", "user"]

class InstructorSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Instructor
        fields = ["id", "full_name", "user"]

class PanelSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Panel
        fields = ["id", "full_name", "user"]

class GroupSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True)
    adviser = InstructorSerializer()
    panel = PanelSerializer()
    class Meta:
        model = Group
        fields = ["id", "name", "topic", "notes", "meeting", "students", "adviser", "panel"]

class ThesisSubmissionSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    group = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Group.thesis_submissions.rel.related_model
        fields = ["id", "group", "student", "topic", "file", "status", "created_at"]

class FeedbackSerializer(serializers.ModelSerializer):
    created_by = InstructorSerializer()
    group = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Group.feedbacks.rel.related_model
        fields = ["id", "group", "content", "created_by", "created_at"]

class DocumentSerializer(serializers.ModelSerializer):
    group = serializers.PrimaryKeyRelatedField(read_only=True)
    student = StudentSerializer()
    class Meta:
        model = Group.documents.rel.related_model
        fields = ["id", "group", "student", "title", "file", "status", "uploaded_at"]

class DocumentFeedbackSerializer(serializers.ModelSerializer):
    document = serializers.PrimaryKeyRelatedField(read_only=True)
    group = serializers.PrimaryKeyRelatedField(read_only=True)
    created_by = InstructorSerializer()
    class Meta:
        model = Group.document_feedbacks.rel.related_model
        fields = ["id", "document", "group", "content", "created_by", "created_at"]

class DefenseScheduleSerializer(serializers.ModelSerializer):
    group = serializers.PrimaryKeyRelatedField(read_only=True)
    panels = PanelSerializer(many=True)
    class Meta:
        model = Group.defense_schedules.rel.related_model
        fields = ["id", "group", "datetime", "panels", "created_at"]
