import { useState, useCallback } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from "recharts";

const C = {
  forest: '#0d7f15', sage: '#5a7264', evergreen: '#0e4823',
  ocean: '#4787ce', cream: '#f6f1e0', sand: '#eae5d4',
  white: '#ffffff', ink: '#1a2414', muted: '#5a7264',
  border: '#d8d2c2', yellow: '#ffdd58', mint: '#4db87a',
};

const LOGO = null;

const s = {
  app:    { display:'flex', flexDirection:'column', height:'100vh', fontFamily:"'Roboto',sans-serif", background:'#fff', color:C.ink },
  header: { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', height:58, borderBottom:`1px solid ${C.border}`, background:'#fff', flexShrink:0 },
  nav:    { display:'flex', alignItems:'center', gap:2, padding:'0 28px', height:44, borderBottom:`1px solid ${C.border}`, background:'#fff', flexShrink:0, overflowX:'auto' },
  panels: { flex:1, overflow:'hidden', position:'relative' },
  panel:  { position:'absolute', inset:0, overflowY:'auto', padding:'28px 36px' },
  card:   { background:'#fff', border:`1px solid ${C.border}`, borderRadius:12, padding:20 },
  cardAccent: { background:C.forest, borderRadius:12, padding:20 },
  cardCream:  { background:C.cream, border:`1px solid ${C.sand}`, borderRadius:12, padding:20 },
  grid2:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 },
  grid3:  { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14 },
  grid4:  { display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:12 },
  eyebrow:{ fontSize:10, letterSpacing:'1.5px', textTransform:'uppercase', fontWeight:700, color:C.forest, marginBottom:6 },
  h1:     { fontFamily:"'Fustat',sans-serif", fontSize:36, fontWeight:800, letterSpacing:-1, color:C.forest, lineHeight:1.1, margin:0 },
  h2:     { fontFamily:"'Fustat',sans-serif", fontSize:24, fontWeight:800, letterSpacing:-0.5, color:C.ink, margin:0 },
  h3:     { fontFamily:"'Fustat',sans-serif", fontSize:17, fontWeight:700, color:C.ink, margin:0 },
  kpiNum: { fontFamily:"'Fustat',sans-serif", fontSize:34, fontWeight:800, letterSpacing:-1, color:C.forest, lineHeight:1 },
  kpiLbl: { fontSize:12, color:C.muted, marginTop:3 },
  kpiSub: { fontSize:12, color:C.forest, fontWeight:600, marginTop:5 },
  p:      { lineHeight:1.65, color:'#444', fontSize:14 },
  pill:   { display:'inline-block', padding:'3px 10px', borderRadius:20, fontSize:12, fontWeight:600 },
  divider:{ height:1, background:C.border, margin:'16px 0' },
};

function Eyebrow({ children, style }) {
  return <div style={{...s.eyebrow,...style}}>{children}</div>;
}

function KPI({ num, label, sub, white }) {
  return (
    <div>
      <div style={{...s.kpiNum, color: white ? '#fff' : C.forest}}>{num}</div>
      <div style={{...s.kpiLbl, color: white ? 'rgba(255,255,255,0.7)' : C.muted}}>{label}</div>
      {sub && <div style={{...s.kpiSub, color: white ? '#a8d5be' : C.mint}}>{sub}</div>}
    </div>
  );
}

function Bar2({ label, value, max, color, right }) {
  const pct = Math.min(100, (value/max)*100);
  return (
    <div style={{marginBottom:10}}>
      <div style={{display:'flex',justifyContent:'space-between',fontSize:12.5,marginBottom:3}}>
        <span>{label}</span><span style={{fontWeight:700,color: color||C.forest}}>{right}</span>
      </div>
      <div style={{height:8,background:C.sand,borderRadius:4,overflow:'hidden'}}>
        <div style={{height:'100%',width:pct+'%',background:color||C.forest,borderRadius:4,transition:'width .5s'}}/>
      </div>
    </div>
  );
}

function CheckList({ items, white }) {
  return (
    <ul style={{listStyle:'none',padding:0,margin:0}}>
      {items.map((item,i)=>(
        <li key={i} style={{padding:'5px 0',paddingLeft:20,position:'relative',fontSize:14,color:white?'#fff':'#444',lineHeight:1.55}}>
          <span style={{position:'absolute',left:0,color:white?'#fff':C.mint,fontWeight:700}}>✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div style={{marginBottom:22}}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div style={{...s.h2, marginBottom:6}}>{title}</div>
      {sub && <p style={{...s.p, color:C.muted, maxWidth:580}}>{sub}</p>}
    </div>
  );
}

function Chip({ children }) {
  return <span style={{background:C.cream,border:`1px solid ${C.border}`,borderRadius:20,padding:'4px 12px',fontSize:12.5,fontWeight:600,color:C.evergreen}}>{children}</span>;
}

// ─── TAB: OVERVIEW ───────────────────────────────────────────────────────────
function TabOverview() {
  return (
    <div>
      <div style={{marginBottom:24}}>
        <Eyebrow>Earth Brands Inc.</Eyebrow>
        <h1 style={s.h1}>The OS for<br/>Sustainable Packaging</h1>
        <p style={{...s.p,fontSize:15,maxWidth:600,marginTop:10}}>We&apos;re building the platform that powers sustainable packaging for the $14B underserved SMB food-service market — combining self-serve ordering, AI-native ERP, and in-house production into one flywheel.</p>
      </div>

      <div style={{...s.grid4, marginBottom:18}}>
        <div style={s.card}><KPI num="$5.5M" label="2025 Revenue" sub="+306% YoY"/></div>
        <div style={s.card}><KPI num="163%" label="Net Revenue Retention" sub="H2 vs H1 2025"/></div>
        <div style={s.card}><KPI num="99%" label="Self-Serve After Go-Live" sub="Earth Store automation"/></div>
        <div style={s.cardAccent}><KPI num="$10M" label="2026 ARR Goal" sub="85% already secured" white/></div>
      </div>

      <div style={s.grid2}>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:12}}>Investment Thesis</div>
          <CheckList items={[
            '$30B US food-service packaging market; SMBs = $14B, chronically underserved',
            'First platform to combine ordering, AI ERP, and in-house production',
            'Proven unit economics: 36% gross margin expanding to 45%+ by 2026',
            'Recurring revenue engine: 163% NRR with 99% self-serve after onboarding',
            'Backed by Mark Cuban, Wyc Grousbeck, LionTree Advisors',
            '$10M ARR target with 85% secured before Q1 even begins',
          ]}/>
        </div>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:14}}>Market Sizing</div>
          <Bar2 label="Total US Food-Service Packaging" value={100} max={100} right="$30B"/>
          <Bar2 label="SMB Segment (45% of market)" value={47} max={100} color={C.mint} right="$14B"/>
          <Bar2 label="Sustainable Packaging (fast-growing)" value={13} max={100} color={C.yellow} right="$4B+"/>
          <p style={{...s.p,fontSize:12.5,color:C.muted,marginTop:12}}>The SMB segment is structurally underserved — distributed by legacy players, no self-serve portals, poor unit economics. That&apos;s our wedge.</p>
        </div>
      </div>

      <div style={{...s.cardCream, marginTop:18}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:14}}>
          <div>
            <div style={s.h3}>Revenue Growth Path</div>
            <p style={{...s.p,fontSize:12.5,color:C.muted,marginTop:3}}>Conservative projections based on contracted, re-sign, and weighted pipeline revenue</p>
          </div>
          <div style={{display:'flex',gap:28}}>
            {[['$5.5M','2025'],['$10.3M','2026'],['$17M','2027'],['$30M','2028']].map(([n,y])=>(
              <div key={y} style={{textAlign:'center'}}>
                <div style={{fontFamily:"'Fustat',sans-serif",fontSize:22,fontWeight:800,color:C.forest}}>{n}</div>
                <div style={{fontSize:11.5,color:C.muted}}>{y}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: PROBLEM ────────────────────────────────────────────────────────────
function TabProblem() {
  return (
    <div>
      <SectionHead eyebrow="Why We Exist" title="A $14B Market With No Real Solution"
        sub="The SMB food-service operator has been ignored by the industry for decades."/>
      <div style={s.grid2}>
        <div style={s.card}>
          <Eyebrow style={{color:'#e65100'}}>The Problem</Eyebrow>
          <div style={{...s.h3,marginBottom:12}}>How It Works Today</div>
          <CheckList items={[
            'No self-serve ordering portal — every reorder requires a phone call or email chain',
            'Custom branding is expensive, slow, and minimum-order-heavy',
            'Legacy distributors mark up 30–50% and offer zero data or transparency',
            'Sustainable options cost 2–3x conventional, with no volume support',
            'Inventory management is manual — operators constantly run out or over-order',
            'No analytics on usage, no platform relationship, just a transaction',
          ]}/>
          <div style={{...s.cardCream,marginTop:14,padding:12}}>
            <p style={{...s.p,fontSize:13}}><strong>Result:</strong> SMBs pay more, get less, and have no tools to run their operations efficiently. They represent 45% of the market and get 0% of the innovation.</p>
          </div>
        </div>
        <div style={s.cardAccent}>
          <Eyebrow style={{color:C.mint}}>The Solution</Eyebrow>
          <div style={{...s.h3,color:'#fff',marginBottom:12}}>The Earth Brands Platform</div>
          <CheckList white items={[
            'Self-serve portal (Earth Store): order, track, and manage from any device',
            'Custom branded cups at SMB-accessible prices, powered by Earth Base in KS',
            'AI-native ERP (Earth Central): predictive reorder, usage analytics, billing',
            'Contracts that lock in pricing, volume commitments, and auto-renewal',
            '163% NRR — operators spend more every cycle because the platform works',
            'Sustainable products at price parity with conventional through scale',
          ]}/>
          <div style={{background:'rgba(255,255,255,0.12)',borderRadius:8,padding:12,marginTop:14}}>
            <p style={{color:'#fff',fontSize:13,margin:0,lineHeight:1.6}}><strong>Result:</strong> Operators get a true platform relationship. We get recurring revenue, high retention, and a moat that compounds with every new customer.</p>
          </div>
        </div>
      </div>
      <div style={{marginTop:18}}>
        <div style={{...s.h3,marginBottom:12}}>Why Now?</div>
        <div style={s.grid3}>
          {[
            ['🌿','Sustainability Mandates','Municipal bans on single-use plastics accelerating. Operators need compliant alternatives now — not in 5 years.'],
            ['📱','Digital-Native Operators','New generation of food-service operators expects self-serve digital tools. They’ve never used a fax machine.'],
            ['🏭','Supply Chain Maturity','Tariff dynamics and new Taiwan vendor relationships give us a 10%+ cost advantage heading into 2026.'],
          ].map(([icon,title,body])=>(
            <div key={title} style={s.card}>
              <div style={{fontSize:22,marginBottom:8}}>{icon}</div>
              <div style={{...s.h3,fontSize:15,marginBottom:6}}>{title}</div>
              <p style={{...s.p,fontSize:13,margin:0}}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TAB: PLATFORM ────────────────────────────────────────────────────────────
function TabPlatform() {
  const [sub, setSub] = useState('store');
  const tabs = [['store','🛒 Earth Store'],['central','🧠 Earth Central'],['base','🏭 Earth Base']];
  return (
    <div>
      <SectionHead eyebrow="Product" title="Three Products. One Platform."
        sub="Each piece of the stack reinforces the others — creating a flywheel that compounds with every order."/>
      <div style={{display:'flex',gap:8,marginBottom:20}}>
        {tabs.map(([id,label])=>(
          <button key={id} onClick={()=>setSub(id)} style={{padding:'6px 16px',borderRadius:6,border:`1px solid ${sub===id?C.forest:C.border}`,background:sub===id?C.forest:'transparent',color:sub===id?'#fff':C.muted,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'Roboto',sans-serif"}}>
            {label}
          </button>
        ))}
      </div>
      {sub==='store' && (
        <div style={s.grid2}>
          <div>
            <div style={{...s.cardAccent,marginBottom:16,padding:26}}>
              <Eyebrow style={{color:C.mint}}>Earth Store</Eyebrow>
              <div style={{...s.h2,color:'#fff',fontSize:22,marginBottom:10}}>Self-Serve Portal for SMB Operators</div>
              <p style={{color:'rgba(255,255,255,0.8)',margin:'0 0 18px',fontSize:14,lineHeight:1.6}}>Earth Store is the first self-serve ordering, contract, and inventory management platform built specifically for SMB food-service operators.</p>
              <div style={{display:'flex',gap:24}}>
                {[['99%','Self-serve after go-live'],['34%','of 2025 revenue'],['45%','2026 target']].map(([n,l])=>(
                  <div key={l}><div style={{fontFamily:"'Fustat',sans-serif",fontSize:22,fontWeight:800,color:'#fff'}}>{n}</div><div style={{fontSize:11,color:'rgba(255,255,255,0.7)'}}>{l}</div></div>
                ))}
              </div>
            </div>
            <div style={s.card}>
              <div style={{...s.h3,fontSize:15,marginBottom:10}}>Key Milestones</div>
              <CheckList items={['Launched 2024; scaled to 121+ active contracts','Boston Beer Co. (727 locations) on platform','Life Time Fitness, Tatte Bakery, Cisco Brewers all contracted','Cross-sell rate: ~25% additional spend per ES contract']}/>
            </div>
          </div>
          <div>
            <div style={{...s.h3,marginBottom:12}}>Platform Features</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[['📦','One-click reorder with saved specs'],['🎨','Custom branding portal with live proof'],['📊','Usage analytics & inventory forecast'],['💳','Contract management & auto-billing'],['🚚','Real-time order tracking & delivery'],['🔄','Predictive reorder before stock-out'],['🌱','Sustainability reporting for B2B certs'],['📱','Mobile-first for on-the-go operators']].map(([icon,text])=>(
                <div key={text} style={{display:'flex',gap:10,alignItems:'flex-start',padding:10,background:C.cream,borderRadius:8}}>
                  <div style={{width:26,height:26,background:C.forest,borderRadius:6,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:13}}>{icon}</div>
                  <span style={{fontSize:13,color:'#444',lineHeight:1.5}}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {sub==='central' && (
        <div style={s.grid2}>
          <div style={s.card}>
            <Eyebrow>Earth Central</Eyebrow>
            <div style={{...s.h2,fontSize:21,marginBottom:10}}>AI-Native ERP</div>
            <p style={{...s.p,marginBottom:14}}>Earth Central is the operational backbone — an AI-powered ERP that manages inventory, production, logistics, and customer accounts in one place.</p>
            <CheckList items={['Automated PO generation based on customer run-rates','Real-time production scheduling at Earth Base','Logistics optimization: TMS integration, carrier rate negotiation','Contract lifecycle management for all 121+ accounts','CRM integration (HubSpot) for pipeline-to-delivery tracking','Financial reporting and gross margin analysis per SKU']}/>
          </div>
          <div>
            <div style={{...s.cardCream,marginBottom:14}}>
              <div style={{...s.h3,marginBottom:10}}>Why It&apos;s a Moat</div>
              <p style={{...s.p,fontSize:13.5,margin:0}}>Most competitors have either a storefront OR an ERP. We have both, tightly integrated. Every order placed through Earth Store flows directly into Earth Central, triggering production, inventory allocation, and fulfillment — zero human touch.</p>
            </div>
            <div style={s.card}>
              <div style={{...s.h3,marginBottom:10}}>AI-Powered Capabilities</div>
              <CheckList items={['Demand forecasting by SKU and customer','Dynamic pricing optimization','Churn prediction and proactive renewal workflows','Margin analysis by customer, SKU, and channel']}/>
            </div>
          </div>
        </div>
      )}
      {sub==='base' && (
        <div style={s.grid2}>
          <div style={{...s.cardAccent,padding:26}}>
            <Eyebrow style={{color:C.mint}}>Earth Base — Hutchinson, KS</Eyebrow>
            <div style={{...s.h2,color:'#fff',fontSize:21,marginBottom:10}}>50,000 sq ft Production Facility</div>
            <p style={{color:'rgba(255,255,255,0.8)',margin:'0 0 20px',fontSize:14,lineHeight:1.6}}>Our owned production facility is the key to custom branded packaging at SMB-accessible economics. By printing in-house, we eliminate the 3rd-party print markup and control quality end-to-end.</p>
            <div style={{display:'flex',gap:24}}>
              {[['+542%','Production growth 2025'],['2','New printing machines'],['25%','Print cost reduction target']].map(([n,l])=>(
                <div key={l}><div style={{fontFamily:"'Fustat',sans-serif",fontSize:22,fontWeight:800,color:'#fff'}}>{n}</div><div style={{fontSize:11,color:'rgba(255,255,255,0.7)'}}>{l}</div></div>
              ))}
            </div>
          </div>
          <div>
            <div style={{...s.card,marginBottom:14}}>
              <div style={{...s.h3,fontSize:15,marginBottom:12}}>2026 Cost Reduction Roadmap</div>
              <Bar2 label="Landed cup cost reduction" value={10} max={30} color={C.mint} right="–10%"/>
              <Bar2 label="KS print cost reduction" value={25} max={30} color={C.mint} right="–25%"/>
              <Bar2 label="Net freight reduction" value={15} max={30} color={C.mint} right="–15%"/>
              <Bar2 label="Warehousing / fulfillment" value={15} max={30} color={C.mint} right="–15%"/>
            </div>
            <div style={{...s.cardCream,padding:12}}>
              <p style={{...s.p,fontSize:13,margin:0}}>New Head of Operations + second printing machine enables 200% output increase at only 50% labor cost increase. Combined with TMS system and 3PL consolidation, total margin expansion of <strong>~9–10 points</strong> expected in 2026.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── TAB: TRACTION ────────────────────────────────────────────────────────────
const tractionData = [
  {q:'Q1 2025',rev:850},{q:'Q2 2025',rev:1100},{q:'Q3 2025',rev:1650},{q:'Q4 2025',rev:1900}
];
const channelData = [
  {name:'Earth Store',value:34,color:C.forest},{name:'Distributor',value:54,color:C.mint},{name:'One-Time Orders',value:12,color:C.sand}
];

function TabTraction() {
  return (
    <div>
      <SectionHead eyebrow="2025 Performance" title="The Numbers Don't Lie"
        sub="2025 was our breakout year — real contracts, real retention, real momentum."/>
      <div style={{...s.grid4,marginBottom:18}}>
        <div style={s.card}><KPI num="$5.5M" label="Total Revenue" sub="+306% YoY"/></div>
        <div style={s.card}><KPI num="163%" label="Net Revenue Retention" sub="H2 vs H1"/></div>
        <div style={s.card}><KPI num="+542%" label="Production Growth" sub="Earth Base capacity"/></div>
        <div style={s.card}><KPI num="121+" label="Active Contracts" sub="ES + Distributor"/></div>
      </div>
      <div style={s.grid2}>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:4}}>Quarterly Revenue 2025</div>
          <p style={{...s.p,fontSize:12,color:C.muted,marginBottom:12}}>163% NRR reflects doubling of spending from H1 to H2</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={tractionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand}/>
              <XAxis dataKey="q" tick={{fontSize:11}} tickLine={false}/>
              <YAxis tick={{fontSize:11}} tickFormatter={v=>`$${v}K`} tickLine={false}/>
              <Tooltip formatter={v=>[`$${v}K`,'Revenue']}/>
              <Bar dataKey="rev" radius={[5,5,0,0]}>
                {tractionData.map((_, i) => <Cell key={i} fill={i===3?C.forest:C.mint+'99'}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:4}}>2025 Revenue by Channel</div>
          <p style={{...s.p,fontSize:12,color:C.muted,marginBottom:12}}>Earth Store growing from 5% → 34% of revenue in one year</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({name,value})=>`${name} ${value}%`} labelLine={false}>
                {channelData.map((d,i)=><Cell key={i} fill={d.color}/>)}
              </Pie>
              <Tooltip formatter={v=>`${v}%`}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:8}}>
            <div style={{...s.cardCream,padding:12}}><div style={{fontWeight:600,fontSize:13,marginBottom:2}}>Earth Store</div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:20,fontWeight:800,color:C.forest}}>$1.87M</div><div style={{fontSize:12,color:C.muted}}>34% of revenue</div></div>
            <div style={{...s.cardCream,padding:12}}><div style={{fontWeight:600,fontSize:13,marginBottom:2}}>Distributor</div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:20,fontWeight:800,color:C.forest}}>$2.99M</div><div style={{fontSize:12,color:C.muted}}>54% of revenue</div></div>
          </div>
        </div>
      </div>
      <div style={{marginTop:18}}>
        <div style={{...s.h3,marginBottom:12}}>Marquee Customers (2025)</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {['☕ Tatte Bakery ($864K)','🏋️ Life Time Fitness ($468K)','🏟️ Madison Square Garden ($264K)','🏟️ Barclays Center ($178K)','🍺 Cisco Brewers ($141K)','🍺 Boston Beer Co. (727 locs)','☕ Hampton Coffee ($87K)','💚 Goodness Bowls ($52K)','🏈 Chelsea Piers ($34K)','🎵 City Winery','🍓 Kijitora Brooklyn ($37K)'].map(c=><Chip key={c}>{c}</Chip>)}
        </div>
      </div>
    </div>
  );
}

// ─── TAB: FINANCIALS ──────────────────────────────────────────────────────────
const financialsData = [
  {year:'2025',rev:5.5,ebitda:-0.5},{year:'2026',rev:10.3,ebitda:-0.83},
  {year:'2027',rev:17,ebitda:0.99},{year:'2028',rev:30,ebitda:3.74}
];

function TabFinancials() {
  return (
    <div>
      <SectionHead eyebrow="3-Year Model" title="Path to Profitability"
        sub="Conservative projections built on contracted revenue, signed re-signs, and weighted pipeline."/>
      <div style={{...s.grid3,marginBottom:18}}>
        {[
          {yr:'2026',rev:'$10.3M',gm:'36.1%',ebitda:'-$834K',net:'-$1.1M',accent:false},
          {yr:'2027',rev:'$17M',gm:'45%',ebitda:'+$990K',net:'+$675K',accent:false},
          {yr:'2028',rev:'$30M',gm:'45%',ebitda:'+$3.74M',net:'+$3.37M',accent:true},
        ].map(({yr,rev,gm,ebitda,net,accent})=>(
          <div key={yr} style={accent?s.cardAccent:s.card}>
            <Eyebrow style={accent?{color:C.mint}:{color:C.muted}}>{yr}</Eyebrow>
            <div style={{fontFamily:"'Fustat',sans-serif",fontSize:32,fontWeight:800,color:accent?'#fff':C.forest,letterSpacing:-1,lineHeight:1}}>{rev}</div>
            <div style={{fontSize:12,color:accent?'rgba(255,255,255,0.7)':C.muted,marginTop:2,marginBottom:14}}>Projected Revenue</div>
            <div style={{height:1,background:accent?'rgba(255,255,255,0.2)':C.border,marginBottom:12}}/>
            {[['Gross Margin',gm],['EBITDA',ebitda],['Net Income',net]].map(([l,v])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                <span style={{fontSize:13,color:accent?'rgba(255,255,255,0.7)':C.muted}}>{l}</span>
                <span style={{fontSize:13,fontWeight:700,color:accent?C.mint:v.startsWith('+')?C.forest:'#e65100'}}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={s.grid2}>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:4}}>Revenue & EBITDA Trajectory</div>
          <p style={{...s.p,fontSize:12,color:C.muted,marginBottom:12}}>Cross EBITDA breakeven in 2027</p>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={financialsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand}/>
              <XAxis dataKey="year" tick={{fontSize:11}} tickLine={false}/>
              <YAxis yAxisId="l" tick={{fontSize:11}} tickFormatter={v=>`$${v}M`} tickLine={false}/>
              <YAxis yAxisId="r" orientation="right" tick={{fontSize:11}} tickFormatter={v=>`$${v}M`} tickLine={false}/>
              <Tooltip formatter={(v,n)=>[`$${v}M`,n]}/>
              <Legend wrapperStyle={{fontSize:12}}/>
              <Bar yAxisId="l" dataKey="rev" name="Revenue" radius={[4,4,0,0]}>
                {financialsData.map((_,i)=><Cell key={i} fill={i===3?C.forest:C.mint+'99'}/>)}
              </Bar>
              <Line yAxisId="r" type="monotone" dataKey="ebitda" name="EBITDA" stroke="#f59e0b" strokeWidth={2} dot={{fill:'#f59e0b',r:4}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:14}}>2026 Operating Expenses</div>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13.5}}>
            <thead>
              <tr>{['Category','Amount','% Rev'].map(h=><th key={h} style={{textAlign:'left',padding:'8px 12px',background:C.sand,fontSize:12,fontWeight:700,borderBottom:`2px solid ${C.border}`}}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {[['Cost of Revenue (COGS)','$6.59M','63.9%'],['Warehouse & Logistics','$1.31M','12.7%'],['Advertising & Marketing','$568K','5.5%'],['Salaries & Wages','$1.02M','9.9%'],['Other Overhead','$1.9M','18.4%']].map(([c,a,p])=>(
                <tr key={c}>{[c,a,p].map((v,i)=><td key={i} style={{padding:'8px 12px',borderBottom:`1px solid ${C.border}`,color:'#444'}}>{v}</td>)}</tr>
              ))}
              <tr style={{background:C.cream}}>{[['Gross Margin','$3.72M','36.1%']].map(([c,a,p])=>[c,a,p].map((v,i)=><td key={i} style={{padding:'8px 12px',fontWeight:700,borderBottom:`1px solid ${C.border}`}}>{v}</td>))}</tr>
              <tr style={{background:C.sand}}>{[['EBITDA','-$834K','-8.1%']].map(([c,a,p])=>[c,a,p].map((v,i)=><td key={i} style={{padding:'8px 12px',fontWeight:700,color:'#e65100'}}>{v}</td>))}</tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: PIPELINE ────────────────────────────────────────────────────────────
function TabPipeline() {
  return (
    <div>
      <SectionHead eyebrow="2026 Revenue" title="$10M Goal — 85% Already Secured"
        sub="Our 2026 revenue is built from three sources: contracted carryover, scheduled re-signs, and new pipeline."/>
      <div style={{...s.grid3,marginBottom:18}}>
        {[
          {label:'Secured Revenue',num:'$6.1M',sub:'Contracted carryover',body:'Revenue from existing contracts whose terms roll into 2026 — zero new sales required.',pill:'Guaranteed',pillColor:'#E8F5EE',pillText:C.evergreen},
          {label:'Re-Sign Revenue',num:'$2.57M',sub:'Contracts expiring → renewing',body:'Customers whose 2025 contracts expire are re-signing. Based on our 163% NRR, this is highly predictable.',pill:'High Confidence',pillColor:'#E8F5EE',pillText:C.evergreen},
          {label:'Pipeline Revenue',num:'$3.14M',sub:'Weighted pipeline (2026 recognition)',body:'Of our $36.9M active pipeline, $7.7M weighted expected value — recognizing $3.14M in 2026.',pill:'Weighted',pillColor:'#FFF3E0',pillText:'#E65100'},
        ].map(({label,num,sub,body,pill,pillColor,pillText})=>(
          <div key={label} style={s.card}>
            <Eyebrow style={{color:C.sage}}>{label}</Eyebrow>
            <div style={{fontFamily:"'Fustat',sans-serif",fontSize:32,fontWeight:800,color:C.forest,letterSpacing:-1,lineHeight:1}}>{num}</div>
            <div style={{fontSize:12,color:C.muted,marginTop:2,marginBottom:8}}>{sub}</div>
            <p style={{...s.p,fontSize:12.5,marginBottom:10}}>{body}</p>
            <span style={{background:pillColor,color:pillText,padding:'3px 10px',borderRadius:20,fontSize:12,fontWeight:600}}>{pill}</span>
          </div>
        ))}
      </div>
      <div style={s.grid2}>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:4}}>2026 Revenue Stack</div>
          <p style={{...s.p,fontSize:12,color:C.muted,marginBottom:14}}>Total projected: $11.8M — $10M target is conservative</p>
          <Bar2 label="Secured Contracts ($6.1M)" value={59} max={100} right="59%"/>
          <Bar2 label="Re-Sign Revenue ($2.57M)" value={25} max={100} color={C.sage} right="25%"/>
          <Bar2 label="Pipeline Revenue ($3.14M)" value={30} max={100} color={C.mint} right="30%"/>
          <div style={{...s.cardCream,marginTop:14,padding:12}}>
            <p style={{...s.p,fontSize:13,margin:0}}><strong>Key:</strong> Even if pipeline comes in at zero, secured + re-signs = $8.67M = 87% of $10M goal.</p>
          </div>
        </div>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:14}}>Active HubSpot Pipeline</div>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
            <thead><tr>{['Stage','Total','Weight','Exp. Value'].map(h=><th key={h} style={{textAlign:'left',padding:'7px 10px',background:C.sand,fontSize:11.5,fontWeight:700,borderBottom:`2px solid ${C.border}`}}>{h}</th>)}</tr></thead>
            <tbody>
              {[['Deal Discussion','$10.2M','5%','$512K'],['Requirements Gathering','$9.3M','15%','$1.4M'],['Samples / Pricing','$15.4M','30%','$4.6M'],['Contract Negotiation','$2.0M','60%','$1.2M'],['Contract Signed','$10.3M','100%','$10.3M']].map(r=>(
                <tr key={r[0]}>{r.map((v,i)=><td key={i} style={{padding:'7px 10px',borderBottom:`1px solid ${C.border}`,color:'#444'}}>{v}</td>)}</tr>
              ))}
              <tr style={{background:C.cream}}>{['Stage 2–5 Total','$36.9M','—','$7.7M'].map((v,i)=><td key={i} style={{padding:'7px 10px',fontWeight:700}}>{v}</td>)}</tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{...s.card,marginTop:18}}>
        <div style={{...s.h3,marginBottom:12}}>Top Customer Relationships (2025 → 2026)</div>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead><tr>{['Customer','2025 Revenue','2026 Contracted','2026 Re-sign','2026 Total'].map(h=><th key={h} style={{textAlign:'left',padding:'7px 12px',background:C.sand,fontSize:11.5,fontWeight:700,borderBottom:`2px solid ${C.border}`}}>{h}</th>)}</tr></thead>
          <tbody>
            {[['Tatte Bakery','$863K','$1.21M','$258K','$1.47M'],['Life Time Fitness','$468K','$1.60M','—','$1.60M'],['Madison Square Garden','$264K','$300K','—','$300K'],['Barclays Center','$178K','$250K','—','$250K'],['Daily Provisions','$162K','—','$85K','$85K'],['Gordon Food Services','—','$135K','—','$135K']].map(r=>(
              <tr key={r[0]}>{r.map((v,i)=><td key={i} style={{padding:'7px 12px',borderBottom:`1px solid ${C.border}`,color:i===4?C.forest:'#444',fontWeight:i===4?700:400}}>{v}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── TAB: MARGINS ─────────────────────────────────────────────────────────────
const marginSkuData = [
  {sku:'Cold Cups (Custom)', dist:27.1, es:35.4},
  {sku:'Cold Cups (Blank)',  dist:41.1, es:67.3},
  {sku:'Cold Lids',          dist:35.9, es:54.6},
  {sku:'Hot Cups',           dist:22.1, es:35.9},
  {sku:'Straws',             dist:42.8, es:38.5},
  {sku:'Hot Lids',           dist:35.8, es:54.5},
];

function TabMargins() {
  return (
    <div>
      <SectionHead eyebrow="Unit Economics" title="Gross Margins: Expanding Rapidly"
        sub="Two structural drivers expand margins from 36% to 54%: growing Earth Store mix (higher ASP channel) and supply chain savings at scale."/>
      <div style={{...s.grid2,marginBottom:18}}>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:16}}>Gross Margin Expansion (WAVG)</div>
          {[['2025','36.1%',36.1,'Base'],['2026','45.4%',45.4,'+9.3pts'],['2028','53.8%',53.8,'+17.7pts']].map(([yr,pct,val,delta])=>(
            <div key={yr} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:"'Fustat',sans-serif",fontSize:15,fontWeight:700,width:48,color:C.forest}}>{yr}</div>
              <div style={{fontFamily:"'Fustat',sans-serif",fontSize:22,fontWeight:800,width:70}}>{pct}</div>
              <div style={{flex:1,height:10,background:C.sand,borderRadius:5,overflow:'hidden'}}>
                <div style={{height:'100%',width:val+'%',background:`linear-gradient(90deg,${C.forest},${C.mint})`,borderRadius:5}}/>
              </div>
              <div style={{fontSize:12,color:C.mint,fontWeight:700,width:60,textAlign:'right'}}>{delta}</div>
            </div>
          ))}
          <div style={{...s.cardCream,marginTop:14,padding:12}}>
            <p style={{...s.p,fontSize:13,margin:0}}><strong>Channel Mix Effect:</strong> Earth Store grows from 30% → 50% → 70% of revenue by 2028. Higher ASPs drive ~4 margin points alone.</p>
          </div>
        </div>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:4}}>Gross Margin by SKU & Channel (2025)</div>
          <p style={{...s.p,fontSize:12,color:C.muted,marginBottom:12}}>Earth Store margin vs Distributor margin per product</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={marginSkuData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} horizontal={false}/>
              <XAxis type="number" tick={{fontSize:10}} tickFormatter={v=>v+'%'} domain={[0,80]}/>
              <YAxis type="category" dataKey="sku" tick={{fontSize:10}} width={110}/>
              <Tooltip formatter={v=>`${v}%`}/>
              <Legend wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="dist" name="Distributor" fill={C.mint+'99'} radius={[0,3,3,0]}/>
              <Bar dataKey="es" name="Earth Store" fill={C.forest} radius={[0,3,3,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={s.card}>
        <div style={{...s.h3,marginBottom:14}}>2026 Margin Improvement Drivers</div>
        <div style={s.grid4}>
          {[['Supply Chain','–10%','Landed cup cost via new Taiwan vendors + pricing power from 2x volume'],['KS Print Cost','–25%','2 machines → 200% output at 50% incremental labor. Dave’s operational tightening.'],['Net Freight','–15%','TMS system + better carrier rates + charging more ES customers for shipping.'],['Warehousing','–15%','Cutting several 3PLs, consolidating to 1–2 core partners, better inventory turns.']].map(([label,pct,body])=>(
            <div key={label} style={{...s.card,padding:14}}>
              <Eyebrow>{label}</Eyebrow>
              <div style={{fontFamily:"'Fustat',sans-serif",fontSize:28,fontWeight:800,color:C.forest,marginBottom:4}}>{pct}</div>
              <p style={{...s.p,fontSize:12,margin:0}}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TAB: TEAM ────────────────────────────────────────────────────────────────
function TabTeam() {
  const team = [
    {init:'MV',name:'Misha Vitels',title:'CEO & Co-Founder',bio:'Drives strategy, capital, and enterprise partnerships. Built the Earth Store platform concept and closed the company’s first major distributor contracts including MSG, Barclays, and Tatte.'},
    {init:'PF',name:'Peter Frelinghuysen',title:'COO & Co-Founder',bio:'Oversees operations, supply chain, Earth Base production facility in Kansas. Built fulfillment infrastructure from zero to $5.5M revenue in two years.'},
    {init:'DK',name:'Dave',title:'Head of Operations — Kansas',bio:'Leading Earth Base efficiency push. Responsible for the 25% print cost reduction target, 2-machine optimization, and TMS implementation.'},
    {init:'HS',name:'Hayden Schwartz',title:'Account Executive',bio:'Managing key Earth Store accounts including Tatte, Cisco Brewers, and enterprise distributor relationships.'},
    {init:'JL',name:'Jake Lundberg',title:'Account Executive',bio:'Focused on west coast pipeline and distributor expansion. Managing $40M+ in active pipeline deals.'},
    {init:'SW',name:'Sophia Warren',title:'Account Executive',bio:'Leading DC and mid-Atlantic market expansion. Sourcing food-service operators in the $5K–$50K contract range.'},
  ];
  return (
    <div>
      <SectionHead eyebrow="Leadership" title="Built for This Moment"
        sub="A founder-led team with deep expertise in B2B SaaS, sustainability, food-service operations, and capital markets."/>
      <div style={{...s.grid2,marginBottom:18}}>
        {team.map(({init,name,title,bio})=>(
          <div key={name} style={{...s.card,display:'flex',gap:14}}>
            <div style={{width:44,height:44,borderRadius:10,background:C.forest,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontFamily:"'Fustat',sans-serif",fontSize:16,fontWeight:700,flexShrink:0}}>{init}</div>
            <div>
              <div style={{fontWeight:700,fontSize:14.5,marginBottom:2}}>{name}</div>
              <div style={{fontSize:12.5,color:C.forest,fontWeight:600,marginBottom:6}}>{title}</div>
              <div style={{fontSize:12.5,color:C.muted,lineHeight:1.55}}>{bio}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{...s.cardCream,padding:18}}>
        <div style={{...s.h3,marginBottom:10}}>Advisors & Investors</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
          {['🏀 Mark Cuban','🏆 Wyc Grousbeck (Boston Celtics)','🏦 LionTree Advisors','⚡ HepCo','🌊 East Dune','🎰 Fontainebleau'].map(i=><Chip key={i}>{i}</Chip>)}
        </div>
      </div>
    </div>
  );
}

// ─── TAB: THE ROUND ───────────────────────────────────────────────────────────
function TabRound() {
  return (
    <div>
      <SectionHead eyebrow="Investment Opportunity" title="$3M SAFE Round"
        sub="Join a syndicate of strategic investors backing the platform that is becoming the OS for sustainable food-service packaging."/>
      <div style={s.grid2}>
        <div>
          <div style={{...s.card,marginBottom:16}}>
            <div style={{...s.h3,marginBottom:14}}>Round Terms</div>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:13.5}}>
              <tbody>
                {[['Instrument','SAFE (Simple Agreement for Future Equity)'],['Raise Amount','$3,000,000'],['Valuation Cap','$23,000,000'],['Discount Rate','25%'],['Minimum Check','$100,000'],['Closed to Date','$1,000,000'],['Remaining','$2,000,000']].map(([l,v])=>(
                  <tr key={l}><td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{l}</td><td style={{padding:'8px 12px',fontWeight:700,borderBottom:`1px solid ${C.border}`,color:l==='Remaining'?C.forest:C.ink}}>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={s.card}>
            <div style={{...s.h3,marginBottom:12}}>Round Progress</div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:15,marginBottom:8,fontWeight:600}}>
              <span>$1M Closed</span><span style={{color:C.forest}}>33% Filled</span>
            </div>
            <div style={{height:16,background:C.sand,borderRadius:8,overflow:'hidden',marginBottom:12}}>
              <div style={{height:'100%',width:'33%',background:`linear-gradient(90deg,${C.evergreen},${C.forest})`,borderRadius:8}}/>
            </div>
            <p style={{...s.p,fontSize:12.5,color:C.muted}}>$2M remaining. Strategic check sizes preferred. Closing Q1 2026.</p>
            <div style={{...s.h3,marginTop:14,marginBottom:10,fontSize:15}}>Prior Investors</div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
              {['Mark Cuban','Wyc Grousbeck','LionTree','HepCo','East Dune','Fontainebleau'].map(i=><Chip key={i}>{i}</Chip>)}
            </div>
            <p style={{...s.p,fontSize:12,color:C.muted,marginTop:8}}>$6.4M raised to date from prior rounds.</p>
          </div>
        </div>
        <div>
          <div style={{...s.card,marginBottom:16}}>
            <div style={{...s.h3,marginBottom:14}}>Use of Funds</div>
            {[['Working Capital (9–12 months)','$1.5M',50],['Marketing (events, ads, sponsorships)','$350K',12],['Sales (reps, in-person acquisition)','$300K',10],['Tech (AI features + personnel)','$300K',10],['Key Hires (Head of Growth + Ops)','$250K',8],['Operations (facility upgrades)','$150K',5],['Product Development','$150K',5],['Legal / Misc','$100K',3]].map(([l,a,p])=>(
              <Bar2 key={l} label={`${l} (${a})`} value={p} max={55} right={`${p}%`}/>
            ))}
          </div>
          <div style={{...s.cardCream,padding:18}}>
            <div style={{...s.h3,marginBottom:8,fontSize:15}}>Why Invest Now?</div>
            <CheckList items={['$23M cap on a company with clear path to $10M+ ARR in 2026','85% of 2026 revenue already secured before raising','Proven retention: customers increase spend, don’t churn','Platform moat deepens with every order, every contract','Strategic co-investors include Cuban, Grousbeck, LionTree']}/>
          </div>
        </div>
      </div>
      <div style={{background:C.forest,borderRadius:12,padding:26,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16,marginTop:18}}>
        <div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:18,fontWeight:800,color:'#fff',marginBottom:3}}>Ready to Proceed?</div><p style={{color:'rgba(255,255,255,0.75)',fontSize:13.5,margin:0}}>Reach out directly. We move fast and appreciate decisive investors.</p></div>
        <div style={{display:'flex',gap:28}}>
          {[['Misha Vitels — CEO','917-345-0430','misha@earthstore.com'],['Peter Frelinghuysen — COO','917-499-8781','peter@earthstore.com']].map(([n,p,e])=>(
            <div key={n}><div style={{color:'#fff',fontWeight:700,fontSize:14,marginBottom:2}}>{n}</div><div style={{color:'rgba(255,255,255,0.75)',fontSize:12.5}}>{p}</div><div style={{color:'rgba(255,255,255,0.75)',fontSize:12.5}}>{e}</div></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TAB: DATA ROOM ───────────────────────────────────────────────────────────
function TabDataRoom() {
  const docs = [
    {icon:'📊',title:'Investor Pitch Deck',desc:'Full company overview, strategy, and financials',available:true},
    {icon:'📄',title:'One-Pager Executive Summary',desc:'Quick overview for initial review',available:true},
    {icon:'🎤',title:'Investor Day Deck (Feb 2025)',desc:'Full investor day presentation with Q&A',available:true},
    {icon:'❓',title:'Diligence Q&A (YETI Capital)',desc:'Full due diligence responses, 60+ questions',available:true},
    {icon:'💹',title:'3-Year Financial Model (2026–2028)',desc:'Monthly budget, P&L, EBITDA projection',available:true},
    {icon:'📈',title:'Gross Margin by SKU',desc:'Full unit economics breakdown by product and channel',available:true},
    {icon:'🗓️',title:'2025–2026 Sales Projections',desc:'Customer-level contract and pipeline analysis',available:true},
    {icon:'📋',title:'Cap Table',desc:'Full capitalization table with all existing investors',available:false},
    {icon:'📝',title:'Customer Contracts / LOIs',desc:'Sample contracts and signed LOIs',available:false},
  ];
  return (
    <div>
      <SectionHead eyebrow="Due Diligence" title="Data Room"
        sub="All materials available upon request. Contact Misha or Peter directly to access full documentation."/>
      <div style={s.grid2}>
        <div style={{...s.card,padding:0,overflow:'hidden'}}>
          <div style={{padding:'14px 18px',borderBottom:`1px solid ${C.border}`,fontWeight:700,fontSize:14,background:C.cream}}>Available Documents</div>
          {docs.map(({icon,title,desc,available})=>(
            <div key={title} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderBottom:`1px solid ${C.border}`,cursor:'pointer'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:36,height:36,borderRadius:8,background:available?'#E8F5EE':C.sand,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>{icon}</div>
                <div><div style={{fontWeight:500,fontSize:14}}>{title}</div><div style={{fontSize:12,color:C.muted,marginTop:1}}>{desc}</div></div>
              </div>
              <span style={{fontSize:11,padding:'3px 10px',borderRadius:12,fontWeight:600,background:available?'#E8F5EE':'var(--sand)',color:available?C.evergreen:C.muted,flexShrink:0,marginLeft:8}}>{available?'Available':'On Request'}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{...s.cardAccent,padding:26,marginBottom:14}}>
            <div style={{...s.h3,color:'#fff',marginBottom:10}}>Request Full Access</div>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:14,marginBottom:18,lineHeight:1.6}}>All documents are available to qualified investors. Reach out directly and we&apos;ll provide a full data room link within 24 hours.</p>
            {[['Misha Vitels — CEO','misha@earthstore.com','917-345-0430'],['Peter Frelinghuysen — COO','peter@earthstore.com','917-499-8781']].map(([n,e,p])=>(
              <div key={n} style={{background:'rgba(255,255,255,0.15)',borderRadius:10,padding:14,marginBottom:10}}>
                <div style={{color:'#fff',fontWeight:700,fontSize:14,marginBottom:3}}>{n}</div>
                <div style={{color:'rgba(255,255,255,0.8)',fontSize:13}}>{e}</div>
                <div style={{color:'rgba(255,255,255,0.8)',fontSize:13}}>{p}</div>
              </div>
            ))}
          </div>
          <div style={{...s.cardCream,padding:16}}>
            <div style={{...s.h3,fontSize:14,marginBottom:8}}>Confidentiality Notice</div>
            <p style={{...s.p,fontSize:12.5,color:C.muted,margin:0}}>This document and the materials contained herein are confidential and intended solely for the use of the recipient. This does not constitute an offer to sell or a solicitation of an offer to buy any securities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: RETURNS MODEL ───────────────────────────────────────────────────────
const REV_SCENARIOS = [
  {label:'Conservative',growthRate:50, multiple:2.25, color:'#f59e0b', desc:'50% growth · 2.25x rev multiple'},
  {label:'Base',        growthRate:75, multiple:3,    color:C.ocean,   desc:'75% growth · 3x rev multiple'},
  {label:'Upside',      growthRate:100,multiple:4.5,  color:'#22c55e', desc:'100% growth · 4.5x rev multiple'},
];
const EBITDA_SCENARIOS = [
  {label:'Conservative',growthRate:50, ebitdaMargin:14,ebitdaMult:8,  color:'#f59e0b', desc:'50% growth · 14% margin · 8x EBITDA'},
  {label:'Base',        growthRate:75, ebitdaMargin:18,ebitdaMult:12, color:C.ocean,   desc:'75% growth · 18% margin · 12x EBITDA'},
  {label:'Upside',      growthRate:100,ebitdaMargin:22,ebitdaMult:16, color:'#22c55e', desc:'100% growth · 22% margin · 16x EBITDA'},
];

function Slider({ label, min, max, step, value, onChange, color, format }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{marginBottom:22}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:10}}>
        <span style={{fontSize:11,letterSpacing:'1px',textTransform:'uppercase',fontWeight:700,color:C.muted}}>{label}</span>
        <span style={{fontFamily:"'Fustat',sans-serif",fontSize:20,fontWeight:800,color:color||C.forest}}>{format(value)}</span>
      </div>
      <div style={{position:'relative',height:4,background:C.sand,borderRadius:2}}>
        <div style={{position:'absolute',left:0,width:pct+'%',height:'100%',background:color||C.forest,borderRadius:2}}/>
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e=>onChange(Number(e.target.value))}
          style={{position:'absolute',top:'50%',transform:'translateY(-50%)',width:'100%',margin:0,opacity:0,cursor:'pointer',height:22,zIndex:2}}
        />
        <div style={{position:'absolute',left:pct+'%',top:'50%',transform:'translate(-50%,-50%)',width:13,height:13,borderRadius:'50%',background:color||C.forest,border:`2px solid #fff`,boxShadow:`0 0 8px ${color||C.forest}88`,pointerEvents:'none'}}/>
      </div>
    </div>
  );
}

function TabReturns() {
  const [mode,       setModeRaw]    = useState('revenue');
  const [baseRev,    setBaseRev]    = useState(10);
  const [growth,     setGrowth]     = useState(75);
  const [years,      setYears]      = useState(4);
  const [multiple,   setMultiple]   = useState(3);
  const [eMargin,    setEMargin]    = useState(18);
  const [eMult,      setEMult]      = useState(12);
  const [valCap,     setValCap]     = useState(23);
  const [preset,     setPreset]     = useState(null);

  const SCNS = mode === 'revenue' ? REV_SCENARIOS : EBITDA_SCENARIOS;

  const setMode = useCallback((m) => { setModeRaw(m); setPreset(null); }, []);

  function applyPreset(i) {
    const s = SCNS[i];
    setGrowth(s.growthRate);
    if (mode === 'revenue') setMultiple(s.multiple);
    else { setEMargin(s.ebitdaMargin); setEMult(s.ebitdaMult); }
    setPreset(i);
  }

  const exitRev   = baseRev * Math.pow(1 + growth / 100, years);
  const ebitdaD   = exitRev * (eMargin / 100);
  const exitValue = mode === 'revenue' ? exitRev * multiple * 1e6 : ebitdaD * eMult * 1e6;
  const retMult   = exitValue / (valCap * 1e6);
  const irr       = Math.pow(retMult, 1 / years) - 1;
  const irrColor  = irr > 0.8 ? '#22c55e' : irr > 0.4 ? C.ocean : irr > 0.2 ? '#f59e0b' : '#ef4444';
  const exitYear  = 2026 + years;
  const fmtM = n => n>=1e9?`$${(n/1e9).toFixed(1)}B`:n>=1e6?`$${(n/1e6).toFixed(1)}M`:`$${(n/1e3).toFixed(0)}K`;

  const maxR = baseRev * Math.pow(1 + growth / 100, 7);

  return (
    <div>
      <SectionHead eyebrow="Investor Returns Calculator" title="Play With the Numbers"
        sub="Adjust assumptions and see your potential return in real time."/>
      <div style={{display:'flex',gap:8,marginBottom:22,alignItems:'center',flexWrap:'wrap'}}>
        {[['revenue','Revenue Multiple'],['ebitda','EBITDA Multiple']].map(([m,label])=>(
          <button key={m} onClick={()=>setMode(m)} style={{padding:'7px 18px',borderRadius:8,border:`1px solid ${mode===m?C.forest:C.border}`,background:mode===m?C.forest:'transparent',color:mode===m?'#fff':C.muted,fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'Roboto',sans-serif"}}>
            {label}
          </button>
        ))}
        <span style={{fontSize:13,color:C.muted,marginLeft:4}}>
          {mode==='revenue'?'Common for high-growth platforms.':'Typical for mature distribution businesses.'}
        </span>
      </div>

      <div style={s.grid2}>
        {/* LEFT: Sliders */}
        <div style={s.card}>
          <Eyebrow style={{marginBottom:18}}>Assumptions</Eyebrow>
          <Slider label="2026 Base Revenue" min={5} max={20} step={0.5} value={baseRev} onChange={setBaseRev} color={C.ocean} format={v=>`$${v}M`}/>
          <Slider label="YoY Growth Rate" min={20} max={150} step={5} value={growth} onChange={v=>{setGrowth(v);setPreset(null);}} color="#a855f7" format={v=>`${v}%`}/>

          {/* Trajectory chart */}
          <div style={{background:C.cream,border:`1px solid ${C.border}`,borderRadius:8,padding:'10px 12px',marginBottom:20,marginTop:-6}}>
            <div style={{fontSize:10,letterSpacing:'1px',textTransform:'uppercase',fontWeight:700,color:C.muted,marginBottom:8}}>Revenue Trajectory</div>
            <div style={{display:'flex',gap:4,alignItems:'flex-end',height:60}}>
              {[1,2,3,4,5,6,7].map(y=>{
                const r = baseRev * Math.pow(1+growth/100, y);
                const h = Math.round((r/maxR)*44)+8;
                const act = y===years;
                return (
                  <div key={y} onClick={()=>setYears(y)} style={{flex:1,textAlign:'center',cursor:'pointer'}}>
                    <div style={{height:h,background:act?C.forest:C.sand,borderRadius:'3px 3px 2px 2px',marginBottom:2,transition:'all .2s'}}/>
                    <div style={{fontSize:9,color:act?C.forest:C.muted}}>{2026+y}</div>
                    <div style={{fontSize:9,fontWeight:700,color:act?C.forest:C.muted}}>${r.toFixed(0)}M</div>
                  </div>
                );
              })}
            </div>
          </div>

          <Slider label="Years to Exit" min={1} max={7} step={1} value={years} onChange={setYears} color="#8b5cf6" format={v=>`${v}yr (${2026+v})`}/>
          {mode==='revenue' && <Slider label="Revenue Multiple at Exit" min={1} max={10} step={0.25} value={multiple} onChange={v=>{setMultiple(v);setPreset(null);}} color="#22c55e" format={v=>`${v.toFixed(2)}x`}/>}
          {mode==='ebitda' && <>
            <Slider label="EBITDA Margin at Exit" min={8} max={22} step={1} value={eMargin} onChange={v=>{setEMargin(v);setPreset(null);}} color="#22c55e" format={v=>`${v}%`}/>
            <Slider label="EBITDA Exit Multiple" min={6} max={20} step={0.5} value={eMult} onChange={v=>{setEMult(v);setPreset(null);}} color="#ec4899" format={v=>`${v}x`}/>
          </>}
          <Slider label="SAFE Valuation Cap" min={10} max={40} step={0.5} value={valCap} onChange={setValCap} color="#f59e0b" format={v=>`$${v}M`}/>

          {/* Presets */}
          <div>
            <div style={{fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700,color:C.muted,marginBottom:10}}>Scenario Presets</div>
            <div style={{display:'flex',gap:8}}>
              {SCNS.map((sc,i)=>(
                <button key={sc.label} onClick={()=>applyPreset(i)} style={{flex:1,padding:'7px 0',borderRadius:8,border:`1px solid ${preset===i?sc.color:C.border}`,background:preset===i?sc.color+'22':'transparent',color:preset===i?sc.color:C.muted,fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:"'Roboto',sans-serif",transition:'all .15s'}}>
                  {sc.label}
                </button>
              ))}
            </div>
            {preset!==null && <div style={{fontSize:11.5,color:C.muted,marginTop:8,textAlign:'center'}}>{SCNS[preset].desc}</div>}
          </div>
        </div>

        {/* RIGHT: Results */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div style={{...s.card,borderColor:irrColor+'88',position:'relative',overflow:'hidden',padding:28}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${irrColor},transparent)`}}/>
            <div style={{marginBottom:22}}>
              <div style={{fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700,color:C.muted,marginBottom:6}}>Exit Value</div>
              <div style={{fontFamily:"'Fustat',sans-serif",fontSize:62,fontWeight:800,color:irrColor,letterSpacing:-2,lineHeight:1}}>{fmtM(exitValue)}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:8}}>
                {mode==='revenue'?`${exitYear} exit · $${exitRev.toFixed(0)}M revenue · ${multiple.toFixed(2)}x multiple`:`${exitYear} exit · $${exitRev.toFixed(0)}M rev · $${ebitdaD.toFixed(1)}M EBITDA · ${eMult}x`}
              </div>
            </div>
            <div style={s.divider}/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0}}>
              <div>
                <div style={{fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700,color:C.muted,marginBottom:5}}>Return Multiple</div>
                <div style={{fontFamily:"'Fustat',sans-serif",fontSize:46,fontWeight:800,color:C.ink,letterSpacing:-1,lineHeight:1}}>{retMult.toFixed(1)}x</div>
                <div style={{fontSize:11,color:C.muted,marginTop:4}}>on ${valCap}M cap</div>
              </div>
              <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:20}}>
                <div style={{fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700,color:C.muted,marginBottom:5}}>IRR</div>
                <div style={{fontFamily:"'Fustat',sans-serif",fontSize:46,fontWeight:800,color:irrColor,letterSpacing:-1,lineHeight:1}}>{(irr*100).toFixed(0)}%</div>
                <div style={{fontSize:11,color:C.muted,marginTop:4}}>{years}yr hold period</div>
              </div>
            </div>
            {mode==='ebitda' && (
              <div style={{marginTop:18,padding:12,background:C.cream,borderRadius:8,border:`1px solid ${C.border}`,display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
                {[['Revenue',`$${exitRev.toFixed(0)}M`],['EBITDA',`$${ebitdaD.toFixed(1)}M`],['Margin',`${eMargin}%`]].map(([l,v],i)=>(
                  <div key={l} style={{borderLeft:i>0?`1px solid ${C.border}`:'none',paddingLeft:i>0?12:0}}>
                    <div style={{fontSize:10,letterSpacing:'1px',textTransform:'uppercase',color:C.muted,marginBottom:3}}>{l}</div>
                    <div style={{fontSize:16,fontWeight:800,color:C.forest,fontFamily:"'Fustat',sans-serif"}}>{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scenario comparison */}
          <div style={s.card}>
            <div style={{fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700,color:C.muted,marginBottom:14}}>Scenario Comparison</div>
            {SCNS.map((sc,i)=>{
              const r2 = baseRev * Math.pow(1+sc.growthRate/100, years);
              const ex = mode==='revenue' ? r2*sc.multiple*1e6 : r2*(sc.ebitdaMargin/100)*sc.ebitdaMult*1e6;
              const ret = ex/(valCap*1e6);
              const sirr = Math.pow(ret,1/years)-1;
              return (
                <div key={sc.label} onClick={()=>applyPreset(i)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12,cursor:'pointer',opacity:preset!==null&&preset!==i?0.4:1,transition:'opacity .15s'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,width:120}}>
                    <div style={{width:7,height:7,borderRadius:'50%',background:sc.color,flexShrink:0}}/>
                    <span style={{fontSize:13,fontWeight:600,color:C.ink}}>{sc.label}</span>
                  </div>
                  <span style={{fontSize:13,color:C.muted,flex:1}}>{fmtM(ex)}</span>
                  <div style={{display:'flex',gap:6}}>
                    <span style={{fontSize:12,fontWeight:700,color:sc.color,background:sc.color+'22',borderRadius:5,padding:'2px 8px'}}>{ret.toFixed(1)}x</span>
                    <span style={{fontSize:12,fontWeight:700,color:sc.color,background:sc.color+'22',borderRadius:5,padding:'2px 8px'}}>{(sirr*100).toFixed(0)}% IRR</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{textAlign:'center',fontSize:11,color:C.muted,padding:4}}>
            SAFE note converts at valuation cap · Returns shown as gross multiples on invested capital
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  ['overview','Overview'],['problem','Problem & Solution'],['platform','Platform'],
  ['traction','Traction'],['financials','Financials'],['pipeline','2026 Pipeline'],
  ['margins','Gross Margins'],['team','Team'],['round','The Round'],
  ['dataroom','Data Room'],['returns','📈 Returns Model'],
];

const PANELS = {
  overview:<TabOverview/>,problem:<TabProblem/>,platform:<TabPlatform/>,
  traction:<TabTraction/>,financials:<TabFinancials/>,pipeline:<TabPipeline/>,
  margins:<TabMargins/>,team:<TabTeam/>,round:<TabRound/>,
  dataroom:<TabDataRoom/>,returns:<TabReturns/>,
};

export default function App() {
  const [tab, setTab] = useState('overview');
  return (
    <div style={s.app}>
      <link href="https://fonts.googleapis.com/css2?family=Fustat:wght@400;600;700;800&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={s.header}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:44,height:44,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <img src={LOGO} style={{width:40,height:40,objectFit:'contain',mixBlendMode:'multiply'}} alt="ec"/>
          </div>
          <div>
            <div style={{fontFamily:"'Fustat',sans-serif",fontWeight:800,fontSize:17,color:C.forest,letterSpacing:-0.3}}>Earth Brands</div>
            <div style={{fontSize:11.5,color:C.muted}}>Investor Overview · Confidential</div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <div style={{background:C.cream,border:`1px solid ${C.border}`,borderRadius:20,padding:'4px 14px',fontSize:11.5,fontWeight:600,color:C.forest}}>$3M SAFE · $23M Cap · 25% Discount</div>
          <button onClick={()=>setTab('round')} style={{background:C.forest,color:'#fff',border:'none',borderRadius:8,padding:'8px 16px',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'Roboto',sans-serif"}}>View The Round →</button>
        </div>
      </div>

      {/* Nav */}
      <div style={{...s.nav,gap:2}}>
        {TABS.map(([id,label])=>(
          <div key={id} onClick={()=>setTab(id)} style={{padding:'5px 12px',borderRadius:6,fontSize:13,fontWeight:500,cursor:'pointer',whiteSpace:'nowrap',border:'1px solid transparent',background:tab===id?C.forest:'transparent',color:tab===id?'#fff':C.muted,transition:'all .15s'}}>
            {label}
          </div>
        ))}
      </div>

      {/* Panel */}
      <div style={s.panels}>
        <div key={tab} style={s.panel}>
          {PANELS[tab]}
        </div>
      </div>
    </div>
  );
}
