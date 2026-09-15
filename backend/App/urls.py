from django.urls import path
from . import views
from django.conf import settings
from .views import ReviewListCreateView
from .views import (
    delivery_requests,
    send_courier_email,
)
from .views import (
    CreateCashfreeOrder,
    VerifyPayment,
    PaymentDetail,
    cashfree_webhook,
    RefundPayment,
    get_dashboard_stats
)
from . import views_agent

urlpatterns = [
    # path('upload/', upload_image),
    path('register/', views.register_user),
    path('verify/', views.login_user),

    path("dashboard-stats/", get_dashboard_stats),
    path("contact/", views.contact_api),
    path("add_college/", views.add_college),
    path("allcolleges/", views.get_all_colleges),
    path("submit/", views.submit_application),
    path("applications/", views.get_applications),
    path('application/<int:id>/status/', views.get_app_status),
    path("application-status/", views.get_application_status),
    path("send-notification/", views.send_notification),
    path('update-status/', views.update_status),
    path('application/<int:id>/update-status/', views.update_status),
    path("add_certificate/", views.add_certificate),
    path("colleges/<int:pk>/certificates/", views.get_college_certificates),
    path("certificates/<int:id>/", views.certificate_detail),  # PUT & DELETE
    path('download/<int:id>/', views.download_document),
    path("colleges/", views.get_colleges),
    path("verifications/", views.get_verified_applications, name="get_verifications"),
   
    path("forgot-password/", views.forgot_password, name="forgot_password"),
    path("verify-reset-token/", views.verify_reset_token, name="verify_reset_token"),
    path("reset-password/", views.reset_password, name="reset_password"),
    path('reviews/', ReviewListCreateView.as_view(), name='reviews'),
      path(
        "delivery-requests/",
        delivery_requests,
        name="delivery_requests"
    ),

    path(
        "send-courier-email/",
        send_courier_email,
        name="send_courier_email"
    ),
    path(
    "create-order/<int:application_id>/",
    CreateCashfreeOrder.as_view(),
    name="create-order"
    ),
    path(
        "verify-payment/<str:order_id>/",
        VerifyPayment.as_view(),
        name="verify-payment"
    ),
    path(
        "payment/<int:application_id>/",
        PaymentDetail.as_view(),
        name="payment-detail"
    ),
    path(
        "webhook/",
        cashfree_webhook,
        name="cashfree-webhook"
    ),
    path(
        "refund/",
        RefundPayment.as_view(),
        name="refund-payment"
    ),
    path(
        "payment/<int:application_id>/invoice/",
        views.download_invoice,
        name="download-invoice"
    ),

    # ─────────────────────────────────────────────────────
    # AGENT PROCESSING MODULE — NEW URLS (existing untouched)
    # ─────────────────────────────────────────────────────

    # Agent Auth
    path("agent/login/", views_agent.agent_login, name="agent-login"),

    # Admin — Agent CRUD
    path("admin/agents/", views_agent.admin_agents_list, name="admin-agents-list"),
    path("admin/agents/<int:agent_id>/", views_agent.admin_agent_detail, name="admin-agent-detail"),
    path("admin/agents/<int:agent_id>/toggle/", views_agent.admin_agent_toggle, name="admin-agent-toggle"),

    # Admin — Assignment
    path("admin/applications/<int:app_id>/eligible-agents/", views_agent.admin_eligible_agents, name="admin-eligible-agents"),
    path("admin/applications/<int:app_id>/assign-agent/", views_agent.admin_assign_agent, name="admin-assign-agent"),
    path("admin/applications/<int:app_id>/auto-assign/", views_agent.admin_auto_assign, name="admin-auto-assign"),
    path("admin/applications/<int:app_id>/assignment/", views_agent.admin_application_assignment, name="admin-app-assignment"),
    path("admin/agent-assignments/", views_agent.admin_all_assignments, name="admin-all-assignments"),

    # Agent — Their Assignments
    path("agent/<int:agent_id>/assignments/", views_agent.agent_my_assignments, name="agent-my-assignments"),
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/", views_agent.agent_assignment_detail, name="agent-assignment-detail"),
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/accept/", views_agent.agent_accept_assignment, name="agent-accept"),
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/reject/", views_agent.agent_reject_assignment, name="agent-reject"),
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/update-status/", views_agent.agent_update_status, name="agent-update-status"),
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/upload-document/", views_agent.agent_upload_document, name="agent-upload-document"),
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/add-logistics/", views_agent.agent_add_logistics, name="agent-add-logistics"),
    # Phase 6: University Visit
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/visit/", views_agent.agent_save_visit_details, name="agent-save-visit"),
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/visit/get/", views_agent.agent_get_visit_details, name="agent-get-visit"),
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/visit/photos/", views_agent.agent_upload_visit_photo, name="agent-upload-visit-photo"),
    # Phase 7: University Decision
    path("agent/<int:agent_id>/assignments/<int:assignment_id>/decision/", views_agent.agent_submit_university_decision, name="agent-submit-decision"),
]
