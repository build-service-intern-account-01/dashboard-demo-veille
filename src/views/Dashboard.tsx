import { useState, useEffect, useRef } from 'react';
import { Monitor, Sun, Moon } from 'lucide-react';
import KpiCard from '../components/shared/KpiCard';
import FeedEntry from '../components/shared/FeedEntry';
import ActionCard from '../components/shared/ActionCard';
import ScanButton from '../components/shared/ScanButton';
import SwissMap from '../components/map/SwissMap';
import { useAppStore } from '../store/useAppStore';
import { KPI_SPARKLINES, SCENARIOS } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const FILTERS = [
  { key: 'all', label: 'TOUS' },
  { key: 'opportunity', label: 'OFFRES' },
  { key: 'competitor', label: 'CONCUR.' },
  { key: 'market', label: 'MARCHÉ' },
] as const;

type FilterKey = typeof FILTERS[number]['key'];

function ScanProgressBar() {
  const { isScanning, scanStep, scanProgress } = useAppStore();
  if (!isScanning && scanStep !== 'connecting' && scanStep !== 'crawling' && scanStep !== 'analyzing' && scanStep !== 'generating') return null;
  if (scanStep === 'done' || scanStep === 'idle') return null;

  const steps = [
    { key: 'connecting', label: '🔌 Connexion aux sources' },
    { key: 'crawling',   label: '🕷️ Crawl web & extraction' },
    { key: 'analyzing',  label: '🧠 Analyse IA & scoring' },
    { key: 'generating', label: '✅ Génération recommandations' },
  ];
  const stepIdx = steps.findIndex((s) => s.key === scanStep);

  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex-none glass rounded-xl px-4 py-2.5 z-10"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    i < stepIdx ? 'bg-emerald-400' :
                    i === stepIdx ? 'bg-cyan-400 animate-pulse' :
                    'bg-slate-700'
                  }`} />
                  <span className={`font-mono text-[10px] ${
                    i === stepIdx ? 'text-cyan-300' :
                    i < stepIdx ? 'text-emerald-400' :
                    'text-slate-600'
                  }`}>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 w-32">
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </div>
              <span className="font-mono text-[10px] text-slate-400 w-8 text-right">{scanProgress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Dashboard() {
  const { feedItems, actionItems, activeFilter, setFilter, isScanning, lastScan, nextScan, togglePresentationMode } = useAppStore();
  const { isDark, toggle: toggleTheme } = useTheme();
  const [clock, setClock] = useState('');
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('fr-CH', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [feedItems.length]);

  const filtered = activeFilter === 'all' ? feedItems : feedItems.filter((s) => s.type === activeFilter);

  const pipelineValue = SCENARIOS.filter((s) => s.type === 'opportunity').reduce((a, s) => a + s.value, 0);
  const shouldAnimate = feedItems.length > 0;

  return (
    <div className="flex flex-col h-full p-2 md:p-3 gap-2 overflow-hidden">

      {/* HEADER */}
      <header className="flex-none flex justify-between items-center glass rounded-xl px-4 py-3 z-20">
        <div className="flex items-center gap-4">
          <div className="logo-ring">S</div>
          <div>
            <h1 className="font-syne text-xl font-bold tracking-wider text-white leading-none">
              STATRON <span className="text-amber-400 font-normal">ROMANDIE</span>
            </h1>
            <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-0.5">
              Veille Stratégique &amp; Automatisation IA · v3.2
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right mr-2">
            <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">Session Active</div>
            <div className="font-mono text-sm font-bold text-white tracking-wider">{clock}</div>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">État Système</span>
            <span className="font-mono text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="status-dot green" /> OPÉRATIONNEL
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-white border border-slate-700/60 hover:border-slate-500 text-xs font-mono transition-all hover:bg-slate-800/60"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {isDark ? 'Mode Jour' : 'Mode Nuit'}
          </button>
          <button
            onClick={togglePresentationMode}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-400 hover:text-white border border-slate-700/60 hover:border-slate-500 text-xs font-mono transition-all hover:bg-slate-800/60"
          >
            <Monitor className="w-3.5 h-3.5" />
            Présentation
          </button>
          <ScanButton />
        </div>
      </header>

      {/* SCAN PROGRESS */}
      <ScanProgressBar />

      {/* KPI STRIP */}
      <div className="flex-none grid grid-cols-2 md:grid-cols-4 gap-2 z-10">
        <KpiCard
          label="Opportunités Détectées"
          value={shouldAnimate ? feedItems.filter((s) => s.type === 'opportunity').length : 0}
          color="cyan" icon="🎯" tag="CE MOIS"
          sparkline={KPI_SPARKLINES.opp}
          animate={shouldAnimate}
        />
        <KpiCard
          label="Sources Surveillées"
          value={47}
          color="amber" icon="📡" tag="ACTIVES"
          sparkline={KPI_SPARKLINES.src}
          animate={false}
        />
        <KpiCard
          label="Pipeline Estimé"
          value={shouldAnimate ? pipelineValue : 0}
          prefix="CHF "
          color="emerald" icon="💰" tag="2026"
          sparkline={KPI_SPARKLINES.pipe}
          animate={shouldAnimate}
        />
        <KpiCard
          label="Alertes Concurrentielles"
          value={shouldAnimate ? feedItems.filter((s) => s.type === 'competitor').length : 0}
          color="rose" icon="🛡️" tag="ACTIVES"
          sparkline={KPI_SPARKLINES.alert}
          animate={shouldAnimate}
        />
      </div>

      {/* MAIN 3 COLUMNS */}
      <main className="flex-1 grid grid-cols-12 gap-2 min-h-0 z-10 overflow-hidden">

        {/* LEFT: LIVE FEED */}
        <section className="col-span-3 glass rounded-xl flex flex-col overflow-hidden" style={{ borderLeft: '2px solid rgba(0,200,255,0.3)' }}>
          <div className="flex-none px-3 py-2.5 border-b border-white/5 bg-slate-900/30">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-syne text-xs font-bold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className={`${feedItems.length > 0 || isScanning ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75`}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Flux en Direct
              </h2>
              <span className="font-mono text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-white/5">
                {isScanning ? `${feedItems.length} SIGNAUX` : feedItems.length > 0 ? `${feedItems.length} ÉVÉNEMENTS` : 'EN VEILLE'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  className={`feed-tab ${activeFilter === key ? 'active' : ''}`}
                  onClick={() => setFilter(key as FilterKey)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div ref={feedRef} className="flex-1 overflow-y-auto scrollthin p-2 space-y-1.5">
            {filtered.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3 py-10">
                {isScanning ? (
                  <>
                    <svg className="w-8 h-8 opacity-40 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                    <span className="font-mono text-xs italic">Scan en cours…</span>
                  </>
                ) : (
                  <>
                    <svg className="w-8 h-8 opacity-40 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                    </svg>
                    <span className="font-mono text-xs italic">Système en veille…</span>
                  </>
                )}
              </div>
            ) : (
              filtered.map((item, i) => (
                <FeedEntry key={item.id} item={item} delay={i * 0.02} />
              ))
            )}
          </div>
        </section>

        {/* CENTER: MAP */}
        <section className="col-span-6 glass rounded-xl relative flex flex-col overflow-hidden">
          <div className="hud-corner hud-tl" />
          <div className="hud-corner hud-tr" />
          <div className="hud-corner hud-bl" />
          <div className="hud-corner hud-br" />

          <div className="flex-none flex items-center justify-between px-4 pt-3 pb-2 z-10">
            <div className="flex items-center gap-2">
              <span className="font-syne text-xs font-bold text-amber-400 uppercase tracking-widest">📍 Suisse Romande</span>
              <span className="font-mono text-[9px] text-slate-600">| Live Coverage Map</span>
            </div>
            <AnimatePresence>
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-amber-400 border border-amber-500/40 bg-amber-500/10 px-3 py-1 rounded-md tracking-widest"
                >
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  ANALYSE IA EN COURS
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <SwissMap isScanning={isScanning} />

          <div className="flex-none px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[10px] font-mono text-slate-500">
            <span>WGS84 · Projection Mercator</span>
            <span className="ml-auto">Couverture : <span className="text-cyan-400">6 cantons</span> · <span className="text-amber-400">6 villes</span></span>
            <span>46°30'N, 6°45'E</span>
          </div>
        </section>

        {/* RIGHT: AI RECOMMENDATIONS */}
        <section className="col-span-3 glass rounded-xl flex flex-col overflow-hidden" style={{ borderRight: '2px solid rgba(16,217,140,0.3)' }}>
          <div className="flex-none px-3 py-2.5 border-b border-white/5 bg-slate-900/30">
            <h2 className="font-syne text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
              </svg>
              Recommandations IA
            </h2>
          </div>

          <div className="flex-1 p-2 space-y-2 overflow-y-auto scrollthin">
            {actionItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3 py-10">
                <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
                </svg>
                <p className="font-mono text-xs text-center px-4 italic">
                  Démarrez l'analyse pour<br/>générer des actions IA
                </p>
              </div>
            ) : (
              actionItems.map((item) => (
                <ActionCard key={item.id} item={item} />
              ))
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="flex-none glass rounded-xl px-4 py-2 flex items-center gap-6 z-20">
        <div className="flex items-center gap-2">
          <span className="status-dot green" />
          <span className="font-mono text-[9px] text-slate-400">CONNECTÉ</span>
        </div>
        <div className="font-mono text-[9px] text-slate-500">
          Sources : <span className="text-cyan-400">simap.ch</span> · <span className="text-violet-400">Crawler Web</span> · <span className="text-orange-400">RSS Presse</span> · <span className="text-blue-400">LinkedIn</span> · <span className="text-emerald-400">CRM Interne</span>
        </div>
        <div className="ml-auto flex items-center gap-4 font-mono text-[9px] text-slate-500">
          <span>Dernier scan : <span className="text-white">{lastScan}</span></span>
          <span>Prochain : <span className="text-amber-400">{nextScan}</span></span>
          <span className="text-slate-600">STATRON ROMANDIE © 2026</span>
        </div>
      </footer>
    </div>
  );
}
