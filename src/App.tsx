import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './views/Dashboard';
import Pipeline from './views/Pipeline';
import Competitors from './views/Competitors';
import Tenders from './views/Tenders';
import Settings from './views/Settings';

const PASSWORD = 'statron2026';

function LoginScreen({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setValue('');
      setTimeout(() => setShake(false), 500);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center relative z-10">
      <div className="glass rounded-2xl p-10 w-full max-w-sm flex flex-col items-center gap-6 shadow-2xl"
        style={{ border: '1px solid rgba(0,200,255,0.15)' }}>
        <div className="logo-ring" style={{ width: 52, height: 52, fontSize: '1.4rem' }}>S</div>
        <div className="text-center">
          <h1 className="font-syne text-2xl font-bold tracking-wider text-white leading-none">
            STATRON <span className="text-amber-400 font-normal">ROMANDIE</span>
          </h1>
          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mt-1.5">
            Intelligence Hub · Accès Sécurisé
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div
            className="relative"
            style={shake ? { animation: 'shake 0.4s ease' } : {}}
          >
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false); }}
              placeholder="Mot de passe"
              autoFocus
              className={`w-full bg-slate-900/60 border rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                error
                  ? 'border-rose-500/60 focus:border-rose-500'
                  : 'border-slate-700/60 focus:border-cyan-500/50'
              }`}
            />
          </div>
          {error && (
            <p className="font-mono text-[10px] text-rose-400 text-center">
              Mot de passe incorrect
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-syne font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/30 transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
          >
            Accéder
          </button>
        </form>

        <p className="font-mono text-[8px] text-slate-600 uppercase tracking-widest">
          STATRON ROMANDIE © 2026 — Démo confidentielle
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) return <LoginScreen onUnlock={() => setUnlocked(true)} />;

  return (
    <BrowserRouter basename="/dashboard-demo-veille">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/concurrents" element={<Competitors />} />
          <Route path="/appels" element={<Tenders />} />
          <Route path="/parametres" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
