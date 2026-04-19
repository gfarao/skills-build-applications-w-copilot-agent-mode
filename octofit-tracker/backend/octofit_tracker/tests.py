from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from .models import User, Team, Activity, Workout, LeaderboardEntry

class BasicApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.team = Team.objects.create(name='Test Team')
        self.team.members.add(self.user)
        self.activity = Activity.objects.create(user=self.user, activity_type='run', duration=30, calories=200, date='2024-01-01', team=self.team)
        self.workout = Workout.objects.create(user=self.user, name='Pushups', description='Pushups workout', date='2024-01-01')
        self.leaderboard = LeaderboardEntry.objects.create(user=self.user, team=self.team, score=100, rank=1, date='2024-01-01')

    def test_api_root(self):
        response = self.client.get(reverse('api-root'))
        self.assertEqual(response.status_code, 200)

    def test_users_list(self):
        response = self.client.get('/users/')
        self.assertEqual(response.status_code, 200)

    def test_teams_list(self):
        response = self.client.get('/teams/')
        self.assertEqual(response.status_code, 200)

    def test_activities_list(self):
        response = self.client.get('/activities/')
        self.assertEqual(response.status_code, 200)

    def test_workouts_list(self):
        response = self.client.get('/workouts/')
        self.assertEqual(response.status_code, 200)

    def test_leaderboard_list(self):
        response = self.client.get('/leaderboard/')
        self.assertEqual(response.status_code, 200)
