# Generated by Django 3.1.3 on 2021-01-26 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('front', '0003_measures_measuresvalues'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Measures',
            new_name='Measure',
        ),
        migrations.RenameModel(
            old_name='MeasuresValues',
            new_name='MeasureValue',
        ),
    ]