from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import InvoiceSerializer
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

@api_view(['POST'])
def generate_invoice_pdf(request):
    serializer = InvoiceSerializer(data=request.data)
    if serializer.is_valid():
        data = serializer.validated_data

        # PDF Generation
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter

        p.setFont("Helvetica-Bold", 14)
        p.drawString(180, 750, "Professional Service Invoice")

        p.setFont("Helvetica", 10)
        p.drawString(50, 720, f"Invoice Number: {data['invoice_number']}")
        p.drawString(400, 720, f"Date: {data['date'].strftime('%d-%b-%Y')}")

        p.drawString(50, 700, f"From: {data['your_name']}")
        p.drawString(50, 685, data['your_address'])
        p.drawString(50, 670, data['your_contact'])

        p.drawString(50, 650, f"To: {data['client_name']}")
        p.drawString(50, 635, data['client_address'])

        p.drawString(50, 610, "Description of Services:")
        p.drawString(70, 595, data['service_description'])

        p.drawString(50, 570, f"Quantity: {data['quantity']}")
        p.drawString(150, 570, f"Rate: ₹{data['rate']}")
        total = data['quantity'] * data['rate']
        p.drawString(250, 570, f"Total: ₹{total}")

        p.drawString(50, 545, "Payment Terms:")
        p.drawString(70, 530, data['payment_terms'])

        if data.get('bank_details'):
            p.drawString(50, 510, "Bank Details:")
            p.drawString(70, 495, data['bank_details'])

        p.drawString(50, 470, "Note: This invoice does not contain GST.")

        p.showPage()
        p.save()
        buffer.seek(0)

        response = HttpResponse(buffer, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="Invoice_{data["invoice_number"]}.pdf"'
        return response

    return Response(serializer.errors, status=400)

@api_view(['GET'])
def test_api(request):
    return Response({"message": "Invoice API is working!"})
