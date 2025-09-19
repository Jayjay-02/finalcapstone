from rest_framework import generics, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import Instructor
from .serializers import InstructorSerializer

class InstructorRegisterView(generics.CreateAPIView):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [permissions.AllowAny]

class InstructorLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data["token"])
        return Response({
            "token": token.key,
            "id": token.user_id,
            "email": token.user.email,
            "full_name": token.user.full_name,
            "profile_pic": token.user.profile_pic.url if token.user.profile_pic else None,
        })
