import { useState } from 'react';
import { SOURCES, TEAM_MEMBERS } from '../data/mockData';
import { X, Plus } from 'lucide-react';

const DEFAULT_KEYWORDS = ['UPS', 'onduleur', 'alimentation sans interruption', 'maintenance électrique', 'salle serveur', 'datacenter', 'Simap'];

export default function Settings() {
  const [sources, setSources] = useState(SOURCES);
  const [keywords, setKeywords] = useState(DEFAULT_KEYWORDS);
  const [newKeyword, setNewKeyword] = useState('');
  const [aiThreshold, setAiThreshold] = useState(70);
  const [notifications, setNotifications] = useState({ email: true, slack: true, sms: false });

  const toggleSource = (id: string) => {
    setSources((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords((prev) => [...prev, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (kw: string) => setKeywords((prev) => prev.filter((k) => k !== kw));

  return (
    <div className="flex flex-col h-full p-2 md:p-3 gap-2 overflow-hidden">
      <header className="flex-none glass rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-syne text-lg font-bold text-white">Paramètres & Sources</h1>
          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Configuration du système de veille</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-syne font-bold text-sm transition-all hover:-translate-y-px shadow-lg shadow-emerald-500/20">
          Sauvegarder
        </button>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-2 min-h-0 overflow-y-auto scrollthin">

        {/* Sources */}
        <div className="col-span-5 glass rounded-xl flex flex-col overflow-hidden self-start">
          <div className="flex-none px-4 py-3 border-b border-white/5 bg-slate-900/30">
            <h2 className="font-syne text-xs font-bold text-cyan-400 uppercase tracking-wider">Sources de Veille</h2>
            <p className="font-mono text-[9px] text-slate-500 mt-0.5">
              {sources.filter((s) => s.enabled).length} actives sur {sources.length}
            </p>
          </div>
          <div className="p-3 space-y-2">
            {sources.map((source) => (
              <div key={source.id} className="flex items-center gap-3 bg-slate-800/40 rounded-xl p-3 border border-slate-700/30 hover:border-slate-600/40 transition-colors">
                <span className="text-xl">{source.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-syne font-semibold text-xs text-slate-200">{source.name}</span>
                    <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded ${source.status === 'ok' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'}`}>
                      {source.status === 'ok' ? 'ACTIF' : 'ERREUR'}
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-slate-500 truncate">{source.description}</p>
                  <p className="font-mono text-[8px] text-slate-600 mt-0.5">
                    Synchro: {source.frequency < 1 ? `${source.frequency * 60}min` : `${source.frequency}h`} · Dernière: {source.lastSync}
                  </p>
                </div>
                <div
                  onClick={() => toggleSource(source.id)}
                  className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer flex-shrink-0 ${source.enabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${source.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts + Notifications */}
        <div className="col-span-4 flex flex-col gap-2 self-start">
          {/* Keywords */}
          <div className="glass rounded-xl p-4">
            <h2 className="font-syne text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Mots-clés de Veille</h2>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {keywords.map((kw) => (
                <span key={kw} className="flex items-center gap-1 bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono px-2 py-1 rounded-lg">
                  {kw}
                  <button onClick={() => removeKeyword(kw)} className="text-slate-500 hover:text-rose-400 transition-colors">
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
                placeholder="Ajouter un mot-clé…"
                className="flex-1 bg-slate-800 border border-slate-700 text-white text-xs px-3 py-1.5 rounded-lg font-mono focus:outline-none focus:border-cyan-500/50 placeholder-slate-600"
              />
              <button onClick={addKeyword} className="bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 px-2 py-1.5 rounded-lg transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Threshold */}
          <div className="glass rounded-xl p-4">
            <h2 className="font-syne text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Seuil Score IA Minimum</h2>
            <div className="flex items-center gap-3">
              <input
                type="range" min={0} max={100} step={5}
                value={aiThreshold}
                onChange={(e) => setAiThreshold(+e.target.value)}
                className="flex-1 accent-emerald-400"
              />
              <div className={`font-syne text-xl font-bold w-12 text-right ${aiThreshold >= 80 ? 'text-emerald-400' : aiThreshold >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                {aiThreshold}%
              </div>
            </div>
            <p className="font-mono text-[9px] text-slate-500 mt-2">
              Seuls les signaux avec un score ≥ {aiThreshold}% seront remontés dans le flux.
            </p>
          </div>

          {/* Notifications */}
          <div className="glass rounded-xl p-4">
            <h2 className="font-syne text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Canaux de Notification</h2>
            <div className="space-y-2.5">
              {(['email', 'slack', 'sms'] as const).map((channel) => (
                <div key={channel} className="flex items-center justify-between">
                  <div>
                    <span className="font-syne text-xs text-slate-200 capitalize">{channel === 'sms' ? 'SMS' : channel.charAt(0).toUpperCase() + channel.slice(1)}</span>
                    <p className="font-mono text-[9px] text-slate-500">
                      {channel === 'email' ? 'm.dupont@statron.ch' : channel === 'slack' ? '#veille-statron' : '+41 76 XXX XX XX'}
                    </p>
                  </div>
                  <div
                    onClick={() => setNotifications((prev) => ({ ...prev, [channel]: !prev[channel] }))}
                    className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${notifications[channel] ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications[channel] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="col-span-3 glass rounded-xl flex flex-col overflow-hidden self-start">
          <div className="flex-none px-4 py-3 border-b border-white/5 bg-slate-900/30">
            <h2 className="font-syne text-xs font-bold text-violet-400 uppercase tracking-wider">Équipe</h2>
          </div>
          <div className="p-3 space-y-3">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.id} className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center font-syne font-bold text-xs text-slate-300 flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="font-syne font-bold text-xs text-slate-200 truncate">{member.name}</div>
                    <div className="font-mono text-[9px] text-slate-500 truncate">{member.role}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {member.permissions.map((perm) => (
                    <span key={perm} className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-slate-700/60 border border-slate-600/40 text-slate-400">
                      {perm}
                    </span>
                  ))}
                </div>
                <div className="font-mono text-[8px] text-slate-600 mt-2">Dernière connexion : {member.lastLogin}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
