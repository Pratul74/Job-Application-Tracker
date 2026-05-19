from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .serializers import JobCreateSerializer, JobListSerializer, SkillSerializer
from .models import Job, Skill

class JobListView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        jobs=Job.objects.filter(user=request.user)
        serializer=JobListSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class JobCreateView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self, request):
        serializer=JobCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SkillCreateView(APIView):
    permission_classes=[IsAuthenticated, IsAdminUser]
    def post(self, request):
        serializer=SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SkillListView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        serializer=SkillSerializer(Skill.objects.all().order_by('name'), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
