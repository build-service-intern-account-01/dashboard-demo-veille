import { useState, useRef, useEffect } from 'react';
import { X, Copy, Calendar, CheckCircle2, Pencil, Save, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmailTemplate } from '../../data/emailTemplates';
import { useAppStore } from '../../store/useAppStore';

interface BrouillonEmailModalProps {
  template: EmailTemplate;
  tenderTitle: string;
  onClose: () => void;
  onMarkSent: () => void;
}

type Phase = 'loading' | 'ready';

export default function BrouillonEmailModal({ template, tenderTitle, onClose, onMarkSent }: BrouillonEmailModalProps) {
  const showToast = useAppStore((s) => s.showToast);
  const [phase, setPhase] = useState<Phase>('loading');
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [bodyText, setBodyText] = useState(template.body);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const start = Date.now();
    const duration = 1500;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(() => setPhase('ready'), 100);
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (isEditing && textareaRef.current) textareaRef.current.focus();
  }, [isEditing]);

  const handleCopy = async () => {
    const full = `De : ${template.from}\nÀ : ${template.to}\nCC : ${template.cc}\nObjet : ${template.subject}\n\n${bodyText}`;
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      const el = document.createElement('textarea');
      el.value = full;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    showToast('✅ Copié dans le presse-papier !');
  };

  const handleMarkSent = () => {
    onMarkSent();
    onClose();
    showToast('✅ Email marqué comme envoyé — AO mis à jour');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="glass w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl border border-slate-600/60 overflow-hidden"
      >
        {/* Header */}
        <div className="flex-none flex items-center justify-between px-5 py-4 border-b border-white/5 bg-slate-900/40">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-lg flex-shrink-0">📧</span>
            <div className="min-w-0">
              <h3 className="font-syne text-sm font-bold text-white truncate">
                BROUILLON GÉNÉRÉ — {template.tenderId}
              </h3>
              <p className="font-mono text-[9px] text-slate-500 truncate mt-0.5">{tenderTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            <span className="font-mono text-[9px] px-2 py-0.5 rounded border text-emerald-400 border-emerald-500/30 bg-emerald-500/08 flex items-center gap-1">
              IA · CONFIANCE {template.confidence}%
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scrollthin">
          <AnimatePresence mode="wait">
            {phase === 'loading' ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-5 p-10 h-64"
              >
                <div className="flex items-center gap-3 text-cyan-400">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span className="font-syne font-bold text-base">Rédaction en cours…</span>
                </div>
                <div className="font-mono text-[10px] text-slate-500 text-center">
                  Analyse du contexte · Personnalisation · Mise en forme
                </div>
                <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <span className="font-mono text-[10px] text-slate-500">{Math.round(progress)}%</span>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 space-y-4"
              >
                {/* Email header */}
                <div className="font-mono text-xs bg-slate-950/60 border border-slate-700/60 rounded-xl p-4 space-y-1.5">
                  {[
                    { label: 'De', value: template.from },
                    { label: 'À', value: template.to },
                    { label: 'CC', value: template.cc },
                    { label: 'Objet', value: template.subject },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-2">
                      <span className="text-slate-600 w-10 flex-shrink-0">{label} :</span>
                      <span className={label === 'Objet' ? 'text-amber-300 font-medium' : 'text-white'}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Email body */}
                <div className={`rounded-xl border transition-colors ${isEditing ? 'border-cyan-500/40 bg-slate-900/60' : 'border-slate-700/40 bg-slate-900/20'}`}>
                  {isEditing ? (
                    <textarea
                      ref={textareaRef}
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                      className="w-full bg-transparent text-slate-200 text-xs font-mono leading-relaxed p-4 resize-none focus:outline-none min-h-[280px]"
                      rows={18}
                    />
                  ) : (
                    <pre className="text-xs text-slate-300 font-mono leading-relaxed p-4 whitespace-pre-wrap">{bodyText}</pre>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {phase === 'ready' && (
          <div className="flex-none flex items-center justify-between px-5 py-3 border-t border-white/5 bg-slate-900/40">
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 hover:border-slate-500 transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                Copier le texte
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 hover:border-slate-500 transition-all"
                onClick={() => showToast('📅 Ajouté au calendrier')}
              >
                <Calendar className="w-3.5 h-3.5" />
                Calendrier
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                  isEditing
                    ? 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20'
                    : 'text-slate-300 hover:text-white border-slate-700/60 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                {isEditing ? <><Save className="w-3.5 h-3.5" />Sauvegarder</> : <><Pencil className="w-3.5 h-3.5" />Modifier</>}
              </button>
              <button
                onClick={handleMarkSent}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-px active:scale-95"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Marquer comme Envoyé
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
