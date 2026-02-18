import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { SCENARIOS } from '../../data/mockData';

export default function Modal() {
  const { modalOpen, modalScenarioId, closeModal, showToast } = useAppStore();
  const scenario = SCENARIOS.find((s) => s.id === modalScenarioId);

  const handleAction = () => {
    closeModal();
    showToast('✅ Action transmise au CRM & Agenda');
  };

  return (
    <div
      className={`modal-overlay-bg fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 ${modalOpen ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      {scenario && (
        <div className="modal-box glass w-full max-w-2xl max-h-[88vh] flex flex-col rounded-2xl shadow-2xl border border-slate-600/60 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-slate-900/40">
            <h3 className="font-syne text-base font-bold text-white">{scenario.modalTitle}</h3>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-[9px] px-2 py-0.5 rounded border ${scenario.modalBadgeClass}`}>
                {scenario.modalBadge}
              </span>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto scrollthin p-5 text-sm text-slate-300 leading-relaxed bg-slate-900/20"
            dangerouslySetInnerHTML={{ __html: scenario.modalContent }}
          />

          <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-slate-900/40">
            <span className="font-mono text-[9px] text-slate-500">{scenario.modalRef}</span>
            <div className="flex gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition-colors font-medium"
              >
                Fermer
              </button>
              <button
                onClick={handleAction}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-px active:scale-95"
              >
                {scenario.modalActionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
