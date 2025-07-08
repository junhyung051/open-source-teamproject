from django.contrib import admin
from .models import User, StudyPost, StudyApplication, StudyReview

admin.site.register(User)
admin.site.register(StudyPost)
admin.site.register(StudyApplication)
admin.site.register(StudyReview)
