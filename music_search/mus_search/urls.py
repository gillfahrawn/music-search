from django.urls import include, re_path
from mus_search import views as vue_views

urlpatterns = [
    re_path(r'^api/entries$', vue_views.entry_list),
    re_path(r'^api/entries/(?P<pk>[0-9]+)$', vue_views.entry_detail),
    re_path(r'^api/entries/published$', vue_views.entry_list_published)
]
