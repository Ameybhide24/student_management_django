# Generated by Django 3.1.3 on 2020-11-18 07:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student_management', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('admin_username', models.CharField(max_length=50)),
                ('admin_password', models.CharField(max_length=50)),
            ],
        ),
    ]
