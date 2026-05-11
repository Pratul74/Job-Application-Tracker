from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    UserLoginSerializer,
    UserRegisterSerializer
)


class UserRegisterView(APIView):

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            refresh=RefreshToken.for_user(user)

            return Response(
                {
                    "message": "User registered successfully",
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                        "refresh_token": str(refresh),
                        "access_token": str(refresh.access_token),
                    }
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class UserLoginView(APIView):

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():

            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(
                request,
                email=email,
                password=password
            )
            refresh=RefreshToken.for_user(user)

            if user is not None:
                return Response(
                    {
                        "message": "Login successful",
                        "user": {
                            "id": user.id,
                            "email": user.email,
                            'refresh_token': str(refresh),
                            'access_token': str(refresh.access_token),
                        }
                    },
                    status=status.HTTP_200_OK
                )

            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


