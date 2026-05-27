/**
 * IsometricAIScene  –  Narrative animation
 * ─────────────────────────────────────────────────────────────────────────────
 * A robot walks between 5 stations, lights each one up with a beam, and a
 * context label fades in.  The cycle loops forever.
 *
 *  Phase 0  →  Server racks   "Automating Document Generation"
 *  Phase 1  →  Document cards "Processing Documents"
 *  Phase 2  →  Monitor        "Enabling AI Intelligence"
 *  Phase 3  →  Data bars      "Generating Reports"
 *  Phase 4  →  CPU chip       "Systems Automated"
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Isometric projection ─────────────────────────────────────────────────── */

const U  = 26     // px per unit
const OX = 248    // SVG origin X
const OY = 212    // SVG origin Y

/** Returns [screenX, screenY] for an isometric coordinate */
function sc(x: number, y: number, z: number): [number, number] {
  return [
    OX + (x - y) * U * 0.866,
    OY + (x + y) * U * 0.5 - z * U,
  ]
}

/** Returns "sx,sy" string */
function pt(x: number, y: number, z: number): string {
  const [sx, sy] = sc(x, y, z)
  return `${sx.toFixed(1)},${sy.toFixed(1)}`
}

/* ─── Box face helpers ─────────────────────────────────────────────────────── */

const topFace = (x: number, y: number, z: number, w: number, d: number, h: number) => {
  const zt = z + h
  return `${pt(x,y,zt)} ${pt(x+w,y,zt)} ${pt(x+w,y+d,zt)} ${pt(x,y+d,zt)}`
}
const lftFace = (x: number, y: number, z: number, w: number, h: number) => {
  const zt = z + h
  return `${pt(x,y,z)} ${pt(x+w,y,z)} ${pt(x+w,y,zt)} ${pt(x,y,zt)}`
}
const rgtFace = (x: number, y: number, z: number, w: number, d: number, h: number) => {
  const zt = z + h
  return `${pt(x+w,y,z)} ${pt(x+w,y+d,z)} ${pt(x+w,y+d,zt)} ${pt(x+w,y,zt)}`
}

/* ─── Isometric box ────────────────────────────────────────────────────────── */

interface BoxProps {
  x: number; y: number; z: number
  w: number; d: number; h: number
  tc: string; lc: string; rc: string
  glow?: boolean
  strokeColor?: string
}

function Box({ x, y, z, w, d, h, tc, lc, rc, glow = false, strokeColor }: BoxProps) {
  const flt = glow ? 'url(#el-glow)' : undefined
  const stk = strokeColor ?? (glow ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)')
  const sw  = glow ? '1' : '0.7'
  return (
    <>
      <polygon points={lftFace(x,y,z,w,h)}   fill={lc} stroke={stk} strokeWidth={sw} filter={flt} />
      <polygon points={rgtFace(x,y,z,w,d,h)} fill={rc} stroke={stk} strokeWidth={sw} filter={flt} />
      <polygon points={topFace(x,y,z,w,d,h)} fill={tc} stroke={stk} strokeWidth={sw} filter={flt} />
    </>
  )
}

/* ─── Phase data ───────────────────────────────────────────────────────────── */

const ROBOT_STOPS: [number, number][] = [
  sc(1.5, 1.5,  0.7),   // Phase 0 – servers
  sc(2.2, 4.2,  0.7),   // Phase 1 – documents
  sc(4.8, 1.5,  0.7),   // Phase 2 – monitor
  sc(7.0, 2.5,  0.7),   // Phase 3 – data bars
  sc(4.8, 4.55, 0.7),   // Phase 4 – CPU chip
]

const BEAM_TARGETS: [number, number][] = [
  sc(1.7, 1.35, 2.5),   // Server A mid
  sc(2.4, 4.65, 1.35),  // Doc card top
  sc(4.25, 2.0, 2.35),  // Monitor screen
  sc(6.64, 3.8, 2.8),   // Bar 3 mid
  sc(4.8,  4.5, 1.22),  // Chip surface
]

interface PhaseInfo {
  label: string
  sub:   string
  tx:    number  // SVG x for text pill centre
  ty:    number  // SVG y for text pill centre
}

const PHASES: PhaseInfo[] = [
  { label: 'Automating Document Generation', sub: 'AI-powered extraction & validation',  tx: 220, ty: 116 },
  { label: 'Processing Documents',           sub: 'Zero-defect workflow automation',      tx: 175, ty: 258 },
  { label: 'Enabling AI Intelligence',       sub: 'Real-time analysis & insights',       tx: 372, ty: 132 },
  { label: 'Generating Reports',             sub: 'Business intelligence dashboard',     tx: 432, ty: 188 },
  { label: 'Systems Automated',              sub: '100% SLA adherence achieved',         tx: 278, ty: 372 },
]

const PHASE_MS = 3200   // duration of each phase in ms

/* ─── Colours: inactive vs active per element group ─────────────────────────── */

function srvAColors(active: boolean) {
  return active
    ? { tc: 'rgba(225,208,255,0.97)', lc: 'rgba(168,138,255,0.98)', rc: 'rgba(128,95,228,0.99)' }
    : { tc: 'rgba(178,148,255,0.76)', lc: 'rgba(108,82,231,0.91)',  rc: 'rgba(76,52,188,0.96)'  }
}
function srvBColors(active: boolean) {
  return active
    ? { tc: 'rgba(212,195,255,0.94)', lc: 'rgba(155,125,252,0.96)', rc: 'rgba(112,82,215,0.97)' }
    : { tc: 'rgba(162,132,248,0.72)', lc: 'rgba(96,72,220,0.88)',   rc: 'rgba(66,44,178,0.93)'  }
}
function docColors(i: number, active: boolean) {
  const base = [0.52 + i * 0.12, 0.64 + i * 0.10, 0.70 + i * 0.10]
  const hot  = [0.82 + i * 0.06, 0.86 + i * 0.05, 0.89 + i * 0.04]
  const a = active ? hot : base
  return {
    tc: `rgba(${active?235:205},${active?220:185},255,${a[0]})`,
    lc: `rgba(${active?165:130},${active?138:102},255,${a[1]})`,
    rc: `rgba(${active?135:100},${active?105:72},238,${a[2]})`,
  }
}
function barColors(i: number, active: boolean) {
  return active
    ? { tc: `rgba(${210+i*8},${190+i*6},255,${0.88+i*0.04})`, lc: `rgba(${158+i*8},${130+i*6},255,${0.90+i*0.03})`, rc: `rgba(${128+i*6},${100+i*4},238,${0.93+i*0.02})` }
    : { tc: `rgba(${148+i*20},${128+i*17},252,${0.72+i*0.06})`, lc: `rgba(${86+i*10},${66+i*8},210,${0.86+i*0.03})`, rc: `rgba(${60+i*8},${42+i*6},180,${0.91+i*0.02})` }
}
function chipColors(active: boolean) {
  return active
    ? { tc: 'rgba(238,224,255,0.86)', lc: 'rgba(168,140,255,0.91)', rc: 'rgba(138,110,248,0.94)' }
    : { tc: 'rgba(202,185,255,0.66)', lc: 'rgba(122,98,236,0.79)',  rc: 'rgba(92,70,206,0.86)'   }
}
function monColors(active: boolean) {
  return active
    ? { tc: 'rgba(82,62,132,0.96)', lc: 'rgba(54,44,108,0.98)', rc: 'rgba(40,28,82,0.99)' }
    : { tc: 'rgba(38,30,68,0.93)',  lc: 'rgba(18,14,40,0.97)',  rc: 'rgba(10,7,26,0.98)'  }
}
function screenColors(active: boolean) {
  return active
    ? { tc: 'rgba(145,218,255,0.44)', lc: 'rgba(105,195,255,0.26)', rc: 'rgba(85,174,248,0.30)' }
    : { tc: 'rgba(110,190,255,0.16)', lc: 'rgba(70,168,255,0.09)',  rc: 'rgba(50,148,235,0.13)' }
}

/* ─── Component ─────────────────────────────────────────────────────────────── */

export function IsometricAIScene() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % PHASES.length), PHASE_MS)
    return () => clearInterval(id)
  }, [])

  /* robot & beam */
  const rp  = ROBOT_STOPS[phase]
  const bt  = BEAM_TARGETS[phase]
  const pd  = PHASES[phase]
  const beamD = `M ${rp[0].toFixed(1)},${(rp[1] - 34).toFixed(1)} L ${bt[0].toFixed(1)},${bt[1].toFixed(1)}`

  /* active flags */
  const ph = phase
  const sA = srvAColors(ph === 0)
  const sB = srvBColors(ph === 0)
  const mn = monColors(ph === 2)
  const sc_ = screenColors(ph === 2)
  const ch = chipColors(ph === 4)

  return (
    <svg
      viewBox="0 0 560 420"
      className="w-full max-w-[620px]"
      aria-hidden="true"
    >
      <defs>
        {/* element glow */}
        <filter id="el-glow" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* robot halo */}
        <filter id="rob-f" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* text glow */}
        <filter id="txt-f" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* blob blur */}
        <filter id="blob-f" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        {/* beam glow */}
        <filter id="beam-f" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* 3-D title text soft glow */}
        <filter id="txt3d-f" x="-6%" y="-28%" width="112%" height="156%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* 3-D title gradient — brand hue, light face */}
        <linearGradient id="txt3d-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#6c5ce7" stopOpacity="1" />
          <stop offset="48%"  stopColor="#8b72f0" stopOpacity="1" />
          <stop offset="100%" stopColor="#8e44ad" stopOpacity="1" />
        </linearGradient>
        {/* divider fade line */}
        <linearGradient id="div-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(108,82,231,0)"    />
          <stop offset="28%"  stopColor="rgba(108,82,231,0.45)" />
          <stop offset="72%"  stopColor="rgba(142,68,173,0.45)" />
          <stop offset="100%" stopColor="rgba(142,68,173,0)"    />
        </linearGradient>
      </defs>

      {/* ── Ambient glow ─────────────────────────────────────────────────── */}
      <ellipse cx="248" cy="265" rx="210" ry="105" fill="rgba(108,82,231,0.07)" filter="url(#blob-f)" />
      <ellipse cx="380" cy="210" rx="100" ry="65"  fill="rgba(142,68,173,0.05)" filter="url(#blob-f)" />

      {/* ══════════════════ BASE PLATFORM ════════════════════════════════ */}
      <Box x={0} y={0} z={0} w={8} d={5.5} h={0.7}
        tc="rgba(242,240,255,0.97)" lc="rgba(218,212,255,0.92)" rc="rgba(198,190,252,0.95)" />

      {/* ══════════════════ SERVER RACKS ═════════════════════════════════ */}
      {/* Rack A */}
      <Box x={0.8} y={0.8} z={0.7} w={1.7} d={1.1} h={2.85} glow={ph===0} {...sA} />
      {/* LED strips on Rack A */}
      {([0.5, 1.0, 1.5, 2.0] as number[]).map((dz, i) => (
        <Box key={i}
          x={0.85} y={0.82} z={0.7 + dz} w={1.6} d={0.08} h={0.10}
          tc={ph===0 ? `rgba(${80+i*35},${220-i*12},255,0.94)` : 'rgba(130,110,255,0.3)'}
          lc="rgba(55,40,130,0.38)" rc="rgba(45,30,110,0.43)"
        />
      ))}

      {/* Rack B */}
      <Box x={0.8} y={2.2} z={0.7} w={1.7} d={1.1} h={2.0} glow={ph===0} {...sB} />
      {([0.5, 1.0, 1.5] as number[]).map((dz, i) => (
        <Box key={i}
          x={0.85} y={2.22} z={0.7 + dz} w={1.6} d={0.08} h={0.10}
          tc={ph===0 ? `rgba(${100+i*28},${210-i*15},255,0.90)` : 'rgba(130,110,255,0.28)'}
          lc="rgba(55,40,130,0.35)" rc="rgba(45,30,110,0.40)"
        />
      ))}

      {/* ══════════════════ DOCUMENT CARDS ═══════════════════════════════ */}
      {([0, 0.32, 0.64] as number[]).map((zOff, i) => (
        <Box key={i}
          x={1.2} y={3.8} z={0.7 + zOff} w={2.4} d={1.6} h={0.26}
          glow={ph===1}
          {...docColors(i, ph===1)}
        />
      ))}
      {/* Content lines on top card */}
      {ph === 1 && (
        <>
          <line x1={sc(1.42,3.82,1.68)[0].toFixed(1)} y1={sc(1.42,3.82,1.68)[1].toFixed(1)}
                x2={sc(2.85,3.82,1.68)[0].toFixed(1)} y2={sc(2.85,3.82,1.68)[1].toFixed(1)}
                stroke="rgba(200,178,255,0.5)" strokeWidth="1.2" />
          <line x1={sc(1.42,4.12,1.65)[0].toFixed(1)} y1={sc(1.42,4.12,1.65)[1].toFixed(1)}
                x2={sc(2.55,4.12,1.65)[0].toFixed(1)} y2={sc(2.55,4.12,1.65)[1].toFixed(1)}
                stroke="rgba(190,165,255,0.38)" strokeWidth="1.0" />
        </>
      )}

      {/* ══════════════════ MONITOR ══════════════════════════════════════ */}
      <Box x={4.25} y={0.9} z={0.7} w={0.3} d={2.1} h={1.95} glow={ph===2} {...mn} />
      <Box x={4.25} y={1.1} z={1.0} w={0.08} d={1.7} h={1.35} glow={ph===2} {...sc_} />
      {/* Monitor scan line (active) */}
      {ph === 2 && (
        <motion.polygon
          points={`${pt(4.25,1.15,2.3)} ${pt(4.25,2.72,2.3)} ${pt(4.25,2.72,2.18)} ${pt(4.25,1.15,2.18)}`}
          fill="rgba(160,230,255,0.18)"
          animate={{ opacity: [0.18, 0.4, 0.18] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}

      {/* ══════════════════ DATA BARS ════════════════════════════════════ */}
      {([
        { y: 1.0,  h: 1.1  },
        { y: 2.15, h: 2.05 },
        { y: 3.3,  h: 2.92 },
      ] as Array<{y:number;h:number}>).map((bar, i) => (
        <g key={i}>
          <Box
            x={6.2} y={bar.y} z={0.7} w={0.88} d={0.88} h={bar.h}
            glow={ph===3}
            {...barColors(i, ph===3)}
          />
          {/* Cap glow on tallest */}
          {ph === 3 && (
            <motion.polygon
              points={topFace(6.25, bar.y+0.08, 0.7+bar.h, 0.78, 0.72, 0.04)}
              fill={`rgba(230,215,255,${0.55+i*0.15})`}
              animate={{ opacity: [0.55+i*0.15, 1, 0.55+i*0.15] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i*0.15 }}
            />
          )}
        </g>
      ))}

      {/* ══════════════════ CPU CHIP ══════════════════════════════════════ */}
      <Box x={3.8} y={3.6} z={0.7} w={2.0} d={1.7} h={0.52} glow={ph===4} {...ch} />
      <Box x={4.15} y={3.95} z={1.22} w={1.3} d={1.1} h={0.14}
        tc={ph===4 ? 'rgba(248,244,255,0.99)' : 'rgba(232,226,255,0.94)'}
        lc={ph===4 ? 'rgba(185,165,255,0.88)' : 'rgba(150,134,255,0.72)'}
        rc={ph===4 ? 'rgba(155,135,248,0.92)' : 'rgba(120,104,232,0.80)'}
        glow={ph===4}
        strokeColor="rgba(255,255,255,0.55)"
      />
      {/* Chip pins */}
      {([0, 0.55, 1.1, 1.65] as number[]).map((off, i) => (
        <Box key={i}
          x={3.65} y={3.75 + off} z={0.7} w={0.15} d={0.25} h={0.14}
          tc="rgba(218,210,255,0.82)" lc="rgba(138,120,248,0.62)" rc="rgba(108,90,218,0.72)"
        />
      ))}
      {([0, 0.55, 1.1, 1.65] as number[]).map((off, i) => (
        <Box key={i}
          x={5.85} y={3.75 + off} z={0.7} w={0.15} d={0.25} h={0.14}
          tc="rgba(218,210,255,0.82)" lc="rgba(138,120,248,0.62)" rc="rgba(108,90,218,0.72)"
        />
      ))}

      {/* ══════════════════ 3-D TITLE TEXT ════════════════════════════════ */}

      {/* Ambient halo behind the title */}
      <ellipse cx="280" cy="56" rx="148" ry="38"
        fill="rgba(108,82,231,0.07)" filter="url(#blob-f)" />

      {/* ── "AUTOMATING"  (main extruded word) ─────────────────────── */}
      <motion.g
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Extrusion shadow layers — deepest first */}
        {(Array.from({ length: 9 }) as unknown[]).map((_, i) => (
          <text
            key={i}
            x={280 + (9 - i) * 0.74}
            y={50  + (9 - i) * 0.78}
            textAnchor="middle"
            fontSize="21"
            fontWeight="800"
            fontFamily="Montserrat, system-ui, sans-serif"
            letterSpacing="4"
            fill={`rgba(${32 + i * 11},${18 + i * 7},${82 + i * 17},${0.60 + i * 0.043})`}
          >AUTOMATING</text>
        ))}
        {/* Top face — brand gradient */}
        <text
          x="280" y="50"
          textAnchor="middle"
          fontSize="21"
          fontWeight="800"
          fontFamily="Montserrat, system-ui, sans-serif"
          letterSpacing="4"
          fill="url(#txt3d-grad)"
          filter="url(#txt3d-f)"
        >AUTOMATING</text>
      </motion.g>

      {/* ── "MANUAL SOLUTIONS"  (subtitle, lighter extrusion) ───────── */}
      <motion.g
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        {(Array.from({ length: 5 }) as unknown[]).map((_, i) => (
          <text
            key={i}
            x={280 + (5 - i) * 0.58}
            y={70  + (5 - i) * 0.60}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fontFamily="Montserrat, system-ui, sans-serif"
            letterSpacing="7"
            fill={`rgba(${50 + i * 15},${32 + i * 10},${115 + i * 18},${0.56 + i * 0.056})`}
          >MANUAL SOLUTIONS</text>
        ))}
        {/* Top face */}
        <text
          x="280" y="70"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fontFamily="Montserrat, system-ui, sans-serif"
          letterSpacing="7"
          fill="rgba(142,115,230,0.86)"
          filter="url(#txt-f)"
        >MANUAL SOLUTIONS</text>
      </motion.g>

      {/* Thin gradient rule between title and scene */}
      <motion.line
        x1="148" y1="88" x2="412" y2="88"
        stroke="url(#div-line-grad)"
        strokeWidth="0.8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.9 }}
      />

      {/* ══════════════════ ACTIVATION BEAM ══════════════════════════════ */}
      <AnimatePresence mode="wait">
        <motion.path
          key={`beam-${ph}`}
          d={beamD}
          stroke="rgba(210,180,255,0.70)"
          strokeWidth="2"
          strokeDasharray="8 5"
          fill="none"
          strokeLinecap="round"
          filter="url(#beam-f)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.92, duration: 0.55, ease: 'easeOut' }}
        />
      </AnimatePresence>

      {/* Beam impact sparkle */}
      <AnimatePresence>
        {true && (
          <motion.circle
            key={`spark-${ph}`}
            cx={bt[0]}
            cy={bt[1]}
            r={0}
            fill="rgba(220,200,255,0.0)"
            stroke="rgba(200,175,255,0.8)"
            strokeWidth="1.5"
            initial={{ r: 0, opacity: 0 }}
            animate={{ r: [0, 18, 0], opacity: [0, 0.9, 0] }}
            transition={{ delay: 1.45, duration: 0.55 }}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════ ROBOT CHARACTER ══════════════════════════════ */}
      {/* activation ripple — expands outward when robot arrives at a station */}
      <AnimatePresence>
        <motion.circle
          key={`ripple-${ph}`}
          cx={rp[0]}
          cy={rp[1] - 18}
          r={0}
          fill="none"
          stroke="rgba(167,139,250,0.55)"
          strokeWidth="1.2"
          initial={{ r: 0, opacity: 0.7 }}
          animate={{ r: [0, 28, 0], opacity: [0, 0.55, 0] }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.2, 0, 0.6, 1] }}
        />
      </AnimatePresence>

      <motion.g
        animate={{ x: rp[0], y: rp[1] }}
        initial={{ x: ROBOT_STOPS[0][0], y: ROBOT_STOPS[0][1] }}
        transition={{ type: 'spring', stiffness: 55, damping: 13, mass: 1.1 }}
        filter="url(#rob-f)"
      >
        {/* slow ambient float — replaces fast bounce */}
        <motion.g
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* subtle horizontal sway */}
          <motion.g
            animate={{ x: [0, 1.2, 0, -1.2, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* ground shadow — breathes with float */}
            <motion.ellipse cx="0" cy="11"
              animate={{ rx: [11, 10, 11], ry: [4, 3.4, 4], opacity: [0.30, 0.22, 0.30] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              fill="rgba(55,38,115,0.30)"
            />

            {/* LEGS */}
            <rect x="-7" y="-2" width="5.5" height="9" rx="2"   fill="#4c1d95" />
            <rect x="1.5" y="-2" width="5.5" height="9" rx="2"  fill="#4c1d95" />
            {/* feet */}
            <rect x="-8" y="5"  width="7"   height="4"  rx="1.5" fill="#3b0f8a" />
            <rect x="1"  y="5"  width="7"   height="4"  rx="1.5" fill="#3b0f8a" />

            {/* BODY */}
            <rect x="-11" y="-18" width="22" height="16" rx="3.5" fill="#7c3aed" />
            {/* body highlight line */}
            <rect x="-8" y="-17" width="16" height="2.5" rx="1.5" fill="rgba(210,190,255,0.25)" />
            {/* chest panel */}
            <rect x="-5" y="-15" width="10" height="7" rx="2" fill="rgba(22,16,50,0.72)" />
            <motion.circle cx="-2" cy="-11.5" r="1.8"
              fill={ph===0 ? '#fbbf24' : ph===2 ? '#67e8f9' : '#a5f3fc'}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.0, repeat: Infinity }}
            />
            <motion.circle cx="2" cy="-11.5" r="1.8"
              fill={ph===3 ? '#4ade80' : ph===4 ? '#f472b6' : '#a5f3fc'}
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.0, repeat: Infinity, delay: 1.0 }}
            />

            {/* ARMS */}
            <rect x="-17" y="-17" width="6" height="11" rx="2.5" fill="#6d28d9" />
            <rect x="11"  y="-17" width="6" height="11" rx="2.5" fill="#6d28d9" />
            {/* hands */}
            <rect x="-18" y="-8" width="5" height="4" rx="2" fill="#5b21b6" />
            <rect x="13"  y="-8" width="5" height="4" rx="2" fill="#5b21b6" />

            {/* NECK */}
            <rect x="-4" y="-21" width="8" height="4" rx="2" fill="#6d28d9" />

            {/* HEAD */}
            <rect x="-10" y="-36" width="20" height="15" rx="4" fill="#8b6fe0" />
            {/* head highlight */}
            <rect x="-7" y="-35" width="14" height="2.5" rx="1.5" fill="rgba(228,218,255,0.30)" />
            {/* visor background */}
            <rect x="-8" y="-33" width="16" height="9" rx="3" fill="rgba(14,10,35,0.65)" />
            {/* EYES — blink with ry squeeze instead of radius pulse */}
            <circle cx="-3.5" cy="-29" r="3"   fill="rgba(12,8,30,0.92)" />
            <circle cx="3.5"  cy="-29" r="3"   fill="rgba(12,8,30,0.92)" />
            <motion.ellipse cx="-3.5" cy="-29" rx="2" ry={2}
              fill="#67e8f9"
              animate={{ ry: [2, 2, 2, 0.1, 2] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.42, 0.48, 0.52, 0.58] }}
            />
            <motion.ellipse cx="3.5" cy="-29" rx="2" ry={2}
              fill="#67e8f9"
              animate={{ ry: [2, 2, 2, 0.1, 2] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.42, 0.48, 0.52, 0.58], delay: 0.08 }}
            />
            {/* eye shine */}
            <circle cx="-2.5" cy="-30" r="0.7" fill="white" />
            <circle cx="4.5"  cy="-30" r="0.7" fill="white" />

            {/* ANTENNA */}
            <line x1="0" y1="-36" x2="0" y2="-46"
              stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" />
            <motion.circle cx="0" cy="-49" r="4"
              fill="#fbbf24"
              animate={{ r: [4, 5.5, 4], opacity: [0.82, 1, 0.82] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
            />
            <circle cx="0" cy="-49" r="1.8" fill="rgba(255,255,255,0.95)" />
          </motion.g>
        </motion.g>
      </motion.g>

      {/* ══════════════════ PHASE LABEL ═══════════════════════════════════ */}
      <AnimatePresence mode="wait">
        <motion.g
          key={`label-${ph}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1,  y: 0  }}
          exit={{    opacity: 0,  y:  8  }}
          transition={{ duration: 0.38 }}
        >
          {/* pill background — width scales with label length */}
          {(() => {
            const hw = Math.max(100, pd.label.length * 5.8 + 22)
            return (
              <rect
                x={pd.tx - hw} y={pd.ty - 22}
                width={hw * 2}  height={42}
                rx="10"
                fill="rgba(12,8,32,0.88)"
                stroke="rgba(158,128,255,0.40)"
                strokeWidth="1"
              />
            )
          })()}
          {/* main label */}
          <text
            x={pd.tx} y={pd.ty - 5}
            textAnchor="middle"
            fill="rgba(230,222,255,0.97)"
            fontSize="10"
            fontWeight="700"
            fontFamily="Montserrat,sans-serif"
            letterSpacing="0.2"
            filter="url(#txt-f)"
          >
            {pd.label}
          </text>
          {/* sub label */}
          <text
            x={pd.tx} y={pd.ty + 12}
            textAnchor="middle"
            fill="rgba(162,140,255,0.72)"
            fontSize="8.5"
            fontFamily="Montserrat,sans-serif"
          >
            {pd.sub}
          </text>

          {/* connector dot from label to element */}
          <line
            x1={pd.tx} y1={pd.ty + 20}
            x2={bt[0].toFixed(1)} y2={bt[1].toFixed(1)}
            stroke="rgba(158,128,255,0.18)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </motion.g>
      </AnimatePresence>
    </svg>
  )
}
