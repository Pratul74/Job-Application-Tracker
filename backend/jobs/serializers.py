from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import Job, Skill


class SkillSerializer(ModelSerializer):

    class Meta:
        model = Skill
        fields = ['id', 'name']


class JobListSerializer(ModelSerializer):

    skills_required = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Job
        fields = [
            'id',
            'company_name',
            'link',
            'role',
            'salary',
            'location',
            'status',
            'skills_required',
            'created_at'
        ]


class JobCreateSerializer(ModelSerializer):

    skills_required = PrimaryKeyRelatedField(
        many=True,
        queryset=Skill.objects.all()
    )

    class Meta:
        model = Job
        fields = [
            'company_name',
            'link',
            'role',
            'salary',
            'location',
            'status',
            'skills_required'
        ]