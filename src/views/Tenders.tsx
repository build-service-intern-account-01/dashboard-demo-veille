import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TENDERS, Tender } from '../data/mockData';
import { getEmailTemplate } from '../data/emailTemplates';
import { ChevronDown, ChevronUp, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import BrouillonEmailModal from '../components/shared/BrouillonEmailModal';

const CANTONS = ['Tous', 'GE', 'VD', 'VS', 'NE', 'FR', 'JU'];
const TYPES = ['Tous', 'Fournitures', 'Maintenance', 'Travaux'];

type SortKey = 'budget' | 'daysLeft' | 'compatibility' | 'id';

function CountdownBadge({ days }: { days: number }) {
  if (days <= 7) return <span className="font-mono text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded animate-pulse">{days}j ⚠</span>;
  if (days <= 21) return <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">{days}j</span>;
  return <span className="font-mono text-[10px] text-slate-400 bg-slate-800/60 border border-slate-700 px-2 py-0.5 rounded">{days}j</span>;
}

function CompatBadge({ score }: { score: number }) {
  const cls = score >= 90 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' :
              score >= 80 ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' :
              'text-amber-400 bg-amber-500/10 border-amber-500/30';
  return <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${cls}`}>{score}%</span>;
}

function TenderDrawer({ tender, onClose, onGenerateEmail }: { tender: Tender; onClose: () => void; onGenerateEmail: (t: Tender) => void }) {
  return (
    <div className="glass rounded-xl flex flex-col overflow-hidden border-l-2 border-cyan-500/30" style={{ minWidth: 320, maxWidth: 360 }}>
      <div className="flex-none px-4 py-3 border-b border-white/5 flex items-center justify-between bg-slate-900/40">
        <div>
          <div className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider mb-0.5">{tender.id}</div>
          <h3 className="font-syne text-sm font-bold text-white leading-tight">{tender.title}</h3>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors flex-shrink-0 ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollthin p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30">
            <div className="font-mono text-[9px] text-slate-500 uppercase mb-0.5">Institution</div>
            <div className="text-xs text-slate-200 leading-tight">{tender.institution}</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30">
            <div className="font-mono text-[9px] text-slate-500 uppercase mb-0.5">Canton</div>
            <div className="font-syne text-lg font-bold text-cyan-400">{tender.canton}</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30">
            <div className="font-mono text-[9px] text-slate-500 uppercase mb-0.5">Budget estimé</div>
            <div className="font-syne text-lg font-bold text-amber-400">CHF {(tender.budget / 1000).toFixed(0)}K</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30">
            <div className="font-mono text-[9px] text-slate-500 uppercase mb-0.5">Clôture</div>
            <div className={`font-syne text-lg font-bold ${tender.daysLeft <= 14 ? 'text-rose-400' : 'text-white'}`}>{tender.closingDate}</div>
          </div>
        </div>

        <div className="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-3">
          <div className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider mb-2">Recommandation IA</div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Score de compatibilité <strong className="text-cyan-400">{tender.compatibility}%</strong>.
            {tender.compatibility >= 90
              ? " Profil d'appel d'offres idéal pour votre structure. Prioriser en urgence."
              : tender.compatibility >= 80
              ? " Bonne adéquation. Préparer un dossier solide avec références sectorielles."
              : " Compatibilité modérée. Évaluer l'effort vs la probabilité avant soumission."}
          </p>
        </div>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-slate-500 uppercase w-16">Type</span>
            <span className="glass px-2 py-0.5 rounded text-[10px] font-mono">{tender.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] text-slate-500 uppercase w-16">Statut</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${tender.daysLeft <= 7 ? 'text-rose-400 bg-rose-500/10 border border-rose-500/30' : 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/30'}`}>
              {tender.daysLeft <= 7 ? 'URGENT' : 'OUVERT'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onGenerateEmail(tender)}
          className="w-full py-2.5 px-4 rounded-xl font-syne font-bold text-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:-translate-y-px shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Générer Brouillon de Réponse
        </button>
      </div>
    </div>
  );
}

export default function Tenders() {
  const [canton, setCanton] = useState('Tous');
  const [type, setType] = useState('Tous');
  const [maxBudget, setMaxBudget] = useState(500000);
  const [statronOnly, setStatronOnly] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('daysLeft');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [page, setPage] = useState(0);
  const [emailTender, setEmailTender] = useState<Tender | null>(null);
  const [sentTenderIds, setSentTenderIds] = useState<Set<string>>(new Set());

  const PER_PAGE = 8;

  const filtered = TENDERS
    .filter((t) => canton === 'Tous' || t.canton === canton)
    .filter((t) => type === 'Tous' || t.type === type)
    .filter((t) => t.budget <= maxBudget)
    .filter((t) => !statronOnly || t.compatibility >= 80)
    .sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      if (sortKey === 'budget') return (a.budget - b.budget) * dir;
      if (sortKey === 'daysLeft') return (a.daysLeft - b.daysLeft) * dir;
      if (sortKey === 'compatibility') return (a.compatibility - b.compatibility) * dir;
      return a.id.localeCompare(b.id) * dir;
    });

  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronDown className="w-3 h-3 text-slate-600" />;
    return sortAsc ? <ChevronUp className="w-3 h-3 text-cyan-400" /> : <ChevronDown className="w-3 h-3 text-cyan-400" />;
  }

  return (
    <div className="flex flex-col h-full p-2 md:p-3 gap-2 overflow-hidden">
      <header className="flex-none glass rounded-xl px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-syne text-lg font-bold text-white">Appels d'Offres</h1>
          <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Moteur de veille Simap.ch simulé · {TENDERS.length} AO actifs</p>
        </div>
        <div className="font-mono text-[9px] text-emerald-400 flex items-center gap-1.5">
          <span className="status-dot green" />
          Synchronisé il y a 1h23
        </div>
      </header>

      {/* Filters */}
      <div className="flex-none glass rounded-xl px-4 py-2.5 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="font-mono text-[9px] text-slate-500 uppercase">Canton</label>
          <select
            value={canton}
            onChange={(e) => setCanton(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs px-2 py-1 rounded-lg font-mono focus:outline-none focus:border-cyan-500/50"
          >
            {CANTONS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-mono text-[9px] text-slate-500 uppercase">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-xs px-2 py-1 rounded-lg font-mono focus:outline-none focus:border-cyan-500/50"
          >
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-mono text-[9px] text-slate-500 uppercase">Budget max</label>
          <input
            type="range" min={0} max={500000} step={10000}
            value={maxBudget}
            onChange={(e) => setMaxBudget(+e.target.value)}
            className="w-24 accent-cyan-400"
          />
          <span className="font-mono text-[9px] text-cyan-400">CHF {(maxBudget / 1000).toFixed(0)}K</span>
        </div>
        <label className="flex items-center gap-2 cursor-pointer ml-auto">
          <div
            onClick={() => setStatronOnly(!statronOnly)}
            className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${statronOnly ? 'bg-cyan-500' : 'bg-slate-700'}`}
          >
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${statronOnly ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          <span className="font-mono text-[9px] text-slate-400">Compatibles votre structure uniquement</span>
        </label>
        <span className="font-mono text-[9px] text-slate-500">{filtered.length} résultats</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-2 min-h-0 overflow-hidden">
        <div className="flex-1 glass rounded-xl flex flex-col overflow-hidden">
          <div className="flex-none overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5 bg-slate-900/40">
                  <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider cursor-pointer hover:text-slate-300" onClick={() => toggleSort('id')}>
                    <div className="flex items-center gap-1">N° AO <SortIcon k="id" /></div>
                  </th>
                  <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider">Titre / Institution</th>
                  <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider">Canton</th>
                  <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider cursor-pointer hover:text-slate-300" onClick={() => toggleSort('budget')}>
                    <div className="flex items-center gap-1">Budget <SortIcon k="budget" /></div>
                  </th>
                  <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider cursor-pointer hover:text-slate-300" onClick={() => toggleSort('daysLeft')}>
                    <div className="flex items-center gap-1">Clôture <SortIcon k="daysLeft" /></div>
                  </th>
                  <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider cursor-pointer hover:text-slate-300" onClick={() => toggleSort('compatibility')}>
                    <div className="flex items-center gap-1">Score IA <SortIcon k="compatibility" /></div>
                  </th>
                  <th className="font-mono text-[9px] text-slate-500 text-left px-3 py-2 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((tender) => (
                  <tr
                    key={tender.id}
                    className={`border-b border-white/5 hover:bg-slate-800/40 transition-colors cursor-pointer ${selectedTender?.id === tender.id ? 'bg-cyan-900/10 border-l-2 border-cyan-500/40' : ''}`}
                    onClick={() => setSelectedTender(selectedTender?.id === tender.id ? null : tender)}
                  >
                    <td className="px-3 py-2.5 font-mono text-[10px] text-cyan-400 whitespace-nowrap">{tender.id}</td>
                    <td className="px-3 py-2.5">
                      <div className="font-medium text-slate-200 truncate max-w-[220px]">{tender.title}</div>
                      <div className="font-mono text-[9px] text-slate-500 truncate max-w-[220px] mt-0.5">{tender.institution}</div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">{tender.canton}</span>
                    </td>
                    <td className="px-3 py-2.5 font-syne font-bold text-amber-400 text-[11px] whitespace-nowrap">
                      CHF {(tender.budget / 1000).toFixed(0)}K
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <CountdownBadge days={tender.daysLeft} />
                    </td>
                    <td className="px-3 py-2.5 whitespace-nowrap">
                      <CompatBadge score={tender.compatibility} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedTender(tender); }}
                          className="font-mono text-[9px] text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-400/50 px-2 py-0.5 rounded transition-colors"
                        >
                          Voir détail
                        </button>
                        {sentTenderIds.has(tender.id) && (
                          <span className="flex items-center gap-0.5 font-mono text-[8px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded whitespace-nowrap">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            ENVOYÉ
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex-none px-4 py-2 border-t border-white/5 flex items-center justify-between">
            <span className="font-mono text-[9px] text-slate-500">
              {page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, filtered.length)} sur {filtered.length}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-6 h-6 rounded font-mono text-[9px] transition-colors ${page === i ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer */}
        {selectedTender && (
          <TenderDrawer
            tender={selectedTender}
            onClose={() => setSelectedTender(null)}
            onGenerateEmail={(t) => setEmailTender(t)}
          />
        )}
      </div>

      {/* Email draft modal */}
      <AnimatePresence>
        {emailTender && (() => {
          const tmpl = getEmailTemplate(emailTender.id);
          if (!tmpl) return null;
          return (
            <BrouillonEmailModal
              template={tmpl}
              tenderTitle={emailTender.title}
              onClose={() => setEmailTender(null)}
              onMarkSent={() => {
                setSentTenderIds((prev) => new Set([...prev, emailTender.id]));
                setEmailTender(null);
              }}
            />
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
