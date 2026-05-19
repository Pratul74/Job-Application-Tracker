from django.db import models
from accounts.models import User


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Job(models.Model):

    STATUS_TYPE = [
        ('Applied', 'Applied'),
        ('Assessment', 'Assessment'),
        ('Interview', 'Interview'),
        ('Not Selected', 'Not Selected'),
        ('Selected', 'Selected'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='jobs'
    )

    company_name = models.CharField(max_length=200)

    link = models.URLField(blank=True, null=True)

    role = models.CharField(max_length=100)

    salary = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    location = models.CharField(max_length=200)

    status = models.CharField(
        max_length=20,
        choices=STATUS_TYPE,
        default='Applied'
    )

    skills_required = models.ManyToManyField(
        Skill,
        blank=True,
        related_name='jobs'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.company_name} - {self.role}"
