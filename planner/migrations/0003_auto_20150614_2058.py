# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0002_auto_20150614_2051'),
    ]

    operations = [
        migrations.RenameField(
            model_name='roadtrip',
            old_name='trip',
            new_name='details',
        ),
    ]
