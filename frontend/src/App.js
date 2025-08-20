import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './App.css';

function App() {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    clientName: '',
    clientAddress: '',
    clientCity: '',
    clientState: '',
    clientZip: '',
    items: [{
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    }],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: '',
    paymentTerms: ''
  });

  const [companyInfo, setCompanyInfo] = useState({
    name: 'Your Company Name',
    address: 'Your Address',
    city: 'Your City',
    state: 'Your State',
    zip: 'Your ZIP',
    phone: 'Your Phone',
    email: 'your@email.com'
  });

  const updateInvoiceField = (field, value) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const updateCompanyInfo = (field, value) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setInvoice(prev => ({ ...prev, items: newItems }));
    calculateTotals(newItems);
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, {
        description: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }]
    }));
  };

  const removeItem = (index) => {
    if (invoice.items.length > 1) {
      const newItems = invoice.items.filter((_, i) => i !== index);
      setInvoice(prev => ({ ...prev, items: newItems }));
      calculateTotals(newItems);
    }
  };

  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    setInvoice(prev => ({
      ...prev,
      subtotal: subtotal,
      tax: tax,
      total: total
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('INVOICE', 20, 20);
    
    // Company Info
    doc.setFontSize(12);
    doc.text(companyInfo.name, 20, 35);
    doc.text(companyInfo.address, 20, 42);
    doc.text(`${companyInfo.city}, ${companyInfo.state} ${companyInfo.zip}`, 20, 49);
    doc.text(companyInfo.phone, 20, 56);
    doc.text(companyInfo.email, 20, 63);
    
    // Invoice Details
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 120, 35);
    doc.text(`Date: ${invoice.invoiceDate}`, 120, 42);
    doc.text(`Due Date: ${invoice.dueDate}`, 120, 49);
    
    // Client Info
    doc.setFontSize(14);
    doc.text('Bill To:', 20, 85);
    doc.setFontSize(12);
    doc.text(invoice.clientName, 20, 95);
    doc.text(invoice.clientAddress, 20, 102);
    doc.text(`${invoice.clientCity}, ${invoice.clientState} ${invoice.clientZip}`, 20, 109);
    
    // Items Table Header
    doc.setFontSize(10);
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 125, 170, 8, 'F');
    doc.text('Description', 22, 131);
    doc.text('Qty', 120, 131);
    doc.text('Rate', 140, 131);
    doc.text('Amount', 165, 131);
    
    // Items
    let yPos = 140;
    invoice.items.forEach((item, index) => {
      doc.text(item.description, 22, yPos);
      doc.text(item.quantity.toString(), 120, yPos);
      doc.text(`$${item.rate.toFixed(2)}`, 140, yPos);
      doc.text(`$${item.amount.toFixed(2)}`, 165, yPos);
      yPos += 10;
    });
    
    // Totals
    const totalsYPos = yPos + 10;
    doc.text('Subtotal:', 140, totalsYPos);
    doc.text(`$${invoice.subtotal.toFixed(2)}`, 165, totalsYPos);
    doc.text('Tax:', 140, totalsYPos + 8);
    doc.text(`$${invoice.tax.toFixed(2)}`, 165, totalsYPos + 8);
    doc.setFontSize(12);
    doc.text('Total:', 140, totalsYPos + 18);
    doc.text(`$${invoice.total.toFixed(2)}`, 165, totalsYPos + 18);
    
    // Notes
    if (invoice.notes) {
      doc.setFontSize(10);
      doc.text('Notes:', 20, totalsYPos + 30);
      doc.text(invoice.notes, 20, totalsYPos + 38);
    }
    
    // Payment Terms
    if (invoice.paymentTerms) {
      doc.text('Payment Terms:', 20, totalsYPos + 50);
      doc.text(invoice.paymentTerms, 20, totalsYPos + 58);
    }
    
    // Save PDF
    doc.save(`invoice-${invoice.invoiceNumber || 'draft'}.pdf`);
  };

  return (
    <div className="App">
      <div className="invoice-generator">
        <header className="header">
          <h1>Invoice Generator</h1>
          <p>Create professional invoices with PDF download</p>
        </header>

        <div className="form-container">
          {/* Company Information */}
          <section className="company-info">
            <h2>Company Information</h2>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Company Name"
                value={companyInfo.name}
                onChange={(e) => updateCompanyInfo('name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                value={companyInfo.address}
                onChange={(e) => updateCompanyInfo('address', e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                value={companyInfo.city}
                onChange={(e) => updateCompanyInfo('city', e.target.value)}
              />
              <input
                type="text"
                placeholder="State"
                value={companyInfo.state}
                onChange={(e) => updateCompanyInfo('state', e.target.value)}
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={companyInfo.zip}
                onChange={(e) => updateCompanyInfo('zip', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={companyInfo.phone}
                onChange={(e) => updateCompanyInfo('phone', e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={companyInfo.email}
                onChange={(e) => updateCompanyInfo('email', e.target.value)}
              />
            </div>
          </section>

          {/* Invoice Details */}
          <section className="invoice-details">
            <h2>Invoice Details</h2>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Invoice Number"
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoiceField('invoiceNumber', e.target.value)}
              />
              <input
                type="date"
                placeholder="Invoice Date"
                value={invoice.invoiceDate}
                onChange={(e) => updateInvoiceField('invoiceDate', e.target.value)}
              />
              <input
                type="date"
                placeholder="Due Date"
                value={invoice.dueDate}
                onChange={(e) => updateInvoiceField('dueDate', e.target.value)}
              />
            </div>
          </section>

          {/* Client Information */}
          <section className="client-info">
            <h2>Client Information</h2>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Client Name"
                value={invoice.clientName}
                onChange={(e) => updateInvoiceField('clientName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Client Address"
                value={invoice.clientAddress}
                onChange={(e) => updateInvoiceField('clientAddress', e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                value={invoice.clientCity}
                onChange={(e) => updateInvoiceField('clientCity', e.target.value)}
              />
              <input
                type="text"
                placeholder="State"
                value={invoice.clientState}
                onChange={(e) => updateInvoiceField('clientState', e.target.value)}
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={invoice.clientZip}
                onChange={(e) => updateInvoiceField('clientZip', e.target.value)}
              />
            </div>
          </section>

          {/* Items */}
          <section className="items-section">
            <h2>Invoice Items</h2>
            <div className="items-container">
              {invoice.items.map((item, index) => (
                <div key={index} className="item-row">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="item-description"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                    className="item-quantity"
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    className="item-rate"
                  />
                  <div className="item-amount">${item.amount.toFixed(2)}</div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="remove-item"
                    disabled={invoice.items.length === 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addItem} className="add-item">
              Add Item
            </button>
          </section>

          {/* Totals */}
          <section className="totals">
            <div className="totals-grid">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax (10%):</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="total-row total">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Notes and Terms */}
          <section className="notes-terms">
            <h2>Additional Information</h2>
            <div className="form-grid">
              <textarea
                placeholder="Notes"
                value={invoice.notes}
                onChange={(e) => updateInvoiceField('notes', e.target.value)}
                rows="3"
              />
              <textarea
                placeholder="Payment Terms"
                value={invoice.paymentTerms}
                onChange={(e) => updateInvoiceField('paymentTerms', e.target.value)}
                rows="3"
              />
            </div>
          </section>

          {/* Actions */}
          <section className="actions">
            <button
              type="button"
              onClick={generatePDF}
              className="generate-pdf"
            >
              Generate PDF Invoice
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
