from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0037_add_logistics_fields'),
    ]

    operations = [
        migrations.CreateModel(
            name='UniversityVisitRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('visit_date', models.DateField(blank=True, null=True)),
                ('visit_time', models.TimeField(blank=True, null=True)),
                ('department', models.CharField(blank=True, default='', max_length=255)),
                ('officer_name', models.CharField(blank=True, default='', max_length=255)),
                ('university_reference_number', models.CharField(blank=True, default='', max_length=255)),
                ('remarks', models.TextField(blank=True, default='')),
                ('university_fee_paid', models.BooleanField(default=False)),
                ('university_fee_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('chk_verified_student_info', models.BooleanField(default=False)),
                ('chk_submitted_application', models.BooleanField(default=False)),
                ('chk_verified_documents', models.BooleanField(default=False)),
                ('chk_met_officials', models.BooleanField(default=False)),
                ('chk_submitted_forms', models.BooleanField(default=False)),
                ('chk_paid_fees', models.BooleanField(default=False)),
                ('chk_recorded_reference_number', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('assignment', models.OneToOneField(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='visit_record',
                    to='App.agentassignment',
                )),
            ],
        ),
        migrations.CreateModel(
            name='UniversityVisitPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.FileField(upload_to='visit_photos/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('visit', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='photos',
                    to='App.universityvisitrecord',
                )),
            ],
        ),
    ]
