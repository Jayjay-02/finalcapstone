from django.urls import path
from .views import GroupDetailView

urlpatterns = [
    path('group/', GroupDetailView.as_view(), name='student-group-detail'),
    path('thesis/', ThesisSubmissionView.as_view(), name='thesis-submission-list-create'),
    path('thesis/<int:submission_id>/approve/', ApproveThesisView.as_view(), name='thesis-approve'),
    path('group/<int:group_id>/feedback/', FeedbackView.as_view(), name='group-feedback'),
    path('signup/', StudentSignupView.as_view(), name='student-signup'),
]
