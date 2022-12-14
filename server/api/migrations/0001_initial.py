# Generated by Django 4.1.3 on 2022-12-02 13:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Package',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('promo', models.TextField()),
                ('price', models.FloatField()),
                ('rating', models.CharField(max_length=50)),
                ('tour_length', models.IntegerField()),
                ('start', models.DateField(default=django.utils.timezone.now)),
                ('thumbnail_url', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='WishlistItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_id', models.CharField(max_length=32)),
                ('added_to_cart', models.BooleanField(default=False)),
                ('package', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.package')),
            ],
        ),
        migrations.CreateModel(
            name='PackagePermission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_owner', models.BooleanField(default=True)),
                ('package', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.package')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email_address', models.CharField(max_length=200)),
                ('street_address', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('package', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.package')),
            ],
        ),
        migrations.AddConstraint(
            model_name='packagepermission',
            constraint=models.UniqueConstraint(fields=('user', 'package'), name='unique_owner'),
        ),
    ]
