from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0040_university_decision_record'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='service_fee',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
