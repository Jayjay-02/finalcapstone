from django.db import models
from django.contrib.auth.models import AbstractUser

class Instructor(AbstractUser):
    full_name = models.CharField(max_length=255)
    profile_pic = models.ImageField(upload_to="profile_pics/", null=True, blank=True)

    def __str__(self):
        return self.username
