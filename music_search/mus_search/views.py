from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from mus_search.models import Music_Entry
from mus_search.serializers import EntrySerializer
from rest_framework.decorators import api_view


def test_vue(request):
    return render(request, 'vue_app/index.html')


# 'safe=False' for objects serialization
# GET list of tutorials, POST a new tutorial, DELETE all tutorials
@api_view(['GET', 'POST', 'DELETE'])
def tutorial_list(request):
    if request.method == 'GET':
        entries = Music_Entry.objects.all()
        
        title = request.GET.get('title', None)
        if title is not None:
            entries = entries.filter(title__icontains=title)
        
        entries_serializer = EntrySerializer(entries, many=True)
        return JsonResponse(entries_serializer.data, safe=False)
        
    elif request.method == 'POST':
        entry_data = JSONParser().parse(request)
        entry_serializer = EntrySerializer(data=entry_data)
        if entry_serializer.is_valid():
            entry_serializer.save()
            return JsonResponse(entry_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(entry_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        count = Music_Entry.objects.all().delete()
        return JsonResponse({'message': '{} Music Entries were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

 
 
@api_view(['GET', 'PUT', 'DELETE'])
def tutorial_detail(request, pk):
    # find tutorial by pk (id)
    try: 
        entry = Music_Entry.objects.get(pk=pk) 
    except Music_Entry.DoesNotExist: 
        return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        entry_serializer = EntrySerializer(entry) 
        return JsonResponse(entry_serializer.data) 
    
    elif request.method == 'PUT': 
        entry_data = JSONParser().parse(request) 
        entry_serializer = EntrySerializer(entry, data=entry_data) 
        if entry_serializer.is_valid(): 
            entry_serializer.save() 
            return JsonResponse(entry_serializer.data) 
        return JsonResponse(entry_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        entry.delete() 
        return JsonResponse({'message': 'Music Entry was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    # GET / PUT / DELETE tutorial
    
        
@api_view(['GET'])
def tutorial_list_published(request):
    entries = Music_Entry.objects.filter(published=True)

    if request.method == 'GET': 
        entries_serializer = EntrySerializer(entries, many=True)
        return JsonResponse(entries_serializer.data, safe=False)