# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tripdetail',
            name='trip',
        ),
        migrations.AddField(
            model_name='roadtrip',
            name='trip',
            field=models.ManyToManyField(to='planner.TripDetail'),
            preserve_default=True,
        ),
    ]
