from rest_framework.decorators import api_view
from rest_framework.response import Response
# from .models import ImageUpload
from .serializers import ImageUploadSerializer
# from PIL import Image, UnidentifiedImageError
# import io
# import uuid
# import subprocess
# import os
# from django.core.files.base import ContentFile
from django.conf import settings
from .serializers import PaymentSerializer
from rest_framework import status

from rest_framework.views import APIView
from .models import Review
from .serializers import ReviewSerializer

# @api_view(['POST'])
# def upload_image(request):
#     file = request.FILES.get('image')

#     if not file:
#         return Response({'error': 'No file provided'}, status=400)

#     file_type = file.content_type
#     original_kb = file.size / 1024

#     # =====================================
#     # 🖼 IMAGE HANDLING
#     # =====================================
#     if file_type.startswith('image/'):
#         try:
#             img = Image.open(file)

#             if img.mode in ("RGBA", "P"):
#                 img = img.convert("RGB")

#             # Resize (performance boost)
#             img.thumbnail((1200, 1200))

#             # ✅ If <= 1MB → skip compression
#             if original_kb <= 1024:
#                 serializer = ImageUploadSerializer(data={'image': file})

#                 if serializer.is_valid():
#                     instance = serializer.save()

#                     return Response({
#                         "type": "image",
#                         "message": "Uploaded without compression",
#                         "original_kb": round(original_kb, 2),
#                         "compressed": False,
#                         "url": instance.image.url
#                     }, status=201)

#                 return Response(serializer.errors, status=400)

#             # 🔥 Compress (binary search)
#             target_kb = 100
#             min_q, max_q = 10, 95
#             best_output = None

#             while min_q <= max_q:
#                 mid = (min_q + max_q) // 2

#                 temp = io.BytesIO()
#                 img.save(temp, format='WEBP', quality=mid, optimize=True)

#                 size_kb = temp.tell() / 1024

#                 if size_kb <= target_kb:
#                     best_output = temp
#                     min_q = mid + 1
#                 else:
#                     max_q = mid - 1

#             if best_output is None:
#                 best_output = temp

#             best_output.seek(0)

#             filename = f"{uuid.uuid4()}.webp"
#             compressed_file = ContentFile(best_output.read(), name=filename)

#             serializer = ImageUploadSerializer(data={'image': compressed_file})

#             if serializer.is_valid():
#                 instance = serializer.save()

#                 compressed_kb = best_output.tell() / 1024

#                 return Response({
#                     "type": "image",
#                     "message": "Compressed & uploaded",
#                     "original_kb": round(original_kb, 2),
#                     "compressed_kb": round(compressed_kb, 2),
#                     "reduction_percent": round(
#                         ((original_kb - compressed_kb) / original_kb) * 100, 2
#                     ),
#                     "url": instance.image.url
#                 }, status=201)

#             return Response(serializer.errors, status=400)

#         except UnidentifiedImageError:
#             return Response({'error': 'Invalid image'}, status=400)

#     # =====================================
#     # 📄 PDF HANDLING
#     # =====================================
#     elif file_type == "application/pdf":

#         input_path = f"temp_{uuid.uuid4()}.pdf"
#         output_path = f"compressed_{uuid.uuid4()}.pdf"

#         # Save temp PDF
#         with open(input_path, 'wb+') as f:
#             for chunk in file.chunks():
#                 f.write(chunk)

#         try:
#             subprocess.run([
#                 "gs",
#                 "-sDEVICE=pdfwrite",
#                 "-dCompatibilityLevel=1.4",
#                 "-dPDFSETTINGS=/ebook",
#                 "-dNOPAUSE",
#                 "-dQUIET",
#                 "-dBATCH",
#                 f"-sOutputFile={output_path}",
#                 input_path
#             ], check=True)

#             compressed_kb = os.path.getsize(output_path) / 1024

#             with open(output_path, 'rb') as f:
#                 compressed_file = ContentFile(f.read(), name=f"{uuid.uuid4()}.pdf")

#             serializer = ImageUploadSerializer(data={'image': compressed_file})

#             if serializer.is_valid():
#                 instance = serializer.save()

#                 return Response({
#                     "type": "pdf",
#                     "message": "PDF compressed & uploaded",
#                     "original_kb": round(original_kb, 2),
#                     "compressed_kb": round(compressed_kb, 2),
#                     "reduction_percent": round(
#                         ((original_kb - compressed_kb) / original_kb) * 100, 2
#                     ),
#                     "url": instance.image.url
#                 }, status=201)

#             return Response(serializer.errors, status=400)

#         finally:
#             if os.path.exists(input_path):
#                 os.remove(input_path)
#             if os.path.exists(output_path):
#                 os.remove(output_path)

#     # =====================================
#     # ❌ INVALID FILE
#     # =====================================
#     else:
#         return Response({'error': 'Only images and PDFs allowed'}, status=400)



from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer

@api_view(["POST"])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "message": "Registered successfully",
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users,Admin

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Users, Admin
 
 
@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
 
    # 🔹 1. Check Admin Login
    if email and email.endswith('@admin.org'):
 
        admin = Admin.objects.filter(email=email).first()
 
        if admin:
            if admin.password == password:
                return Response({
                    "message": "Admin Login successful",
                    "type": "admin",
                    "data": {
                        "email": admin.email
                    }
                }, status=200)
 
            return Response({
                "error": "Invalid admin password"
            }, status=401)
 
        return Response({
            "error": "Admin not found"
        }, status=404)
 
    # 🔹 2. Check Normal User Login
    user = Users.objects.filter(email=email).first()
 
    if user:
        if user.password == password:
            return Response({
                "message": "User Login successful",
                "type": "user",
                "data": {
                    "name": user.name,
                    "email": user.email
                }
            }, status=200)
 
        return Response({
            "error": "Invalid password"
        }, status=401)
 
    return Response({
        "error": "User not found"
    }, status=404)


from django.http import JsonResponse

from django.conf import settings
from django.http import JsonResponse
import json

from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
from django.http import JsonResponse




import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings


import json
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
 
 
 



from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

from django.conf import settings
from .models import Payment

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

from django.conf import settings
from .models import Payment




from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.conf import settings
import json

from .models import Payment



from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.mail import send_mail
import json

@csrf_exempt
def contact_api(request):
    if request.method == "POST":
        data = json.loads(request.body)

        name = data.get("name")
        email = data.get("email")
        subject = data.get("subject")
        message = data.get("message")

        full_message = f"""
New Contact Form Message:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}
"""

        try:
            send_mail(
                subject=f"Contact Form: {subject}",
                message=full_message,
                from_email=email,
                recipient_list=["admin@100transcripts.com"],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email: {e}")

        return JsonResponse({"message": "Message saved/sent successfully"})

    return JsonResponse({"error": "Invalid request"}, status=400)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import College
from .serializers import CollegeSerializer


@api_view(['POST'])
def add_college(request):
    serializer = CollegeSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import College
from .serializers import CollegeSerializer


@api_view(['GET'])
def get_all_colleges(request):
    colleges = College.objects.all().order_by('-id')
    serializer = CollegeSerializer(colleges, many=True)
    return Response(serializer.data)



import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Application, Degree, Document
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Application, Degree, Document
import json
import re

def validate_name_backend(name):
    if not name or not name.strip(): return "Name is required"
    if not re.match(r'^[a-zA-Z\s]+$', name.strip()): return "Name can only contain alphabets and spaces"
    if len(name.strip()) < 2: return "Name must be at least 2 characters"
    return None

def validate_phone_backend(phone):
    if not phone or not phone.strip(): return "Phone is required"
    if not re.match(r'^[0-9]{10}$', phone.strip()): return "Enter a valid 10-digit phone number"
    return None

def validate_email_backend(email):
    if not email or not email.strip(): return "Email is required"
    if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email.strip()): return "Please enter a valid email"
    return None


@api_view(['POST'])
def submit_application(request):
    try:
        data = request.POST if request.POST else request.data
        print(f"DEBUG DATA: {data}")

        # ✅ Strict Field Validation
        name_err = validate_name_backend(data.get("fullName"))
        if name_err: return Response({"error": name_err}, status=400)

        email_err = validate_email_backend(data.get("email"))
        if email_err: return Response({"error": email_err}, status=400)

        phone_err = validate_phone_backend(data.get("phone"))
        if phone_err: return Response({"error": phone_err}, status=400)

        alt_phone_err = validate_phone_backend(data.get("altPhone"))
        if alt_phone_err: return Response({"error": alt_phone_err}, status=400)

        if not data.get("requirement"):
            return Response({"error": "requirement is required"}, status=400)

        # ✅ Create Application safely
        app = Application.objects.create(
            fullName=data.get("fullName", "").strip(),
            email=data.get("email", "").strip(),
            phone=data.get("phone", "").strip(),
            altPhone=data.get("altPhone", "").strip(),
            requirement=data.get("requirement", "").strip(),
            referenceNumber=data.get("referenceNumber", "").strip() or None,
            termsAccepted=str(data.get("termsAccepted")).lower() == "true",
            specialCondition=str(data.get("specialCondition")).lower() == "true",
            tracking_id=data.get("trackingId", "").strip() or None,
            status='pending_approval',
        )

        # ✅ Degrees (OPTIONAL + SAFE)
        degrees = []
        degrees_raw = data.get("degrees")

        if degrees_raw:
            try:
                degrees = json.loads(degrees_raw)
            except json.JSONDecodeError:
                degrees = []

        for d in degrees:
            # skip empty degree rows
            if not (d.get("university") or d.get("college")):
                continue

            Degree.objects.create(
                application=app,
                type=d.get("type") or None,
                university=d.get("university") or "",
                course=d.get("course") or None,
                college=d.get("college") or "",
            )

        # ✅ Documents (OPTIONAL)
        for key, file in request.FILES.items():
            Document.objects.create(
                application=app,
                doc_type=key,
                name=file.name,
                file=file
            )

        from .utils import send_interakt_template
        send_interakt_template(
            phone_number=app.phone,
            template_name="request_pending",
            variables=[app.fullName, app.application_id or str(app.id)],
            application_id=app.application_id,
            customer_name=app.fullName,
            status="pending_approval"
        )

        return Response({
            "message": "Submitted Successfully",
            "application_id": app.id
        }, status=201)

    except Exception as e:
        print("❌ ERROR:", str(e))  # important for debugging
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
def get_applications(request):
    apps = Application.objects.all().order_by('-id')

    data = []
    for app in apps:
        # Get the first degree info if it exists
        first_degree = app.degrees.first()
        university = first_degree.university if first_degree else "N/A"
        app_type = app.requirement

        # Build Tracking Timeline
        stages = [
            "Request Submitted",
            "Request Verified",
            "Documents Under Processing",
            "Documents Ready",
            "Delivery Agent Assigned",
            "Picked Up by Delivery Agent",
            "Out for Delivery",
            "Delivered Successfully"
        ]
        
        # Determine current stage index based on app.status and agent assignment
        current_stage_idx = 0
        if app.status in ['approved', 'completed']:
            current_stage_idx = max(current_stage_idx, 1)
        
        agent_assignment = getattr(app, 'agent_assignment', None)
        if agent_assignment:
            # Map assignment status to stage
            agent_status_map = {
                'IN_PROGRESS': 2,
                'DOCUMENTS_COLLECTED': 3,
                'DELIVERY_ASSIGNED': 4,
                'PICKED_UP': 5,
                'OUT_FOR_DELIVERY': 6,
                'DELIVERED': 7,
                'COMPLETED': 7,
            }
            if agent_assignment.status in agent_status_map:
                current_stage_idx = max(current_stage_idx, agent_status_map[agent_assignment.status])
            else:
                current_stage_idx = max(current_stage_idx, 2) # assigned but not picked up yet

        tracking_history = []
        for idx, stage_name in enumerate(stages):
            if idx < current_stage_idx:
                status_val = "completed"
            elif idx == current_stage_idx:
                status_val = "current"
            else:
                status_val = "upcoming"
            tracking_history.append({
                "step": stage_name,
                "status": status_val,
                "time": app.created_at.strftime("%b %d, %Y, %I:%M %p") if idx == 0 else "" # Optionally fetch real timestamps from TrackingHistory model
            })

        data.append({
            "id": f"REQ-{app.id:03}",
            "raw_id": app.id,
            "fullName": app.fullName,
            "email": app.email,
            "phone": app.phone,
            "university": university,
            "type": app_type,
            "payment": app.payment_status,
            "status": app.status,
            "agent": agent_assignment.agent.name if agent_assignment and agent_assignment.agent else "Unassigned",
            "assigned": agent_assignment.agent.name if agent_assignment and agent_assignment.agent else "Unassigned",
            "delivery": "Standard Courier",
            "district": getattr(app, 'district', 'N/A'), # if added
            "documentsList": [
                {"id": doc.id, "name": doc.name, "status": "Verified", "url": request.build_absolute_uri(doc.file.url)}
                for doc in app.documents.all()
            ],
            "trackingHistory": tracking_history
        })
    return Response(data)


from django.http import FileResponse
from rest_framework.decorators import api_view
from .models import Document

@api_view(['GET'])
def download_document(request, id):
    try:
        doc = Document.objects.get(id=id)

        return FileResponse(
            doc.file.open(),
            as_attachment=True,   # 🔥 THIS FORCES DOWNLOAD
            filename=doc.name
        )

    except Document.DoesNotExist:
        return Response({"error": "File not found"}, status=404)
    

from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def send_notification(request):
    try:
        email = request.data.get("email")
        subject = request.data.get("subject")
        message = request.data.get("message")

        if not email or not subject or not message:
            return Response({"error": "All fields required"}, status=400)

        # ✅ SEND EMAIL
        try:
            send_mail(
                subject,
                message,
                "yourgmail@gmail.com",  # sender
                [email],                # receiver
                fail_silently=False,
            )
        except Exception as e:
            print(f"Failed to send email to {email}: {e}")

        return Response({"message": "Email sent successfully ✅"})

    except Exception as e:
        print("ERROR:", str(e))
        return Response({"error": str(e)}, status=500)
    
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .models import Application

@csrf_exempt
def update_status(request, id=None):
    if request.method in ["POST", "PUT"]:
        data = json.loads(request.body)

        email = data.get("email")
        status = data.get("status")
        agent = data.get("agent")
        admin_message = data.get("admin_message")
        rejection_reason = data.get("rejection_reason")
        service_fee = data.get("service_fee")

        # Validate: rejection reason is mandatory when rejecting
        if status == "rejected" and not (rejection_reason or "").strip():
            return JsonResponse({"error": "Rejection reason is required when rejecting an application."}, status=400)
        
        # Validate: admin message is mandatory for changes_requested
        if status == "changes_requested" and not (admin_message or "").strip():
            return JsonResponse({"error": "Admin message is required when requesting changes."}, status=400)

        try:
            if id:
                app = Application.objects.get(id=id)
            elif email:
                app = Application.objects.get(email=email)
            else:
                return JsonResponse({"error": "ID or Email required"}, status=400)

            app.status = status
            if agent is not None:
                app.agent = agent
            if admin_message is not None:
                app.admin_message = admin_message
            if status == "rejected" and rejection_reason:
                app.rejection_reason = rejection_reason.strip()
            if service_fee is not None:
                app.service_fee = service_fee
            app.save()
            
            from .utils import send_interakt_template
            
            # --- START WHATSAPP NOTIFICATION LOGIC ---
            # Note: 'Approved', 'Rejected', and 'Pending Approval' are handled automatically by the Application model's save() override.
            if status == "Dispatched":
                courier = data.get("courier_partner", "Standard Courier")
                tracking = data.get("tracking_id", app.tracking_id or "N/A")
                if data.get("tracking_id"):
                    app.tracking_id = tracking
                    app.save()
                send_interakt_template(
                    phone_number=app.phone, 
                    template_name="certificate_dispatched", 
                    variables=[app.fullName, courier, tracking],
                    application_id=app.application_id,
                    customer_name=app.fullName,
                    status=status
                )
            elif status == "Delivered":
                send_interakt_template(
                    phone_number=app.phone, 
                    template_name="certificate_delivered", 
                    variables=[app.fullName],
                    application_id=app.application_id,
                    customer_name=app.fullName,
                    status=status
                )
            # --- END WHATSAPP NOTIFICATION LOGIC ---

            return JsonResponse({"message": "Status updated"})
        except Application.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)

@api_view(['GET'])
def get_app_status(request, id):
    try:
        app = Application.objects.get(id=id)
        return Response({
            "status": app.status,
            "admin_message": app.admin_message,
            "rejection_reason": app.rejection_reason,
            "payment_status": app.payment_status,
            "tracking_id": app.tracking_id,
            "service_fee": app.service_fee
        })
    except Application.DoesNotExist:
        return Response({"error": "Application not found"}, status=404)

@api_view(['GET'])
def get_application_status(request):
    tracking_id = request.GET.get('tracking_id')
    email = request.GET.get('email')
    
    try:
        if tracking_id:
            app = Application.objects.get(tracking_id=tracking_id)
        elif email:
            app = Application.objects.get(email=email)
        else:
            return Response({"error": "Tracking ID or Email required"}, status=400)
            
        # Fetch agent assignment and decision record
        assignment = getattr(app, 'agent_assignment', None)
        decision = getattr(assignment, 'decision_record', None) if assignment else None
        
        # Build document list
        documents = [{"id": doc.id, "name": doc.name, "url": request.build_absolute_uri(doc.file.url)} for doc in app.documents.all()]
        if assignment and assignment.collected_document_url:
            documents.append({"id": "collected", "name": "Final Certificate", "url": assignment.collected_document_url})

        return Response({
            "status": app.status,
            "agent_status": assignment.status if assignment else None,
            "admin_message": app.admin_message,
            "rejection_reason": app.rejection_reason,
            "payment_status": app.payment_status,
            "fullName": app.fullName,
            "tracking_id": app.tracking_id,
            "application_id": app.id,
            "service_fee": app.service_fee,
            "documents": documents,
            "courier_partner": assignment.courier_partner if assignment else None,
            "agent_tracking_id": assignment.tracking_id if assignment else None,
            "tracking_url": assignment.tracking_url if assignment else None,
            "decision": {
                "decision": decision.decision,
                "rejection_reason": decision.rejection_reason,
                "remarks": decision.remarks,
                "rejection_letter_url": request.build_absolute_uri(decision.rejection_letter.url) if decision.rejection_letter else None,
                "required_documents": decision.required_documents,
                "deadline": decision.deadline.isoformat() if decision.deadline else None,
            } if decision else None
        })
    except Application.DoesNotExist:
        return Response({"error": "Application not found"}, status=404)

from .models import Certificate
from .serializers import CertificateSerializer
@api_view(['POST'])
def add_certificate(request):
    serializer = CertificateSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_college_certificates(request, pk):
    certificates = Certificate.objects.filter(college_id=pk)

    serializer = CertificateSerializer(certificates, many=True)
    return Response(serializer.data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Certificate
from .serializers import CertificateSerializer


@api_view(["PUT", "DELETE"])
def certificate_detail(request, id):
    try:
        cert = Certificate.objects.get(id=id)
    except Certificate.DoesNotExist:
        return Response({"error": "Certificate not found"}, status=status.HTTP_404_NOT_FOUND)

    # ✅ UPDATE
    if request.method == "PUT":
        serializer = CertificateSerializer(cert, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # ✅ DELETE
    if request.method == "DELETE":
        cert.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
from django.http import FileResponse
from .models import Document
import os

@api_view(['GET'])
def download_document(request, doc_id):
    try:
        doc = Document.objects.get(id=doc_id)
        response = FileResponse(doc.file.open(), as_attachment=True, filename=doc.name)
        return response
    except Document.DoesNotExist:
        return Response({"error": "Document not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def send_notification(request):
    data = request.data
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')
    
    if not email or not subject or not message:
        return Response({"error": "Missing required fields"}, status=400)
    
    # In a real app, use send_mail(...)
    print(f"?? Notification sent to {email}: {subject}")
    
    return Response({"message": "Notification sent successfully"})


from django.http import JsonResponse
from .models import College
 
def get_colleges(request):
    colleges = College.objects.all()
 
    data = [
        {
            "id": c.id,
            "name": c.name
        }
        for c in colleges
    ]
 
    return JsonResponse(data, safe=False)
 
from django.http import JsonResponse
from .models import Application
 
from django.http import JsonResponse
from .models import Application
 
def get_verified_applications(request):
    try:
        # We filter for 'approved' status (standardized with StudentRequests)
        apps = Application.objects.filter(status="approved").order_by('-created_at')
        
        data = []
        for app in apps:
            first_degree = app.degrees.first()
            university = first_degree.university if first_degree else "N/A"
            
            data.append({
                "id": f"VER-{app.id:03}",
                "raw_id": app.id,
                "student": app.fullName,
                "college": university,
                "country": "India", # Default or derived from university if possible
                "email": app.email,
                "date": app.created_at.strftime("%Y-%m-%d"),
                "status": "Verified", # UI expectation
                "assigned": app.agent or "Unassigned",
                "mode": "Email",
                "history": [
                    { "step": "Application Received", "time": app.created_at.strftime("%d %b, %H:%M"), "done": True },
                    { "step": "Documents Sent to College", "time": "In Progress", "done": False },
                ]
            })
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

from django.http import JsonResponse
from .models import Application

def application_status(request):
    email = request.GET.get('email')

    if not email:
        return JsonResponse({
            "error": "Email is required"
        }, status=400)

    try:
        app = Application.objects.get(email=email)

        return JsonResponse({
            "status": app.status,
            "full_name": app.full_name,
            "application_id": app.application_id,
            "admin_message": app.admin_message,
        })

    except Application.DoesNotExist:
        return JsonResponse({
            "error": "Application not found"
        }, status=404)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .models import PasswordResetToken, Users, Admin
from .serializers import ForgotPasswordSerializer, VerifyTokenSerializer, ResetPasswordSerializer
from django.core.mail import send_mail
import secrets

@api_view(['POST'])
def forgot_password(request):
    serializer = ForgotPasswordSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    email = serializer.validated_data['email']
    
    user = Users.objects.filter(email=email).first()
    admin = Admin.objects.filter(email=email).first()
    
    if not user and not admin:
        return Response({
            "message": "No account found with this email",
            "found": False
        }, status=status.HTTP_200_OK)
    
    token = secrets.token_urlsafe(64)
    reset_token = PasswordResetToken.objects.create(
        user=user,
        admin=admin,
        token=token
    )
    
    reset_url = f"http://localhost:5173/reset-password?token={token}"
    
    subject = "Password Reset Request - 100 Transcripts"
    message = f"""
Hello,

We received a request to reset your password for 100 Transcripts.

Please click the link below to reset your password:

{reset_url}

This link will expire in 1 hour.

If you didn't request this, please ignore this email and your password will remain unchanged.

Best regards,
100 Transcripts Team
    """
    
    email_sent = False
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [email],
            fail_silently=False,
        )
        email_sent = True
        print(f"✅ Email sent successfully to {email}")
    except Exception as e:
        print(f"❌ Email error: {str(e)}")
        import traceback
        traceback.print_exc()
    
    return Response({
        "message": "Password reset initiated",
        "found": True,
        "email_sent": email_sent,
        "token": token,
        "reset_url": reset_url,
        "note": "For development, use the token above to reset password directly"
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def verify_reset_token(request):
    serializer = VerifyTokenSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    token = serializer.validated_data['token']
    
    try:
        reset_token = PasswordResetToken.objects.get(token=token)
    except PasswordResetToken.DoesNotExist:
        return Response({
            "valid": False,
            "message": "Invalid or expired token"
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if not reset_token.is_valid():
        return Response({
            "valid": False,
            "message": "Invalid or expired token"
        }, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({
        "valid": True,
        "message": "Token is valid"
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def reset_password(request):
    serializer = ResetPasswordSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    token = serializer.validated_data['token']
    new_password = serializer.validated_data['password']
    
    try:
        reset_token = PasswordResetToken.objects.get(token=token)
    except PasswordResetToken.DoesNotExist:
        return Response({
            "message": "Invalid or expired token"
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if not reset_token.is_valid():
        return Response({
            "message": "Invalid or expired token"
        }, status=status.HTTP_400_BAD_REQUEST)
    
    if reset_token.user:
        reset_token.user.password = new_password
        reset_token.user.save()
    elif reset_token.admin:
        reset_token.admin.password = new_password
        reset_token.admin.save()
    
    reset_token.is_used = True
    reset_token.save()
    
    return Response({
        "message": "Password has been reset successfully"
    }, status=status.HTTP_200_OK)





class ReviewListCreateView(APIView):

    def get(self, request):
        reviews = Review.objects.all().order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Review submitted successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors,
                        status=status.HTTP_400_BAD_REQUEST)



from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail

from .models import DeliveryRequest
from .serializers import DeliveryRequestSerializer


@api_view(["GET"])
def delivery_requests(request):
    apps = Application.objects.filter(
        payment_status="Paid"
    ).order_by("-id")

    data = []

    for app in apps:
        first_degree = app.degrees.first()

        data.append({
            "id": app.tracking_id or f"TRK-{app.id}",
            "student": app.fullName,
            "email": app.email,
            "phone": app.phone,

            "item": app.requirement,

            "courierPartner": "Pending",
            "currentLocation": "Processing Center",

            "status": "In Transit",

            "estDelivery": "",

            "history": [
                {
                    "title": "Payment Completed",
                    "location": "100 Transcripts",
                    "time": app.created_at.strftime("%d %b %Y"),
                    "done": True
                }
            ]
        })

    return Response(data)

@api_view(["POST"])
def send_courier_email(request):
    email = request.data.get("email")
    tracking_id = request.data.get("tracking_id")
    courier_partner = request.data.get("courier_partner")

    send_mail(
        subject="Courier Tracking Details",
        message=f"""
Your document has been dispatched.

Courier Partner: {courier_partner}
Tracking ID: {tracking_id}

Thank you.
""",
        from_email="yourmail@gmail.com",
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({
        "message": "Email sent successfully"
    })

import uuid
import traceback

from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from cashfree_pg.api_client import Cashfree
from cashfree_pg.models.create_order_request import CreateOrderRequest
from cashfree_pg.models.customer_details import CustomerDetails

from .models import Application, Payment


class CreateCashfreeOrder(APIView):

    def post(self, request, application_id):

        application = get_object_or_404(
            Application,
            id=application_id
        )

        env = Cashfree.PRODUCTION if settings.CASHFREE_ENVIRONMENT == 'PRODUCTION' else Cashfree.SANDBOX
        Cashfree.XApiVersion = "2023-08-01"  # Required for v6 SDK
        cashfree_client = Cashfree(
            XClientId=settings.CASHFREE_CLIENT_ID,
            XClientSecret=settings.CASHFREE_CLIENT_SECRET,
            XEnvironment=env
        )

        order_id = f"ORD_{uuid.uuid4().hex[:12]}"

        # Clean phone number
        phone = "".join(
            filter(str.isdigit, application.phone or "")
        )

        if len(phone) > 10:
            phone = phone[-10:]

        if len(phone) < 10:
            phone = "9999999999"

        customer_details = CustomerDetails(
            customer_id=f"CUST_{application.id}",
            customer_name=application.fullName[:50],
            customer_email=application.email,
            customer_phone=phone
        )

        # DYNAMIC PRICING CALCULATION
        order_amount = 1.00 # Fallback default
        if application.service_fee and application.service_fee > 0:
            order_amount = float(application.service_fee)
        else:
            first_degree = application.degrees.first()
            if first_degree and first_degree.university:
                from .models import Certificate
                try:
                    # Find the certificate price mapping
                    cert = Certificate.objects.filter(
                        college__name__icontains=first_degree.university,
                        name__icontains=application.requirement
                    ).first()
                    if cert and cert.price > 0:
                        order_amount = float(cert.price)
                except Exception as e:
                    print(f"Failed to fetch dynamic price: {e}")

        order_request = CreateOrderRequest(
            order_id=order_id,
            order_amount=order_amount,
            order_currency="INR",
            customer_details=customer_details
        )

        try:
            # v6 SDK: call on instance, no version string positional arg
            response = cashfree_client.PGCreateOrder(order_request)

            payment = Payment.objects.create(
                application=application,
                order_id=order_id,
                payment_session_id=response.data.payment_session_id,
                amount=order_amount,
                status="PENDING"
            )

            return Response(
                {
                    "success": True,
                    "order_id": payment.order_id,
                    "payment_session_id": payment.payment_session_id,
                    "amount": payment.amount
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:

            print("\n========== CASHFREE ERROR ==========")
            print(f"Type: {type(e).__name__}")
            print(f"Message: {str(e)}")

            # Try to extract detailed Cashfree API response body
            cf_body = None
            if hasattr(e, 'body'):
                cf_body = e.body
                print(f"Cashfree Response Body: {cf_body}")
            if hasattr(e, 'status'):
                print(f"Cashfree HTTP Status: {e.status}")
            if hasattr(e, 'reason'):
                print(f"Cashfree Reason: {e.reason}")

            traceback.print_exc()
            print("===================================\n")

            error_detail = cf_body if cf_body else str(e)

            return Response(
                {
                    "success": False,
                    "error": str(e),
                    "detail": error_detail
                },
                status=status.HTTP_400_BAD_REQUEST
            )

from .serializers import PaymentSerializer

class VerifyPayment(APIView):

    def get(self, request, order_id):

        env = Cashfree.PRODUCTION if settings.CASHFREE_ENVIRONMENT == 'PRODUCTION' else Cashfree.SANDBOX
        Cashfree.XApiVersion = "2023-08-01"  # Required for v6 SDK
        
        cashfree_client = Cashfree(
            XClientId=settings.CASHFREE_CLIENT_ID,
            XClientSecret=settings.CASHFREE_CLIENT_SECRET,
            XEnvironment=env
        )

        # v6 SDK: call on instance, no version string positional arg
        response = cashfree_client.PGFetchOrder(order_id)

        payment = get_object_or_404(
            Payment,
            order_id=order_id
        )

        payment.status = response.data.order_status
        payment.save()

        from .utils import send_interakt_template
        if response.data.order_status == "PAID":
            payment.application.payment_status = "Paid"
            payment.application.save()
            send_interakt_template(payment.application.phone, "payment_status", [payment.application.fullName, payment.application.application_id, "Successful"])
        elif response.data.order_status == "FAILED":
            send_interakt_template(payment.application.phone, "payment_status", [payment.application.fullName, payment.application.application_id, "Failed"])
        elif response.data.order_status in ["PENDING", "ACTIVE"]:
            send_interakt_template(payment.application.phone, "payment_status", [payment.application.fullName, payment.application.application_id, "Pending"])

        serializer = PaymentSerializer(payment)
        return Response(serializer.data)

class PaymentDetail(APIView):

    def get(self, request, application_id):

        payment = Payment.objects.filter(
            application_id=application_id
        ).last()

        if not payment:
            return Response(
                {"message": "Payment not found"},
                status=404
            )

        serializer = PaymentSerializer(payment)
        return Response(serializer.data)

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def cashfree_webhook(request):

    env = Cashfree.PRODUCTION if settings.CASHFREE_ENVIRONMENT == 'PRODUCTION' else Cashfree.SANDBOX
    cashfree_client = Cashfree(
        XClientId=settings.CASHFREE_CLIENT_ID,
        XClientSecret=settings.CASHFREE_CLIENT_SECRET,
        XEnvironment=env
    )

    try:
        cashfree_client.PGVerifyWebhookSignature(
            request.headers.get("x-webhook-signature", ""),
            request.body.decode('utf-8'),
            request.headers.get("x-webhook-timestamp", "")
        )
    except Exception as e:
        return JsonResponse({"status": "error", "message": "Invalid signature"}, status=400)

    payload = json.loads(request.body)

    event = payload.get("type")

    data = payload.get("data", {})

    order = data.get("order", {})

    order_id = order.get("order_id")

    try:

        payment = Payment.objects.get(
            order_id=order_id
        )

        if event == "PAYMENT_SUCCESS_WEBHOOK":

            payment.status = "PAID"
            payment.save()

            application = payment.application
            application.payment_status = "Paid"
            application.save()
            
            from .utils import send_interakt_template
            send_interakt_template(application.phone, "payment_status", [application.fullName, application.application_id, "Successful"])

        elif event == "PAYMENT_FAILED_WEBHOOK":

            payment.status = "FAILED"
            payment.save()
            
            application = payment.application
            from .utils import send_interakt_template
            send_interakt_template(application.phone, "payment_status", [application.fullName, application.application_id, "Failed"])

    except Payment.DoesNotExist:
        pass

    return JsonResponse({"status": "ok"})


from cashfree_pg.models.order_create_refund_request import OrderCreateRefundRequest

class RefundPayment(APIView):
    def post(self, request):
        application_id = request.data.get('application_id')
        payment = Payment.objects.filter(application_id=application_id).last()
        
        if not payment or payment.status != 'PAID':
            return Response({"error": "Valid paid payment not found"}, status=status.HTTP_400_BAD_REQUEST)

        env = Cashfree.PRODUCTION if settings.CASHFREE_ENVIRONMENT == 'PRODUCTION' else Cashfree.SANDBOX
        Cashfree.XApiVersion = "2023-08-01"
        cashfree_client = Cashfree(
            XClientId=settings.CASHFREE_CLIENT_ID,
            XClientSecret=settings.CASHFREE_CLIENT_SECRET,
            XEnvironment=env
        )

        refund_request = OrderCreateRefundRequest(
            refund_amount=payment.amount,
            refund_id=f"REF_{uuid.uuid4().hex[:12]}",
            refund_note="Requested via application"
        )

        try:
            response = cashfree_client.PGOrderCreateRefund(
                order_id=payment.order_id,
                order_create_refund_request=refund_request
            )
            
            payment.status = "REFUNDED"
            payment.save()

            application = payment.application
            application.payment_status = "Refunded"
            application.save()

            return Response({"success": True, "message": "Refund initiated successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            print("\n========== CASHFREE REFUND ERROR ==========")
            print(str(e))
            if hasattr(e, 'body'):
                print(e.body)
            print("===========================================\n")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

from django.db.models import Count
from .models import Application, DeliveryRequest

@api_view(['GET'])
def get_dashboard_stats(request):
    try:
        total_requests = Application.objects.count()
        pending = Application.objects.filter(status='pending').count()
        approved = Application.objects.filter(status='approved').count()
        delivered = DeliveryRequest.objects.filter(status='Delivered').count()

        # Pipeline logic
        pipeline = [
            {"label": "Submitted", "count": total_requests},
            {"label": "Verified", "count": approved},
            {"label": "College", "count": Application.objects.filter(status='college').count()},
            {"label": "Dispatched", "count": DeliveryRequest.objects.count()}
        ]

        # Recent Activity
        recent_apps = Application.objects.order_by('-created_at')[:4]
        recent_activity = [
            {
                "label": f"New Application: {app.fullName}",
                "time": app.created_at.strftime("%Y-%m-%d %H:%M")
            }
            for app in recent_apps
        ]

        data = {
            "stats": {
                "Total Requests": total_requests,
                "Pending": pending,
                "Approved": approved,
                "Delivered": delivered,
            },
            "pipeline": pipeline,
            "recent_activity": recent_activity
        }
        return Response(data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

@api_view(['GET'])
def download_invoice(request, application_id):
    try:
        application = Application.objects.get(id=application_id)
        payment = Payment.objects.filter(application=application, status='PAID').last()
        
        if not payment:
            return Response({"error": "No successful payment found for this application."}, status=status.HTTP_404_NOT_FOUND)

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="Invoice_{application.application_id}.pdf"'

        p = canvas.Canvas(response, pagesize=letter)
        p.setFont("Helvetica-Bold", 16)
        p.drawString(100, 750, "100 Transcripts - Invoice")
        
        p.setFont("Helvetica", 12)
        p.drawString(100, 720, f"Application ID: {application.application_id}")
        p.drawString(100, 700, f"Name: {application.fullName}")
        p.drawString(100, 680, f"Email: {application.email}")
        p.drawString(100, 660, f"Requirement: {application.requirement}")
        
        p.drawString(100, 620, f"Order ID: {payment.order_id}")
        p.drawString(100, 600, f"Amount Paid: {payment.currency} {payment.amount}")
        p.drawString(100, 580, f"Payment Status: {payment.status}")
        p.drawString(100, 560, f"Date: {payment.updated_at.strftime('%Y-%m-%d %H:%M:%S')}")

        p.showPage()
        p.save()
        return response

    except Application.DoesNotExist:
        return Response({"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND)

