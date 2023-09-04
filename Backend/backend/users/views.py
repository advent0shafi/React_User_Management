from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializers
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User 
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

from rest_framework.permissions import IsAuthenticated

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        refresh = RefreshToken.for_user(user)
        access_token = str(response.data['access'])
      
        response.data['admin'] = user.is_superuser
        response.data['username'] = user.username
        response.data['id'] = user.id
        response.data['access_token'] = access_token
        return response
    

class HomeView(APIView):
     
   permission_classes = (IsAuthenticated, )
   def get(self, request):
       content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
       return Response(content)



class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    

class LoginView(APIView):
    def post(self,request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('user not found!')
        if not user.check_password(password):
            raise AuthenticationFailed('password not found!')
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        

        return Response({
            'message':'success',
            'username': user.username,
            
        })
    
class UserProfile(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request, user_id):
            try:
                user = User.objects.get(id=user_id)
                print(user.profile_img.url)
                return Response({
                    'id': user.id,
                    'username': user.username,
                    'email':user.email,
                    'profile_img':user.profile_img.url,
                })
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)

            # Add the token to the blacklist
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print("Error:", e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AdminView(APIView):
    def get(self, request):
        try:
            userlist = User.objects.filter(is_superuser=False)
            data = {
                'userlist': userlist.values('id','password','username', 'email')  
            }
            return Response(data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)  # Handle exceptions gracefully


class DeleteUserView(APIView):
    def post(self, request,user_id):
        try :
            user = User.objects.get(id = user_id)
            user.delete()
            return Response({"user as been deleted ",user_id})
        except Exception as e:
            return Response({"user has not deleted ",e})

class EditUserView(APIView):
     def put(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializers(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        

class EditProfileView(APIView):
    def put(self, request, user_id):
      
        try:
            user = User.objects.get(id=user_id)
            uploaded_file = request.FILES.get('profile_img')
            
            print(uploaded_file)
            if uploaded_file:
              
                if uploaded_file.content_type.startswith('image'):
                    user.profile_img = uploaded_file
                    user.save()
                    return Response({'profile_img_url': user.profile_img.url})
                else:
                    return Response({'error': 'Invalid file format'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'No image data provided'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
             return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)