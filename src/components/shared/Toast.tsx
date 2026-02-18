import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export default function Toast() {
  const { toastVisible, toastMessage } = useAppStore();

  return (
    <AnimatePresence>
      {toastVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-8 left-1/2 z-[100] glass border border-cyan-500/30 text-cyan-200 text-xs px-4 py-2 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap pointer-events-none"
        >
          <span className="text-base">📡</span>
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
