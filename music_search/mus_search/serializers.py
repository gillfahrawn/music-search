from rest_framework import serializers 
from mus_search.models import Music_Entry
 
 
class EntrySerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Music_Entry
        fields = ('id',
                  'title',
                  'description',
                  'published')