from django.db import models

class Music_Entry(models.Model):
    artistName = models.CharField(max_length=70, blank=False, default='')
    collectionName = models.CharField(max_length=70, blank=False, default='')
    collectionPrice = models.CharField(max_length=70, blank=False, default='')
    kind = models.CharField(max_length=70, blank=False, default='')   
    previewUrl = models.CharField(max_length=1000, blank=False, default='')
    artworkUrl100 = models.CharField(max_length=1000, blank=False, default='')
    trackId = models.CharField(max_length=100, blank=False, default='')
    country = models.CharField(max_length=70, blank=False, default='')
    primaryGenreName = models.CharField(max_length=70, blank=False, default='')

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


#Note - All possible columns:
# artistId: (...)
# artistName: (...)
# artistViewUrl: (...)
# artworkUrl30: (...)
# artworkUrl60: (...)
# artworkUrl100: (...)
# collectionCensoredName: (...)
# collectionExplicitness: (...)
# collectionId: (...)
# collectionName: (...)
# collectionPrice: (...)
# collectionViewUrl: (...)
# country: (...)
# currency: (...)
# discCount: (...)
# discNumber: (...)
# isStreamable: (...)
# kind: (...)
# previewUrl: (...)
# primaryGenreName: (...)
# releaseDate: (...)
# trackCensoredName: (...)
# trackCount: (...)
# trackExplicitness: (...)
# trackId: (...)
# trackName: (...)
# trackNumber: (...)
# trackPrice: (...)
# trackTimeMillis: (...)
# trackViewUrl: (...)
# wrapperType: (...)



