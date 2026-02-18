import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

interface CityConfig {
  id: string;
  label: string;
  cx: number;
  cy: number;
  textX: number;
  textY: number;
}

const CITIES: CityConfig[] = [
  { id: 'geneve',    label: 'GENÈVE',    cx: 52,  cy: 374, textX: 58,  textY: 382 },
  { id: 'lausanne',  label: 'LAUSANNE',  cx: 123, cy: 303, textX: 130, textY: 301 },
  { id: 'neuchatel', label: 'NEUCHÂTEL', cx: 168, cy: 198, textX: 175, textY: 196 },
  { id: 'fribourg',  label: 'FRIBOURG',  cx: 200, cy: 242, textX: 207, textY: 240 },
  { id: 'sion',      label: 'SION',      cx: 231, cy: 367, textX: 238, textY: 365 },
  { id: 'delemont',  label: 'DELÉMONT',  cx: 229, cy: 117, textX: 236, textY: 115 },
];

const CANTON_INFO: Record<string, { name: string; opps: number; pipeline: number }> = {
  GE: { name: 'Genève',    opps: 3, pipeline: 510000 },
  VD: { name: 'Vaud',      opps: 5, pipeline: 710000 },
  NE: { name: 'Neuchâtel', opps: 1, pipeline: 45000  },
  FR: { name: 'Fribourg',  opps: 2, pipeline: 133000 },
  VS: { name: 'Valais',    opps: 2, pipeline: 485000 },
  JU: { name: 'Jura',      opps: 1, pipeline: 65000  },
};

interface CityDotProps {
  city: CityConfig;
  isActive: boolean;
  onCityClick: (label: string) => void;
}

function CityDot({ city, isActive, onCityClick }: CityDotProps) {
  return (
    <g className="cursor-pointer" onClick={() => onCityClick(city.label)}>
      <circle
        className="city-dot-ring"
        cx={city.cx} cy={city.cy}
        r={7}
        stroke={isActive ? '#00c8ff' : '#f59e0b'}
        style={isActive ? { animation: 'ring-pulse 1.8s ease-out infinite' } : {}}
        opacity={isActive ? undefined : 0}
      />
      <circle
        className="city-dot-core"
        cx={city.cx} cy={city.cy}
        r={4.5}
        fill={isActive ? '#00c8ff' : '#f59e0b'}
        style={{ filter: isActive ? 'drop-shadow(0 0 10px #00c8ff)' : 'drop-shadow(0 0 8px #f59e0b)' }}
      />
      <text
        x={city.textX} y={city.textY}
        fontFamily="Syne" fontSize={8} fontWeight={600}
        fill="rgba(255,255,255,0.7)"
      >
        {city.label}
      </text>
    </g>
  );
}

interface CantonTooltipProps {
  canton: string;
  x: number;
  y: number;
}

function CantonTooltip({ canton, x, y }: CantonTooltipProps) {
  const info = CANTON_INFO[canton];
  if (!info) return null;
  return (
    <g>
      <foreignObject x={x} y={y} width={130} height={62}>
        <div className="glass rounded-lg p-2 text-[9px] font-mono border border-cyan-500/20 bg-slate-900/90">
          <div className="text-cyan-400 font-bold uppercase mb-0.5">{info.name}</div>
          <div className="text-slate-400">Opportunités : <span className="text-emerald-400">{info.opps}</span></div>
          <div className="text-slate-400">Pipeline : <span className="text-amber-400">CHF {(info.pipeline / 1000).toFixed(0)}K</span></div>
        </div>
      </foreignObject>
    </g>
  );
}

interface SwissMapProps {
  isScanning?: boolean;
}

export default function SwissMap({ isScanning = false }: SwissMapProps) {
  const activeCities = useAppStore((s) => s.activeCities);
  const showToast = useAppStore((s) => s.showToast);
  const [hoveredCanton, setHoveredCanton] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleCantonHover = (canton: string, x: number, y: number) => {
    setHoveredCanton(canton);
    setTooltipPos({ x, y });
  };

  const handleCityClick = (label: string) => {
    showToast(`${label} — Opportunités actives`);
  };

  return (
    <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
      {isScanning && <div className="scan-line" />}

      {isScanning && (
        <div className="hidden pointer-events-none absolute inset-0">
          <div className="radar-sweep" />
          <div className="radar-ring" style={{ width: 120, height: 120 }} />
          <div className="radar-ring" style={{ width: 240, height: 240 }} />
          <div className="radar-ring" style={{ width: 360, height: 360 }} />
        </div>
      )}

      {isScanning && (
        <div className="pointer-events-none absolute inset-0">
          <div className="radar-sweep" />
          <div className="radar-ring" style={{ width: 120, height: 120 }} />
          <div className="radar-ring" style={{ width: 240, height: 240 }} />
          <div className="radar-ring" style={{ width: 360, height: 360 }} />
        </div>
      )}

      <svg
        viewBox="0 0 750 500"
        className="w-full h-full max-w-[92%] max-h-[92%] drop-shadow-2xl"
        style={{ transform: 'scale(1.02)' }}
      >
        <defs>
          <filter id="glow-cyan">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="swiss-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" className="ch-grid"/>
          </pattern>
          <linearGradient id="romFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(0,150,220,0.25)"/>
            <stop offset="100%" stopColor="rgba(0,80,180,0.12)"/>
          </linearGradient>
        </defs>

        <rect width="750" height="500" fill="url(#swiss-grid)" opacity="0.4"/>

        {/* Full Swiss outline */}
        <path className="ch-outline"
          d="M 30,345 L 30,400 L 50,430 L 100,455 L 165,460 L 215,460 L 285,438 L 345,426 L 420,452 L 455,460 L 480,420 L 508,376 L 550,310 L 638,232 L 692,178 L 660,110 L 598,68 L 552,62 L 475,44 L 400,22 L 326,32 L 275,65 L 232,82 L 198,84 L 178,88 L 163,100 L 140,116 L 120,133 L 97,165 L 80,188 L 65,210 L 52,254 L 38,288 L 30,312 Z"
        />

        {/* Canton GE */}
        <path
          className="ch-romandie"
          title="GE"
          d="M 38,345 L 30,370 L 32,400 L 50,420 L 72,415 L 75,396 L 62,378 L 52,374 L 42,358 Z"
          onMouseEnter={(e) => handleCantonHover('GE', 30, 340)}
          onMouseLeave={() => setHoveredCanton(null)}
        />
        {/* Canton VD */}
        <path
          className="ch-romandie"
          title="VD"
          d="M 42,358 L 52,374 L 62,378 L 75,396 L 103,410 L 130,396 L 165,378 L 185,360 L 200,338 L 220,333 L 231,355 L 244,340 L 232,298 L 202,268 L 178,270 L 155,278 L 125,288 L 100,305 L 80,320 L 58,342 Z"
          onMouseEnter={() => handleCantonHover('VD', 100, 295)}
          onMouseLeave={() => setHoveredCanton(null)}
        />
        {/* Canton NE */}
        <path
          className="ch-romandie"
          title="NE"
          d="M 80,188 L 65,210 L 52,254 L 78,262 L 100,272 L 125,288 L 155,278 L 168,262 L 172,236 L 168,210 L 163,198 L 152,180 Z"
          onMouseEnter={() => handleCantonHover('NE', 70, 185)}
          onMouseLeave={() => setHoveredCanton(null)}
        />
        {/* Canton FR */}
        <path
          className="ch-romandie"
          title="FR"
          d="M 172,236 L 168,262 L 178,270 L 202,268 L 218,260 L 244,268 L 252,250 L 248,218 L 234,200 L 218,194 L 200,198 L 184,210 Z"
          onMouseEnter={() => handleCantonHover('FR', 215, 235)}
          onMouseLeave={() => setHoveredCanton(null)}
        />
        {/* Canton VS */}
        <path
          className="ch-romandie"
          title="VS"
          d="M 72,415 L 50,430 L 100,455 L 165,460 L 215,460 L 285,438 L 345,426 L 388,416 L 400,400 L 376,382 L 340,372 L 294,368 L 260,362 L 231,355 L 220,333 L 200,338 L 185,360 L 165,378 L 130,396 L 103,410 L 75,396 Z"
          onMouseEnter={() => handleCantonHover('VS', 170, 415)}
          onMouseLeave={() => setHoveredCanton(null)}
        />
        {/* Canton JU */}
        <path
          className="ch-romandie"
          title="JU"
          d="M 140,116 L 120,133 L 97,165 L 80,188 L 98,190 L 120,196 L 143,202 L 163,198 L 168,174 L 166,150 L 166,128 L 163,100 Z"
          onMouseEnter={() => handleCantonHover('JU', 95, 115)}
          onMouseLeave={() => setHoveredCanton(null)}
        />

        {/* Lakes */}
        <path className="ch-lake" d="M 52,374 L 70,366 Q 100,354 123,350 Q 148,344 168,340 Q 175,350 165,360 Q 148,368 125,375 Q 98,382 75,378 Z"/>
        <path className="ch-lake" d="M 128,262 Q 145,240 165,228 Q 173,236 170,252 Q 160,268 140,272 Z"/>
        <path className="ch-lake" d="M 190,218 Q 198,208 208,212 Q 208,224 198,228 Z"/>
        <ellipse className="ch-lake" cx={440} cy={252} rx={18} ry={9} transform="rotate(-20,440,252)"/>
        <ellipse className="ch-lake" cx={432} cy={156} rx={12} ry={5} transform="rotate(30,432,156)"/>
        <ellipse className="ch-lake" cx={510} cy={60} rx={22} ry={10}/>

        {/* Canton labels - Romandie */}
        {[
          { x: 48,  y: 392, t: 'GE' },
          { x: 140, y: 335, t: 'VD' },
          { x: 130, y: 235, t: 'NE' },
          { x: 208, y: 240, t: 'FR' },
          { x: 220, y: 418, t: 'VS' },
          { x: 140, y: 160, t: 'JU' },
        ].map(({ x, y, t }) => (
          <text key={t} x={x} y={y} fontFamily="JetBrains Mono" fontSize={7} fill="rgba(0,200,255,0.5)" textAnchor="middle">{t}</text>
        ))}

        {/* German-speaking cantons */}
        {[
          { x: 285, y: 225, t: 'BE' },
          { x: 420, y: 135, t: 'ZH' },
          { x: 580, y: 290, t: 'GR' },
          { x: 440, y: 440, t: 'TI' },
        ].map(({ x, y, t }) => (
          <text key={t} x={x} y={y} fontFamily="JetBrains Mono" fontSize={6.5} fill="rgba(255,255,255,0.12)" textAnchor="middle">{t}</text>
        ))}

        {/* Interior lines */}
        <path fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" d="M 244,340 L 268,320 L 290,280 L 310,260 L 344,250 L 380,240 L 420,220 L 445,200"/>
        <path fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" d="M 400,400 L 440,380 L 480,360 L 510,340 L 540,310"/>
        <path fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" d="M 275,65 L 265,100 L 248,140 L 244,180 L 244,209"/>
        <path fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" d="M 244,209 L 290,210 L 340,200 L 400,190 L 460,180 L 520,170 L 560,160"/>

        {/* City dots */}
        {CITIES.map((city) => (
          <CityDot
            key={city.id}
            city={city}
            isActive={activeCities.includes(city.id)}
            onCityClick={handleCityClick}
          />
        ))}

        {/* Bern reference */}
        <g opacity={0.4}>
          <circle cx={244} cy={209} r={3} fill="#94a3b8"/>
          <text x={250} y={207} fontFamily="Syne" fontSize={7} fill="rgba(255,255,255,0.4)">BERNE</text>
        </g>

        {/* Zurich reference */}
        <g opacity={0.3}>
          <circle cx={407} cy={114} r={3} fill="#94a3b8"/>
          <text x={413} y={112} fontFamily="Syne" fontSize={7} fill="rgba(255,255,255,0.35)">ZÜRICH</text>
        </g>

        {/* Legend */}
        <rect x={580} y={440} width={160} height={48} rx={4} fill="rgba(6,15,35,0.7)" stroke="rgba(255,255,255,0.07)"/>
        <circle cx={594} cy={453} r={4} fill="rgba(0,120,200,0.4)" stroke="rgba(0,200,255,0.5)" strokeWidth={1}/>
        <text x={603} y={457} fontFamily="JetBrains Mono" fontSize={7.5} fill="rgba(255,255,255,0.5)">Cantons Romands</text>
        <circle cx={594} cy={469} r={4} fill="#f59e0b" style={{ filter: 'drop-shadow(0 0 4px #f59e0b)' }}/>
        <text x={603} y={473} fontFamily="JetBrains Mono" fontSize={7.5} fill="rgba(255,255,255,0.5)">Ville surveillée</text>
        <circle cx={594} cy={485} r={3} fill="rgba(0,150,255,0.3)" stroke="rgba(100,200,255,0.5)" strokeWidth={0.8}/>
        <text x={603} y={489} fontFamily="JetBrains Mono" fontSize={7.5} fill="rgba(255,255,255,0.5)">Lac</text>

        {/* Canton tooltip */}
        {hoveredCanton && (
          <CantonTooltip canton={hoveredCanton} x={tooltipPos.x} y={tooltipPos.y} />
        )}
      </svg>
    </div>
  );
}
