from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'linkedin_link',
            'github_link',
            'is_staff'
        )


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'linkedin_link',
            'github_link',
            'is_staff'
        )


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm

    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    list_filter = ('is_staff', 'is_active')

    filter_horizontal=('groups', 'user_permissions')

    fieldsets = (
        (
            None,
            {
                "fields": (
                    'email',
                    'first_name',
                    'last_name',
                    'phone_number',
                    'linkedin_link',
                    'github_link'
                )
            }
        ),
        (
            "Permissions",
            {
                "fields": ('is_staff', 'is_active')
            }
        ),
    )

    add_fieldsets = (
        (
            "Personal Info",
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "phone_number",
                    "linkedin_link",
                    "github_link",
                    "password1",
                    "password2",
                ),
            },
        ),
        (
            "Permissions",
            {
                "classes": ("wide",),
                "fields": ("is_staff", "is_active"),
            },
        ),
    )

    search_fields = ('email',)
    ordering = ('email',)


