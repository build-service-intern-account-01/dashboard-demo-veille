import { create } from 'zustand';
import { Scenario, SCENARIOS } from '../data/mockData';

export type ScanStep = 'idle' | 'connecting' | 'crawling' | 'analyzing' | 'generating' | 'done';

interface AppState {
  isScanning: boolean;
  scanStep: ScanStep;
  scanProgress: number;
  feedItems: Scenario[];
  actionItems: Scenario[];
  activeFilter: 'all' | 'opportunity' | 'competitor' | 'market';
  activeCities: string[];
  toastMessage: string;
  toastVisible: boolean;
  modalOpen: boolean;
  modalScenarioId: number | null;
  lastScan: string;
  nextScan: string;
  presentationMode: boolean;

  setFilter: (filter: 'all' | 'opportunity' | 'competitor' | 'market') => void;
  openModal: (id: number) => void;
  closeModal: () => void;
  showToast: (msg: string) => void;
  launchScan: () => void;
  togglePresentationMode: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isScanning: false,
  scanStep: 'idle',
  scanProgress: 0,
  feedItems: [],
  actionItems: [],
  activeFilter: 'all',
  activeCities: [],
  toastMessage: '',
  toastVisible: false,
  modalOpen: false,
  modalScenarioId: null,
  lastScan: '—',
  nextScan: '—',
  presentationMode: false,

  setFilter: (filter) => set({ activeFilter: filter }),

  openModal: (id) => set({ modalOpen: true, modalScenarioId: id }),
  closeModal: () => set({ modalOpen: false, modalScenarioId: null }),

  showToast: (msg) => {
    set({ toastMessage: msg, toastVisible: true });
    setTimeout(() => set({ toastVisible: false }), 3200);
  },

  togglePresentationMode: () => set((s) => ({ presentationMode: !s.presentationMode })),

  launchScan: () => {
    if (get().isScanning) return;
    set({
      isScanning: true,
      scanStep: 'connecting',
      scanProgress: 0,
      feedItems: [],
      actionItems: [],
      activeCities: [],
    });

    const steps: { step: ScanStep; progress: number; delay: number }[] = [
      { step: 'connecting', progress: 15, delay: 0 },
      { step: 'crawling',   progress: 40, delay: 800 },
      { step: 'analyzing',  progress: 70, delay: 2300 },
      { step: 'generating', progress: 90, delay: 3500 },
    ];

    steps.forEach(({ step, progress, delay }) => {
      setTimeout(() => set({ scanStep: step, scanProgress: progress }), delay);
    });

    const gaps = [600, 2800, 2800, 2400, 2900, 2600, 2500, 2700];
    let cumDelay = 600;

    SCENARIOS.forEach((scenario, i) => {
      cumDelay += gaps[i] || 2500;
      const feedDelay = cumDelay;

      setTimeout(() => {
        set((state) => ({
          feedItems: [scenario, ...state.feedItems],
          activeCities: scenario.city
            ? [scenario.city, ...state.activeCities.filter((c) => c !== scenario.city)]
            : state.activeCities,
        }));
        if (scenario.city) {
          get().showToast(`📡 ${scenario.source} · ${scenario.city.toUpperCase()} · Conf. ${scenario.confidence}%`);
          setTimeout(() => {
            set((state) => ({
              activeCities: state.activeCities.filter((c) => c !== scenario.city),
            }));
          }, 3500);
        }
      }, feedDelay);

      setTimeout(() => {
        set((state) => ({
          actionItems: [scenario, ...state.actionItems],
        }));
      }, feedDelay + 1200);
    });

    const totalDelay = cumDelay + 2200;
    setTimeout(() => {
      const now = new Date().toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' });
      set({
        isScanning: false,
        scanStep: 'done',
        scanProgress: 100,
        lastScan: now,
        nextScan: 'dans 15 min',
      });
      get().showToast('✅ Analyse complète — 8 signaux traités');
    }, totalDelay);
  },
}));
