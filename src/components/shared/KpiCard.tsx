import { useEffect, useRef, useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface KpiCardProps {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  color: 'cyan' | 'amber' | 'emerald' | 'rose';
  icon: string;
  tag: string;
  sparkline: number[];
  animate?: boolean;
}

const COLOR_MAP = {
  cyan:    { text: 'text-cyan-300',    glow: '#00c8ff' },
  amber:   { text: 'text-amber-400',   glow: '#f59e0b' },
  emerald: { text: 'text-emerald-400', glow: '#10d98c' },
  rose:    { text: 'text-rose-400',    glow: '#f43f5e' },
};

function useCounter(target: number, duration = 1200, animate: boolean) {
  const [val, setVal] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    if (!animate) { setVal(target); return; }
    const start = performance.now();
    const run = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * ease));
      if (p < 1) rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, animate]);
  return val;
}

export default function KpiCard({ label, value, prefix = '', suffix = '', color, icon, tag, sparkline, animate = false }: KpiCardProps) {
  const isNumeric = typeof value === 'number';
  const animated = useCounter(isNumeric ? (value as number) : 0, 1400, animate && isNumeric);
  const { text, glow } = COLOR_MAP[color];

  const data = sparkline.map((v, i) => ({ i, v }));

  return (
    <div className={`kpi-card kpi-${color} glass rounded-xl px-4 py-2.5 flex items-center gap-3`}>
      <div className="text-2xl opacity-70 select-none">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest truncate">{label}</div>
        <div className={`font-syne text-xl font-bold ${text}`}>
          {isNumeric && animate
            ? `${prefix}${animated.toLocaleString('fr-CH')}${suffix}`
            : typeof value === 'number'
              ? `${prefix}${value.toLocaleString('fr-CH')}${suffix}`
              : value}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={`font-mono text-[9px] ${text} opacity-60`}>{tag}</span>
        <div className="w-16 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={glow} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={glow} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={glow} strokeWidth={1.5} fill={`url(#sg-${color})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
