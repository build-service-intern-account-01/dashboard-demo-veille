export interface EmailTemplate {
  tenderId: string;
  from: string;
  to: string;
  cc: string;
  subject: string;
  body: string;
  confidence: number;
}

export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  'AO-2026-441': {
    tenderId: 'AO-2026-441',
    from: 'account.manager@statron.ch',
    to: 'direction.technique@hug.ch',
    cc: 'achats@hug.ch; direction@statron.ch',
    subject: 'Réponse AO #2026-441 — Protection électrique critique / Statron Série S6300 Medical',
    confidence: 96,
    body: `Monsieur le Directeur Technique,

Suite à la publication de votre appel d'offres concernant le renouvellement de 48 onduleurs pour le bloc opératoire B des HUG, Statron Romandie est en mesure de vous proposer une solution éprouvée répondant à l'ensemble de vos exigences techniques et réglementaires.

Pourquoi Statron avant la clôture de votre consultation ?

  • Proximité opérationnelle — Nos techniciens certifiés sont basés à Genève, garantissant un temps de réponse SLA inférieur à 2 heures, 24h/24, 7j/7.

  • Fiabilité documentée — Notre Série S6300 Medical affiche un MTBF supérieur à 260'000 heures. Référence comparable : installation identique au CHUV (2022), disponibilité 99.998% sur 24 mois.

  • Conformité complète — Norme CEI 60364-7-710 (locaux à usage médical), IEC 62040-3, marquage CE médical classe IIa.

  • Accompagnement inclus — Audit gratuit de l'installation existante avant soumission, formation du personnel technique, contrat SLA 5 ans optionnel.

Je vous propose un échange de 30 minutes cette semaine — en vos locaux ou par visioconférence — pour affiner notre proposition à vos contraintes.

Dans l'attente de votre retour, je reste à votre disposition.

Cordialement,

Marc Dupont — Account Manager Romandie
STATRON ROMANDIE SA
Tél. : +41 22 700 XX XX
m.dupont@statron.ch | www.statron.ch`,
  },

  'AO-2026-512': {
    tenderId: 'AO-2026-512',
    from: 'account.manager@statron.ch',
    to: 'direction.technique@chuv.ch',
    cc: 'service.achats@chuv.ch; direction@statron.ch',
    subject: 'Réponse AO #2026-512 — Contrat maintenance 120 UPS / Statron SLA Premium 3 ans',
    confidence: 91,
    body: `Madame, Monsieur,

À l'approche de l'échéance du contrat de maintenance en cours pour les 120 onduleurs de votre infrastructure, Statron Romandie souhaite vous présenter une offre de reprise compétitive et techniquement supérieure.

Ce qui différencie notre proposition :

  • SLA inférieur à 2h à Lausanne — Nos équipes techniques sont positionnées sur le site de Lausanne, contre 4 heures pour le prestataire sortant. En milieu hospitalier critique, chaque minute compte.

  • Portail de supervision temps réel — Accès 24h/24 à la télémétrie complète de chaque onduleur (charge, autonomie, température batteries, événements). Tableau de bord dédié CHUV sans surcoût.

  • Rapport mensuel automatisé — Conformité CEI, historique incidents, prévisions de maintenance préventive. Zéro travail administratif pour vos équipes.

  • Stabilité tarifaire garantie — Prix contractuels bloqués sur 3 ans (hors indexation officielle publiée). Aucune surprise budgétaire.

  • Remplacement batteries inclus — Intégré dans le contrat de maintenance préventive dès la première année, sans facturation additionnelle.

Notre analyse de l'installation actuelle indique un potentiel d'optimisation sur 14 onduleurs prioritaires. Je vous propose un audit technique gratuit de deux jours avant la soumission de votre dossier.

Je reste disponible à votre convenance pour un entretien téléphonique ou une présentation sur site.

Cordialement,

Marc Dupont — Account Manager Romandie
STATRON ROMANDIE SA
Tél. : +41 22 700 XX XX
m.dupont@statron.ch | www.statron.ch`,
  },

  'AO-2026-388': {
    tenderId: 'AO-2026-388',
    from: 'account.manager@statron.ch',
    to: 'service.batiments@jura.ch',
    cc: 'informatique@jura.ch; direction@statron.ch',
    subject: 'Réponse AO #2026-388 — Infrastructure électrique critique Canton du Jura / Statron',
    confidence: 85,
    body: `Monsieur le Responsable des Bâtiments,

Nous avons pris connaissance de votre appel d'offres concernant la protection électrique critique des 8 bâtiments administratifs du Canton du Jura. Statron Romandie est en mesure de vous soumettre une offre complète, compétitive et soutenue par des références cantonales solides.

Points forts de notre dossier au regard de vos critères d'évaluation :

  • Références cantonales (25% de la pondération) — Notre installation à l'Hôpital Fribourgeois (HFR) constitue une référence sectorielle directement comparable : 8 sites, infrastructure critique, SLA 4 heures. Disponible pour visite de référence sur demande.

  • Délai de livraison (20%) — Stock disponible pour 6 des 8 bâtiments sur matériel standard. Délai garanti de 6 semaines pour l'ensemble du périmètre, avec planning de déploiement site par site pour assurer la continuité de service.

  • Prix compétitif (40%) — Grâce à nos volumes d'achat consolidés sur la Romandie, nous pouvons vous proposer des tarifs très compétitifs incluant l'installation, la mise en service et la formation.

  • Service après-vente & SLA (15%) — Techniciens basés à Delémont et Porrentruy. Intervention garantie sous 4 heures en jours ouvrables, 8 heures le week-end.

Nous serons heureux de vous transmettre notre dossier de candidature complet, accompagné d'une offre détaillée site par site.

Cordialement,

Marc Dupont — Account Manager Romandie
STATRON ROMANDIE SA
Tél. : +41 22 700 XX XX
m.dupont@statron.ch | www.statron.ch`,
  },

  'AO-2026-299': {
    tenderId: 'AO-2026-299',
    from: 'account.manager@statron.ch',
    to: 'direction.numerique@lausanne.ch',
    cc: 'achats@lausanne.ch; direction@statron.ch',
    subject: 'Réponse AO #2026-299 — Datacenter municipal Lausanne / Statron Gamme Modulaire S9000',
    confidence: 88,
    body: `Madame la Directrice du Numérique,

La Ville de Lausanne s'apprête à moderniser l'alimentation de secours de son datacenter municipal. Statron Romandie vous propose la gamme modulaire S9000, spécialement conçue pour les datacenters urbains en croissance.

Architecture modulaire — le choix stratégique pour un datacenter municipal :

  • Scalabilité à la demande — Capacité initiale de 100 kVA extensible à 600 kVA par ajout de modules sans coupure. Votre infrastructure évolue avec vos besoins sans renouvellement matériel.

  • PUE optimisé — Notre technologie double-conversion OnLine atteint un PUE électrique de 1.04 (vs 1.12 pour les onduleurs classiques), soit une économie d'énergie annuelle estimée à CHF 8'400 sur votre périmètre.

  • Redondance N+1 intégrée — Architecture parallèle active permettant la maintenance sans interruption de service. Aucune fenêtre de maintenance planifiée.

  • Monitoring DCIM natif — Intégration API REST avec les outils de supervision existants (Nagios, Zabbix, PRTG). Alertes en temps réel sur tous les paramètres critiques.

  • Référence comparable — Datacenter de la Ville de Genève (SIG), 180 kVA, opérationnel depuis 2023. Disponibilité 99.999% sur 18 mois.

Je vous propose de vous présenter notre solution lors d'une session technique de 45 minutes, avec démonstration du portail de monitoring et simulation de basculement.

Cordialement,

Marc Dupont — Account Manager Romandie
STATRON ROMANDIE SA
Tél. : +41 22 700 XX XX
m.dupont@statron.ch | www.statron.ch`,
  },

  'AO-2026-310': {
    tenderId: 'AO-2026-310',
    from: 'account.manager@statron.ch',
    to: 'infrastructure.romandie@cff.ch',
    cc: 'achats.technique@cff.ch; direction@statron.ch',
    subject: 'Réponse AO #2026-310 — Infrastructure critique ferroviaire / Statron EN 50121',
    confidence: 79,
    body: `Monsieur le Responsable Infrastructure,

Les Chemins de Fer Fédéraux représentent l'infrastructure critique par excellence. Statron Romandie dispose d'une expertise spécifique sur les environnements ferroviaires et vous propose une offre répondant aux normes les plus strictes du secteur.

Notre maîtrise des contraintes ferroviaires :

  • Conformité EN 50121 — Nos onduleurs de la gamme Rail-S sont certifiés pour les environnements ferroviaires : résistance aux vibrations (norme IEC 60068-2-6), immunité CEM, plage de température étendue (-20°C à +60°C).

  • Continuité opérationnelle sur 5 sites — Notre équipe technique assure la coordination inter-sites pour garantir une transition sans impact sur les horaires. Planning de déploiement adapté aux plages de maintenance ferroviaire (créneaux nocturnes 01h-05h).

  • Monitoring centralisé — Un seul tableau de bord pour les 5 sites Romandie. Alertes SMS/email sur votre infrastructure NOC 24h/24. Intégration avec votre système SCADA existant.

  • Pièces de rechange garanties 10 ans — Engagement contractuel sur la disponibilité des pièces critiques, conforme aux exigences de longévité des actifs ferroviaires.

  • Expérience secteur — Références : Gare de Lausanne (2021), Centre de maintenance CFF Yverdon (2022), Poste d'aiguillage Genève-Cornavin (2023).

Je serais heureux de vous présenter ces références lors d'un échange technique avec votre équipe NOC.

Cordialement,

Marc Dupont — Account Manager Romandie
STATRON ROMANDIE SA
Tél. : +41 22 700 XX XX
m.dupont@statron.ch | www.statron.ch`,
  },

  'AO-2026-276': {
    tenderId: 'AO-2026-276',
    from: 'account.manager@statron.ch',
    to: 'direction.technique@h-fr.ch',
    cc: 'service.achats@h-fr.ch; direction@statron.ch',
    subject: 'Réponse AO #2026-276 — Protection urgences & blocs opératoires HFR / Statron',
    confidence: 93,
    body: `Sehr geehrter Herr Technischer Direktor / Monsieur le Directeur Technique,

L'Hôpital Fribourgeois opère dans un contexte bilingue unique, et votre infrastructure critique mérite un partenaire capable d'intervenir en français comme en allemand, sur l'ensemble de vos sites.

Notre proposition pour la protection des urgences et blocs opératoires :

  • Redondance N+1 active — Architecture recommandée pour les soins intensifs et blocs opératoires. En cas de défaillance d'un onduleur, la bascule est transparente et instantanée (<20ms). Aucune interruption lors des interventions chirurgicales.

  • SLA adapté aux urgences — Intervention garantie sous 1h30 en cas d'alarme critique sur l'un de vos sites Fribourg, Billens, Meyriez ou Tafers. Astreinte 24h/24, 365 jours par an.

  • Conformité médicale bilingue — Documentation technique et formation du personnel disponibles en français et en allemand. Nos techniciens sont bilingues.

  • Référence sectorielle directe — Notre installation à l'Inselspital (Berne, 2023) couvre 14 blocs opératoires avec une disponibilité certifiée 99.997%. Visite de référence organisable sur demande.

  • Audit de conception offert — Avant soumission de l'offre finale, nous réalisons gratuitement un état des lieux technique de votre installation actuelle, avec rapport écrit en FR/DE.

Nous sommes à votre disposition pour un entretien dans vos locaux de Fribourg ou de Villars-sur-Glâne, à votre convenance.

Mit freundlichen Grüssen / Cordialement,

Marc Dupont — Account Manager Romandie
STATRON ROMANDIE SA
Tél. : +41 22 700 XX XX
m.dupont@statron.ch | www.statron.ch`,
  },

  'AO-2026-341': {
    tenderId: 'AO-2026-341',
    from: 'account.manager@statron.ch',
    to: 'technical.infrastructure@gva.ch',
    cc: 'procurement@gva.ch; direction@statron.ch',
    subject: 'Réponse AO #2026-341 — Protection électrique tours de contrôle AIG / Statron Aviation',
    confidence: 71,
    body: `Monsieur le Responsable Infrastructure Technique,

L'Aéroport International de Genève exploite l'une des tours de contrôle les plus critiques d'Europe centrale. Statron Romandie dispose d'une gamme Aviation-S répondant aux exigences les plus strictes de la réglementation aéroportuaire internationale.

Notre expertise pour les environnements aéroportuaires :

  • Certification IATA / OACI — Nos onduleurs Aviation-S répondent aux spécifications techniques de l'OACI (Annexe 14) et aux recommandations IATA Airport Development Reference Manual, 10e édition.

  • Continuité sans interruption — Technologie Double Conversion OnLine avec bypass statique automatique. Temps de basculement <1ms, conforme aux exigences systèmes ATM (Air Traffic Management).

  • Sécurité incendie adaptée — Batteries LFP (lithium fer phosphate) homologuées pour les espaces techniques aéroportuaires. Risque d'emballement thermique réduit de 95% par rapport aux technologies lithium classiques.

  • Monitoring intégrable — Interface SNMP v3 / Modbus TCP pour intégration avec votre système SCADA BMS existant. Alertes prioritaires vers votre centre de supervision 24h/24.

  • Référence aéroportuaire — Aéroport de Berne-Belhp (2022) et terminal T4 de Zurich Airport (sous-traitance, 2023). Références disponibles sur demande.

Je suis à votre disposition pour une présentation technique auprès de vos équipes d'ingénierie.

Cordialement,

Marc Dupont — Account Manager Romandie
STATRON ROMANDIE SA
Tél. : +41 22 700 XX XX
m.dupont@statron.ch | www.statron.ch`,
  },

  'AO-2026-358': {
    tenderId: 'AO-2026-358',
    from: 'account.manager@statron.ch',
    to: 'si.infrastructure@vd.ch',
    cc: 'achats.informatique@vd.ch; direction@statron.ch',
    subject: 'Réponse AO #2026-358 — Onduleurs administration cantonale VD / Statron Smart-IT Series',
    confidence: 82,
    body: `Monsieur le Responsable Infrastructure SI,

Le Canton de Vaud modernise son infrastructure d'alimentation de secours pour l'administration cantonale. Statron Romandie vous propose la gamme Smart-IT Series, optimisée pour les environnements de virtualisation et les salles serveurs modernes.

Intégration transparente avec votre environnement IT :

  • Monitoring SNMP v3 natif — Sonde intégrée compatible avec Nagios, Zabbix, PRTG et SolarWinds. Déploiement de l'agent de supervision en moins d'une heure par site. Aucun matériel additionnel requis.

  • Intégration SI existant — API REST documentée pour intégration avec votre ITSM (ServiceNow, Remedy ou équivalent). Tickets d'incident générés automatiquement lors d'événements critiques.

  • Virtualisation optimisée — Notre onduleur communique directement avec VMware vCenter et Hyper-V pour déclencher l'arrêt ordonné des VM critiques en cas de longue coupure. Aucune perte de données.

  • Rapport mensuel automatisé — Envoi automatique d'un rapport PDF à votre équipe infrastructure : événements, autonomie restante, prévisions de maintenance. Zéro effort administratif.

  • Évolutivité garantie — Architecture modulaire compatible avec votre plan de consolidation datacenter 2026. Migration sans interruption de service.

  • Conditions cantonales avantageuses — En tant que partenaire régulier des collectivités vaudoises, nous sommes en mesure de vous proposer des conditions tarifaires adaptées à votre volume et à un engagement pluriannuel.

Je vous propose une démonstration technique dans vos locaux de Lausanne, avec simulation d'une coupure et test du monitoring en conditions réelles.

Cordialement,

Marc Dupont — Account Manager Romandie
STATRON ROMANDIE SA
Tél. : +41 22 700 XX XX
m.dupont@statron.ch | www.statron.ch`,
  },
};

export function getEmailTemplate(tenderId: string): EmailTemplate | null {
  return EMAIL_TEMPLATES[tenderId] ?? null;
}
