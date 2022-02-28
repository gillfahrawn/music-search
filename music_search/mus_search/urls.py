from django.urls import include, re_path
from mus_search import views as vue_views

urlpatterns = [
    re_path(r'^api/tutorials$', vue_views.tutorial_list),
    re_path(r'^api/tutorials/(?P<pk>[0-9]+)$', vue_views.tutorial_detail),
    re_path(r'^api/tutorials/published$', vue_views.tutorial_list_published)
]
