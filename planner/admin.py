from django.contrib import admin

from planner.models import Route, Waypoint, RoadTrip, TripDetail


class RoadTripAdmin(admin.ModelAdmin):
    model = RoadTrip
    list_display = ('route', 'start_date', 'end_date',)


class WaypointInline(admin.StackedInline):
    model = Waypoint
    extra = 1


class RouteAdmin(admin.ModelAdmin):
    model = Route
    inlines = [WaypointInline]
    list_display = ('origin', 'destination',)


# admin.site.register(Route, RouteAdmin)
admin.site.register(RoadTrip, RoadTripAdmin)
