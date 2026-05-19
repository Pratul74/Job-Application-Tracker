from django.urls import path
from .views import JobCreateView, JobListView, SkillCreateView, SkillListView

urlpatterns=[
    path('', JobListView.as_view(), name='jobs'),
    path('create/', JobCreateView.as_view(), name='create-jobs'),
    path('skills/', SkillListView.as_view(), name='skills'),
    path('skills/create/', SkillCreateView.as_view(), name='create-skills')
]
