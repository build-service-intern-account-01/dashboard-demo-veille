import { Zap } from 'lucide-react';
import { Scenario } from '../../data/mockData';
import { useAppStore } from '../../store/useAppStore';

interface ActionCardProps {
  item: Scenario;
}

const COLOR_MAP: Record<string, { gradient: string; glow: string }> = {
  blue:    { gradient: 'from-blue-600 to-blue-700 hover:from-blue-500',   glow: 'shadow-blue-500/20' },
  rose:    { gradient: 'from-rose-600 to-rose-700 hover:from-rose-500',   glow: 'shadow-rose-500/20' },
  amber:   { gradient: 'from-amber-600 to-amber-700 hover:from-amber-500', glow: 'shadow-amber-500/20' },
  violet:  { gradient: 'from-violet-700 to-violet-800 hover:from-violet-600', glow: 'shadow-violet-500/20' },
  emerald: { gradient: 'from-emerald-600 to-emerald-700 hover:from-emerald-500', glow: 'shadow-emerald-500/20' },
};

const TYPE_LABEL: Record<string, string> = {
  opportunity: 'OPPORTUNITÉ',
  competitor:  'CONCURRENCE',
  market:      'MARCHÉ',
};

const TYPE_BADGE: Record<string, string> = {
  opportunity: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  competitor:  'text-rose-400 border-rose-500/30 bg-rose-500/10',
  market:      'text-amber-400 border-amber-500/30 bg-amber-500/10',
};

export default function ActionCard({ item }: ActionCardProps) {
  const openModal = useAppStore((s) => s.openModal);
  const col = COLOR_MAP[item.actionColor] || COLOR_MAP.blue;

  return (
    <div className="action-card bg-slate-800/60 border border-slate-600/40 rounded-xl p-3 hover:border-slate-500/60 transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className={`font-mono text-[9px] px-2 py-0.5 rounded border ${TYPE_BADGE[item.type]}`}>
          {TYPE_LABEL[item.type] || 'INFO'}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-slate-500">IA</span>
          <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${item.confidence}%`,
                background: 'linear-gradient(90deg, #10d98c, #00c8ff)',
              }}
            />
          </div>
          <span className="font-mono text-[9px] text-slate-400">{item.confidence}%</span>
        </div>
      </div>
      <p className="text-[11px] text-slate-200 leading-snug mb-1.5">{item.short}</p>
      {item.value > 0 && (
        <p className="font-mono text-[10px] text-emerald-400 mb-2">
          ≈ CHF {item.value.toLocaleString('fr-CH')}
        </p>
      )}
      <button
        onClick={() => openModal(item.id)}
        className={`w-full py-1.5 px-3 rounded-lg font-syne font-bold text-[11px] text-white flex items-center justify-center gap-1.5 bg-gradient-to-r ${col.gradient} shadow-lg ${col.glow} transition-all hover:-translate-y-px active:scale-95`}
      >
        <Zap className="w-3 h-3" />
        {item.action}
      </button>
    </div>
  );
}
