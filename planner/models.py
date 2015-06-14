from django.db import models


# Route model
# Start and end locations with additional stop-overs
class Route(models.Model):
    origin = models.CharField(max_length=63)
    destination = models.CharField(max_length=63)

    def __unicode__(self):
        return "{} to {}".format(
            self.origin,
            self.destination
            )


class Waypoint(models.Model):
    waypoint = models.CharField(max_length=63)
    route = models.ForeignKey(Route)

    def __unicode__(self):
        return str(self.waypoint)


# TripDetail model
# Additional trip details, such as traveling with children or pets
class TripDetail(models.Model):
    description = models.CharField(max_length=127)

    def __unicode__(self):
        return str(self.description)


# RoadTrip model
# Start and end dates, Route and TripDetails
class RoadTrip(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    route = models.OneToOneField(Route)
    details = models.ManyToManyField(TripDetail)

    def __unicode__(self):
        return "{} from {} to {}".format(
            self.route,
            self.start_date,
            self.end_date
            )
