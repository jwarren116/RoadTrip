from django.contrib import admin

from planner.models import Route, Waypoint, RoadTrip, TripDetail


class WaypointInline(admin.StackedInline):
    model = Waypoint
    extra = 1


class RouteAdmin(admin.ModelAdmin):
    model = Route
    inlines = [WaypointInline]


class RoadTripAdmin(admin.ModelAdmin):
    def route__waypoints(self, obj):
        return obj.route.waypoints.all()

    model = RoadTrip
    list_display = ('route', 'start_date', 'end_date', 'route__waypoints')


class TripDetailAdmin(admin.ModelAdmin):
    model = TripDetail
    list_display = ('destination',)


admin.site.register(Route, RouteAdmin)
admin.site.register(Waypoint)
admin.site.register(TripDetail)
admin.site.register(RoadTrip, RoadTripAdmin)
