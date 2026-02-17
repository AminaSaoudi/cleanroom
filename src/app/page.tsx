"use client";
import React, { useState } from 'react';
import { Trash2, Copy, Check, Wand2 } from 'lucide-react';

export default function Cleanroom() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleClean = () => {
    // The "Logic": Removes HTML tags and trims excessive whitespace
    const cleaned = input
      .replace(/<[^>]*>/g, '') // Strip HTML
      .replace(/\s+/g, ' ')    // Collapse multiple spaces/newlines
      .trim();
    setOutput(cleaned);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center pb-8">
          <h1 className="text-4xl font-bold text-slate-900">Content Cleanroom</h1>
          <p className="text-slate-500 mt-2">Paste messy text, get pure data.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Area */}
<div className="space-y-2">
  <label className="text-sm font-bold text-slate-900 uppercase tracking-tight">Messy Input</label>
  <textarea 
    className="w-full h-64 p-4 rounded-xl border-2 border-slate-300 bg-white text-slate-900 text-lg shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400"
    placeholder="Paste HTML or messy text here..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />
</div>

{/* Output Area */}
<div className="space-y-2">
  <label className="text-sm font-bold text-slate-900 uppercase tracking-tight">Clean Output</label>
  <div className="relative">
    <textarea 
      readOnly
      className="w-full h-64 p-4 rounded-xl border-2 border-slate-300 bg-slate-50 text-slate-900 text-lg shadow-sm outline-none font-medium"
      placeholder="Clean text will appear here..."
      value={output}
    />
    {output && (
      <button 
        onClick={copyToClipboard}
        className="absolute bottom-4 right-4 p-3 bg-white border-2 border-slate-300 hover:border-blue-600 rounded-lg transition-colors shadow-sm"
      >
        {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} className="text-slate-900" />}
      </button>
    )}
  </div>
</div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => { setInput(''); setOutput(''); }}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all font-medium"
          >
            <Trash2 size={18} /> Clear
          </button>
          <button 
            onClick={handleClean}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-bold"
          >
            <Wand2 size={18} /> Clean Text
          </button>
        </div>
      </div>
    </main>
  );
}