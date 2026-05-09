from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model=User
        fields=('email', 'first_name', 'last_name', 'phone_number', 'linkedin_link', 'github_link', 'is_staff')

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model=User
        fields=('email', 'first_name', 'last_name', 'phone_number', 'linkedin_link', 'github_link', 'is_staff')


@admin.register(User)
class CustomeUserAdmin(UserAdmin):
    form=CustomUserChangeForm
    add_form=CustomUserCreationForm
    list_display=('email', 'first_name', 'last_name', 'is_staff',)
    list_filter=('is_staff','is_active')
    fieldsets=((None, {"fields": ('email', 'first_name', 'last_name', 'phone_number', 'linkedin_link', 'github_link')}),
               ("Permissions", {"fields":('is_staff', 'is_active', 'is_superuser')}))
    add_fieldsets=(("Personal Info", 
                    {"classes": ("wide",)},
                    {"fields": ("email",  "first_name", "last_name", "phone_number", "linkedin_link", "github_link")}),
                    ("Permissions", {"classes": ("wide",)}, {"fields": ("is_staff", "is_active", "is_superuser")}))
    search_fields=('email',)
    ordering=('email',)


