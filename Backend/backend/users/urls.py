from django.contrib import admin
from django.urls import path
from .views import RegisterView,UserProfile,HomeView,LogoutView,AdminView,CustomTokenObtainPairView,DeleteUserView,EditUserView,EditProfileView
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('home',HomeView.as_view()),
    path('register', RegisterView.as_view()),
    path('image/<int:user_id>/',EditProfileView.as_view()),
    path('edituser/<int:user_id>/',EditUserView.as_view()),
    path('logout',LogoutView.as_view()),
    path('userlist',AdminView.as_view()),
    path('popuser/<int:user_id>/',DeleteUserView.as_view()),
    path('user/<int:user_id>/',UserProfile.as_view()),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
 path('token/refresh/',jwt_views.TokenRefreshView.as_view(),name ='token_refresh'),
]