from django.db import models
from django.contrib.auth.models import AbstractUser

class Instructor(AbstractUser):  
    profile_pic = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    specialization = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
