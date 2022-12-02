from django.shortcuts import render

from django.core.cache import cache
from rest_framework import viewsets
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import BaseFilterBackend, SearchFilter
from rest_framework.permissions import BasePermission

from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

from api.models import Package, PackagePermission, WishlistItem, Booking
from api.serializers import PackageSerializer, BookingSerializer

class PackageCreateView(CreateAPIView):
  queryset = Package.objects.all()
  serializer_class = PackageSerializer

class PackagePagination(PageNumberPagination):
  page_size = 9

class CanWritePackageFilterBackend(BaseFilterBackend):
  def filter_queryset(self, req, queryset, view):
    queryset = self.check_permission(req, queryset, view)
    filters = {}
    tour_length = req.query_params.get('tourLength',None)
    if tour_length:
      filters['tour_length'] = tour_length
    return queryset.filter(**filters).order_by('id')
  def check_permission(self, req, queryset, view):
    if req.user is None:
      return queryset.none()
    if req.user.username == 'admin':
      return queryset
    package_ids = queryset.values_list('id',flat=True)
    own_package_ids = PackagePermission.objects.filter(
      is_owner=True, package__in=package_ids, user=req.user,
    ).values_list('package__id',flat=True)
    return queryset.filter(id__in=own_package_ids)

class PackageViewSet(viewsets.ModelViewSet):
  queryset = Package.objects.all()
  serializer_class = PackageSerializer
  filter_backends = (CanWritePackageFilterBackend,)
  permission_classes = [TokenHasScope, TokenHasReadWriteScope]
  required_scopes = ['packages']

class WishlistItemViewSet(viewsets.ViewSet):
  queryset = WishlistItem.objects.all()
  permission_classes = [BasePermission]
  session_id = 'wishlist-items'

  def update(self, req, pk=None):
    return Response()

  def partial_update(self, req, pk=None):
    try:
      package_id = req.data.pop('id')
      package =Package.objects.get(id=package_id)
      item = self.queryset.get(session_id=self.session_id,package=package)
      for attr in req.data.keys():
        setattr(item, attr, req.data[attr])
      item.save()
      message = 'Item fields {} were updated'.format(','.join(req.data.keys()))
    except WishlistItem.DoesNotExist:
      message = 'Item was not in wishlist'
    return Response(message)

  def list(self,req):
    def get_package_ids():
      queryset = self.queryset.filter(session_id=self.session_id)
      return list(queryset.values_list('package__id',flat=True))
    package_ids = cache.get_or_set(
      'wishlist:{}'.format(self.session_id),
      get_package_ids
    )
    return Response(package_ids)

  def create(self, req):
    package_id = req.data['id']
    package = Package.objects.get(id=package_id)
    self.queryset.get_or_create(session_id=self.session_id,package=package)
    cache.delete('wishlist:{}'.format(self.session_id))
    return Response('Item added to wishlist', status=200)

  def destroy(self, req, pk=None):
    package_id = pk
    item = self.queryset.filter(session_id=self.session_id, package__in=[package_id])
    item.delete()
    cache.delete('wishlist:{}'.formate(self.session_id))
    return Response('Item removed from wishlist',status=200)

  def retrieve(self, req, pk=None):
    return Response()

class PackagePriceFilterBackend(BaseFilterBackend):
  def filter_queryset(self,req,queryset,view):
    filters={}
    price_min = req.query_params.get('price_min',None)
    if price_min:
      filters['price__gte'] = price_min
    price_max = req.query_params.get('price_max',None)
    if price_max:
      filters['price__lte'] = price_max
    return queryset.filter(**filters)

class PublicPackageViewSet(viewsets.ModelViewSet):
  permission_classes = [TokenHasScope]
  required_scopes = ['read']
  queryset = Package.objects.all().order_by('-price')
  serializer_class = PackageSerializer
  pagination_class = PackagePagination
  filter_backends = (PackagePriceFilterBackend, SearchFilter)
  search_fields = ('name','promo')

class BookingViewSet(viewsets.ModelViewSet):
  queryset = Booking.objects.all()
  serializer_class = BookingSerializer
  permission_classes = [BasePermission]
