from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Agent, DeliveryPerson, Application
from django.db.models import Q
import json

# Admin: Manage Agents
@api_view(["GET", "POST"])
def manage_agents(request):
    if request.method == "GET":
        agents = Agent.objects.all().order_by("-created_at")
        data = [{"id": a.id, "name": a.name, "employee_id": a.employee_id, "mobile": a.mobile, "email": a.email, "is_active": a.is_active} for a in agents]
        return Response(data)
    elif request.method == "POST":
        data = request.data
        if Agent.objects.filter(email=data.get("email")).exists():
            return Response({"error": "Email already exists"}, status=400)
        if Agent.objects.filter(employee_id=data.get("employee_id")).exists():
            return Response({"error": "Employee ID already exists"}, status=400)
        agent = Agent.objects.create(
            name=data.get("name"),
            employee_id=data.get("employee_id"),
            mobile=data.get("mobile"),
            email=data.get("email"),
            password=data.get("password"),
            is_active=data.get("is_active", True)
        )
        return Response({"success": True, "id": agent.id})

@api_view(["PUT", "DELETE"])
def agent_detail(request, pk):
    try:
        agent = Agent.objects.get(pk=pk)
    except Agent.DoesNotExist:
        return Response({"error": "Not found"}, status=404)
    if request.method == "PUT":
        data = request.data
        agent.name = data.get("name", agent.name)
        agent.mobile = data.get("mobile", agent.mobile)
        if data.get("password"):
            agent.password = data.get("password")
        if "is_active" in data:
            agent.is_active = data.get("is_active")
        agent.save()
        return Response({"success": True})
    elif request.method == "DELETE":
        agent.delete()
        return Response({"success": True})

# Admin: Manage Delivery Staff
@api_view(["GET", "POST"])
def manage_delivery_staff(request):
    if request.method == "GET":
        staff = DeliveryPerson.objects.all().order_by("-created_at")
        data = [{"id": a.id, "name": a.name, "employee_id": a.employee_id, "mobile": a.mobile, "email": a.email, "is_active": a.is_active} for a in staff]
        return Response(data)
    elif request.method == "POST":
        data = request.data
        if DeliveryPerson.objects.filter(email=data.get("email")).exists():
            return Response({"error": "Email already exists"}, status=400)
        if DeliveryPerson.objects.filter(employee_id=data.get("employee_id")).exists():
            return Response({"error": "Employee ID already exists"}, status=400)
        dp = DeliveryPerson.objects.create(
            name=data.get("name"),
            employee_id=data.get("employee_id"),
            mobile=data.get("mobile"),
            email=data.get("email"),
            password=data.get("password"),
            is_active=data.get("is_active", True)
        )
        return Response({"success": True, "id": dp.id})

@api_view(["PUT", "DELETE"])
def delivery_staff_detail(request, pk):
    try:
        dp = DeliveryPerson.objects.get(pk=pk)
    except DeliveryPerson.DoesNotExist:
        return Response({"error": "Not found"}, status=404)
    if request.method == "PUT":
        data = request.data
        dp.name = data.get("name", dp.name)
        dp.mobile = data.get("mobile", dp.mobile)
        if data.get("password"):
            dp.password = data.get("password")
        if "is_active" in data:
            dp.is_active = data.get("is_active")
        dp.save()
        return Response({"success": True})
    elif request.method == "DELETE":
        dp.delete()
        return Response({"success": True})

# Agent Login & Portal
@api_view(["POST"])
def agent_login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    try:
        agent = Agent.objects.get(email=email, password=password, is_active=True)
        return Response({"success": True, "data": {"id": agent.id, "name": agent.name, "email": agent.email, "role": "agent"}})
    except Agent.DoesNotExist:
        return Response({"error": "Invalid credentials or inactive account"}, status=400)

@api_view(["GET"])
def get_agent_applications(request, agent_id):
    apps = Application.objects.filter(assigned_agent_id=agent_id).order_by("-id")
    data = []
    for app in apps:
        dp = app.assigned_delivery_person
        data.append({
            "id": f"REQ-{app.id:03}",
            "raw_id": app.id,
            "fullName": app.fullName,
            "certificate": app.requirement,
            "mobile": app.phone,
            "address": getattr(app, "district", "N/A"),
            "payment_status": app.payment_status,
            "delivery_status": app.delivery_status,
            "assigned_delivery_person": {"id": dp.id, "name": dp.name} if dp else None,
            "created_at": app.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })
    return Response(data)

@api_view(["POST"])
def agent_assign_delivery(request, app_id):
    dp_id = request.data.get("delivery_person_id")
    try:
        app = Application.objects.get(pk=app_id)
        dp = DeliveryPerson.objects.get(pk=dp_id, is_active=True)
        app.assigned_delivery_person = dp
        app.delivery_status = "assigned"
        app.save()
        return Response({"success": True})
    except (Application.DoesNotExist, DeliveryPerson.DoesNotExist):
        return Response({"error": "Invalid application or delivery person"}, status=400)

# Delivery Staff Login & Portal
@api_view(["POST"])
def delivery_login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    try:
        dp = DeliveryPerson.objects.get(email=email, password=password, is_active=True)
        return Response({"success": True, "data": {"id": dp.id, "name": dp.name, "email": dp.email, "role": "delivery"}})
    except DeliveryPerson.DoesNotExist:
        return Response({"error": "Invalid credentials or inactive account"}, status=400)

@api_view(["GET"])
def get_delivery_tasks(request, dp_id):
    apps = Application.objects.filter(assigned_delivery_person_id=dp_id).order_by("-id")
    data = []
    for app in apps:
        data.append({
            "id": f"REQ-{app.id:03}",
            "raw_id": app.id,
            "fullName": app.fullName,
            "certificate": app.requirement,
            "mobile": app.phone,
            "address": getattr(app, "district", "N/A"),
            "delivery_status": app.delivery_status,
            "created_at": app.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })
    return Response(data)

@api_view(["POST"])
def update_delivery_status(request, app_id):
    status = request.data.get("status")
    if status not in ["pending", "assigned", "out_for_delivery", "delivered", "failed"]:
        return Response({"error": "Invalid status"}, status=400)
    try:
        app = Application.objects.get(pk=app_id)
        app.delivery_status = status
        app.save()
        return Response({"success": True})
    except Application.DoesNotExist:
        return Response({"error": "Application not found"}, status=404)
