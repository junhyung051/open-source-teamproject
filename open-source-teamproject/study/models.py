from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    real_name = models.CharField(max_length=100)
    password_hash = models.CharField(max_length=255)
    region = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class StudyPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    meet_time = models.DateTimeField()
    description = models.TextField()
    max_participants = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

class StudyApplication(models.Model):
    STATUS_CHOICES = (
        ('pending', '대기중'),
        ('cancelled', '취소됨'),
        ('confirmed', '확정'),
    )
    post = models.ForeignKey(StudyPost, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    class Meta:
        unique_together = ('post', 'user')

class StudyReview(models.Model):
    post = models.ForeignKey(StudyPost, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    review_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)