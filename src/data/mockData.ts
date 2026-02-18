export type SignalType = 'opportunity' | 'competitor' | 'market';

export interface Scenario {
  id: number;
  type: SignalType;
  city: string | null;
  source: string;
  sourceClass: string;
  icon: string;
  confidence: number;
  value: number;
  short: string;
  detail: string;
  action: string;
  actionColor: string;
  modalTitle: string;
  modalBadge: string;
  modalBadgeClass: string;
  modalRef: string;
  modalActionLabel: string;
  modalContent: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    type: 'opportunity',
    city: 'geneve',
    source: 'Simap.ch',
    sourceClass: 'badge-simap',
    icon: '🏥',
    confidence: 96,
    value: 85000,
    short: 'AO #2026-441 : HUG Genève — Renouvellement 48 onduleurs salle blanche bloc op. B',
    detail: "Appel d'offres public, clôture 14 jours. Budget estimé CHF 80-90K.",
    action: 'Brouillon Email',
    actionColor: 'blue',
    modalTitle: '📧 Brouillon : Prise de contact HUG Genève',
    modalBadge: 'AO #2026-441',
    modalBadgeClass: 'badge-simap',
    modalRef: 'REF: HUG-GE-2026-441 · Source: Simap.ch',
    modalActionLabel: '📤 Envoyer au CRM & Agenda',
    modalContent: `<div class="font-mono text-xs bg-slate-950/80 border border-slate-700/60 rounded-xl p-4 mb-5"><div class="flex flex-col gap-1 text-slate-400"><div><span class="text-slate-600 mr-2">De :</span><span class="text-white">compte.commercial@intern-office.ch</span></div><div><span class="text-slate-600 mr-2">À :</span><span class="text-white">direction.technique@clientdemo.ch</span></div><div><span class="text-slate-600 mr-2">CC :</span><span class="text-white">achats@clientdemo.ch</span></div><div><span class="text-slate-600 mr-2">Objet :</span><span class="text-amber-300">Réponse AO #2026-441 — Solution Énergie Critique — [Gamme Medical S6300]</span></div></div></div><div class="space-y-3 text-slate-300"><p>Monsieur le Directeur Technique,</p><p>Suite à la publication de votre appel d'offres concernant le renouvellement de vos 48 onduleurs pour le bloc opératoire B, <strong class="text-white">notre structure</strong> est en mesure de vous proposer une solution complète et éprouvée.</p><div class="bg-slate-800/60 rounded-xl p-4 border border-slate-700/40"><p class="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 font-mono">Points Différenciants — Gamme Medical S6300</p><ul class="space-y-2 text-sm"><li class="flex gap-2"><span class="text-emerald-400 mt-0.5">✔</span><span><strong class="text-white">Proximité opérationnelle</strong> — Techniciens certifiés basés à Genève, temps de réponse SLA garanti &lt;2h</span></li><li class="flex gap-2"><span class="text-emerald-400 mt-0.5">✔</span><span><strong class="text-white">Fiabilité prouvée</strong> — MTBF &gt;260'000h, installation de référence identique au site hospitalier (2022)</span></li><li class="flex gap-2"><span class="text-emerald-400 mt-0.5">✔</span><span><strong class="text-white">Conformité médicale</strong> — Norme CEI 60364-7-710, IEC 62040</span></li><li class="flex gap-2"><span class="text-emerald-400 mt-0.5">✔</span><span><strong class="text-white">Contrat SLA inclus</strong> — Maintenance préventive annuelle + remplacement batteries sans coût additionnel année 1</span></li></ul></div><p>Je vous propose un <strong class="text-amber-400">audit gratuit de l'installation existante</strong> avant la clôture de l'appel d'offres.</p><p class="mt-4">Cordialement,<br/><strong class="text-white">Marc Dupont</strong> — Account Manager Romandie<br/><span class="text-slate-500 text-xs font-mono">+41 22 700 XX XX · m.dupont@intern-office.ch</span></p></div>`,
  },
  {
    id: 2,
    type: 'competitor',
    city: 'neuchatel',
    source: 'Crawler Web',
    sourceClass: 'badge-crawler',
    icon: '🛡️',
    confidence: 89,
    value: 45000,
    short: 'Concurrent Eaton : 3 avis négatifs Google — panne non résolue depuis 6 jours à Neuchâtel.',
    detail: "Client industriel en détresse. Fenêtre d'opportunité immédiate.",
    action: 'Offre de Reprise',
    actionColor: 'rose',
    modalTitle: '⚡ Offre Commerciale : Reprise Maintenance Neuchâtel',
    modalBadge: 'ALERTE CONCURRENCE',
    modalBadgeClass: 'badge-crawler',
    modalRef: 'REF: COMP-NE-2026-089 · Source: Google Reviews Crawler',
    modalActionLabel: '📞 Créer Opportunité CRM',
    modalContent: `<div class="grid grid-cols-3 gap-3 mb-5"><div class="bg-rose-900/20 border border-rose-500/30 rounded-xl p-3 text-center"><div class="text-2xl font-syne font-bold text-rose-400">1.8⭐</div><div class="text-xs text-slate-400 font-mono mt-1">NOTE GOOGLE</div></div><div class="bg-slate-800/60 border border-slate-700/30 rounded-xl p-3 text-center"><div class="text-2xl font-syne font-bold text-amber-400">6j</div><div class="text-xs text-slate-400 font-mono mt-1">PANNE EN COURS</div></div><div class="bg-emerald-900/20 border border-emerald-500/30 rounded-xl p-3 text-center"><div class="text-2xl font-syne font-bold text-emerald-400">72h</div><div class="text-xs text-slate-400 font-mono mt-1">NOTRE DÉLAI</div></div></div><div class="space-y-3 text-sm text-slate-300"><div class="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30"><p class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">Offre Spéciale Reprise</p><table class="w-full text-sm"><thead><tr class="text-slate-500 text-xs"><th class="p-1.5 text-left">Prestation</th><th class="p-1.5 text-right">Concurrent</th><th class="p-1.5 text-right text-emerald-400">Votre Structure</th></tr></thead><tbody class="divide-y divide-slate-700/40"><tr><td class="p-1.5">Audit complet installation</td><td class="p-1.5 text-right text-slate-500 line-through">CHF 1'400</td><td class="p-1.5 text-right font-bold text-emerald-400">OFFERT</td></tr><tr><td class="p-1.5">SLA 4h (24/7) — 12 mois</td><td class="p-1.5 text-right">CHF 5'200</td><td class="p-1.5 text-right font-bold">CHF 4'100</td></tr><tr><td class="p-1.5">Remplacement batteries (prév.)</td><td class="p-1.5 text-right">CHF 800</td><td class="p-1.5 text-right font-bold text-emerald-400">INCLUS</td></tr></tbody></table></div></div>`,
  },
  {
    id: 3,
    type: 'opportunity',
    city: 'sion',
    source: 'Simap.ch',
    sourceClass: 'badge-simap',
    icon: '🏗️',
    confidence: 93,
    value: 420000,
    short: 'Nouveau Datacenter "Alps Cloud" — Sion, Valais. Alimentation critique Tier III+, 2.5 MW.',
    detail: 'Projet massif, phase consultation préliminaire. Approche proactive recommandée.',
    action: 'Analyse Projet',
    actionColor: 'violet',
    modalTitle: '🏗️ Analyse Projet : Alps Cloud Datacenter — Sion',
    modalBadge: 'OPPORTUNITÉ MAJEURE',
    modalBadgeClass: 'badge-simap',
    modalRef: 'REF: DC-VS-2026-001 · Source: Simap.ch + Presse Valaisanne',
    modalActionLabel: '🗓️ Planifier Lunch & Learn',
    modalContent: `<div class="grid grid-cols-2 gap-3 mb-5"><div class="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3"><div class="text-xs font-mono text-slate-500 uppercase tracking-wider">Puissance IT</div><div class="font-syne text-2xl font-bold text-white mt-1">2.5 MW</div></div><div class="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3"><div class="text-xs font-mono text-slate-500 uppercase tracking-wider">Redondance cible</div><div class="font-syne text-2xl font-bold text-cyan-400 mt-1">Tier III+</div></div><div class="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3"><div class="text-xs font-mono text-slate-500 uppercase tracking-wider">Pipeline UPS estimé</div><div class="font-syne text-2xl font-bold text-amber-400 mt-1">CHF 420K</div></div><div class="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3"><div class="text-xs font-mono text-slate-500 uppercase tracking-wider">Livraison prévue</div><div class="font-syne text-2xl font-bold text-emerald-400 mt-1">Q4 2026</div></div></div><div class="space-y-4"><div class="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-4"><p class="text-xs font-bold text-cyan-400 uppercase font-mono tracking-wider mb-2">Recommandation Stratégique IA</p><p class="text-sm text-slate-300">Ce projet représente l'opportunité la <strong class="text-white">plus significative du pipeline 2026</strong> en Suisse Romande.</p></div><div class="bg-amber-900/10 border border-amber-500/20 rounded-xl p-3 text-xs text-amber-300"><strong>⚠ Risque :</strong> Schneider Electric et ABB connus pour cibler ce type de projet. Réactivité &lt;72h recommandée.</div></div>`,
  },
  {
    id: 4,
    type: 'market',
    city: null,
    source: 'RSS Presse',
    sourceClass: 'badge-news',
    icon: '📉',
    confidence: 78,
    value: 0,
    short: 'Hausse +18% du cuivre (LME) — Impact direct sur coûts batteries plomb-acide concurrents.',
    detail: 'Avantage compétitif temporaire sur les prix. Fenêtre 4-6 semaines.',
    action: 'Alerte Marché',
    actionColor: 'amber',
    modalTitle: '📊 Note de Marché : Hausse Cuivre LME',
    modalBadge: 'SIGNAL MARCHÉ',
    modalBadgeClass: 'badge-news',
    modalRef: 'Source: LME · Bloomberg Commodities · Mises à jour automatiques',
    modalActionLabel: "📋 Diffuser à l'équipe commerciale",
    modalContent: `<div class="space-y-4"><div class="bg-amber-900/10 border border-amber-500/20 rounded-xl p-4"><p class="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">Situation</p><p class="text-sm text-slate-300">Le cours du cuivre a progressé de <strong class="text-amber-400">+18% en 30 jours</strong> sur le LME, atteignant 9'850 USD/tonne. Cette hausse impacte directement les batteries plomb-acide des UPS traditionnels.</p></div><div class="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-3"><p class="text-xs font-bold text-cyan-400 font-mono mb-1">Fenêtre d'opportunité : 4-6 semaines</p><p class="text-sm text-slate-300">Communiquer proactivement à vos prospects sur la <strong class="text-white">stabilité de vos prix</strong>.</p></div></div>`,
  },
  {
    id: 5,
    type: 'opportunity',
    city: 'lausanne',
    source: 'Simap.ch',
    sourceClass: 'badge-simap',
    icon: '🏛️',
    confidence: 91,
    value: 95000,
    short: 'AO #2026-512 : CHUV Lausanne — Contrat maintenance préventive 120 UPS, durée 3 ans.',
    detail: 'Renouvellement contrat sortant. Concurrent actuel Eaton, satisfait à ~60%.',
    action: 'Dossier Offre',
    actionColor: 'blue',
    modalTitle: "📋 Dossier d'Offre : CHUV Lausanne — Maintenance 3 ans",
    modalBadge: 'RENOUVELLEMENT',
    modalBadgeClass: 'badge-simap',
    modalRef: 'REF: CHUV-VD-2026-512 · Fin contrat Eaton: 31.08.2026',
    modalActionLabel: '📤 Générer PDF & Transmettre',
    modalContent: `<div class="grid grid-cols-3 gap-3 mb-5"><div class="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3 text-center"><div class="font-syne text-xl font-bold text-white">120</div><div class="text-xs font-mono text-slate-400 mt-0.5">UPS À MAINTENIR</div></div><div class="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3 text-center"><div class="font-syne text-xl font-bold text-cyan-400">3 ans</div><div class="text-xs font-mono text-slate-400 mt-0.5">DURÉE CONTRAT</div></div><div class="bg-slate-800/60 border border-slate-700/40 rounded-xl p-3 text-center"><div class="font-syne text-xl font-bold text-emerald-400">CHF 95K</div><div class="text-xs font-mono text-slate-400 mt-0.5">VALEUR AN.</div></div></div><div class="space-y-3 text-sm"><div class="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4"><p class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">Notre Proposition</p><ul class="space-y-1.5 text-slate-300"><li class="flex gap-2"><span class="text-emerald-400">✔</span>SLA &lt;2h intervention Lausanne (vs 4h concurrent)</li><li class="flex gap-2"><span class="text-emerald-400">✔</span>Portail client temps réel (télémétrie UPS 24/7)</li><li class="flex gap-2"><span class="text-emerald-400">✔</span>Prix bloqué 3 ans (hors indexation officielle)</li></ul></div></div>`,
  },
  {
    id: 6,
    type: 'competitor',
    city: 'fribourg',
    source: 'LinkedIn',
    sourceClass: 'badge-linkedin',
    icon: '👤',
    confidence: 82,
    value: 0,
    short: 'Schneider Electric Romandie perd son ingénieur technique senior (départ LinkedIn détecté).',
    detail: 'Fragilisation de leur support technique pendant 2-3 mois. Relance clients communs.',
    action: 'Alerte Équipe',
    actionColor: 'rose',
    modalTitle: '🕵️ Rapport Concurrentiel : Schneider Electric',
    modalBadge: 'VEILLE CONCURRENTE',
    modalBadgeClass: 'badge-linkedin',
    modalRef: 'REF: COMP-FR-2026-041 · Source: LinkedIn Job API + CRM Croisé',
    modalActionLabel: "📢 Alerter l'équipe commerciale",
    modalContent: `<div class="space-y-4"><div class="bg-rose-900/10 border border-rose-500/20 rounded-xl p-4"><p class="text-xs font-mono font-bold text-rose-400 uppercase mb-2">Signal Détecté</p><p class="text-sm text-slate-300">Thomas R., <strong class="text-white">Ingénieur Applications Senior chez Schneider Electric Romandie</strong>, a mis à jour son profil LinkedIn (statut "Open to Work"). Il gérait 14 clients clés en Romandie depuis 6 ans.</p></div><div class="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-3"><p class="text-xs font-bold text-cyan-400 font-mono mb-1">Fenêtre d'opportunité : 8-12 semaines</p><p class="text-sm text-slate-300">Relancer proactivement les 7 clients communs avec un <strong class="text-white">audit technique offert</strong> pendant la période de transition Schneider.</p></div></div>`,
  },
  {
    id: 7,
    type: 'opportunity',
    city: 'fribourg',
    source: 'CRM Interne',
    sourceClass: 'badge-crm',
    icon: '🏢',
    confidence: 88,
    value: 38000,
    short: 'Rappel CRM : Commune de Fribourg — contrat maintenance échu le 30.03.2026. Renouvellement non signé.',
    detail: "Client existant, 14 UPS. Risque de perte si non relancé dans les 5 jours.",
    action: 'Rappel Urgent',
    actionColor: 'amber',
    modalTitle: '⚡ Rappel Urgent : Renouvellement Fribourg',
    modalBadge: 'CRM ALERT',
    modalBadgeClass: 'badge-crm',
    modalRef: 'REF: CRM-2026-FR-008 · Contact: Service Technique Communal',
    modalActionLabel: '📞 Créer Tâche de Rappel',
    modalContent: `<div class="bg-amber-900/10 border border-amber-500/30 rounded-xl p-4 mb-4"><p class="font-syne font-bold text-amber-400 text-lg">⚠ Contrat échu depuis 12 jours</p><p class="text-sm mt-1 text-slate-300">Le contrat de maintenance des 14 UPS de la Commune de Fribourg est arrivé à échéance le 30.03.2026 sans renouvellement signé.</p></div><div class="grid grid-cols-2 gap-3 mb-4"><div class="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30"><div class="text-xs font-mono text-slate-500 uppercase mb-1">Valeur annuelle</div><div class="font-syne font-bold text-white text-xl">CHF 38'000</div></div><div class="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30"><div class="text-xs font-mono text-slate-500 uppercase mb-1">Historique client</div><div class="font-syne font-bold text-emerald-400 text-xl">7 ans</div></div></div><div class="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-3"><p class="font-mono text-xs font-bold text-emerald-400 mb-1">Offre de fidélisation suggérée</p><p class="text-sm text-slate-300">Proposer 3% de remise sur renouvellement 3 ans + formation gratuite nouveau technicien communal.</p></div>`,
  },
  {
    id: 8,
    type: 'opportunity',
    city: 'delemont',
    source: 'Simap.ch',
    sourceClass: 'badge-simap',
    icon: '🏭',
    confidence: 85,
    value: 65000,
    short: 'AO #2026-388 : Canton du Jura — Infrastructure électrique critique, bâtiments administratifs.',
    detail: 'Périmètre 8 bâtiments, protection totale. Clôture dans 21 jours.',
    action: 'Dossier Candidature',
    actionColor: 'blue',
    modalTitle: "📑 Appel d'Offres : Canton du Jura — Bâtiments Admin",
    modalBadge: 'AO #2026-388',
    modalBadgeClass: 'badge-simap',
    modalRef: 'REF: JU-2026-388 · Clôture: 05.05.2026 · Simap.ch',
    modalActionLabel: '📤 Préparer Dossier Complet',
    modalContent: `<div class="space-y-4"><div class="grid grid-cols-2 gap-3"><div class="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30"><div class="text-xs font-mono text-slate-500 uppercase mb-1">Périmètre</div><div class="font-syne font-bold text-white text-xl">8 bâtiments</div></div><div class="bg-slate-800/60 rounded-xl p-3 border border-slate-700/30"><div class="text-xs font-mono text-slate-500 uppercase mb-1">Budget estimé</div><div class="font-syne font-bold text-amber-400 text-xl">CHF 65K</div></div></div><div class="bg-slate-800/40 rounded-xl p-4"><p class="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">Critères d'Évaluation</p><div class="space-y-1.5 text-sm text-slate-300"><div class="flex justify-between"><span>Prix</span><span class="font-mono text-cyan-400">40%</span></div><div class="flex justify-between"><span>Délai de livraison</span><span class="font-mono text-cyan-400">20%</span></div><div class="flex justify-between"><span>Références cantonales</span><span class="font-mono text-cyan-400">25%</span></div><div class="flex justify-between"><span>Service après-vente & SLA</span><span class="font-mono text-cyan-400">15%</span></div></div></div><div class="bg-cyan-900/10 border border-cyan-500/20 rounded-xl p-3"><p class="text-xs font-bold text-cyan-400 font-mono mb-1">Atout : Référence HFR</p><p class="text-sm text-slate-300">Notre installation à l'HFR est une référence sectorielle forte pour un client cantonal jurassien.</p></div></div>`,
  },
];

export interface Tender {
  id: string;
  title: string;
  institution: string;
  canton: string;
  type: 'Fournitures' | 'Maintenance' | 'Travaux';
  budget: number;
  closingDate: string;
  daysLeft: number;
  compatibility: number;
  status: 'open' | 'urgent' | 'closed';
}

export const TENDERS: Tender[] = [
  { id: 'AO-2026-441', title: 'Renouvellement 48 onduleurs bloc opératoire B', institution: 'HUG — Hôpitaux Universitaires de Genève', canton: 'GE', type: 'Fournitures', budget: 85000, closingDate: '28.04.2026', daysLeft: 14, compatibility: 96, status: 'urgent' },
  { id: 'AO-2026-512', title: 'Contrat maintenance préventive 120 UPS — 3 ans', institution: 'CHUV — Centre Hospitalier Universitaire Vaudois', canton: 'VD', type: 'Maintenance', budget: 95000, closingDate: '05.05.2026', daysLeft: 21, compatibility: 91, status: 'open' },
  { id: 'AO-2026-388', title: 'Infrastructure électrique critique bâtiments administratifs', institution: 'Canton du Jura — Service des Bâtiments', canton: 'JU', type: 'Fournitures', budget: 65000, closingDate: '05.05.2026', daysLeft: 21, compatibility: 85, status: 'open' },
  { id: 'AO-2026-299', title: 'Alimentation de secours datacenter municipal', institution: 'Ville de Lausanne — Direction du Numérique', canton: 'VD', type: 'Fournitures', budget: 180000, closingDate: '12.05.2026', daysLeft: 28, compatibility: 88, status: 'open' },
  { id: 'AO-2026-310', title: 'Maintenance UPS salles serveurs — 5 sites', institution: 'CFF — Infrastructure Romandie', canton: 'VD', type: 'Maintenance', budget: 120000, closingDate: '19.05.2026', daysLeft: 35, compatibility: 79, status: 'open' },
  { id: 'AO-2026-276', title: 'Protection électrique urgences & blocs opératoires', institution: 'HFR — Hôpital Fribourgeois', canton: 'FR', type: 'Fournitures', budget: 95000, closingDate: '26.05.2026', daysLeft: 42, compatibility: 93, status: 'open' },
  { id: 'AO-2026-341', title: 'Systèmes UPS tours de contrôle aéroportuaires', institution: "Aéroport International de Genève", canton: 'GE', type: 'Fournitures', budget: 240000, closingDate: '02.06.2026', daysLeft: 49, compatibility: 71, status: 'open' },
  { id: 'AO-2026-358', title: 'Onduleurs centraux administration cantonale', institution: 'Canton de Vaud — Service Informatique', canton: 'VD', type: 'Fournitures', budget: 75000, closingDate: '09.06.2026', daysLeft: 56, compatibility: 82, status: 'open' },
  { id: 'AO-2026-401', title: 'Maintenance préventive infrastructure critique Valais', institution: 'État du Valais — DNUM', canton: 'VS', type: 'Maintenance', budget: 55000, closingDate: '16.06.2026', daysLeft: 63, compatibility: 77, status: 'open' },
  { id: 'AO-2026-412', title: 'Protection électrique laboratoires de recherche', institution: 'EPFL — Direction des Infrastructures', canton: 'VD', type: 'Fournitures', budget: 320000, closingDate: '23.06.2026', daysLeft: 70, compatibility: 68, status: 'open' },
  { id: 'AO-2026-425', title: 'Onduleurs modulaires centre de calcul HPC', institution: 'Université de Genève — DSIN', canton: 'GE', type: 'Fournitures', budget: 195000, closingDate: '30.06.2026', daysLeft: 77, compatibility: 74, status: 'open' },
  { id: 'AO-2026-440', title: 'Contrat maintenance UPS réseau distribution', institution: 'Groupe E SA — Réseaux Fribourg', canton: 'FR', type: 'Maintenance', budget: 42000, closingDate: '07.07.2026', daysLeft: 84, compatibility: 86, status: 'open' },
  { id: 'AO-2026-455', title: 'Infrastructure électrique nouveau bâtiment cantonal', institution: 'Canton de Neuchâtel — SIEN', canton: 'NE', type: 'Travaux', budget: 150000, closingDate: '14.07.2026', daysLeft: 91, compatibility: 62, status: 'open' },
  { id: 'AO-2026-001', title: 'Alimentation critique Tier III+ Datacenter Alps Cloud', institution: 'Alps Cloud SA — Nouveau Datacenter Sion', canton: 'VS', type: 'Fournitures', budget: 420000, closingDate: '15.09.2026', daysLeft: 154, compatibility: 93, status: 'open' },
];

export interface Competitor {
  id: string;
  name: string;
  marketShare: number;
  lastActivity: string;
  alert: string;
  alertLevel: 'low' | 'medium' | 'critical';
  trend: 'up' | 'down' | 'stable';
  radar: { prix: number; reactivite: number; couverture: number; technicite: number; satisfaction: number };
}

export const COMPETITORS: Competitor[] = [
  { id: 'statron', name: 'Votre Structure', marketShare: 28, lastActivity: "Scan automatique — aujourd'hui", alert: 'Leader local', alertLevel: 'low', trend: 'up', radar: { prix: 82, reactivite: 95, couverture: 90, technicite: 88, satisfaction: 91 } },
  { id: 'eaton', name: 'Eaton Switzerland', marketShare: 35, lastActivity: '3 avis négatifs Google — Neuchâtel', alert: 'Panne non résolue 6j', alertLevel: 'critical', trend: 'down', radar: { prix: 65, reactivite: 60, couverture: 95, technicite: 85, satisfaction: 64 } },
  { id: 'schneider', name: 'Schneider Electric', marketShare: 22, lastActivity: 'Départ ingénieur senior détecté', alert: 'Fragilisation support', alertLevel: 'medium', trend: 'down', radar: { prix: 58, reactivite: 72, couverture: 88, technicite: 90, satisfaction: 76 } },
  { id: 'abb', name: 'ABB Power Protection', marketShare: 8, lastActivity: 'Nouvelle offre Tier IV publiée', alert: 'Offre concurrente DC', alertLevel: 'medium', trend: 'up', radar: { prix: 50, reactivite: 68, couverture: 75, technicite: 92, satisfaction: 79 } },
  { id: 'socomec', name: 'Socomec SA', marketShare: 4, lastActivity: 'Aucune activité récente', alert: 'Stable', alertLevel: 'low', trend: 'stable', radar: { prix: 78, reactivite: 74, couverture: 55, technicite: 70, satisfaction: 77 } },
  { id: 'riello', name: 'Riello UPS', marketShare: 3, lastActivity: 'Nouveau partenariat revendeur GE', alert: 'Expansion prévue', alertLevel: 'low', trend: 'up', radar: { prix: 88, reactivite: 65, couverture: 42, technicite: 66, satisfaction: 72 } },
];

export interface PipelineOpportunity {
  id: string;
  title: string;
  city: string;
  canton: string;
  value: number;
  aiScore: number;
  deadline: string;
  daysLeft: number;
  source: string;
  sourceClass: string;
  icon: string;
  stage: 'detected' | 'qualified' | 'offer_sent' | 'negotiation' | 'won' | 'lost';
}

export const PIPELINE: PipelineOpportunity[] = [
  { id: 'p1', title: 'HUG — 48 onduleurs bloc op. B', city: 'Genève', canton: 'GE', value: 85000, aiScore: 96, deadline: '28.04.2026', daysLeft: 14, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '🏥', stage: 'detected' },
  { id: 'p2', title: 'Alps Cloud — Datacenter Sion 2.5MW', city: 'Sion', canton: 'VS', value: 420000, aiScore: 93, deadline: '15.09.2026', daysLeft: 154, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '🏗️', stage: 'detected' },
  { id: 'p3', title: 'Canton Jura — 8 bâtiments admin', city: 'Delémont', canton: 'JU', value: 65000, aiScore: 85, deadline: '05.05.2026', daysLeft: 21, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '🏭', stage: 'detected' },
  { id: 'p4', title: 'CHUV — Maintenance 120 UPS 3 ans', city: 'Lausanne', canton: 'VD', value: 95000, aiScore: 91, deadline: '05.05.2026', daysLeft: 21, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '🏛️', stage: 'qualified' },
  { id: 'p5', title: 'Commune Fribourg — Renouvellement contrat', city: 'Fribourg', canton: 'FR', value: 38000, aiScore: 88, deadline: '25.04.2026', daysLeft: 5, source: 'CRM Interne', sourceClass: 'badge-crm', icon: '🏢', stage: 'qualified' },
  { id: 'p6', title: "Ville de Lausanne — Datacenter municipal", city: 'Lausanne', canton: 'VD', value: 180000, aiScore: 88, deadline: '12.05.2026', daysLeft: 28, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '🏙️', stage: 'qualified' },
  { id: 'p7', title: 'HFR — Protection urgences & blocs op.', city: 'Fribourg', canton: 'FR', value: 95000, aiScore: 93, deadline: '26.05.2026', daysLeft: 42, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '🏥', stage: 'offer_sent' },
  { id: 'p8', title: 'CFF Romandie — Maintenance 5 sites', city: 'Lausanne', canton: 'VD', value: 120000, aiScore: 79, deadline: '19.05.2026', daysLeft: 35, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '🚂', stage: 'offer_sent' },
  { id: 'p9', title: 'EPFL — Laboratoires de recherche', city: 'Lausanne', canton: 'VD', value: 320000, aiScore: 68, deadline: '23.06.2026', daysLeft: 70, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '🔬', stage: 'negotiation' },
  { id: 'p10', title: 'Groupe E SA — Réseau distribution FR', city: 'Fribourg', canton: 'FR', value: 42000, aiScore: 86, deadline: '07.07.2026', daysLeft: 84, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '⚡', stage: 'negotiation' },
  { id: 'p11', title: 'SIG — Centrale hydroélectrique Genève', city: 'Genève', canton: 'GE', value: 155000, aiScore: 82, deadline: '—', daysLeft: 999, source: 'CRM Interne', sourceClass: 'badge-crm', icon: '💧', stage: 'won' },
  { id: 'p12', title: 'Aéroport Genève — Tours de contrôle', city: 'Genève', canton: 'GE', value: 240000, aiScore: 71, deadline: '—', daysLeft: 999, source: 'Simap.ch', sourceClass: 'badge-simap', icon: '✈️', stage: 'won' },
];

export const MONTHLY_HISTORY = [
  { month: 'Avr 24', opportunities: 4, value: 210000 },
  { month: 'Mai 24', opportunities: 6, value: 345000 },
  { month: 'Jui 24', opportunities: 3, value: 180000 },
  { month: 'Jul 24', opportunities: 8, value: 520000 },
  { month: 'Aoû 24', opportunities: 5, value: 290000 },
  { month: 'Sep 24', opportunities: 7, value: 415000 },
  { month: 'Oct 24', opportunities: 9, value: 580000 },
  { month: 'Nov 24', opportunities: 6, value: 320000 },
  { month: 'Déc 24', opportunities: 4, value: 215000 },
  { month: 'Jan 25', opportunities: 10, value: 640000 },
  { month: 'Fév 25', opportunities: 8, value: 480000 },
  { month: 'Mar 25', opportunities: 12, value: 703000 },
];

export const KPI_SPARKLINES = {
  opp:   [4, 6, 3, 8, 5, 7, 9, 6, 4, 10, 8, 12],
  src:   [40, 41, 42, 43, 43, 44, 45, 45, 46, 46, 47, 47],
  pipe:  [210, 345, 180, 520, 290, 415, 580, 320, 215, 640, 480, 703],
  alert: [1, 2, 1, 3, 2, 1, 2, 3, 2, 2, 3, 3],
};

export const SOURCES = [
  { id: 's1', name: 'Simap.ch', description: 'Appels d\'offres publics suisses', enabled: true, frequency: 2, lastSync: 'Il y a 1h23', status: 'ok' as const, icon: '📋' },
  { id: 's2', name: 'SHAB', description: 'Feuille officielle du commerce', enabled: true, frequency: 24, lastSync: 'Il y a 3h12', status: 'ok' as const, icon: '📰' },
  { id: 's3', name: 'LinkedIn', description: 'Veille RH & mouvement concurrents', enabled: true, frequency: 6, lastSync: 'Il y a 45min', status: 'ok' as const, icon: '💼' },
  { id: 's4', name: 'Google Alerts', description: 'Veille presse & actualités secteur', enabled: true, frequency: 4, lastSync: 'Il y a 2h05', status: 'ok' as const, icon: '🔔' },
  { id: 's5', name: 'Google Maps Reviews', description: 'Avis clients concurrents', enabled: true, frequency: 12, lastSync: 'Il y a 6h14', status: 'ok' as const, icon: '⭐' },
  { id: 's6', name: 'RSS Presse Romande', description: '24 Heures, Le Temps, ArcInfo…', enabled: true, frequency: 1, lastSync: 'Il y a 18min', status: 'ok' as const, icon: '📡' },
  { id: 's7', name: 'CRM Interne', description: 'Base clients & contrats actifs', enabled: true, frequency: 0.5, lastSync: 'Il y a 5min', status: 'ok' as const, icon: '🗃️' },
  { id: 's8', name: 'Base Clients', description: 'Historique & prédictions renouvellement', enabled: false, frequency: 24, lastSync: 'Il y a 2 jours', status: 'error' as const, icon: '👥' },
];

export const TEAM_MEMBERS = [
  { id: 'u1', name: 'Marc Dupont', role: 'Account Manager', email: 'm.dupont@intern-office.ch', permissions: ['dashboard', 'pipeline', 'tenders', 'competitors'], lastLogin: 'Il y a 2min', avatar: 'MD' },
  { id: 'u2', name: 'Sophie Meier', role: 'Directrice Commerciale', email: 's.meier@intern-office.ch', permissions: ['dashboard', 'pipeline', 'tenders', 'competitors', 'settings', 'export'], lastLogin: "Aujourd'hui 09:14", avatar: 'SM' },
  { id: 'u3', name: 'Luca Rossi', role: 'Technicien Senior', email: 'l.rossi@intern-office.ch', permissions: ['dashboard', 'tenders'], lastLogin: 'Il y a 1h', avatar: 'LR' },
];
