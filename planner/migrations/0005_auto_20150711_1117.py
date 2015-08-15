# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0004_auto_20150616_1926'),
    ]

    operations = [
        migrations.RenameField(
            model_name='route',
            old_name='destination',
            new_name='end',
        ),
        migrations.RenameField(
            model_name='route',
            old_name='origin',
            new_name='start',
        ),
    ]
