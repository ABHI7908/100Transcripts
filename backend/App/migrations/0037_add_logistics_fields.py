from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0036_trackinghistory_remove_universitydecision_assignment_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='agentassignment',
            name='collected_document_url',
            field=models.URLField(
                blank=True, null=True,
                help_text='Scanned copy uploaded by agent'
            ),
        ),
        migrations.AddField(
            model_name='agentassignment',
            name='courier_partner',
            field=models.CharField(
                blank=True, max_length=50, null=True,
                choices=[
                    ('Shiprocket', 'Shiprocket'),
                    ('Delhivery', 'Delhivery'),
                    ('BlueDart', 'BlueDart'),
                    ('Other', 'Other'),
                ]
            ),
        ),
        migrations.AddField(
            model_name='agentassignment',
            name='tracking_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='agentassignment',
            name='tracking_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
