from django.db import models


# RoadTrip model
# Start and end dates, Route and TripDetails
class RoadTrip(models.Model):
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()


# Route model
# Start and end locations with additional stop-overs
class Route(models.Model):
    origin = models.CharField(max_length=63)
    destination = models.CharField(max_length=63)


class Waypoint(models.Model):
    waypoint = models.CharField(max_length=63)
    route = models.ForeignKey(Route)


# TripDetail model
# Additional trip details, such as traveling with children or pets
class TripDetail(models.Model):
    detail = models.CharField(max_length=127)
