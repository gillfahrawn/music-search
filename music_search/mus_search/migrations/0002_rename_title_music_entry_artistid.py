# Generated by Django 4.0.2 on 2022-02-28 14:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mus_search', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='music_entry',
            old_name='title',
            new_name='artistId',
        ),
    ]
