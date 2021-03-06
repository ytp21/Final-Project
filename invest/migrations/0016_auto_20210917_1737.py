# Generated by Django 3.2 on 2021-09-17 09:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invest', '0015_alter_stock_activity'),
    ]

    operations = [
        migrations.AddField(
            model_name='stock',
            name='currency',
            field=models.CharField(blank=True, max_length=25),
        ),
        migrations.AlterField(
            model_name='stock',
            name='activity',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]
