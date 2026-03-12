import React, { useState, useCallback, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from "recharts";

const C = {
  forest: '#0d7f15', sage: '#5a7264', evergreen: '#0e4823',
  ocean: '#4787ce', cream: '#f6f1e0', sand: '#eae5d4',
  white: '#ffffff', ink: '#1a2414', muted: '#5a7264',
  border: '#d8d2c2', yellow: '#ffdd58', mint: '#4db87a',
};

const LOGO = "data:image/png;base64,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";

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
        <h1 style={s.h1}>Custom Packaging, Made Easy</h1>
        <p style={{...s.p,fontSize:15,maxWidth:600,marginTop:10}}>We&apos;re building the platform that powers sustainable packaging for the $14B underserved SMB food-service market — combining self-serve ordering, AI-native ERP, and in-house production into one flywheel.</p>
      </div>

      <div style={{...s.grid4, marginBottom:18}}>
        <div style={s.card}><KPI num="$5.5M" label="2025 Revenue" sub="+62% YoY"/></div>
        <div style={s.card}><KPI num="163%" label="Net Revenue Retention" sub="Earth Store accounts"/></div>
        <div style={s.card}><KPI num="99%" label="Self-Serve After Go-Live" sub="Earth Store automation"/></div>
        <div style={s.cardAccent}><KPI num="$10M" label="2026 Goal" sub="85% already secured" white/></div>
      </div>

      <div style={s.grid2}>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:12}}>Investment Thesis</div>
          <CheckList items={[
            '$30B US food-service packaging market; SMBs = $14B, chronically underserved',
            'First platform to combine ordering, AI ERP, and in-house production',
            'Improving unit economics: 36% gross margin expanding to 45%+ by 2026',
            'Recurring revenue engine: 163% NRR (Earth Store accounts) with 99% self-serve after onboarding',
            'Backed by Mark Cuban, Wyc Grousbeck, LionTree',
            '$10M target, with nearly 85% secured or expected to renew before the year begins',
          ]}/>
        </div>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:14}}>Market Sizing</div>
          <Bar2 label="Total US Food-Service Packaging" value={100} max={100} right="$30B"/>
          <Bar2 label="SMB Segment (45% of market)" value={47} max={100} color={C.mint} right="$14B"/>
          <Bar2 label="↳ Our Current Product Mix" value={33} max={100} color={C.yellow} right="$10B"/>
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
            {[['$5.5M','2025'],['$10.3M','2026'],['$18M','2027'],['$31M','2028'],['$54M','2029']].map(([n,y])=>(
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
        sub=""/>
      <p style={{...s.p, fontSize:15, maxWidth:'100%', marginBottom:22}}>The supply chain has been rationally optimized away from the SMB market. We want to give SMB foodservice operators the value and service they need but can't get elsewhere.</p>
      <div style={s.grid2}>
        <div style={s.card}>
          <Eyebrow style={{color:'#e65100'}}>The Problem</Eyebrow>
          <div style={{...s.h3,marginBottom:12}}>How It Works Today</div>
          <CheckList items={[
            'No self-serve ordering portal — slow, manual ordering often requires an email chain or phone call',
            'Custom branding is expensive, slow, and minimum-order-heavy',
            'Legacy distributors mark up "street business" 30–50% and offer zero data or transparency',
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
            ['🎨','The Branded Moment','SMB growth, TikTok virality, and the rise of the independent operator have created massive demand for custom branded packaging — and operators need it flexibly, not in 10,000-unit minimums.'],
            ['📱','Digital-Native Operators','New generation of food-service operators expects self-serve digital tools. They’ve never used a fax machine.'],
            ['🏭','Supply Chain Dynamics','Tariff uncertainty and incumbent consolidation give us a cost advantage and speed factor heading into 2026 that legacy distributors can’t match.'],
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
      <SectionHead eyebrow="Product" title="Three Layers. One Output — Improved Customer Experience."
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
                {[['99%','Self-serve after go-live'],['27%','of 2025 revenue'],['45%','2026 target']].map(([n,l])=>(
                  <div key={l}><div style={{fontFamily:"'Fustat',sans-serif",fontSize:22,fontWeight:800,color:'#fff'}}>{n}</div><div style={{fontSize:11,color:'rgba(255,255,255,0.7)'}}>{l}</div></div>
                ))}
              </div>
            </div>
            <div style={s.card}>
              <div style={{...s.h3,fontSize:15,marginBottom:10}}>Key Milestones</div>
              <CheckList items={['Launched 2024; scaled to 169 active contracts','Boston Beer Co. (727 locations) on platform','Life Time Fitness, Tatte Bakery, Cisco Brewers all contracted','Cross-sell rate: ~25% additional spend per ES contract']}/>
              <div style={{display:'flex',gap:16,marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`}}>
                <div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:20,fontWeight:800,color:C.forest}}>+306%</div><div style={{fontSize:11,color:C.muted}}>YoY growth 2024→2025</div></div>
                <div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:20,fontWeight:800,color:C.forest}}>+324%</div><div style={{fontSize:11,color:C.muted}}>Current run-rate pace</div></div>
              </div>
            </div>
          </div>
          <div>
            <div style={{...s.h3,marginBottom:12}}>Platform Features</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[['📦','Smart reorder: one-click with saved specs & predictive restocking'],['🎨','Custom branding portal with live proof'],['📊','Usage analytics & inventory forecasting'],['💳','Contract management & auto-billing'],['🚚','Order tracking from production to delivery'],['📱','Mobile-first for on-the-go operators']].map(([icon,text])=>(
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
            <CheckList items={['Automated PO generation based on customer run-rates','Real-time production scheduling at Earth Base','Logistics optimization: TMS integration, carrier rate negotiation','Contract lifecycle management for all 250+ accounts','CRM integration (HubSpot) for pipeline-to-delivery tracking','Financial reporting and gross margin analysis per SKU']}/>
          </div>
          <div>
            <div style={{...s.cardCream,marginBottom:14}}>
              <div style={{...s.h3,marginBottom:10}}>Why It&apos;s a Moat</div>
              <p style={{...s.p,fontSize:13.5,margin:0}}>Most competitors have either a storefront <em>or</em> an ERP. We have both, tightly integrated. Every order placed through Earth Store flows directly into Earth Central, triggering production, inventory allocation, and fulfillment — zero human touch.</p>
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
            <p style={{color:'rgba(255,255,255,0.8)',margin:'0 0 20px',fontSize:14,lineHeight:1.6}}>Our print-on-demand facility is the key to delivering custom-branded packaging at SMB-accessible economics. By printing in house, we eliminate 3rd party markup, control our production schedule, and own quality.</p>
            <div style={{display:'flex',gap:24}}>
              {[['+542%','Production growth 2025'],['2','Dry offset printing lines'],['25%','Print cost reduction target']].map(([n,l])=>(
                <div key={l}><div style={{fontFamily:"'Fustat',sans-serif",fontSize:22,fontWeight:800,color:'#fff'}}>{n}</div><div style={{fontSize:11,color:'rgba(255,255,255,0.7)'}}>{l}</div></div>
              ))}
            </div>
          </div>
          <div>
            <div style={{...s.card,marginBottom:14}}>
              <div style={{...s.h3,fontSize:15,marginBottom:4}}>Monthly Production Output</div>
              <div style={{fontSize:12,color:C.muted,marginBottom:12}}>Cases (1,000 cups/case)</div>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={[
                  {month:'Jan',cases:151,fill:'#1a5276'},
                  {month:'Feb',cases:860,fill:'#1a5276'},
                  {month:'Mar',cases:588,fill:'#1a5276'},
                  {month:'Apr',cases:1073,fill:'#2980b9'},
                  {month:'May',cases:2803,fill:'#2980b9'},
                  {month:'Jun',cases:2403,fill:'#2980b9'},
                  {month:'Jul',cases:2818,fill:'#3498db'},
                  {month:'Aug',cases:3810,fill:'#3498db'},
                  {month:'Sep',cases:3480,fill:'#3498db'},
                  {month:'Oct',cases:3156,fill:C.mint},
                  {month:'Nov',cases:3279,fill:C.mint},
                  {month:'Dec',cases:3827,fill:C.mint},
                  {month:"Jan '26",cases:4412,fill:'#a29bfe'},
                ]} margin={{top:4,right:8,left:-20,bottom:0}} barSize={18}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.sand}/>
                  <XAxis dataKey="month" tick={{fontSize:10,fill:C.muted}} tickLine={false}/>
                  <YAxis tick={{fontSize:10,fill:C.muted}} tickLine={false} axisLine={false}/>
                  <Tooltip formatter={(v)=>[v.toLocaleString()+' cs','']} labelStyle={{fontSize:12}} contentStyle={{fontSize:12,borderRadius:8,border:`1px solid ${C.border}`}}/>
                  <Bar dataKey="cases" radius={[3,3,0,0]}>
                    {[
                      {month:'Jan',fill:'#1a5276'},{month:'Feb',fill:'#1a5276'},{month:'Mar',fill:'#1a5276'},
                      {month:'Apr',fill:'#2980b9'},{month:'May',fill:'#2980b9'},{month:'Jun',fill:'#2980b9'},
                      {month:'Jul',fill:'#3498db'},{month:'Aug',fill:'#3498db'},{month:'Sep',fill:'#3498db'},
                      {month:'Oct',fill:C.mint},{month:'Nov',fill:C.mint},{month:'Dec',fill:C.mint},
                      {month:"Jan '26",fill:'#a29bfe'},
                    ].map((entry,i)=>(
                      <Cell key={i} fill={entry.fill}/>
                    ))}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
              <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:10}}>
                {[['#1a5276','Q1: 1,599 cs'],['#2980b9','Q2: 6,279 cs'],['#3498db','Q3: 10,108 cs'],[C.mint,'Q4: 10,262 cs'],['#a29bfe',"Jan '26: 4,412 cs"]].map(([color,label])=>(
                  <div key={label} style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:C.muted}}>
                    <div style={{width:10,height:10,borderRadius:2,background:color,flexShrink:0}}/>
                    {label}
                  </div>
                ))}
              </div>
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
  {q:'Q1 2025',es:132157,dist:884438},
  {q:'Q2 2025',es:347175,dist:1041523},
  {q:'Q3 2025',es:498717,dist:1163673},
  {q:'Q4 2025',es:490075,dist:910173},
];
const channelData = [
  {name:'Earth Store',value:27,color:C.forest},{name:'Distributor',value:61,color:C.mint},{name:'One-Time Orders',value:12,color:C.sand}
];

function TabTraction() {
  return (
    <div>
      <SectionHead eyebrow="2025 Performance" title="The Numbers Don't Lie"
        sub="2025 was our breakout year — real contracts, real retention, real momentum."/>
      <div style={{...s.grid4,marginBottom:18}}>
        <div style={s.card}><KPI num="$5.5M" label="Total Revenue 2025" sub="Earth Store +306% YoY"/></div>
        <div style={s.card}><KPI num="163%" label="NRR — Earth Store Accounts" sub="H2 vs H1"/></div>
        <div style={s.card}><KPI num="+542%" label="Production Growth" sub="Earth Base capacity"/></div>
        <div style={s.card}><KPI num="253" label="Active Contracts" sub="ES + Distributor"/></div>
      </div>
      <div style={s.grid2}>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:4}}>Quarterly Revenue 2025 — Channel Mix</div>
          <p style={{...s.p,fontSize:12,color:C.muted,marginBottom:12}}>163% NRR (Earth Store accounts) reflects doubling of spending from H1 to H2</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={tractionData} barSize={42}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} vertical={false}/>
              <XAxis dataKey="q" tick={{fontSize:11}} tickLine={false} axisLine={false}/>
              <YAxis tick={{fontSize:10}} tickFormatter={v=>`$${(v/1000).toFixed(0)}K`} tickLine={false} axisLine={false}/>
              <Tooltip formatter={(v,n)=>[`$${v.toLocaleString()}`, n==='es'?'Earth Store':'Non-Earth Store Revenue']}/>
              <Legend formatter={n=>n==='es'?'Earth Store Revenue':'Non-Earth Store Revenue'} wrapperStyle={{fontSize:11}}/>
              <Bar dataKey="es" name="es" stackId="a" fill={C.forest} radius={[0,0,4,4]}>
              </Bar>
              <Bar dataKey="dist" name="dist" stackId="a" fill={C.mint} radius={[4,4,0,0]}>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:4}}>2025 Revenue by Channel</div>
          <p style={{...s.p,fontSize:12,color:C.muted,marginBottom:12}}>Earth Store growing from 5% → 27% of revenue in one year (+306% YoY)</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={channelData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({name,value})=>`${name} ${value}%`} labelLine={false}>
                {channelData.map((d,i)=><Cell key={i} fill={d.color}/>)}
              </Pie>
              <Tooltip formatter={v=>`${v}%`}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:8}}>
            <div style={{...s.cardCream,padding:12}}><div style={{fontWeight:600,fontSize:13,marginBottom:2}}>Earth Store</div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:20,fontWeight:800,color:C.forest}}>$1.48M</div><div style={{fontSize:12,color:C.muted}}>27% of $5.471M</div></div>
            <div style={{...s.cardCream,padding:12}}><div style={{fontWeight:600,fontSize:13,marginBottom:2}}>Distributor</div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:20,fontWeight:800,color:C.forest}}>$3.34M</div><div style={{fontSize:12,color:C.muted}}>61% of revenue</div></div>
          </div>
        </div>
      </div>

      {/* 2026 Momentum */}
      <div style={{...s.grid2, marginTop:18}}>
        <div style={s.card}>
          <Eyebrow>2026 Momentum — YTD</Eyebrow>
          <div style={{...s.h3,marginBottom:14}}>New Contracts Added to Earth Central</div>
          <div style={{display:'flex',gap:0,marginBottom:16}}>
            {[['Jan','41','new'],['Feb','44','new'],['Mar','16','so far']].map(([mo,ct,sub],i)=>(
              <div key={mo} style={{flex:1,textAlign:'center',padding:'12px 8px',background:i===2?C.cream:'#fff',borderRadius:i===0?'8px 0 0 8px':i===2?'0 8px 8px 0':'0',border:`1px solid ${C.border}`,borderLeft:i>0?'none':''}}>
                <div style={{fontFamily:"'Fustat',sans-serif",fontSize:22,fontWeight:800,color:C.forest}}>{ct}</div>
                <div style={{fontSize:11,color:C.muted}}>{mo} — {sub}</div>
              </div>
            ))}
          </div>
          <div style={{height:1,background:C.border,marginBottom:14}}/>
          <div style={{...s.h3,marginBottom:14}}>New Booked Customers</div>
          <div style={{display:'flex',gap:24}}>
            <div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:26,fontWeight:800,color:C.forest}}>$2.1M</div><div style={{fontSize:12,color:C.muted}}>New deals booked YTD</div></div>
            <div><div style={{fontFamily:"'Fustat',sans-serif",fontSize:26,fontWeight:800,color:C.forest}}>159</div><div style={{fontSize:12,color:C.muted}}>New deals since Jan 1</div></div>
          </div>
        </div>
        <div style={s.card}>
          <Eyebrow>Key Accounts</Eyebrow>
          <div style={{...s.h3,marginBottom:14}}>Marquee Customers</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {['☕ Tatte Bakery ($864K)','🏋️ Life Time Fitness ($468K)','🏟️ Madison Square Garden ($264K)','🏟️ Barclays Center ($178K)','🍺 Cisco Brewers ($141K)','🍺 Boston Beer Co. (727 locs)','☕ Hampton Coffee ($87K)','💚 Goodness Bowls ($52K)','🏈 Chelsea Piers ($34K)','🎵 City Winery','🍓 Kijitora Brooklyn ($37K)'].map(c=><Chip key={c}>{c}</Chip>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: FINANCIALS ──────────────────────────────────────────────────────────
const financialsData = [
  {year:'2025',rev:5.5,ebitda:-1.2},{year:'2026',rev:10.3,ebitda:-0.62},
  {year:'2027',rev:18,ebitda:1.26},{year:'2028',rev:31,ebitda:3.41},{year:'2029',rev:54,ebitda:7.56}
];

function TabFinancials() {
  return (
    <div>
      <SectionHead eyebrow="3-Year Model" title="Path to Profitability"
        sub="Conservative projections built on contracted revenue, signed re-signs, and weighted pipeline."/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:18}}>
        {[
          {yr:'2026',rev:'$10.3M',gm:'42%',ebitda:'-$620K',net:'-$890K',accent:false},
          {yr:'2027',rev:'$18M',gm:'45%',ebitda:'+$1.26M',net:'+$760K',accent:false,showGM:true},
          {yr:'2028',rev:'$31M',gm:'45%',ebitda:'+$3.41M',net:'+$3.0M',accent:false},
          {yr:'2029',rev:'$54M',gm:'45%',ebitda:'+$7.56M',net:'+$6.8M',accent:true},
        ].map(({yr,rev,gm,ebitda,net,accent,showGM})=>(
          <div key={yr} style={accent?s.cardAccent:s.card}>
            <Eyebrow style={accent?{color:C.mint}:{color:C.muted}}>{yr}</Eyebrow>
            <div style={{fontFamily:"'Fustat',sans-serif",fontSize:32,fontWeight:800,color:accent?'#fff':C.forest,letterSpacing:-1,lineHeight:1}}>{rev}</div>
            <div style={{fontSize:12,color:accent?'rgba(255,255,255,0.7)':C.muted,marginTop:2,marginBottom:14}}>Projected Revenue</div>
            <div style={{height:1,background:accent?'rgba(255,255,255,0.2)':C.border,marginBottom:12}}/>
            {[['Gross Margin',gm],['EBITDA',ebitda],['Net Income',net]].map(([l,v])=>(
              <div key={l} style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                <span style={{fontSize:13,color:accent?'rgba(255,255,255,0.7)':C.muted}}>{l}</span>
                <span style={{fontSize:13,fontWeight:700,color:
                  accent ? C.mint :
                  (l==='Gross Margin' && showGM) ? C.forest :
                  v.startsWith('+') ? C.forest : '#e65100'
                }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={s.grid2}>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:4}}>Revenue & EBITDA Trajectory</div>
          <p style={{...s.p,fontSize:12,color:C.muted,marginBottom:16}}>EBITDA shown as shaded inner bar — crosses breakeven in 2027</p>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={financialsData} barGap={4} barCategoryGap="15%">
              <CartesianGrid strokeDasharray="3 3" stroke={C.sand} vertical={false}/>
              <XAxis dataKey="year" tick={{fontSize:12}} tickLine={false} axisLine={false}/>
              <YAxis tick={{fontSize:10}} tickFormatter={v=>`$${v}M`} tickLine={false} axisLine={false}/>
              <Tooltip formatter={(v,n)=>[`$${parseFloat(v).toFixed(1)}M`, n]}/>
              <Bar dataKey="rev" name="Revenue" fill={C.mint} fillOpacity={0.5} radius={[4,4,0,0]}/>
              <Bar dataKey="ebitda" name="EBITDA" radius={[4,4,0,0]}>
                {financialsData.map((d,i)=>(
                  <Cell key={i} fill={d.ebitda>=0 ? C.evergreen : '#dc2626'} fillOpacity={0.9}/>
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
          <div style={{display:'flex',alignItems:'center',gap:20,marginTop:8}}>
            <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:C.muted}}>
              <div style={{width:14,height:10,borderRadius:3,background:C.mint,opacity:0.5}}/> Revenue
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:C.muted}}>
              <div style={{width:14,height:10,borderRadius:3,background:C.evergreen}}/> EBITDA (positive)
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6,fontSize:12,color:C.muted}}>
              <div style={{width:14,height:10,borderRadius:3,background:'#dc2626'}}/> EBITDA (negative)
            </div>
          </div>
        </div>
        <div style={s.card}>
          <div style={{...s.h3,marginBottom:14}}>2026 Operating Expenses</div>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13.5}}>
            <thead>
              <tr>{['Category','Amount','% Rev'].map(h=><th key={h} style={{textAlign:'left',padding:'8px 12px',background:C.sand,fontSize:12,fontWeight:700,borderBottom:`2px solid ${C.border}`}}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {[['Cost of Revenue (COGS)','$5.87M','57%'],['Warehouse & Logistics','$1.31M','12.7%'],['Advertising & Marketing','$568K','5.5%'],['Salaries & Wages','$1.02M','9.9%'],['Other Overhead','$1.9M','18.4%']].map(([c,a,p])=>(
                <tr key={c}>{[c,a,p].map((v,i)=><td key={i} style={{padding:'8px 12px',borderBottom:`1px solid ${C.border}`,color:'#444'}}>{v}</td>)}</tr>
              ))}
              <tr style={{background:C.cream}}>{[['Gross Margin','$4.43M','43%']].map(([c,a,p])=>[c,a,p].map((v,i)=><td key={i} style={{padding:'8px 12px',fontWeight:700,borderBottom:`1px solid ${C.border}`}}>{v}</td>))}</tr>
              <tr style={{background:C.sand}}>{[['EBITDA','-$620K','-6%']].map(([c,a,p])=>[c,a,p].map((v,i)=><td key={i} style={{padding:'8px 12px',fontWeight:700,color:'#e65100'}}>{v}</td>))}</tr>
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

      {/* Actuals momentum strip */}
      <div style={{...s.cardAccent, marginBottom:18, padding:20}}>
        <Eyebrow style={{color:C.mint}}>2026 Actuals — Where We Stand Today</Eyebrow>
        <div style={{display:'flex',gap:0,marginTop:12}}>
          {[
            ['$6M','TTM Revenue','Trailing twelve months'],
            ['$8M','Current Run-Rate','Annualized from recent months'],
            ['$10M','On Pace For','Full year 2026 target'],
            ['$2.1M','New Deals Booked YTD','159 new deals since Jan 1'],
          ].map(([num,label,sub],i)=>(
            <div key={label} style={{flex:1,padding:'14px 16px',borderLeft:i>0?'1px solid rgba(255,255,255,0.15)':'none'}}>
              <div style={{fontFamily:"'Fustat',sans-serif",fontSize:26,fontWeight:800,color:'#fff',letterSpacing:-0.5,lineHeight:1}}>{num}</div>
              <div style={{fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.9)',marginTop:4}}>{label}</div>
              <div style={{fontSize:11,color:'rgba(255,255,255,0.55)',marginTop:2}}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
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
            <p style={{...s.p,fontSize:13,margin:0}}><strong>Key:</strong> To hit $10M revenue goal, only roughly $1.5M in new recognized revenue required.</p>
          </div>
          <div style={{...s.cardAccent,marginTop:10,padding:12}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.mint,marginBottom:6}}>New Bookings Pace</div>
            <div style={{display:'flex',gap:24,alignItems:'flex-end'}}>
              <div>
                <div style={{fontFamily:"'Fustat',sans-serif",fontSize:26,fontWeight:800,color:'#fff'}}>~$10.1M</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.65)'}}>Annualized pace (based on $2.1M in 2.5 months)</div>
              </div>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.8)',lineHeight:1.55,paddingBottom:3}}>
                Already ahead of <strong style={{color:'#fff'}}>$7.7M</strong> weighted pipeline target<br/>and well past the <strong style={{color:'#fff'}}>$3.14M</strong> needed from new pipeline revenue
              </div>
            </div>
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

// ─── TAB: TEAM ──────────────────────────────────────────────────────────────────────────────
function TabTeam() {
  const executives = [
    {init:'M',name:'Misha',title:'CEO',sub:'Co-founder',bio:'Responsible for Tech, Operations, Vision, and Strategy. Built the Earth Brands platform from the ground up.',bg:C.evergreen,photo:'misha'},
    {init:'P',name:'Peter',title:'COO',sub:'Co-founder',bio:'Responsible for Sales, Marketing, Vision, and Strategy. Closed key accounts including MSG, Barclays, and Tatte.',bg:C.ocean,photo:'peter',photoStyle:{objectPosition:'center 40%',transform:'scale(1.2)',transformOrigin:'center 35%'}},
    {init:'L',name:'Lucy',title:'Chief of Staff',sub:'Earth Brands since day 1',bio:'Responsible for HR and Customer Support; helps with Operations and Marketing.',bg:C.sage,photo:'lucy'},
    {init:'JL',name:'Jon L',title:'CTO',sub:'3x B2B SaaS founder',bio:'Responsible for planning and implementing tech strategy, and pushing boundaries in AI and tech.',bg:'#0288d1',photo:'jonlo'},
    {init:'A',name:'Arman',title:'Senior Engineer',sub:'10+ yrs experience',bio:'Ensures day-to-day tech operations function smoothly across accounting, finance, operations, and sales platforms.',bg:'#5c6bc0',photo:'arman'},
    {init:'D',name:'Dave',title:'Head of Operations',sub:'Joined 11/2025',bio:'Leading Earth Base efficiency push — 25% print cost reduction target, 2-machine optimization, and TMS implementation.',bg:C.forest,photo:'dave'},
    {init:'JD',name:'Jon D',title:'CFO',sub:'Fractional',bio:'In charge of budget, forecasting, and cash flow management. Deep background in food-service finance at RBI.',bg:'#7c4dff',photo:'jond'},
  ];
  const advisors = [
    {name:'Chuck Chapman',co:'CAVA · Dairy Queen'},
    {name:'Andy Pforzheimer',co:'bartaco · US Foods'},
    {name:'Greg Allen',co:'AdvancePierre Foods'},
    {name:'Peter Appel',co:'Arch'},
    {name:'Bob King',co:'Humanscale'},
  ];

  const Avatar = ({init,bg,size=52,photo,photoStyle={}})=>(
    photo && HEADSHOTS[photo]
      ? <div style={{width:size,height:size,borderRadius:'50%',overflow:'hidden',flexShrink:0,boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>
          <img src={HEADSHOTS[photo]} alt={init} style={{width:'100%',height:'100%',objectFit:'cover',...photoStyle}}/>
        </div>
      : <div style={{width:size,height:size,borderRadius:'50%',background:bg,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontFamily:"'Fustat',sans-serif",fontSize:size*0.3,fontWeight:800,flexShrink:0,boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>{init}</div>
  );

  return (
    <div>
      <SectionHead eyebrow="Leadership" title="Built by Operators Who Have Lived the Problem and Understand the Solution"
        sub="A founder-led team with deep expertise in B2B SaaS, food-service operations, finance, and capital markets."/>

      <Eyebrow style={{marginBottom:12}}>Executive Team</Eyebrow>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:22}}>
        {executives.map(({init,name,title,sub,bio,bg,photo,photoStyle})=>(
          <div key={name} style={{...s.card,textAlign:'center',padding:18}}>
            <div style={{display:'flex',justifyContent:'center',marginBottom:12}}>
              <Avatar init={init} bg={bg} size={72} photo={photo} photoStyle={photoStyle}/>
            </div>
            <div style={{fontFamily:"'Fustat',sans-serif",fontWeight:800,fontSize:16,color:C.ink}}>{name}</div>
            <div style={{fontSize:12.5,color:C.forest,fontWeight:700,marginTop:1}}>{title}</div>
            <div style={{fontSize:11,color:C.muted,fontStyle:'italic',marginBottom:8}}>{sub}</div>
            <div style={{height:1,background:C.border,marginBottom:8}}/>
            <div style={{fontSize:12,color:'#444',lineHeight:1.5,textAlign:'left'}}>{bio}</div>
          </div>
        ))}
      </div>


      <div style={s.cardCream}>
        <Eyebrow style={{marginBottom:14}}>Advisors</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:18}}>
          {advisors.map(({name,co})=>(
            <div key={name} style={{...s.card,textAlign:'center',padding:14}}>
              <div style={{display:'flex',justifyContent:'center',marginBottom:8}}>
                <div style={{width:38,height:38,borderRadius:'50%',background:C.sand,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:C.evergreen,fontFamily:"'Fustat',sans-serif"}}>
                  {name.split(' ').map(w=>w[0]).join('')}
                </div>
              </div>
              <div style={{fontWeight:700,fontSize:13,color:C.ink,marginBottom:3}}>{name}</div>
              <div style={{fontSize:11,color:C.muted,lineHeight:1.4}}>{co}</div>
            </div>
          ))}
        </div>
        <div style={{paddingTop:14,borderTop:`1px solid ${C.border}`}}>
          <Eyebrow style={{marginBottom:8}}>Investors</Eyebrow>
          <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
            {['🏀 Mark Cuban','🏆 Wyc Grousbeck (Boston Celtics)','🏦 LionTree','⚡ HepCo','🌊 East Dune','🎰 Fontainebleau'].map(i=><Chip key={i}>{i}</Chip>)}
          </div>
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
                {[['Instrument','SAFE (Simple Agreement for Future Equity)'],['Raise Amount','$3,000,000'],['Valuation Cap','$23,000,000'],['Discount Rate','25%'],['Minimum Check','$100,000'],['Closed to Date','$1,250,000'],['Remaining','$1,750,000']].map(([l,v])=>(
                  <tr key={l}><td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{l}</td><td style={{padding:'8px 12px',fontWeight:700,borderBottom:`1px solid ${C.border}`,color:l==='Remaining'?C.forest:C.ink}}>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={s.card}>
            <div style={{...s.h3,marginBottom:12}}>Round Progress</div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:15,marginBottom:8,fontWeight:600}}>
              <span>$1.25M Closed</span><span style={{color:C.forest}}>42% Filled</span>
            </div>
            <div style={{height:16,background:C.sand,borderRadius:8,overflow:'hidden',marginBottom:12}}>
              <div style={{height:'100%',width:'42%',background:`linear-gradient(90deg,${C.evergreen},${C.forest})`,borderRadius:8}}/>
            </div>
            <p style={{...s.p,fontSize:12.5,color:C.muted}}>$1.75M remaining. Strategic check sizes preferred. Closing Q1 2026.</p>
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
            {[['Working Capital (9–12 months)','$1.5M',50],['Key Hires (Head of Growth + Ops)','$400K',13],['Sales (reps, in-person acquisition)','$400K',13],['Tech (AI features + personnel)','$300K',10],['Marketing (events, ads, sponsorships)','$200K',7],['Operations (facility upgrades)','$150K',5],['Legal / Misc','$50K',2]].map(([l,a,p])=>(
              <Bar2 key={l} label={`${l} (${a})`} value={p} max={55} right={`${p}%`}/>
            ))}
          </div>
          <div style={{...s.cardCream,padding:18}}>
            <div style={{...s.h3,marginBottom:8,fontSize:15}}>Why Invest Now?</div>
            <CheckList items={['$23M cap on a company on pace for $10M+ in 2026','85% of 2026 revenue already secured before raising','Proven retention: customers increase spend, don’t churn','Platform moat deepens with every order — as it embeds in default workflows, it naturally expands into new services over time','Strategic co-investors include Cuban, Grousbeck, LionTree']}/>
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
  { label: "Base",         growthRate: 75,  multiple: 3,    color: "#4a9eff", desc: "75% growth · 3x rev exit" },
  { label: "Upside",       growthRate: 100, multiple: 4.5,  color: "#34d399", desc: "100% growth · 4.5x rev exit" },
  { label: "Conservative", growthRate: 50,  multiple: 2.25, color: "#f59e0b", desc: "50% growth · 2.25x rev exit" },
];

const EBITDA_SCENARIOS = [
  { label: "Base",         growthRate: 75,  ebitdaMargin: 18, ebitdaMult: 12, color: "#4a9eff", desc: "75% growth · 18% margin · 12x EBITDA" },
  { label: "Upside",       growthRate: 100, ebitdaMargin: 22, ebitdaMult: 16, color: "#34d399", desc: "100% growth · 22% margin · 16x EBITDA" },
  { label: "Conservative", growthRate: 50,  ebitdaMargin: 14, ebitdaMult: 8,  color: "#f59e0b", desc: "50% growth · 14% margin · 8x EBITDA" },
];

function ReturnSlider({ label, min, max, step, value, onChange, format, color, sub }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{marginBottom:22}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:8}}>
        <div>
          <span style={{fontSize:11,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700,color:C.muted}}>{label}</span>
          {sub && <span style={{fontSize:10,color:C.muted,marginLeft:6}}>{sub}</span>}
        </div>
        <span style={{fontFamily:"'Fustat',sans-serif",fontSize:22,fontWeight:800,color:color||C.forest,letterSpacing:-0.5}}>{format(value)}</span>
      </div>
      <div style={{position:'relative',height:4,background:C.sand,borderRadius:2}}>
        <div style={{position:'absolute',left:0,width:pct+'%',height:'100%',background:color||C.forest,borderRadius:2}}/>
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e=>onChange(Number(e.target.value))}
          style={{position:'absolute',top:'50%',transform:'translateY(-50%)',width:'100%',margin:0,opacity:0,cursor:'pointer',height:22,zIndex:2}}
        />
        <div style={{position:'absolute',left:pct+'%',top:'50%',transform:'translate(-50%,-50%)',width:13,height:13,borderRadius:'50%',background:color||C.forest,border:'2px solid #fff',boxShadow:`0 0 8px ${color||C.forest}66`,pointerEvents:'none'}}/>
      </div>
    </div>
  );
}

function TabReturns() {
  const [mode, setModeRaw]              = useState('revenue');
  const [baseRevenue, setBaseRevenue]   = useState(10);
  const [growthRate, setGrowthRate]     = useState(75);
  const [years, setYears]               = useState(4);
  const [multiple, setMultiple]         = useState(3);
  const [ebitdaMargin, setEbitdaMargin] = useState(18);
  const [ebitdaMult, setEbitdaMult]     = useState(12);
  const [valCap, setValCap]             = useState(23);
  const [activeScenario, setActiveScenario] = useState(null);

  const setMode = useCallback((m) => { setModeRaw(m); setActiveScenario(null); }, []);

  const exitRevenue   = baseRevenue * Math.pow(1 + growthRate / 100, years);
  const exitYear      = 2026 + years;
  const ebitdaDollars = exitRevenue * (ebitdaMargin / 100);
  const exitValue     = mode === 'revenue' ? exitRevenue * multiple * 1e6 : ebitdaDollars * ebitdaMult * 1e6;
  const returnMultiple = exitValue / (valCap * 1e6);
  const irr           = Math.pow(returnMultiple, 1 / years) - 1;
  const irrColor      = irr > 0.8 ? C.forest : irr > 0.4 ? C.ocean : irr > 0.2 ? '#f59e0b' : '#ef4444';
  const fmt = (n) => n >= 1e9 ? `$${(n/1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : `$${(n/1e3).toFixed(0)}K`;

  const SCENARIOS = mode === 'revenue' ? REV_SCENARIOS : EBITDA_SCENARIOS;

  function applyScenario(i) {
    const sc = SCENARIOS[i];
    setGrowthRate(sc.growthRate);
    if (mode === 'revenue') setMultiple(sc.multiple);
    else { setEbitdaMargin(sc.ebitdaMargin); setEbitdaMult(sc.ebitdaMult); }
    setActiveScenario(i);
  }

  const scenarios = useMemo(() => SCENARIOS.map((sc) => {
    const r  = baseRevenue * Math.pow(1 + sc.growthRate / 100, years);
    const ex = mode === 'revenue' ? r * sc.multiple * 1e6 : r * (sc.ebitdaMargin / 100) * sc.ebitdaMult * 1e6;
    const ret = ex / (valCap * 1e6);
    return { ...sc, exit: ex, ret, irr: Math.pow(ret, 1 / years) - 1 };
  }), [baseRevenue, years, valCap, mode]);

  const exitSubline = mode === 'revenue'
    ? `${exitYear} exit · $${exitRevenue.toFixed(0)}M revenue · ${multiple.toFixed(2)}x multiple`
    : `${exitYear} exit · $${exitRevenue.toFixed(0)}M rev · $${ebitdaDollars.toFixed(1)}M EBITDA · ${ebitdaMult}x`;

  return (
    <div>
      <SectionHead eyebrow="Investor Returns Calculator" title="Play With the Numbers"
        sub="Adjust assumptions and see your potential return in real time." />

      {/* Mode toggle */}
      <div style={{display:'flex',gap:8,marginBottom:24,alignItems:'center',flexWrap:'wrap'}}>
        {[['revenue','Revenue Multiple'],['ebitda','EBITDA Multiple']].map(([m,label])=>(
          <button key={m} onClick={()=>setMode(m)} style={{
            padding:'7px 18px',borderRadius:8,
            border:`1px solid ${mode===m ? C.forest : C.border}`,
            background:mode===m ? C.forest : 'transparent',
            color:mode===m ? '#fff' : C.muted,
            fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'Roboto',sans-serif",transition:'all .15s'
          }}>{label}</button>
        ))}
        <span style={{fontSize:13,color:C.muted}}>
          {mode==='revenue' ? 'Common for high-growth platforms.' : 'Typical for mature distribution businesses.'}
        </span>
      </div>

      <div style={s.grid2}>
        {/* LEFT: Sliders */}
        <div style={s.card}>
          <Eyebrow style={{marginBottom:18}}>Assumptions</Eyebrow>

          <ReturnSlider label="2026 Base Revenue" min={5} max={20} step={0.5}
            value={baseRevenue} onChange={setBaseRevenue} format={v=>`$${v}M`} color={C.ocean}/>

          <ReturnSlider label="YoY Growth Rate" min={20} max={150} step={5}
            value={growthRate} onChange={v=>{setGrowthRate(v);setActiveScenario(null);}}
            format={v=>`${v}%`} color="#8b5cf6"/>

          {/* Trajectory mini-chart */}
          <div style={{background:C.cream,border:`1px solid ${C.sand}`,borderRadius:8,padding:'10px 12px',marginBottom:20,marginTop:-6}}>
            <div style={{...s.eyebrow,marginBottom:8,fontSize:9}}>Revenue Trajectory</div>
            <div style={{display:'flex',gap:4}}>
              {[1,2,3,4,5,6,7].map(y => {
                const r = baseRevenue * Math.pow(1 + growthRate / 100, y);
                const isActive = y === years;
                return (
                  <div key={y} onClick={()=>setYears(y)} style={{flex:1,textAlign:'center',padding:'5px 2px',borderRadius:6,cursor:'pointer',
                    background:isActive ? C.forest+'18' : 'transparent',
                    border:`1px solid ${isActive ? C.forest+'44' : 'transparent'}`}}>
                    <div style={{fontSize:9,color:isActive?C.forest:C.muted,marginBottom:3}}>{2026+y}</div>
                    <div style={{fontSize:11,fontWeight:700,color:isActive?C.forest:C.muted}}>${r.toFixed(0)}M</div>
                  </div>
                );
              })}
            </div>
          </div>

          <ReturnSlider label="Years to Exit" min={1} max={7} step={1}
            value={years} onChange={setYears} format={v=>`${v}yr`} color="#8b5cf6" sub={`(${exitYear})`}/>

          {mode==='revenue' && (
            <ReturnSlider label="Revenue Multiple at Exit" min={1} max={10} step={0.25}
              value={multiple} onChange={v=>{setMultiple(v);setActiveScenario(null);}}
              format={v=>`${v.toFixed(2)}x`} color={C.mint}/>
          )}
          {mode==='ebitda' && (<>
            <ReturnSlider label="EBITDA Margin at Exit" min={8} max={22} step={1}
              value={ebitdaMargin} onChange={v=>{setEbitdaMargin(v);setActiveScenario(null);}}
              format={v=>`${v}%`} color={C.mint}/>
            <ReturnSlider label="EBITDA Exit Multiple" min={6} max={20} step={0.5}
              value={ebitdaMult} onChange={v=>{setEbitdaMult(v);setActiveScenario(null);}}
              format={v=>`${v}x`} color="#ec4899"/>
          </>)}

          <ReturnSlider label="SAFE Valuation Cap" min={10} max={40} step={0.5}
            value={valCap} onChange={setValCap} format={v=>`$${v}M`} color="#f59e0b"/>

          {/* Scenario presets */}
          <div>
            <div style={{...s.eyebrow,marginBottom:10}}>Scenario Presets</div>
            <div style={{display:'flex',gap:8}}>
              {SCENARIOS.map((sc,i)=>(
                <button key={sc.label} onClick={()=>applyScenario(i)} style={{
                  flex:1,padding:'7px 0',borderRadius:8,
                  border:`1px solid ${activeScenario===i ? sc.color : C.border}`,
                  background:activeScenario===i ? sc.color+'22' : 'transparent',
                  color:activeScenario===i ? sc.color : C.muted,
                  fontSize:12,fontWeight:700,cursor:'pointer',fontFamily:"'Roboto',sans-serif",transition:'all .15s'
                }}>{sc.label}</button>
              ))}
            </div>
            {activeScenario!==null && (
              <div style={{fontSize:11.5,color:C.muted,marginTop:8,textAlign:'center'}}>{SCENARIOS[activeScenario].desc}</div>
            )}
          </div>
        </div>

        {/* RIGHT: Results */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>

          {/* Main result card */}
          <div style={{...s.card,borderColor:irrColor+'99',borderWidth:1.5,position:'relative',overflow:'hidden',padding:28}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${irrColor},transparent)`}}/>
            <div style={{marginBottom:22}}>
              <div style={{...s.eyebrow,marginBottom:6}}>Exit Value</div>
              <div style={{fontFamily:"'Fustat',sans-serif",fontSize:64,fontWeight:800,color:irrColor,letterSpacing:-2,lineHeight:1}}>{fmt(exitValue)}</div>
              <div style={{fontSize:12,color:C.muted,marginTop:8}}>{exitSubline}</div>
            </div>
            <div style={s.divider}/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0}}>
              <div>
                <div style={{...s.eyebrow,marginBottom:5}}>Return Multiple</div>
                <div style={{fontFamily:"'Fustat',sans-serif",fontSize:46,fontWeight:800,color:C.ink,letterSpacing:-1,lineHeight:1}}>{returnMultiple.toFixed(1)}x</div>
                <div style={{fontSize:11,color:C.muted,marginTop:4}}>on ${valCap}M cap</div>
              </div>
              <div style={{borderLeft:`1px solid ${C.border}`,paddingLeft:20}}>
                <div style={{...s.eyebrow,marginBottom:5}}>IRR</div>
                <div style={{fontFamily:"'Fustat',sans-serif",fontSize:46,fontWeight:800,color:irrColor,letterSpacing:-1,lineHeight:1}}>{(irr*100).toFixed(0)}%</div>
                <div style={{fontSize:11,color:C.muted,marginTop:4}}>{years}yr hold period</div>
              </div>
            </div>
            {mode==='ebitda' && (
              <div style={{marginTop:18,padding:12,background:C.cream,borderRadius:8,border:`1px solid ${C.sand}`,display:'grid',gridTemplateColumns:'1fr 1fr 1fr'}}>
                {[['Revenue',`$${exitRevenue.toFixed(0)}M`],['EBITDA',`$${ebitdaDollars.toFixed(1)}M`],['Margin',`${ebitdaMargin}%`]].map(([l,v],i)=>(
                  <div key={l} style={{borderLeft:i>0?`1px solid ${C.border}`:'none',paddingLeft:i>0?12:0}}>
                    <div style={{...s.eyebrow,fontSize:9,marginBottom:3}}>{l}</div>
                    <div style={{fontFamily:"'Fustat',sans-serif",fontSize:17,fontWeight:800,color:C.forest}}>{v}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scenario comparison */}
          <div style={s.card}>
            <div style={{...s.eyebrow,marginBottom:14}}>Scenario Comparison</div>
            {scenarios.map((sc,i)=>(
              <div key={sc.label} onClick={()=>applyScenario(i)} style={{
                display:'flex',alignItems:'center',justifyContent:'space-between',
                marginBottom:12,cursor:'pointer',
                opacity:activeScenario!==null&&activeScenario!==i?0.35:1,transition:'opacity .15s'
              }}>
                <div style={{display:'flex',alignItems:'center',gap:8,width:120}}>
                  <div style={{width:7,height:7,borderRadius:'50%',background:sc.color,flexShrink:0}}/>
                  <span style={{fontSize:13,fontWeight:600,color:C.ink}}>{sc.label}</span>
                </div>
                <span style={{fontSize:13,color:C.muted,flex:1}}>{fmt(sc.exit)}</span>
                <div style={{display:'flex',gap:6}}>
                  <span style={{fontSize:12,fontWeight:700,color:sc.color,background:sc.color+'18',borderRadius:5,padding:'2px 8px'}}>{sc.ret.toFixed(1)}x</span>
                  <span style={{fontSize:12,fontWeight:700,color:sc.color,background:sc.color+'18',borderRadius:5,padding:'2px 8px'}}>{(sc.irr*100).toFixed(0)}% IRR</span>
                </div>
              </div>
            ))}
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

const PASSKEY = 'earthbrands2026';

function PasswordGate({ onUnlock }) {
  const [input, setInput]   = React.useState('');
  const [shake, setShake]   = React.useState(false);
  const [error, setError]   = React.useState(false);

  function attempt() {
    if (input === PASSKEY) {
      onUnlock();
    } else {
      setShake(true);
      setError(true);
      setInput('');
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:C.cream,fontFamily:"'Roboto',sans-serif"}}>
      <div style={{
        background:'#fff',border:`1px solid ${C.border}`,borderRadius:16,
        padding:'48px 44px',width:360,textAlign:'center',
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}>
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)}
            20%{transform:translateX(-8px)}
            40%{transform:translateX(8px)}
            60%{transform:translateX(-6px)}
            80%{transform:translateX(6px)}
          }
        `}</style>
        {LOGO && <img src={LOGO} style={{width:52,height:52,objectFit:'contain',mixBlendMode:'multiply',marginBottom:20}} alt="ec"/>}
        <div style={{fontFamily:"'Fustat',sans-serif",fontWeight:800,fontSize:20,color:C.ink,marginBottom:4}}>Earth Brands</div>
        <div style={{fontSize:12.5,color:C.muted,marginBottom:32}}>Investor Overview · Confidential</div>
        <input
          type="password"
          placeholder="Enter passkey"
          value={input}
          onChange={e=>{setInput(e.target.value);setError(false);}}
          onKeyDown={e=>e.key==='Enter'&&attempt()}
          style={{
            width:'100%',padding:'11px 14px',borderRadius:8,fontSize:14,
            border:`1.5px solid ${error ? '#ef4444' : C.border}`,
            outline:'none',fontFamily:"'Roboto',sans-serif",
            boxSizing:'border-box',marginBottom:error?8:12,
            color:C.ink,background:'#fff',
          }}
          autoFocus
        />
        {error && <div style={{fontSize:12,color:'#ef4444',marginBottom:10}}>Incorrect passkey</div>}
        <button onClick={attempt} style={{
          width:'100%',padding:'11px',background:C.forest,color:'#fff',
          border:'none',borderRadius:8,fontSize:14,fontWeight:600,
          cursor:'pointer',fontFamily:"'Roboto',sans-serif",
        }}>Enter →</button>
      </div>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState('overview');

  if (!unlocked) return <PasswordGate onUnlock={()=>setUnlocked(true)}/>;

  return (
    <div style={s.app}>
      <link href="https://fonts.googleapis.com/css2?family=Fustat:wght@400;600;700;800&family=Roboto:wght@300;400;500;700&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={s.header}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:40,height:40,display:'flex',alignItems:'center',justifyContent:'center'}}>
            {LOGO && <img src={LOGO} style={{width:40,height:40,objectFit:'contain',mixBlendMode:'multiply'}} alt="ec"/>}
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
