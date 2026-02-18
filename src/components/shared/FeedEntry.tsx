import { Scenario } from '../../data/mockData';
import { useAppStore } from '../../store/useAppStore';

interface FeedEntryProps {
  item: Scenario;
  delay?: number;
}

const TYPE_BORDER: Record<string, string> = {
  opportunity: 'type-opp',
  competitor: 'type-comp',
  market: 'type-mkt',
};

const TYPE_BAR_COLOR: Record<string, string> = {
  opportunity: 'var(--emerald)',
  competitor: 'var(--rose)',
  market: 'var(--amber)',
};

export default function FeedEntry({ item, delay = 0 }: FeedEntryProps) {
  const openModal = useAppStore((s) => s.openModal);

  const time = new Date().toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={`log-entry border-l-2 rounded-lg p-2.5 cursor-pointer hover:brightness-110 transition-all bg-slate-800/40 ${TYPE_BORDER[item.type] || 'border-slate-600'}`}
      style={{ animationDelay: `${delay}s` }}
      onClick={() => openModal(item.id)}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg leading-none mt-0.5 select-none">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`font-mono text-[9px] border rounded px-1.5 py-0.5 leading-none ${item.sourceClass}`}>
              {item.source}
            </span>
            <span className="font-mono text-[8px] text-slate-600">{time}</span>
          </div>
          <p className="text-[11px] text-slate-200 leading-snug">{item.short}</p>
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex-1 h-[2px] rounded-full bg-slate-700">
              <div
                className="h-full rounded-full"
                style={{ width: `${item.confidence}%`, background: TYPE_BAR_COLOR[item.type] }}
              />
            </div>
            <span className="font-mono text-[9px] text-slate-400">{item.confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
