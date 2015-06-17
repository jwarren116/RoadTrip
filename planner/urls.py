from django.conf.urls import patterns, url


urlpatterns = patterns('',
    url(r'^$', 'planner.views.index', name='index'),
)