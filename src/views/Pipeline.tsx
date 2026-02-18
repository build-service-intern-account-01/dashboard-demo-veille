import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { PIPELINE, MONTHLY_HISTORY, PipelineOpportunity } from '../data/mockData';
import {
  DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors,
  type DragEndEvent, type DragStartEvent,
} from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

type Stage = PipelineOpportunity['stage'];

const STAGES: { key: Stage; label: string; color: string; border: string }[] = [
  { key: 'detected',    label: 'Détecté',      color: 'text-cyan-400',    border: 'border-cyan-500/30' },
  { key: 'qualified',   label: 'Qualifié',     color: 'text-blue-400',    border: 'border-blue-500/30' },
  { key: 'offer_sent',  label: 'Offre Envoyée', color: 'text-amber-400',  border: 'border-amber-500/30' },
  { key: 'negotiation', label: 'Négociation',  color: 'text-violet-400',  border: 'border-violet-500/30' },
  { key: 'won',         label: 'Gagné',        color: 'text-emerald-400', border: 'border-emerald-500/30' },
];

const CANTON_PIPELINE = [
  { canton: 'GE', value: 510000 },
  { canton: 'VD', value: 710000 },
  { canton: 'FR', value: 133000 },
  { canton: 'VS', value: 485000 },
  { canton: 'NE', value: 45000 },
  { canton: 'JU', value: 65000 },
];

const SOURCE_CONVERSION = [
  { source: 'Simap.ch', rate: 68 },
  { source: 'CRM Interne', rate: 82 },
  { source: 'LinkedIn', rate: 45 },
  { source: 'Crawler', rate: 38 },
];

function urgencyColor(daysLeft: number) {
  if (daysLeft <= 7) return 'border-rose-500';
  if (daysLeft <= 30) return 'border-amber-500';
  return 'border-slate-700';
}

function KanbanCard({ opp, isDragging = false }: { opp: PipelineOpportunity; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: opp.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-slate-800/60 border rounded-xl p-3 hover:border-slate-500/60 transition-all duration-200 ${urgencyColor(opp.daysLeft)} ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-2">
        <span className="text-base leading-none flex-shrink-0 mt-0.5">{opp.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-slate-200 leading-snug font-medium truncate">{opp.title}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`font-mono text-[8px] border rounded px-1 py-0.5 ${opp.sourceClass}`}>{opp.source}</span>
            <span className="font-mono text-[8px] text-slate-500">{opp.city} · {opp.canton}</span>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="font-syne text-sm font-bold text-emerald-400">CHF {(opp.value / 1000).toFixed(0)}K</span>
            <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${
              opp.aiScore >= 90 ? 'text-emerald-400 bg-emerald-500/10' :
              opp.aiScore >= 80 ? 'text-cyan-400 bg-cyan-500/10' :
              'text-amber-400 bg-amber-500/10'
            }`}>{opp.aiScore}%</span>
          </div>
          {opp.daysLeft < 999 && (
            <div className={`font-mono text-[8px] mt-1 ${opp.daysLeft <= 7 ? 'text-rose-400' : opp.daysLeft <= 30 ? 'text-amber-400' : 'text-slate-500'}`}>
              Clôture dans {opp.daysLeft}j · {opp.deadline}
            </div>
          )}
        </div>
        <button {...attributes} {...listeners} className="text-slate-600 hover:text-slate-400 cursor-grab active:cursor-grabbing mt-0.5 flex-shrink-0">
          <GripVertical className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{value: number}>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass border border-white/10 rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="text-white">CHF {p.value.toLocaleString('fr-CH')}</div>
      ))}
    </div>
  );
};

export default function Pipeline() {
  const [items, setItems] = useState<PipelineOpportunity[]>(PIPELINE);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragStart = (e: DragStartEvent) => setActiveId(e.active.id as string);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const targetStage = STAGES.find((s) => s.key === over.id)?.key;
    if (targetStage) {
      setItems((prev) => prev.map((item) => item.id === active.id ? { ...item, stage: targetStage } : item));
    }
  };

  const activeItem = items.find((i) => i.id === activeId);
  const totalPipeline = items.filter((i) => i.stage !== 'lost').reduce((a, i) => a + i.value, 0);
  const wonValue = items.filter((i) => i.stage === 'won').reduce((a, i) => a + i.value, 0);

  return (
    <div className="flex flex-col h-full p-2 md:p-3 gap-2 overflow-hidden">
      {/* Header */}
      <header className="flex-none glass rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-syne text-lg font-bold text-white">Pipeline Commercial</h1>
          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Suivi opportunités · Suisse Romande</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="font-mono text-[9px] text-slate-500 uppercase">Pipeline Total</div>
            <div className="font-syne text-xl font-bold text-emerald-400">CHF {(totalPipeline / 1000000).toFixed(2)}M</div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[9px] text-slate-500 uppercase">Gagné YTD</div>
            <div className="font-syne text-xl font-bold text-cyan-400">CHF {(wonValue / 1000).toFixed(0)}K</div>
          </div>
        </div>
      </header>

      {/* Kanban */}
      <div className="flex-1 overflow-hidden flex flex-col gap-2 min-h-0">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-5 gap-2 flex-1 min-h-0 overflow-hidden">
            {STAGES.map((stage) => {
              const stageItems = items.filter((i) => i.stage === stage.key);
              const stageTotal = stageItems.reduce((a, i) => a + i.value, 0);
              return (
                <div key={stage.key} className="glass rounded-xl flex flex-col overflow-hidden" style={{ borderTop: `2px solid ${stage.border.replace('border-', '').replace('/30', '')}` }}>
                  <div className="flex-none px-3 py-2 border-b border-white/5 bg-slate-900/30">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-syne text-xs font-bold uppercase tracking-wider ${stage.color}`}>{stage.label}</h3>
                      <span className="font-mono text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">{stageItems.length}</span>
                    </div>
                    <div className={`font-mono text-[9px] mt-0.5 ${stage.color} opacity-70`}>
                      CHF {(stageTotal / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <SortableContext items={stageItems.map((i) => i.id)} strategy={verticalListSortingStrategy} id={stage.key}>
                    <div className="flex-1 overflow-y-auto scrollthin p-2 space-y-2">
                      {stageItems.map((opp) => (
                        <KanbanCard key={opp.id} opp={opp} />
                      ))}
                    </div>
                  </SortableContext>
                </div>
              );
            })}
          </div>
          <DragOverlay>
            {activeItem && <KanbanCard opp={activeItem} isDragging />}
          </DragOverlay>
        </DndContext>

        {/* Charts */}
        <div className="flex-none grid grid-cols-3 gap-2">
          <div className="glass rounded-xl p-3">
            <h3 className="font-syne text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Pipeline par Canton</h3>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={CANTON_PIPELINE} layout="vertical" margin={{ left: 8, right: 8 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="canton" tick={{ fontFamily: 'JetBrains Mono', fontSize: 9, fill: '#64748b' }} width={24} />
                <Bar dataKey="value" fill="#00c8ff" opacity={0.7} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-2 glass rounded-xl p-3">
            <h3 className="font-syne text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Évolution Opportunités — 12 mois</h3>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={MONTHLY_HISTORY} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fontFamily: 'JetBrains Mono', fontSize: 8, fill: '#64748b' }} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="value" stroke="#10d98c" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="opportunities" stroke="#00c8ff" strokeWidth={1.5} dot={false} yAxisId={1} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
