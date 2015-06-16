# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0003_auto_20150614_2058'),
    ]

    operations = [
        migrations.AlterField(
            model_name='waypoint',
            name='route',
            field=models.ForeignKey(related_name=b'waypoints', to='planner.Route'),
        ),
    ]
