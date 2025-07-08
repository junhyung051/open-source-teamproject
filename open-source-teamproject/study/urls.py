from django.urls import path
from .views import (
    RegisterUserView, LoginView, CreateStudyPostView, SearchStudyPostsView,
    ApplyStudyView, CancelApplicationView, WriteReviewView,
    RemainingSlotsView, TimeLeftView
)

urlpatterns = [
    # REST API
    path('api/register/', RegisterUserView.as_view()),
    path('api/login/', LoginView.as_view()),
    path('api/study/create/', CreateStudyPostView.as_view()),
    path('api/study/search/', SearchStudyPostsView.as_view()),
    path('api/study/apply/', ApplyStudyView.as_view()),
    path('api/study/cancel/', CancelApplicationView.as_view()),
    path('api/study/review/', WriteReviewView.as_view()),
    path('api/study/remaining_slots/<int:post_id>/', RemainingSlotsView.as_view()),
    path('api/study/time_left/<int:post_id>/', TimeLeftView.as_view()),
]
