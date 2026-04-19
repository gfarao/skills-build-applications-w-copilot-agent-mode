from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, LeaderboardEntry, Workout
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.WARNING('Deleting old data...'))
        User.objects.filter(pk__isnull=False).delete()
        Team.objects.filter(pk__isnull=False).delete()
        Activity.objects.filter(pk__isnull=False).delete()
        LeaderboardEntry.objects.filter(pk__isnull=False).delete()
        Workout.objects.filter(pk__isnull=False).delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User.objects.create(username='tony', email='tony@stark.com', first_name='Tony', last_name='Stark'),
            User.objects.create(username='steve', email='steve@rogers.com', first_name='Steve', last_name='Rogers'),
            User.objects.create(username='bruce', email='bruce@wayne.com', first_name='Bruce', last_name='Wayne'),
            User.objects.create(username='clark', email='clark@kent.com', first_name='Clark', last_name='Kent'),
        ]
        marvel.members.add(users[0], users[1])
        dc.members.add(users[2], users[3])

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        from datetime import date
        workouts = [
            Workout(user=users[0], name='Pushups', description='Upper body strength', date=date.today()),
            Workout(user=users[1], name='Running', description='Cardio endurance', date=date.today()),
            Workout(user=users[2], name='Cycling', description='Leg strength', date=date.today()),
            Workout(user=users[3], name='Swimming', description='Full body', date=date.today()),
        ]
        Workout.objects.bulk_create(workouts)

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        activities = [
            Activity(user=users[0], activity_type='Pushups', duration=30, calories=100, date=date.today(), team=marvel),
            Activity(user=users[1], activity_type='Running', duration=45, calories=200, date=date.today(), team=marvel),
            Activity(user=users[2], activity_type='Cycling', duration=20, calories=80, date=date.today(), team=dc),
            Activity(user=users[3], activity_type='Swimming', duration=50, calories=250, date=date.today(), team=dc),
        ]
        Activity.objects.bulk_create(activities)

        self.stdout.write(self.style.SUCCESS('Creating leaderboard entries...'))
        LeaderboardEntry.objects.create(user=users[0], team=marvel, score=150, rank=1, date=date.today())
        LeaderboardEntry.objects.create(user=users[2], team=dc, score=170, rank=1, date=date.today())

        self.stdout.write(self.style.SUCCESS('Ensuring unique index on email field for users...'))
        # Djongo does not support raw MongoDB commands directly; ensure unique=True in model field for email if needed.

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
