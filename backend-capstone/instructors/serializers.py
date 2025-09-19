from rest_framework import serializers
from .models import Instructor

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = ["id", "username", "full_name", "email", "password", "profile_pic"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        instructor = Instructor(**validated_data)
        instructor.set_password(password)
        instructor.save()
        return instructor
