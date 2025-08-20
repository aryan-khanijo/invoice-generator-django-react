from django.urls import path
from . import views

app_name = 'invoices'

urlpatterns = [
    path('', views.InvoiceListCreateView.as_view(), name='invoice-list-create'),
    path('<int:pk>/', views.InvoiceRetrieveUpdateDestroyView.as_view(), name='invoice-detail'),
    path('<int:pk>/pdf/', views.InvoicePDFView.as_view(), name='invoice-pdf'),
]
