import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';
import { COMPETITORS, SCENARIOS } from '../data/mockData';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RADAR_AXES = ['prix', 'reactivite', 'couverture', 'technicite', 'satisfaction'] as const;
const AXIS_LABELS: Record<string, string> = {
  prix: 'Prix', reactivite: 'Réactivité', couverture: 'Couverture', technicite: 'Technicité', satisfaction: 'Satisfaction',
};

const COMP_COLORS = ['#00c8ff', '#f43f5e', '#f59e0b', '#7c3aed', '#10d98c', '#60a5fa'];

const RADAR_DATA = RADAR_AXES.map((axis) => ({
  axis: AXIS_LABELS[axis],
  ...COMPETITORS.reduce((acc, c, i) => ({ ...acc, [c.id]: c.radar[axis] }), {} as Record<string, number>),
}));

const ALERT_STYLE: Record<string, string> = {
  low:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  medium:   'text-amber-400 bg-amber-500/10 border-amber-500/30',
  critical: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
};

const compEvents = SCENARIOS.filter((s) => s.type === 'competitor');

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-rose-400" />;
  if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />;
  return <Minus className="w-3.5 h-3.5 text-slate-500" />;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{name: string; value: number; color: string}>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass border border-white/10 rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-slate-400 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>{p.name}: {p.value}%</div>
      ))}
    </div>
  );
};

export default function Competitors() {
  return (
    <div className="flex flex-col h-full p-2 md:p-3 gap-2 overflow-hidden">
      <header className="flex-none glass rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-syne text-lg font-bold text-white">Veille Concurrentielle</h1>
          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Intelligence compétitive · Suisse Romande</p>
        </div>
        <div className="font-mono text-[9px] text-slate-500 flex items-center gap-2">
          <span className="status-dot green" />
          6 concurrents surveillés · Temps réel
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-2 min-h-0 overflow-hidden">
        {/* Radar chart */}
        <div className="col-span-5 glass rounded-xl flex flex-col overflow-hidden">
          <div className="flex-none px-3 py-2.5 border-b border-white/5">
            <h2 className="font-syne text-xs font-bold text-cyan-400 uppercase tracking-wider">Radar Compétitif</h2>
            <p className="font-mono text-[9px] text-slate-500 mt-0.5">5 axes · Score 0–100</p>
          </div>
          <div className="flex-1 flex flex-col min-h-0 p-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="axis" tick={{ fontFamily: 'JetBrains Mono', fontSize: 9, fill: '#64748b' }} />
                {COMPETITORS.map((comp, i) => (
                  <Radar
                    key={comp.id}
                    name={comp.name}
                    dataKey={comp.id}
                    stroke={COMP_COLORS[i]}
                    fill={COMP_COLORS[i]}
                    fillOpacity={comp.id === 'statron' ? 0.2 : 0.05}
                    strokeWidth={comp.id === 'statron' ? 2.5 : 1.5}
                    strokeDasharray={comp.id === 'statron' ? undefined : '4 2'}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-1">
              {COMPETITORS.map((c, i) => (
                <div key={c.id} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COMP_COLORS[i] }} />
                  <span className="font-mono text-[9px] text-slate-400">{c.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Competitor table + feed */}
        <div className="col-span-7 flex flex-col gap-2 min-h-0 overflow-hidden">
          {/* Table */}
          <div className="flex-1 glass rounded-xl flex flex-col overflow-hidden">
            <div className="flex-none px-3 py-2.5 border-b border-white/5">
              <h2 className="font-syne text-xs font-bold text-slate-300 uppercase tracking-wider">Tableau de Veille</h2>
            </div>
            <div className="flex-1 overflow-y-auto scrollthin">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-white/5 bg-slate-900/30">
                    <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider">Concurrent</th>
                    <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider">Parts marché</th>
                    <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider">Dernière activité</th>
                    <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider">Alerte</th>
                    <th className="font-mono text-[9px] text-slate-500 text-center px-3 py-2 uppercase tracking-wider">Tendance</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPETITORS.map((comp, i) => (
                    <tr
                      key={comp.id}
                      className={`border-b border-white/5 transition-colors hover:bg-slate-800/30 ${comp.id === 'statron' ? 'bg-emerald-900/10 border-l-2 border-emerald-500/40' : ''}`}
                    >
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: COMP_COLORS[i] }} />
                          <span className={`font-medium ${comp.id === 'statron' ? 'text-emerald-400 font-bold' : 'text-slate-200'}`}>
                            {comp.name}
                            {comp.id === 'statron' && <span className="ml-1.5 font-mono text-[8px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">VOUS</span>}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${comp.marketShare}%`, background: COMP_COLORS[i] }} />
                          </div>
                          <span className="font-mono text-[9px] text-slate-400">{comp.marketShare}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="font-mono text-[9px] text-slate-400">{comp.lastActivity}</span>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className={`font-mono text-[9px] px-2 py-0.5 rounded border ${ALERT_STYLE[comp.alertLevel]}`}>
                          {comp.alert}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 flex justify-center">
                        <TrendIcon trend={comp.trend} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Competitive events feed */}
          <div className="glass rounded-xl flex flex-col overflow-hidden" style={{ maxHeight: '180px' }}>
            <div className="flex-none px-3 py-2 border-b border-white/5">
              <h2 className="font-syne text-xs font-bold text-rose-400 uppercase tracking-wider">Événements Concurrentiels</h2>
            </div>
            <div className="overflow-y-auto scrollthin p-2 space-y-1.5">
              {compEvents.map((ev) => (
                <div key={ev.id} className="flex items-start gap-2 bg-slate-800/40 rounded-lg p-2 border-l-2 type-comp">
                  <span className="text-base leading-none mt-0.5 flex-shrink-0">{ev.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`font-mono text-[8px] border rounded px-1 py-0.5 ${ev.sourceClass}`}>{ev.source}</span>
                      <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded border ${ev.confidence >= 85 ? 'text-rose-400 border-rose-500/30 bg-rose-500/08' : 'text-amber-400 border-amber-500/30 bg-amber-500/08'}`}>
                        {ev.confidence >= 85 ? 'CRITIQUE' : 'MOYEN'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300">{ev.short}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
