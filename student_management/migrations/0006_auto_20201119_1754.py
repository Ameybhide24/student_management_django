# Generated by Django 3.1.3 on 2020-11-19 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student_management', '0005_auto_20201119_1711'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
