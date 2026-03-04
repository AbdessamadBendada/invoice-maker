import InvoiceMaker from '@/components/InvoiceMaker';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto pt-16 pb-24 px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-700 text-[10px] font-black uppercase tracking-widest">
              Privacy-First Generator
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
            Invoice<span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-slate-500 mt-4 max-w-lg mx-auto text-lg">
            Create professional PDF invoices in seconds. <br />
            No tracking. No accounts. Just tools.
          </p>
        </div>
        
        {/* The Generator Component */}
        <InvoiceMaker />
      </div>

      <footer className="py-10 border-t border-slate-200 text-center text-slate-400 text-xs font-medium">
        © {new Date().getFullYear()} InvoicePro • 100% Client-Side Processing
      </footer>
    </main>
  );
}