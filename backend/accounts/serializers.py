from rest_framework import serializers
from .models import User

class UserLoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)

class UserRegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True, min_length=8)
    password1=serializers.CharField(write_only=True)

    class Meta:
        model=User
        fields=['email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password']!=attrs['password1']:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password1')
        password=validated_data.pop('password')
        user=User(**validated_data)
        user.set_password(password)
        user.save()

        return user
