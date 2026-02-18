import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Shield, FileText, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/',            icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/pipeline',    icon: TrendingUp,      label: 'Pipeline' },
  { path: '/concurrents', icon: Shield,          label: 'Concurrents' },
  { path: '/appels',      icon: FileText,        label: 'Appels d\'Offres' },
  { path: '/parametres',  icon: Settings,        label: 'Paramètres' },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.aside
      className="relative z-20 flex flex-col glass"
      style={{ borderRight: '1px solid rgba(0,200,255,0.15)' }}
      animate={{ width: expanded ? 200 : 60 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex-none flex items-center justify-center h-14 border-b border-white/5">
        <div className="logo-ring flex-shrink-0" style={{ width: 36, height: 36, fontSize: '1rem' }}>S</div>
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-2 overflow-hidden">
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200 group overflow-hidden whitespace-nowrap
              ${isActive
                ? 'bg-cyan-500/10 text-[#00c8ff] border border-cyan-500/20'
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-[#00c8ff]' : ''}`} size={18} />
                <motion.span
                  className="font-syne font-semibold text-xs tracking-wide"
                  animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.span>
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-[#00c8ff]"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex-none p-2 border-t border-white/5">
        <div className="flex items-center gap-2 px-2 py-1.5 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" style={{ boxShadow: '0 0 6px #10d98c', animation: 'blink 2s infinite' }} />
          <motion.span
            className="font-mono text-[9px] text-slate-500 whitespace-nowrap"
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            SYSTÈME OK
          </motion.span>
        </div>
      </div>
    </motion.aside>
  );
}
