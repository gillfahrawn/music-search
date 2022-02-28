from rest_framework import serializers 
from mus_search.models import Music_Entry
 
 
class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Music_Entry
        fields = ('id',
                  'artistName',
                  'collectionName',
                  'collectionPrice',
                  'kind',
                  'previewUrl',
                  'artworkUrl100',
                  'trackId',
                  'country',
                  'primaryGenreName')




#Want these columns:
# "artistName"
# "collectionName"
# "collectionPrice"
# "kind"
# "previewUrl"
# "artworkUrl100"
# "trackId"
# "country"
# "primaryGenreName"