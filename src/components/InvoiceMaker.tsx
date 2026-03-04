"use client";

import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Plus, Trash2, Printer, Coffee } from 'lucide-react';

export default function InvoiceMaker() {
  const [invoiceId, setInvoiceId] = useState("INV-001");
  const [sender, setSender] = useState({ name: '', address: '' });
  const [client, setClient] = useState({ name: '', address: '' });
  const [items, setItems] = useState([{ id: 1, desc: '', qty: 1, price: 0 }]);
  
const componentRef = useRef<HTMLDivElement>(null);
  
  // THE FIXED HOOK:
  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Changed from 'content' to 'contentRef'
    documentTitle: `Invoice-${invoiceId}`,
  });

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const total = items.reduce((sum, i) => sum + (i.qty * i.price), 0);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto py-10 px-4">
      
      {/* LEFT SIDE: EDITOR */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 space-y-8">
        <div className="flex justify-between items-center border-b pb-6">
          <h2 className="text-xl font-black uppercase tracking-tighter">Invoice Settings</h2>
          <a href="#" className="flex items-center gap-2 bg-[#FFDD00] px-3 py-1.5 rounded-full text-[10px] font-bold">
            <Coffee size={12} /> Buy me a coffee
          </a>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Invoice Number</label>
          <input 
            value={invoiceId} 
            onChange={e => setInvoiceId(e.target.value)} 
            className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 text-black" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Info</label>
            <input placeholder="Your Name" onChange={e => setSender({...sender, name: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border-none text-sm" />
            <textarea placeholder="Your Address" onChange={e => setSender({...sender, address: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border-none h-20 text-sm" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Info</label>
            <input placeholder="Client Name" onChange={e => setClient({...client, name: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border-none text-sm" />
            <textarea placeholder="Client Address" onChange={e => setClient({...client, address: e.target.value})} className="w-full p-3 bg-slate-50 rounded-xl border-none h-20 text-sm" />
          </div>
        </div>

        <div className="space-y-4">
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Line Items</label>
  
  {items.map(item => (
    <div key={item.id} className="grid grid-cols-12 gap-2 items-center animate-in fade-in duration-300">
      
      {/* Description: Takes 6 out of 12 columns */}
      <div className="col-span-6">
        <input 
          placeholder="Item Description" 
          className="w-full p-3 bg-slate-50 rounded-xl border-none text-sm text-black focus:ring-1 focus:ring-blue-200" 
          onChange={e => updateItem(item.id, 'desc', e.target.value)} 
        />
      </div>

      {/* Quantity: Takes 2 out of 12 columns */}
      <div className="col-span-2">
        <input 
          type="number" 
          placeholder="Qty" 
          className="w-full p-3 bg-slate-50 rounded-xl border-none text-sm text-center text-black" 
          onChange={e => updateItem(item.id, 'qty', Number(e.target.value))} 
        />
      </div>

      {/* Price: Takes 3 out of 12 columns */}
      <div className="col-span-3">
        <input 
          type="number" 
          placeholder="Price" 
          className="w-full p-3 bg-slate-50 rounded-xl border-none text-sm text-right text-black" 
          onChange={e => updateItem(item.id, 'price', Number(e.target.value))} 
        />
      </div>

      {/* Delete Button: Takes 1 out of 12 columns */}
      <div className="col-span-1 flex justify-end">
        <button 
          onClick={() => setItems(items.filter(i => i.id !== item.id))} 
          className="text-slate-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16}/>
        </button>
      </div>

    </div>
  ))}

  <button 
    onClick={() => setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0 }])} 
    className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline pt-2"
  >
    <Plus size={14}/> Add New Line
  </button>
</div>

        <button 
          onClick={handlePrint} 
          className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 mt-6"
        >
          <Printer size={20} /> Print / Save as PDF
        </button>
      </div>

      {/* RIGHT SIDE: THE PAPER PREVIEW */}
      <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-inner lg:sticky lg:top-10 overflow-hidden">
        <div ref={componentRef} className="bg-white w-full aspect-[1/1.41] p-12 shadow-2xl flex flex-col text-black">
          <div className="flex justify-between border-b-4 border-black pb-8 mb-8">
            <h1 className="text-4xl font-black tracking-tighter italic">INVOICE</h1>
            <div className="text-right">
              <p className="font-black uppercase text-sm">{sender.name || 'Your Company'}</p>
              <p className="text-[10px] text-slate-500 whitespace-pre-wrap">{sender.address}</p>
            </div>
          </div>
          
          <div className="mb-12">
            <p className="text-[10px] font-black text-blue-600 uppercase mb-1">Billed To</p>
            <p className="font-bold text-lg">{client.name || 'Client Name'}</p>
            <p className="text-[10px] text-slate-500 whitespace-pre-wrap">{client.address}</p>
          </div>

          <table className="w-full text-left mb-auto">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] uppercase font-black text-slate-400">
                <th className="pb-2">Description</th>
                <th className="pb-2 text-center">Qty</th>
                <th className="pb-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {items.map(i => (
                <tr key={i.id} className="border-b border-slate-50">
                  <td className="py-4 font-bold text-slate-700">{i.desc || '---'}</td>
                  <td className="py-4 text-center text-slate-500">{i.qty}</td>
                  <td className="py-4 text-right font-bold">${(i.qty * i.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t-2 border-slate-100 pt-6 flex justify-between items-end mt-10">
             <div>
                <p className="text-[10px] font-bold text-slate-300">Reference: {invoiceId}</p>
                <p className="text-[10px] font-bold text-slate-300">Date: {new Date().toLocaleDateString()}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase">Total Amount Due</p>
                <p className="text-4xl font-black text-blue-600">${total.toFixed(2)}</p>
             </div>
          </div>
        </div>
        <p className="text-center text-slate-500 text-[10px] font-bold uppercase mt-6 tracking-widest">A4 Document Preview</p>
      </div>
    </div>
  );
}