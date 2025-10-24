import React from 'react'
import { motion } from 'framer-motion'

const PILOTOS = [
  "01 - Marcel Di'marolla","02 - Dean Cavalcante","03 - Denver Gucci","04 - Guilherme F",
  "05 - Lorena Lovatelli","06 - Luck Davies","07 - Marco Selinger","08 - Rodrigo Di'marolla",
  "09 - Jhony Bravo","10 - Anthony Leal","11 - Vitor Barbosa","12 - Victor Salazar",
  "13 - Bell Di'marolla","14 - Rodrigo Versone","15 - Geras Ares","16 - Luan Balakov"
]

export default function App(){
  const [visibleCount, setVisibleCount] = React.useState(0)
  const finalState = visibleCount > PILOTOS.length
  const speedLines = React.useMemo(()=>{
    return Array.from({length:18}).map((_,i)=>({
      id:i,left:`${Math.round(Math.random()*100)}%`,dur:1+Math.random()*1.6,delay:Math.random()*1.2,opacity:0.12+Math.random()*0.18
    }))
  },[])

  React.useEffect(()=>{ 
    let t:any = null
    t = window.setTimeout(function showNext(){
      setVisibleCount(c=>{
        const next = c+1
        if(next < PILOTOS.length){
          t = window.setTimeout(showNext,380)
        } else {
          window.setTimeout(()=>setVisibleCount(c=>c+1),500)
        }
        return next
      })
    },1100)
    return ()=>{ if(t) window.clearTimeout(t) }
  },[])

  return (
    <div className="root">
      <div className="siren siren-left" aria-hidden />
      <div className="siren siren-right" aria-hidden />
      {speedLines.map(s=>(
        <motion.div className="speed-line" key={s.id} style={{left:s.left,opacity:s.opacity,width:'55%'}} initial={{y:-40}} animate={{y:'110%'}} transition={{repeat:Infinity,duration:s.dur,delay:s.delay,ease:'linear'}}/>
      ))}
      <div className="radar" aria-hidden>
        <svg viewBox="0 0 200 200" width="420" height="420">
          <defs>
            <radialGradient id="g2" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#8ef08a" stopOpacity="0.12"/>
              <stop offset="60%" stopColor="#05673b" stopOpacity="0.03"/>
              <stop offset="100%" stopColor="#013a1f" stopOpacity="0.01"/>
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#g2)"/>
          <motion.g animate={{rotate:360}} transition={{repeat:Infinity,duration:6,ease:'linear'}} style={{transformOrigin:'100px 100px'}}>
            <path d="M100 100 L190 100" stroke="#6ee08c" strokeWidth="2" strokeLinecap="round" opacity="0.9"/>
            <circle cx="100" cy="100" r="6" fill="#9ff09b"/>
            <g opacity="0.45">
              <circle cx="100" cy="100" r="40" stroke="#2fa46a" strokeWidth="1" fill="none"/>
              <circle cx="100" cy="100" r="64" stroke="#1f7f54" strokeWidth="1" fill="none"/>
            </g>
          </motion.g>
        </svg>
      </div>

      <header className="header">
        <div className="pmbox">PM</div>
        <div className="titles"><div className="police">POLÍCIA MILITAR DA CAPITAL</div><div className="unit">UNIDADE DELTA • PROTOCOLO DE ACOMPANHAMENTO</div></div>
      </header>

      <main className="panel">
        <h1 className="main-title">INICIANDO <span className="protocol">PROTOCOLO DELTA</span></h1>
        <div className="panel-box">
          <div className="panel-top"><div>RASTREAMENTO ATIVO</div><div>VELOCIDADE &gt; 180 KM/H</div></div>
          <div className="progress-row"><div className="progress"><div className={'bar '+(finalState?'full':'') } style={{width: finalState? '100%': Math.min(100,(visibleCount/PILOTOS.length)*100 + 20) + '%'}}/></div><div className="time">{8}s</div></div>
          <div className="listbox">
            {PILOTOS.map((p,i)=>(
              <div className={'list-item '+(i<visibleCount?'show':'')} key={p}><div className="left">{i<visibleCount? p : ''}</div><div className="right">{i<visibleCount? 'OK':''}</div></div>
            ))}
          </div>
        </div>
      </main>

      <motion.div className={'badgeWrap '+(finalState?'show':'')} initial={{opacity:0,scale:0.9}} animate={finalState?{opacity:1,scale:1}:{opacity:0,scale:0.9}} transition={{duration:0.9}}>
        <img src="/public_bg.png" alt="badge" className="badgeImg"/>
        <div className="finalText">PROTOCOLO DELTA ATIVO ✅</div>
      </motion.div>

      <footer className="footer">UNIDADE DELTA • SISTEMA DE RASTREAMENTO</footer>
    </div>
  )
}
