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
    <main className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center pb-8">
          <h1 className="text-4xl font-bold text-slate-900">Content Cleanroom</h1>
          <p className="text-slate-500 mt-2">Paste messy text, get pure data.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Area */}
          <div className="space-y-2">
            <label className="text-sm text-slate-900 font-bold">Messy Input</label>
            <textarea 
              className="w-full h-64 p-4 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Paste HTML or messy text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Output Area */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Clean Output</label>
            <div className="relative">
              <textarea 
                readOnly
                className="w-full h-64 p-4 rounded-xl border border-slate-200 bg-white shadow-sm outline-none"
                placeholder="Clean text will appear here..."
                value={output}
              />
              {output && (
                <button 
                  onClick={copyToClipboard}
                  className="absolute bottom-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
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