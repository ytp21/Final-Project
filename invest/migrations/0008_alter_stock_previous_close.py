# Generated by Django 3.2 on 2021-09-08 01:54

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invest', '0007_auto_20210908_0953'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stock',
            name='previous_close',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20, null=True, validators=[django.core.validators.MinValueValidator('0')]),
        ),
    ]