import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-brand-dark/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-brand-cream w-full max-w-lg rounded-[32px] border-4 border-brand-dark shadow-[16px_16px_0px] shadow-brand-pink-dark overflow-hidden relative transform rotate-1">
        
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-brand-accent/80 backdrop-blur-md -rotate-2 border-2 border-brand-dark shadow-sm z-20"></div>

        <div className="p-6 border-b-4 border-brand-dark flex justify-between items-center bg-brand-pink-light">
          <h3 className="text-3xl font-serif text-brand-dark">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 bg-brand-cream border-2 border-brand-dark rounded-full hover:bg-brand-primary hover:text-brand-cream shadow-[2px_2px_0px] shadow-brand-dark transition-colors"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="p-8 max-h-[60vh] overflow-y-auto bg-brand-cream bg-[radial-gradient(theme(colors.brand.dark)_1px,transparent_1px)] [background-size:20px_20px]">
          <div className="bg-white p-6 rounded-2xl border-2 border-brand-dark shadow-sm">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}