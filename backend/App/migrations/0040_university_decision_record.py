from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0039_merge_20260721_1314'),
    ]

    operations = [
        migrations.CreateModel(
            name='UniversityDecisionRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('decision', models.CharField(choices=[('APPROVED', 'Approved'), ('REJECTED', 'Rejected'), ('ADDITIONAL_DOCS', 'Additional Documents Required')], max_length=20)),
                ('officer_name', models.CharField(blank=True, default='', max_length=255)),
                ('remarks', models.TextField(blank=True, default='')),
                ('rejection_reason', models.CharField(blank=True, choices=[('Student Record Not Found', 'Student Record Not Found'), ('Incomplete Documents', 'Incomplete Documents'), ('Name Mismatch', 'Name Mismatch'), ('Pending University Fees', 'Pending University Fees'), ('Authorization Letter Missing', 'Authorization Letter Missing'), ('Duplicate Request', 'Duplicate Request'), ('University Policy Restriction', 'University Policy Restriction'), ('Other', 'Other')], max_length=100, null=True)),
                ('rejection_letter', models.FileField(blank=True, null=True, upload_to='rejection_letters/')),
                ('required_documents', models.TextField(blank=True, null=True)),
                ('deadline', models.DateField(blank=True, null=True)),
                ('university_reference_number', models.CharField(blank=True, max_length=255, null=True)),
                ('acceptance_date', models.DateField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('assignment', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='decision_record', to='App.agentassignment')),
            ],
        ),
    ]
