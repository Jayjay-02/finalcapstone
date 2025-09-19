from django.urls import path
from .views import InstructorRegisterView, InstructorLoginView

urlpatterns = [
    path("register/", InstructorRegisterView.as_view(), name="instructor-register"),
    path("login/", InstructorLoginView.as_view(), name="instructor-login"),
]
