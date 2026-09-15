"""
views_agent.py — Agent Processing Module
All agent-related views are isolated here to avoid touching existing views.py
"""
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Agent, AgentAssignment, Application, UniversityVisitRecord, UniversityVisitPhoto, UniversityDecisionRecord


# ─────────────────────────────────────────────────────────────
# HELPERS
# ─────────────────────────────────────────────────────────────

def agent_to_dict(agent):
    return {
        "id": agent.id,
        "name": agent.name,
        "employee_id": agent.employee_id,
        "mobile": agent.mobile,
        "email": agent.email,
        "is_active": agent.is_active,
        "location": agent.location,
        "experience": agent.experience,
        "current_workload": agent.current_workload,
        "created_at": agent.created_at.isoformat(),
    }


def assignment_to_dict(assignment):
    app = assignment.application
    agent = assignment.agent
    first_degree = app.degrees.first()
    university = first_degree.university if first_degree else "N/A"
    from datetime import timedelta
    docs = app.documents.all()
    documents_list = [{"id": d.id, "name": d.name, "url": d.file.url if d.file else ""} for d in docs]
    expected_completion = (assignment.assigned_at + timedelta(days=14)).isoformat() if assignment.assigned_at else None

    return {
        "id": assignment.id,
        "application_id": app.id,
        "application_display_id": f"REQ-{app.id:03}",
        "applicant_name": app.fullName,
        "phone": app.phone,
        "email": app.email,
        "requirement": app.requirement,
        "university": university,
        "college": first_degree.college if first_degree else "N/A",
        "degree_type": first_degree.type if first_degree else "N/A",
        "course": first_degree.course if first_degree else "N/A",
        "app_status": app.status,
        "payment_status": app.payment_status,
        "admin_message": app.admin_message,
        "documents": documents_list,
        "expected_completion_date": expected_completion,
        "agent": agent_to_dict(agent) if agent else None,
        "status": assignment.status,
        "assigned_at": assignment.assigned_at.isoformat() if assignment.assigned_at else None,
        "accepted_at": assignment.accepted_at.isoformat() if assignment.accepted_at else None,
        "completed_at": assignment.completed_at.isoformat() if assignment.completed_at else None,
        "agent_rejection_reason": assignment.agent_rejection_reason,
        "progress_note": assignment.progress_note,
        # Phase 6 logistics
        "collected_document_url": assignment.collected_document_url,
        "courier_partner": assignment.courier_partner,
        "tracking_id": assignment.tracking_id,
        "tracking_url": assignment.tracking_url,
        # Phase 6 visit record
        "visit_record": _visit_to_dict(assignment) if hasattr(assignment, 'visit_record') else None,
        # Phase 7 decision record
        "decision_record": _decision_to_dict(assignment) if hasattr(assignment, 'decision_record') else None,
    }


def get_agent_from_request(request):
    """Simple session-like check — agent_id in POST body or header."""
    agent_id = request.headers.get("X-Agent-ID") or request.POST.get("agent_id")
    if agent_id:
        try:
            return Agent.objects.get(id=int(agent_id), is_active=True)
        except Agent.DoesNotExist:
            return None
    return None


# ─────────────────────────────────────────────────────────────
# AGENT LOGIN
# ─────────────────────────────────────────────────────────────

@csrf_exempt
def agent_login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body)
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        agent = Agent.objects.filter(email=email).first()
        if not agent:
            return JsonResponse({"error": "Agent not found"}, status=404)
        if not agent.is_active:
            return JsonResponse({"error": "Your account is deactivated. Contact admin."}, status=403)
        if agent.password != password:
            return JsonResponse({"error": "Invalid password"}, status=401)

        return JsonResponse({
            "message": "Login successful",
            "type": "agent",
            "data": {
                "id": agent.id,
                "name": agent.name,
                "email": agent.email,
                "employee_id": agent.employee_id,
                "location": agent.location,
            }
        }, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ─────────────────────────────────────────────────────────────
# ADMIN — AGENT CRUD
# ─────────────────────────────────────────────────────────────

@csrf_exempt
def admin_agents_list(request):
    """GET: list all agents | POST: create agent"""
    if request.method == "GET":
        agents = Agent.objects.all().order_by('-created_at')
        return JsonResponse([agent_to_dict(a) for a in agents], safe=False)

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            required = ["name", "employee_id", "mobile", "email", "password"]
            for field in required:
                if not data.get(field):
                    return JsonResponse({"error": f"{field} is required"}, status=400)

            if Agent.objects.filter(employee_id=data["employee_id"]).exists():
                return JsonResponse({"error": "Employee ID already exists"}, status=400)
            if Agent.objects.filter(email=data["email"]).exists():
                return JsonResponse({"error": "Email already registered"}, status=400)

            agent = Agent.objects.create(
                name=data["name"].strip(),
                employee_id=data["employee_id"].strip(),
                mobile=data["mobile"].strip(),
                email=data["email"].strip(),
                password=data["password"],
                is_active=data.get("is_active", True),
                location=data.get("location", "").strip(),
                experience=int(data.get("experience", 0)),
            )
            return JsonResponse(agent_to_dict(agent), status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def admin_agent_detail(request, agent_id):
    """GET / PUT / DELETE single agent"""
    try:
        agent = Agent.objects.get(id=agent_id)
    except Agent.DoesNotExist:
        return JsonResponse({"error": "Agent not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(agent_to_dict(agent))

    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            agent.name = data.get("name", agent.name).strip()
            agent.mobile = data.get("mobile", agent.mobile).strip()
            agent.email = data.get("email", agent.email).strip()
            agent.location = data.get("location", agent.location).strip()
            agent.experience = int(data.get("experience", agent.experience))
            agent.is_active = data.get("is_active", agent.is_active)
            if data.get("password"):
                agent.password = data["password"]
            agent.save()
            return JsonResponse(agent_to_dict(agent))
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    if request.method == "DELETE":
        agent.delete()
        return JsonResponse({"message": "Agent deleted"})

    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def admin_agent_toggle(request, agent_id):
    """Toggle agent active/inactive status."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        agent = Agent.objects.get(id=agent_id)
        agent.is_active = not agent.is_active
        agent.save()
        return JsonResponse({
            "message": f"Agent {'activated' if agent.is_active else 'deactivated'}",
            "is_active": agent.is_active
        })
    except Agent.DoesNotExist:
        return JsonResponse({"error": "Agent not found"}, status=404)


# ─────────────────────────────────────────────────────────────
# ADMIN — AGENT ASSIGNMENT
# ─────────────────────────────────────────────────────────────

@api_view(["GET"])
def admin_eligible_agents(request, app_id):
    """Return active agents for an application, optionally scored by location."""
    try:
        app = Application.objects.get(id=app_id)
    except Application.DoesNotExist:
        return Response({"error": "Application not found"}, status=404)

    agents = Agent.objects.filter(is_active=True)
    result = []
    for a in agents:
        d = agent_to_dict(a)
        # Simple location match score
        d["location_match"] = (
            app.degrees.filter(university__icontains=a.location).exists()
            if a.location else False
        )
        result.append(d)

    # Sort: location match first, then workload asc, then experience desc
    result.sort(key=lambda x: (
        0 if x["location_match"] else 1,
        x["current_workload"],
        -x["experience"]
    ))
    return Response(result)


@csrf_exempt
def admin_assign_agent(request, app_id):
    """Manually assign an agent to an application."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body)
        agent_id = data.get("agent_id")
        if not agent_id:
            return JsonResponse({"error": "agent_id is required"}, status=400)

        app = Application.objects.get(id=app_id)
        agent = Agent.objects.get(id=agent_id, is_active=True)

        from .models import TrackingHistory
        AgentAssignment.objects.filter(application=app).delete()

        assignment = AgentAssignment.objects.create(
            application=app,
            agent=agent,
            status="DELIVERY_ASSIGNED"
        )
        TrackingHistory.objects.create(
            application=app,
            status="DELIVERY_ASSIGNED",
            description=f"Delivery assigned to agent: {agent.name}"
        )

        # Notify agent via WhatsApp
        try:
            from .utils import send_interakt_template
            send_interakt_template(
                phone_number=agent.mobile,
                template_name="agent_assigned",
                variables=[agent.name, app.fullName, f"REQ-{app.id:03}"],
                application_id=app.application_id,
                customer_name=app.fullName,
                status="ASSIGNED_TO_AGENT"
            )
        except Exception:
            pass  # Notification failure should not block assignment

        return JsonResponse({
            "message": "Agent assigned successfully",
            "assignment": assignment_to_dict(assignment)
        }, status=201)

    except Application.DoesNotExist:
        return JsonResponse({"error": "Application not found"}, status=404)
    except Agent.DoesNotExist:
        return JsonResponse({"error": "Agent not found or inactive"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def admin_auto_assign(request, app_id):
    """Auto-assign best agent based on location, workload, experience."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        app = Application.objects.get(id=app_id)
        active_agents = list(Agent.objects.filter(is_active=True))
        if not active_agents:
            return JsonResponse({"error": "No active agents available"}, status=400)

        # Score each agent
        def score(a):
            location_match = 1 if (a.location and app.degrees.filter(
                university__icontains=a.location
            ).exists()) else 0
            return (-location_match, a.current_workload, -a.experience)

        best_agent = min(active_agents, key=score)

        from .models import TrackingHistory
        AgentAssignment.objects.filter(application=app).delete()
        assignment = AgentAssignment.objects.create(
            application=app,
            agent=best_agent,
            status="DELIVERY_ASSIGNED"
        )
        TrackingHistory.objects.create(
            application=app,
            status="DELIVERY_ASSIGNED",
            description=f"Delivery assigned to agent: {best_agent.name}"
        )

        try:
            from .utils import send_interakt_template
            send_interakt_template(
                phone_number=best_agent.mobile,
                template_name="agent_assigned",
                variables=[best_agent.name, app.fullName, f"REQ-{app.id:03}"],
                application_id=app.application_id,
                customer_name=app.fullName,
                status="ASSIGNED_TO_AGENT"
            )
        except Exception:
            pass

        return JsonResponse({
            "message": f"Auto-assigned to {best_agent.name}",
            "assignment": assignment_to_dict(assignment)
        }, status=201)

    except Application.DoesNotExist:
        return JsonResponse({"error": "Application not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@api_view(["GET"])
def admin_all_assignments(request):
    """Admin: list all agent assignments."""
    assignments = AgentAssignment.objects.select_related(
        "application", "agent"
    ).order_by("-assigned_at")
    return Response([assignment_to_dict(a) for a in assignments])


@api_view(["GET"])
def admin_application_assignment(request, app_id):
    """Get the current assignment for a specific application."""
    try:
        assignment = AgentAssignment.objects.get(application_id=app_id)
        return Response(assignment_to_dict(assignment))
    except AgentAssignment.DoesNotExist:
        return Response({"assignment": None})


# ─────────────────────────────────────────────────────────────
# AGENT — THEIR ASSIGNMENTS
# ─────────────────────────────────────────────────────────────

@api_view(["GET"])
def agent_my_assignments(request, agent_id):
    """Agent: get their own assignments only."""
    try:
        agent = Agent.objects.get(id=agent_id, is_active=True)
    except Agent.DoesNotExist:
        return Response({"error": "Agent not found"}, status=404)

    assignments = AgentAssignment.objects.filter(
        agent=agent
    ).select_related("application").order_by("-assigned_at")
    return Response([assignment_to_dict(a) for a in assignments])


@api_view(["GET"])
def agent_assignment_detail(request, agent_id, assignment_id):
    """Agent: get single assignment — only if it belongs to this agent."""
    try:
        assignment = AgentAssignment.objects.get(
            id=assignment_id, agent_id=agent_id
        )
        return Response(assignment_to_dict(assignment))
    except AgentAssignment.DoesNotExist:
        return Response({"error": "Assignment not found or access denied"}, status=404)


@csrf_exempt
def agent_accept_assignment(request, agent_id, assignment_id):
    """Agent accepts an assignment."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        assignment = AgentAssignment.objects.get(
            id=assignment_id, agent_id=agent_id
        )
        if assignment.status != "ASSIGNED_TO_AGENT":
            return JsonResponse(
                {"error": f"Cannot accept from status: {assignment.status}"}, status=400
            )
        assignment.status = "ACCEPTED"
        assignment.accepted_at = timezone.now()
        assignment.save()

        # Notify admin via WhatsApp
        try:
            from .utils import send_interakt_template
            app = assignment.application
            send_interakt_template(
                phone_number=assignment.agent.mobile,
                template_name="agent_accepted",
                variables=[assignment.agent.name, app.fullName, f"REQ-{app.id:03}"],
                application_id=app.application_id,
                customer_name=app.fullName,
                status="ACCEPTED"
            )
        except Exception:
            pass

        return JsonResponse({
            "message": "Assignment accepted",
            "status": assignment.status
        })
    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found or access denied"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def agent_reject_assignment(request, agent_id, assignment_id):
    """Agent rejects an assignment — reason is mandatory."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body)
        reason = (data.get("reason") or "").strip()
        if not reason:
            return JsonResponse({"error": "Rejection reason is required"}, status=400)

        assignment = AgentAssignment.objects.get(
            id=assignment_id, agent_id=agent_id
        )
        if assignment.status not in ["ASSIGNED_TO_AGENT", "ACCEPTED"]:
            return JsonResponse(
                {"error": f"Cannot reject from status: {assignment.status}"}, status=400
            )

        old_agent = assignment.agent
        assignment.status = "REJECTED_BY_AGENT"
        assignment.agent_rejection_reason = reason
        assignment.agent = None  # Unassign so admin can reassign
        assignment.save()

        # Notify admin
        try:
            from .utils import send_interakt_template
            app = assignment.application
            send_interakt_template(
                phone_number=old_agent.mobile,
                template_name="agent_rejected",
                variables=[old_agent.name, app.fullName, f"REQ-{app.id:03}", reason],
                application_id=app.application_id,
                customer_name=app.fullName,
                status="REJECTED_BY_AGENT"
            )
        except Exception:
            pass

        return JsonResponse({
            "message": "Assignment rejected. Admin will reassign.",
            "status": assignment.status
        })
    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found or access denied"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def agent_update_status(request, agent_id, assignment_id):
    """Agent updates their progress status."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)

    VALID_TRANSITIONS = {
        "ACCEPTED": ["IN_PROGRESS"],
        "IN_PROGRESS": ["DOCUMENTS_COLLECTED"],
        "DOCUMENTS_COLLECTED": ["SUBMITTED_TO_UNIVERSITY"],
        "SUBMITTED_TO_UNIVERSITY": ["APPROVED", "REJECTED_BY_UNIVERSITY", "ADDITIONAL_DOC_REQUIRED", "COMPLETED"],
        "ADDITIONAL_DOC_REQUIRED": ["SUBMITTED_TO_UNIVERSITY", "DOCUMENTS_COLLECTED", "IN_PROGRESS"],
        "REJECTED_BY_UNIVERSITY": ["IN_PROGRESS"],
        "APPROVED": ["COMPLETED", "DELIVERY_ASSIGNED"],
        "DELIVERY_ASSIGNED": ["PICKED_UP"],
        "PICKED_UP": ["OUT_FOR_DELIVERY"],
        "OUT_FOR_DELIVERY": ["DELIVERED"],
        "DELIVERED": ["COMPLETED"]
    }

    try:
        data = json.loads(request.body)
        new_status = data.get("status", "").strip()
        note = (data.get("note") or "").strip()

        if not new_status:
            return JsonResponse({"error": "status is required"}, status=400)

        assignment = AgentAssignment.objects.get(
            id=assignment_id, agent_id=agent_id
        )

        allowed = VALID_TRANSITIONS.get(assignment.status, [])
        if new_status not in allowed:
            return JsonResponse({
                "error": f"Cannot move from {assignment.status} to {new_status}. "
                         f"Allowed: {allowed}"
            }, status=400)

        assignment.status = new_status
        if note:
            assignment.progress_note = note
        if new_status == "COMPLETED":
            assignment.completed_at = timezone.now()
        assignment.save()

        app = assignment.application
        if new_status == "REJECTED_BY_UNIVERSITY":
            app.status = "rejected"
            if note:
                app.rejection_reason = note
            app.save()
        elif new_status == "ADDITIONAL_DOC_REQUIRED":
            app.status = "changes_requested"
            if note:
                app.admin_message = note
            app.save()
        elif new_status == "APPROVED":
            app.status = "approved"
            app.save()
        elif new_status == "DELIVERED":
            app.status = "completed"
            app.save()

        # Notify
        try:
            from .utils import send_interakt_template
            send_interakt_template(
                phone_number=assignment.agent.mobile,
                template_name="agent_status_update",
                variables=[assignment.agent.name, app.fullName, new_status],
                application_id=app.application_id,
                customer_name=app.fullName,
                status=new_status
            )
        except Exception:
            pass

        return JsonResponse({
            "message": f"Status updated to {new_status}",
            "status": assignment.status,
            "progress_note": assignment.progress_note
        })
    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found or access denied"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ─────────────────────────────────────────────────────────────
# PHASE 6: UPLOAD COLLECTED DOCUMENT
# ─────────────────────────────────────────────────────────────

@csrf_exempt
def agent_upload_document(request, agent_id, assignment_id):
    """Agent uploads a scanned copy of the collected document."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        assignment = AgentAssignment.objects.get(id=assignment_id, agent_id=agent_id)
        uploaded_file = request.FILES.get("file")
        if not uploaded_file:
            return JsonResponse({"error": "No file uploaded"}, status=400)

        # Save file to Application documents folder
        from django.core.files.storage import default_storage
        from django.core.files.base import ContentFile
        import os
        ext = os.path.splitext(uploaded_file.name)[1]
        path = default_storage.save(
            f"agent_docs/assignment_{assignment_id}{ext}",
            ContentFile(uploaded_file.read())
        )
        file_url = default_storage.url(path)

        assignment.collected_document_url = file_url
        assignment.save()

        return JsonResponse({
            "message": "Document uploaded successfully",
            "collected_document_url": file_url
        })
    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ─────────────────────────────────────────────────────────────
# PHASE 6: ADD LOGISTICS (COURIER + TRACKING ID)
# ─────────────────────────────────────────────────────────────

COURIER_TRACKING_URLS = {
    "Shiprocket": "https://shiprocket.co/tracking/",
    "Delhivery": "https://www.delhivery.com/track/package/",
    "BlueDart": "https://www.bluedart.com/tracking?trackFor=0&trackNo=",
    "Other": "",
}

@csrf_exempt
def agent_add_logistics(request, agent_id, assignment_id):
    """Agent adds courier partner + tracking ID, moves status to OUT_FOR_DELIVERY."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body)
        courier_partner = data.get("courier_partner", "").strip()
        tracking_id = data.get("tracking_id", "").strip()

        if not courier_partner or not tracking_id:
            return JsonResponse({"error": "courier_partner and tracking_id are required"}, status=400)

        assignment = AgentAssignment.objects.get(id=assignment_id, agent_id=agent_id)

        if assignment.status not in ["APPROVED", "DELIVERY_ASSIGNED", "COMPLETED"]:
            return JsonResponse(
                {"error": f"Cannot add logistics from status: {assignment.status}"}, status=400
            )

        base_url = COURIER_TRACKING_URLS.get(courier_partner, "")
        tracking_url = f"{base_url}{tracking_id}" if base_url else ""

        assignment.courier_partner = courier_partner
        assignment.tracking_id = tracking_id
        assignment.tracking_url = tracking_url
        assignment.status = "OUT_FOR_DELIVERY"
        assignment.save()

        # Sync Application status
        app = assignment.application
        app.status = "out_for_delivery"
        app.save()

        # Notify student
        try:
            from .utils import send_interakt_template
            send_interakt_template(
                phone_number=app.phone,
                template_name="out_for_delivery",
                variables=[app.fullName, courier_partner, tracking_id, tracking_url or "N/A"],
                application_id=app.application_id,
                customer_name=app.fullName,
                status="OUT_FOR_DELIVERY"
            )
        except Exception:
            pass

        return JsonResponse({
            "message": "Logistics added. Status → OUT_FOR_DELIVERY",
            "courier_partner": courier_partner,
            "tracking_id": tracking_id,
            "tracking_url": tracking_url,
            "status": assignment.status
        })
    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ─────────────────────────────────────────────────────────────
# VISIT RECORD HELPER
# ─────────────────────────────────────────────────────────────

def _visit_to_dict(assignment):
    """Return the visit record dict or None if not yet created."""
    try:
        v = assignment.visit_record
        photos = [{"id": p.id, "url": p.photo.url} for p in v.photos.all()]
        return {
            "id": v.id,
            "visit_date": v.visit_date.isoformat() if v.visit_date else None,
            "visit_time": v.visit_time.strftime("%H:%M") if v.visit_time else None,
            "department": v.department,
            "officer_name": v.officer_name,
            "university_reference_number": v.university_reference_number,
            "remarks": v.remarks,
            "university_fee_paid": v.university_fee_paid,
            "university_fee_amount": str(v.university_fee_amount) if v.university_fee_amount else None,
            # Verification checklist
            "chk_verified_student_info": v.chk_verified_student_info,
            "chk_submitted_application": v.chk_submitted_application,
            "chk_verified_documents": v.chk_verified_documents,
            "chk_met_officials": v.chk_met_officials,
            "chk_submitted_forms": v.chk_submitted_forms,
            "chk_paid_fees": v.chk_paid_fees,
            "chk_recorded_reference_number": v.chk_recorded_reference_number,
            "photos": photos,
            "updated_at": v.updated_at.isoformat(),
        }
    except UniversityVisitRecord.DoesNotExist:
        return None


# ─────────────────────────────────────────────────────────────
# PHASE 6: GET VISIT DETAILS
# ─────────────────────────────────────────────────────────────

@csrf_exempt
def agent_get_visit_details(request, agent_id, assignment_id):
    """GET the university visit record for an assignment."""
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        assignment = AgentAssignment.objects.get(id=assignment_id, agent_id=agent_id)
        return JsonResponse({"visit": _visit_to_dict(assignment)})
    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ─────────────────────────────────────────────────────────────
# PHASE 6: SAVE / UPDATE VISIT DETAILS
# ─────────────────────────────────────────────────────────────

@csrf_exempt
def agent_save_visit_details(request, agent_id, assignment_id):
    """POST to create/update the university visit record."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body)
        assignment = AgentAssignment.objects.get(id=assignment_id, agent_id=agent_id)

        visit, created = UniversityVisitRecord.objects.get_or_create(
            assignment=assignment
        )

        # Visit details
        if data.get("visit_date"):
            visit.visit_date = data["visit_date"]
        if data.get("visit_time"):
            visit.visit_time = data["visit_time"]
        visit.department = data.get("department", visit.department)
        visit.officer_name = data.get("officer_name", visit.officer_name)
        visit.university_reference_number = data.get("university_reference_number", visit.university_reference_number)
        visit.remarks = data.get("remarks", visit.remarks)

        # Fee details
        visit.university_fee_paid = data.get("university_fee_paid", visit.university_fee_paid)
        if data.get("university_fee_amount") is not None:
            visit.university_fee_amount = data["university_fee_amount"] or None

        # Verification checklist
        for field in [
            "chk_verified_student_info", "chk_submitted_application",
            "chk_verified_documents", "chk_met_officials",
            "chk_submitted_forms", "chk_paid_fees",
            "chk_recorded_reference_number"
        ]:
            if field in data:
                setattr(visit, field, data[field])

        visit.save()

        # Ensure assignment is IN_PROGRESS
        if assignment.status == "ACCEPTED":
            assignment.status = "IN_PROGRESS"
            assignment.save()
            app = assignment.application
            app.status = "processing"
            app.save()

        # Notify admin
        try:
            from .utils import send_interakt_template
            app = assignment.application
            send_interakt_template(
                phone_number=assignment.agent.mobile if assignment.agent else "",
                template_name="visit_updated",
                variables=[assignment.agent.name if assignment.agent else "", app.fullName, f"REQ-{app.id:03}"],
                application_id=app.application_id,
                customer_name=app.fullName,
                status="IN_PROGRESS"
            )
        except Exception:
            pass

        return JsonResponse({
            "message": "Visit details saved successfully",
            "visit": _visit_to_dict(assignment),
            "created": created
        })
    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ─────────────────────────────────────────────────────────────
# PHASE 6: UPLOAD VISIT PHOTO
# ─────────────────────────────────────────────────────────────

@csrf_exempt
def agent_upload_visit_photo(request, agent_id, assignment_id):
    """POST a photo for the university visit record."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        assignment = AgentAssignment.objects.get(id=assignment_id, agent_id=agent_id)
        photo_file = request.FILES.get("photo")
        if not photo_file:
            return JsonResponse({"error": "No photo file provided"}, status=400)

        visit, _ = UniversityVisitRecord.objects.get_or_create(assignment=assignment)
        visit_photo = UniversityVisitPhoto.objects.create(visit=visit, photo=photo_file)

        return JsonResponse({
            "message": "Photo uploaded",
            "photo_id": visit_photo.id,
            "photo_url": visit_photo.photo.url
        })
    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ─────────────────────────────────────────────────────────────
# PHASE 7: UNIVERSITY DECISION HELPER & VIEW
# ─────────────────────────────────────────────────────────────

def _decision_to_dict(assignment):
    try:
        d = assignment.decision_record
        return {
            "decision": d.decision,
            "officer_name": d.officer_name,
            "remarks": d.remarks,
            "rejection_reason": d.rejection_reason,
            "rejection_letter_url": d.rejection_letter.url if d.rejection_letter else None,
            "required_documents": d.required_documents,
            "deadline": d.deadline.isoformat() if d.deadline else None,
            "university_reference_number": d.university_reference_number,
            "acceptance_date": d.acceptance_date.isoformat() if d.acceptance_date else None,
            "updated_at": d.updated_at.isoformat(),
        }
    except UniversityDecisionRecord.DoesNotExist:
        return None

@csrf_exempt
def agent_submit_university_decision(request, agent_id, assignment_id):
    """POST to create the university decision record and transition state."""
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    
    try:
        assignment = AgentAssignment.objects.get(id=assignment_id, agent_id=agent_id)
        if assignment.status != "SUBMITTED_TO_UNIVERSITY":
            return JsonResponse({"error": f"Cannot submit decision from state {assignment.status}"}, status=400)

        decision_type = request.POST.get("decision")
        if decision_type not in ["APPROVED", "REJECTED", "ADDITIONAL_DOCS"]:
            return JsonResponse({"error": "Invalid decision type"}, status=400)

        # Create or update decision record
        d, created = UniversityDecisionRecord.objects.get_or_create(assignment=assignment)
        d.decision = decision_type
        d.officer_name = request.POST.get("officer_name", d.officer_name)
        d.remarks = request.POST.get("remarks", d.remarks)

        app = assignment.application

        if decision_type == "REJECTED":
            d.rejection_reason = request.POST.get("rejection_reason")
            if "rejection_letter" in request.FILES:
                d.rejection_letter = request.FILES["rejection_letter"]
            assignment.status = "REJECTED_BY_UNIVERSITY"
            app.status = "rejected"
            # In a real system, notify student & admin here

        elif decision_type == "ADDITIONAL_DOCS":
            d.required_documents = request.POST.get("required_documents")
            deadline_str = request.POST.get("deadline")
            if deadline_str:
                d.deadline = deadline_str
            assignment.status = "ADDITIONAL_DOC_REQUIRED"
            app.status = "rejected" # Usually translates to rejected or action_required in main app
            # In a real system, notify student here

        elif decision_type == "APPROVED":
            d.university_reference_number = request.POST.get("university_reference_number")
            acceptance_date_str = request.POST.get("acceptance_date")
            if acceptance_date_str:
                d.acceptance_date = acceptance_date_str
            assignment.status = "APPROVED"
            # Keep app.status processing until delivery

        d.save()
        assignment.save()
        app.save()

        return JsonResponse({
            "message": f"Decision {decision_type} submitted",
            "decision_record": _decision_to_dict(assignment),
            "new_status": assignment.status
        })

    except AgentAssignment.DoesNotExist:
        return JsonResponse({"error": "Assignment not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
