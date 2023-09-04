from django.db import models
from django.contrib.auth.models import AbstractUser,Permission,Group


class User(AbstractUser):
    username = models.CharField(max_length=250)
    email = models.CharField(max_length=250, unique=True)
    password = models.CharField(max_length=250)
    profile_img = models.ImageField(upload_to='profile',blank=True, null=True)
    groups = models.ManyToManyField(Group, related_name='newuser_set', blank=True)
    is_active = models.BooleanField(default=True)
    user_permissions = models.ManyToManyField(Permission, related_name='newuser_set', blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']