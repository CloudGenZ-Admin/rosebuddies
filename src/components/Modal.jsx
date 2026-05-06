import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    // Overlay background (dark charcoal with blur)
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#2A2A2A]/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* The Modal Box (Scrapbook Style) */}
      <div className="bg-[#FAF9F6] w-full max-w-lg rounded-[32px] border-4 border-[#2A2A2A] shadow-[16px_16px_0px_#FFB3C6] overflow-hidden relative transform rotate-1">
        
        {/* Washi Tape Decoration */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#E1AD01]/80 backdrop-blur-md -rotate-2 border-2 border-[#2A2A2A] shadow-sm z-20"></div>

        {/* Modal Header */}
        <div className="p-6 border-b-4 border-[#2A2A2A] flex justify-between items-center bg-[#FFE9EE]">
          <h3 className="text-3xl font-serif text-[#2A2A2A]">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 bg-[#FAF9F6] border-2 border-[#2A2A2A] rounded-full hover:bg-[#FD5E53] hover:text-[#FAF9F6] shadow-[2px_2px_0px_#2A2A2A] transition-colors"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto bg-[#FAF9F6] bg-[radial-gradient(#2A2A2A_1px,transparent_1px)] [background-size:20px_20px]">
          {/* A white box inside the dotted background for readability */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#2A2A2A] shadow-sm">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}