from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta
from .models import User, StudyPost, StudyApplication, StudyReview

# 1. 회원가입
class RegisterUserView(APIView):
    def post(self, request):
        data = request.data
        user = User.objects.create(
            username=data['username'],
            real_name=data['real_name'],
            password_hash=data['password_hash'],
            region=data.get('region'),
            created_at=timezone.now()
        )
        return Response({"user_id": user.id}, status=status.HTTP_201_CREATED)

# 2. 로그인
class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password_hash = request.data.get('password_hash')
        try:
            user = User.objects.get(username=username, password_hash=password_hash)
            return Response({'user_id': user.id, 'real_name': user.real_name})
        except User.DoesNotExist:
            return Response({'error': '로그인 실패'}, status=status.HTTP_400_BAD_REQUEST)

# 3. 스터디 모집글 등록
class CreateStudyPostView(APIView):
    def post(self, request):
        data = request.data
        post = StudyPost.objects.create(
            user_id=data['user_id'],
            title=data['title'],
            region=data['region'],
            meet_time=data['meet_time'],
            description=data['description'],
            max_participants=data['max_participants'],
            created_at=timezone.now()
        )
        return Response({'post_id': post.id})

# 4. 스터디 목록/검색
class SearchStudyPostsView(APIView):
    def get(self, request):
        keyword = request.GET.get('keyword')
        region = request.GET.get('region')
        date_from = request.GET.get('date_from')
        date_to = request.GET.get('date_to')
        qs = StudyPost.objects.all()
        if keyword:
            qs = qs.filter(title__icontains=keyword) | qs.filter(description__icontains=keyword)
        if region:
            qs = qs.filter(region=region)
        if date_from:
            qs = qs.filter(meet_time__gte=date_from)
        if date_to:
            qs = qs.filter(meet_time__lte=date_to)
        posts = qs.order_by('meet_time').values(
            'id', 'title', 'region', 'meet_time', 'description', 'max_participants', 'created_at'
        )
        return Response(list(posts))

# 5. 스터디 신청
class ApplyStudyView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        post_id = request.data.get('post_id')
        post = StudyPost.objects.get(id=post_id)
        confirmed = StudyApplication.objects.filter(post_id=post_id, status='confirmed').count()
        if confirmed >= post.max_participants:
            return Response({'result': '모집이 마감되었습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        if StudyApplication.objects.filter(post_id=post_id, user_id=user_id).exists():
            return Response({'result': '이미 신청한 스터디입니다.'}, status=status.HTTP_400_BAD_REQUEST)
        StudyApplication.objects.create(
            post_id=post_id, user_id=user_id, status='pending'
        )
        return Response({'result': '신청 완료!'})

# 6. 스터디 신청 취소
class CancelApplicationView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        post_id = request.data.get('post_id')
        post = StudyPost.objects.get(id=post_id)
        if timezone.now() > (post.meet_time - timedelta(days=1)):
            return Response({'result': '약속 하루 전까지만 취소 가능합니다.'}, status=status.HTTP_400_BAD_REQUEST)
        app = StudyApplication.objects.filter(post_id=post_id, user_id=user_id, status='pending').first()
        if not app:
            return Response({'result': '취소할 신청이 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
        app.status = 'cancelled'
        app.save()
        return Response({'result': '취소 완료!'})

# 7. 후기 작성 (스터디 종료 후만)
class WriteReviewView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        post_id = request.data.get('post_id')
        review_text = request.data.get('review_text')
        post = StudyPost.objects.get(id=post_id)
        if timezone.now() < post.meet_time:
            return Response({'result': '스터디 종료 후에만 후기 작성이 가능합니다.'}, status=status.HTTP_400_BAD_REQUEST)
        StudyReview.objects.create(
            post_id=post_id,
            user_id=user_id,
            review_text=review_text,
            created_at=timezone.now()
        )
        return Response({'result': '후기 작성 완료!'})

# 8. 남은 인원
class RemainingSlotsView(APIView):
    def get(self, request, post_id):
        post = StudyPost.objects.get(id=post_id)
        confirmed = StudyApplication.objects.filter(post_id=post_id, status='confirmed').count()
        remaining = post.max_participants - confirmed
        return Response({'remaining_slots': remaining})

# 9. 남은 시간
class TimeLeftView(APIView):
    def get(self, request, post_id):
        post = StudyPost.objects.get(id=post_id)
        now = timezone.now()
        delta = post.meet_time - now
        if delta.total_seconds() < 0:
            return Response({'time_left': '스터디가 이미 종료되었습니다.'})
        return Response({'time_left': str(delta)})

