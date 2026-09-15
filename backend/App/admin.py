from django.contrib import admin
from .models import Users, Admin, College, Application, Degree, Document, Certificate, Payment, PasswordResetToken

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone']
    search_fields = ['name', 'email']

@admin.register(Admin)
class AdminAdmin(admin.ModelAdmin):
    list_display = ['name', 'email']
    search_fields = ['name', 'email']

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'location', 'regType']
    search_fields = ['name', 'email', 'location']

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['fullName', 'email', 'status', 'payment_status', 'created_at']
    list_filter = ['status', 'payment_status']
    search_fields = ['fullName', 'email']

@admin.register(Degree)
class DegreeAdmin(admin.ModelAdmin):
    list_display = ['application', 'university', 'course', 'college']

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['application', 'doc_type', 'name']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['name', 'college', 'price']

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['application', 'order_id', 'status', 'created_at']
    list_filter = ['status']

@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(admin.ModelAdmin):
    list_display = ['token', 'user', 'admin', 'is_used', 'created_at', 'expires_at']
    list_filter = ['is_used', 'created_at']
    search_fields = ['token']
