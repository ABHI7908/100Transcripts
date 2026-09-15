from django.db import models

class ImageUpload(models.Model):
    image = models.ImageField(upload_to='compressed/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.image.name

from django.db import models

class Users(models.Model):
   
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=10)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email
    
class Admin(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.TextField()
     
    def __str__(self):
        return self.email
from django.db import models

class College(models.Model):
    REG_TYPE_CHOICES = [
        ('Private', 'Private'),
        ('Government', 'Government'),
        ('Autonomous', 'Autonomous'),
        ('University', 'University'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    location = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    pincode = models.CharField(max_length=10)
    regType = models.CharField(max_length=20, choices=REG_TYPE_CHOICES)
    

    def __str__(self):
        return self.name


from django.db import models

class Application(models.Model):
    STATUS_CHOICES = [
        ('pending_approval', 'Pending Approval'),
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('changes_requested', 'Changes Requested'),
        ('completed', 'Completed'),
    ]
    fullName = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    altPhone = models.CharField(max_length=15)
    payment_status = models.CharField(max_length=20, default="Unpaid")
    service_fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    requirement = models.CharField(max_length=50)
    referenceNumber = models.CharField(max_length=100, blank=True, null=True)

    termsAccepted = models.BooleanField(default=False)
    specialCondition = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    application_id = models.CharField(max_length=100, unique=True, null=True, blank=True, editable=False)
    tracking_id = models.CharField(max_length=100, unique=True, null=True, blank=True)
    admin_message = models.TextField(null=True, blank=True)
    rejection_reason = models.TextField(null=True, blank=True)
    agent = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending_approval'
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._original_status = getattr(self, 'status', None)

    def save(self, *args, **kwargs):
        is_status_changed = False
        old_status = getattr(self, '_original_status', None)
        new_status = getattr(self, 'status', None)
        
        # Only trigger if the application already exists (has pk) and status actually changed
        if self.pk and old_status != new_status:
            is_status_changed = True

        # Save to generate self.id if it's a new record
        super().save(*args, **kwargs)

        # Generate a permanent application_id on first creation if not exists
        if not self.application_id and self.id:
            # Simple sequential ID starting from 101 (if self.id starts at 1)
            self.application_id = str(self.id + 100)
            # Call super().save again to update just this field without triggering full save logic again
            super().save(update_fields=['application_id'])
        
        if is_status_changed:
            from .utils import send_interakt_template
            # Send WhatsApp template based on new status
            if new_status == "pending_approval":
                send_interakt_template(
                    phone_number=self.phone,
                    template_name="request_pending",
                    variables=[self.fullName, self.application_id or str(self.id)],
                    application_id=self.application_id,
                    customer_name=self.fullName,
                    status=new_status
                )
            elif new_status == "approved":
                send_interakt_template(
                    phone_number=self.phone,
                    template_name="request_approved",
                    variables=[self.fullName, self.application_id],
                    application_id=self.application_id,
                    customer_name=self.fullName,
                    status=new_status
                )
            elif new_status == "rejected":
                send_interakt_template(
                    phone_number=self.phone,
                    template_name="request_rejected",
                    variables=[self.fullName, self.application_id, self.rejection_reason or ""],
                    application_id=self.application_id,
                    customer_name=self.fullName,
                    status=new_status
                )
            elif new_status == "changes_requested":
                send_interakt_template(
                    phone_number=self.phone,
                    template_name="request_rejected", # Reusing rejection template or similar since no specific template exists, or fallback
                    variables=[self.fullName, self.application_id, getattr(self, 'admin_message', "Please review your application and update the necessary details.")],
                    application_id=self.application_id,
                    customer_name=self.fullName,
                    status=new_status
                )
            # Update internal state so it doesn't trigger again on subsequent saves
            self._original_status = new_status

    def __str__(self):
        return self.fullName


class Degree(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name="degrees")
    type = models.CharField(max_length=100, blank=True, null=True)
    university = models.CharField(max_length=255)
    course = models.CharField(max_length=255, blank=True, null=True)
    college = models.CharField(max_length=255)

    def __str__(self):
        return self.university


class Document(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, related_name="documents")
    doc_type = models.CharField(max_length=100)  # cmm / degree / internship
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to="documents/")

    def __str__(self):
        return self.name

class Certificate(models.Model):
    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE,
        related_name="certificates"
    )

    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.name} - {self.college.name}"
    


class Payment(models.Model):
    application = models.ForeignKey(
        "Application",
        on_delete=models.CASCADE,
        related_name="payments"
    )

    order_id = models.CharField(max_length=255, unique=True)
    payment_session_id = models.CharField(max_length=255, blank=True, null=True)
    cf_payment_id = models.CharField(max_length=255, blank=True, null=True)

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="INR")

    status = models.CharField(max_length=50, default="PENDING")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order_id




import uuid
from datetime import timedelta
from django.utils import timezone

class PasswordResetToken(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, blank=True)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE, null=True, blank=True)
    token = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(hours=1)
        super().save(*args, **kwargs)

    def is_valid(self):
        return not self.is_used and timezone.now() < self.expires_at

    def __str__(self):
        return f"{self.token} - Used: {self.is_used}"



from django.db import models

class Review(models.Model):
    name = models.CharField(max_length=100)
    rating = models.IntegerField()
    review = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


from django.db import models

class DeliveryRequest(models.Model):
    tracking_id = models.CharField(max_length=100, unique=True)
    student = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    item = models.CharField(max_length=255)

    courier_partner = models.CharField(max_length=100)
    current_location = models.CharField(max_length=255)

    status = models.CharField(
        max_length=50,
        default="In Transit"
    )

    est_delivery = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.tracking_id


# ─────────────────────────────────────────────────────────────
# AGENT PROCESSING MODULE
# ─────────────────────────────────────────────────────────────

class Agent(models.Model):
    """Field agent who processes certificate applications on-ground."""
    name = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=100, unique=True)
    mobile = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    location = models.CharField(max_length=255, blank=True, default='')
    experience = models.PositiveIntegerField(default=0, help_text='Years of experience')
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def current_workload(self):
        """Count of active (non-completed, non-rejected) assignments."""
        return self.assignments.exclude(
            status__in=['COMPLETED', 'REJECTED_BY_AGENT']
        ).count()

    def __str__(self):
        return f"{self.name} ({self.employee_id})"


class TrackingHistory(models.Model):
    application = models.ForeignKey(
        Application,
        on_delete=models.CASCADE,
        related_name='tracking_history'
    )
    status = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.application.application_id} - {self.status}"

class AgentAssignment(models.Model):
    """Tracks an agent's assignment and progress on a single application."""
    AGENT_STATUS_CHOICES = [
        ('ASSIGNED_TO_AGENT', 'Assigned to Agent'),
        ('ACCEPTED', 'Accepted by Agent'),
        ('IN_PROGRESS', 'In Progress'),
        ('DOCUMENTS_COLLECTED', 'Documents Collected'),
        ('SUBMITTED_TO_UNIVERSITY', 'Submitted to University'),
        ('APPROVED', 'Approved by University'),
        ('REJECTED_BY_UNIVERSITY', 'Rejected by University'),
        ('ADDITIONAL_DOC_REQUIRED', 'Additional Documents Required'),
        ('COMPLETED', 'Completed'),
        ('REJECTED_BY_AGENT', 'Rejected by Agent'),
        # New Delivery Stages
        ('DELIVERY_ASSIGNED', 'Delivery Agent Assigned'),
        ('PICKED_UP', 'Picked Up by Delivery Agent'),
        ('OUT_FOR_DELIVERY', 'Out for Delivery'),
        ('DELIVERED', 'Delivered Successfully'),
    ]

    application = models.OneToOneField(
        Application,
        on_delete=models.CASCADE,
        related_name='agent_assignment'
    )
    agent = models.ForeignKey(
        Agent,
        on_delete=models.SET_NULL,
        null=True,
        related_name='assignments'
    )
    status = models.CharField(
        max_length=30,
        choices=AGENT_STATUS_CHOICES,
        default='ASSIGNED_TO_AGENT'
    )
    assigned_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    agent_rejection_reason = models.TextField(null=True, blank=True)
    progress_note = models.TextField(null=True, blank=True)
    admin_notified_rejection = models.BooleanField(default=False)

    # ── Phase 6: Logistics & Document ──
    collected_document_url = models.URLField(null=True, blank=True, help_text="Scanned copy uploaded by agent")
    courier_partner = models.CharField(
        max_length=50, null=True, blank=True,
        choices=[
            ('Shiprocket', 'Shiprocket'),
            ('Delhivery', 'Delhivery'),
            ('BlueDart', 'BlueDart'),
            ('Other', 'Other'),
        ]
    )
    tracking_id = models.CharField(max_length=100, null=True, blank=True)
    tracking_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return f"Assignment: {self.application} → {self.agent} [{self.status}]"


# ─────────────────────────────────────────────────────────────
# PHASE 6: UNIVERSITY VISIT RECORD
# ─────────────────────────────────────────────────────────────

class UniversityVisitRecord(models.Model):
    """Stores the full university visit details recorded by the field agent."""
    assignment = models.OneToOneField(
        AgentAssignment,
        on_delete=models.CASCADE,
        related_name='visit_record'
    )

    # Visit Details
    visit_date = models.DateField(null=True, blank=True)
    visit_time = models.TimeField(null=True, blank=True)
    department = models.CharField(max_length=255, blank=True, default='')
    officer_name = models.CharField(max_length=255, blank=True, default='')
    university_reference_number = models.CharField(max_length=255, blank=True, default='')
    remarks = models.TextField(blank=True, default='')

    # University Fees
    university_fee_paid = models.BooleanField(default=False)
    university_fee_amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    # ── Verification Checklist (7 items) ──
    chk_verified_student_info = models.BooleanField(default=False)
    chk_submitted_application = models.BooleanField(default=False)
    chk_verified_documents = models.BooleanField(default=False)
    chk_met_officials = models.BooleanField(default=False)
    chk_submitted_forms = models.BooleanField(default=False)
    chk_paid_fees = models.BooleanField(default=False)
    chk_recorded_reference_number = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Visit: {self.assignment} on {self.visit_date}"


class UniversityVisitPhoto(models.Model):
    """Stores optional photos uploaded during a university visit."""
    visit = models.ForeignKey(
        UniversityVisitRecord,
        on_delete=models.CASCADE,
        related_name='photos'
    )
    photo = models.FileField(upload_to='visit_photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Photo for visit {self.visit_id}"


# ─────────────────────────────────────────────────────────────
# PHASE 7: UNIVERSITY DECISION RECORD
# ─────────────────────────────────────────────────────────────

class UniversityDecisionRecord(models.Model):
    DECISION_CHOICES = [
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('ADDITIONAL_DOCS', 'Additional Documents Required'),
    ]

    REJECTION_REASONS = [
        ('Student Record Not Found', 'Student Record Not Found'),
        ('Incomplete Documents', 'Incomplete Documents'),
        ('Name Mismatch', 'Name Mismatch'),
        ('Pending University Fees', 'Pending University Fees'),
        ('Authorization Letter Missing', 'Authorization Letter Missing'),
        ('Duplicate Request', 'Duplicate Request'),
        ('University Policy Restriction', 'University Policy Restriction'),
        ('Other', 'Other'),
    ]

    assignment = models.OneToOneField(
        AgentAssignment,
        on_delete=models.CASCADE,
        related_name='decision_record'
    )
    decision = models.CharField(max_length=20, choices=DECISION_CHOICES)
    officer_name = models.CharField(max_length=255, blank=True, default='')
    remarks = models.TextField(blank=True, default='')

    # If REJECTED
    rejection_reason = models.CharField(max_length=100, choices=REJECTION_REASONS, null=True, blank=True)
    rejection_letter = models.FileField(upload_to='rejection_letters/', null=True, blank=True)

    # If ADDITIONAL_DOCS
    required_documents = models.TextField(null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)

    # If APPROVED
    university_reference_number = models.CharField(max_length=255, null=True, blank=True)
    acceptance_date = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Decision: {self.decision} for {self.assignment}"
