# Generated by Django 3.0.14 on 2021-06-04 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0007_add_library_ForeignKey'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='drive_mode',
            field=models.CharField(max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='metering_mode',
            field=models.CharField(max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='photo',
            name='shooting_mode',
            field=models.CharField(max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='phototag',
            name='source',
            field=models.CharField(choices=[('H', 'Human'), ('C', 'Computer')], db_index=True, max_length=1),
        ),
        migrations.AlterField(
            model_name='tag',
            name='source',
            field=models.CharField(choices=[('H', 'Human'), ('C', 'Computer')], db_index=True, max_length=1),
        ),
        migrations.AlterField(
            model_name='tag',
            name='type',
            field=models.CharField(choices=[('L', 'Location'), ('O', 'Object'), ('F', 'Face'), ('C', 'Color'), ('S', 'Style'), ('G', 'Generic'), ('E', 'Event')], db_index=True, max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('P', 'Pending'), ('S', 'Started'), ('C', 'Completed'), ('F', 'Failed')], db_index=True, default='P', max_length=1),
        ),
    ]
