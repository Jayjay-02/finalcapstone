from django.db import models
from django.contrib.auth.models import User

class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name

class Panel(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)

    def __str__(self):
        return self.full_name

class Group(models.Model):
    name = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    notes = models.TextField(blank=True, null=True)
    meeting = models.CharField(max_length=255, blank=True, null=True)
    students = models.ManyToManyField(Student, related_name="groups")
    adviser = models.ForeignKey(Instructor, on_delete=models.SET_NULL, null=True, related_name="groups")
    panel = models.ForeignKey(Panel, on_delete=models.SET_NULL, null=True, related_name="groups")

    def __str__(self):
        return f"{self.name} ({self.topic})"

class ThesisSubmission(models.Model):
    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Rejected", "Rejected"),
    ]
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="thesis_submissions")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="thesis_submissions")
    topic = models.CharField(max_length=255)
    file = models.FileField(upload_to="thesis/")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission: {self.topic} ({self.student.full_name})"

class Feedback(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="feedbacks")
    content = models.TextField()
    created_by = models.ForeignKey(Instructor, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.group.name} by {self.created_by.full_name if self.created_by else 'Unknown'}"

class Document(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="documents")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="documents")
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to="documents/")
    status = models.CharField(max_length=50, default="Pending Review")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.student.full_name}"

class DocumentFeedback(models.Model):
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name="feedbacks")
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="document_feedbacks")
    content = models.TextField()
    created_by = models.ForeignKey(Instructor, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.document.title} ({self.group.name})"

class DefenseSchedule(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="defense_schedules")
    datetime = models.DateTimeField()
    # panels is ManyToMany to Panel for flexibility
    panels = models.ManyToManyField(Panel, related_name="defense_schedules")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Defense for {self.group.name} at {self.datetime}"
