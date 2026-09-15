from rest_framework import serializers
from .models import ImageUpload
from .models import Users,Admin
from .models import Review
from .models import DeliveryRequest

from .models import Payment

class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageUpload
        fields = ['id', 'image', 'uploaded_at']







from rest_framework import serializers
from .models import Users

import re

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = "__all__"

    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        if not re.match(r'^[a-zA-Z\s]+$', value.strip()):
            raise serializers.ValidationError("Name can only contain alphabets and spaces.")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters.")
        return value.strip()

    def validate_phone(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Phone number is required.")
        if not re.match(r'^[0-9]{10}$', value.strip()):
            raise serializers.ValidationError("Enter a valid 10-digit phone number.")
        return value.strip()

    def validate_email(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Email is required.")
        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', value.strip()):
            raise serializers.ValidationError("Please enter a valid email.")
        return value.strip()

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['name', 'email', 'password']

from rest_framework import serializers
from .models import College,Certificate

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = "__all__"

from rest_framework import serializers
from .models import Application, Degree, Document

class DegreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Degree
        fields = "__all__"


class DocumentSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Document
        fields = ['id', 'name', 'url']

    def get_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(obj.file.url)


class ApplicationSerializer(serializers.ModelSerializer):
    degrees = DegreeSerializer(many=True, required=False)
    documents = DocumentSerializer(many=True, required=False)

    class Meta:
        model = Application
        fields = "__all__"

    def create(self, validated_data):
        degrees_data = validated_data.pop("degrees", [])
        documents_data = validated_data.pop("documents", [])

        app = Application.objects.create(**validated_data)

        for d in degrees_data:
            Degree.objects.create(application=app, **d)

        for doc in documents_data:
            Document.objects.create(application=app, **doc)

        return app
    
class CertificateSerializer(serializers.ModelSerializer):
        class Meta:
            model = Certificate
            fields = ['id', 'name', 'price', 'college']


from rest_framework import serializers
from .models import Payment, PasswordResetToken

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

class VerifyTokenSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)

class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    password = serializers.CharField(required=True, min_length=6)
    confirm_password = serializers.CharField(required=True, min_length=6)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

class PasswordResetTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ['token', 'created_at', 'expires_at', 'is_used']




class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'






class DeliveryRequestSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="tracking_id")

    courierPartner = serializers.CharField(
        source="courier_partner"
    )

    currentLocation = serializers.CharField(
        source="current_location"
    )

    estDelivery = serializers.DateField(
        source="est_delivery"
    )

    class Meta:
        model = DeliveryRequest
        fields = [
            "id",
            "student",
            "email",
            "phone",
            "item",
            "courierPartner",
            "currentLocation",
            "status",
            "estDelivery",
        ]




class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"