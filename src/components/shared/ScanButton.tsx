import { Zap, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, ScanStep } from '../../store/useAppStore';

const STEP_LABELS: Record<ScanStep, string> = {
  idle:       'Lancer l\'Analyse',
  connecting: '🔌 Connexion sources…',
  crawling:   '🕷️ Crawl web…',
  analyzing:  '🧠 Analyse IA…',
  generating: '✅ Recommandations…',
  done:       'Relancer l\'Analyse',
};

export default function ScanButton() {
  const { isScanning, scanStep, launchScan } = useAppStore();
  const label = STEP_LABELS[scanStep] || STEP_LABELS.idle;

  return (
    <button
      onClick={launchScan}
      disabled={isScanning}
      className={`btn-scan bg-blue-600 hover:bg-blue-500 disabled:opacity-70 disabled:cursor-wait text-white px-5 py-2.5 rounded-xl font-syne font-bold text-sm tracking-wide border border-blue-400/30 flex items-center gap-2 group transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 ${isScanning ? 'btn-scan-scanning' : ''}`}
    >
      {isScanning ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
      )}
      <AnimatePresence mode="wait">
        <motion.span
          key={label}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
