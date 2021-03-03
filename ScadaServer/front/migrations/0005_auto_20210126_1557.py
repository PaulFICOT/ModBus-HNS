# Generated by Django 3.1.3 on 2021-01-26 15:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('front', '0004_auto_20210126_1505'),
    ]

    operations = [
        migrations.AlterField(
            model_name='measure',
            name='PLC',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='front.plc'),
        ),
        migrations.AlterField(
            model_name='measurevalue',
            name='measure',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='front.measure'),
        ),
    ]
