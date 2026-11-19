/*
  ============================================================
   EMOTIONS WHEEL — HOW THE WHEEL WORKS
  ============================================================
  You don't need to edit this file to change the words or colours:
  those live in emotions.js.

  This file draws the wheel (as SVG), handles dragging/spinning,
  and shows the popup card when you click an emotion.
*/

/* ---------- colour helpers ---------- */
const hex2rgb = h => [1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const rgb2hex = c => "#"+c.map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,"0")).join("");
const mix = (a,b,t) => { const A=hex2rgb(a),B=hex2rgb(b); return rgb2hex(A.map((v,i)=>v+(B[i]-v)*t)); };

/* ---------- build tree with angles ---------- */
const R = [72, 205, 338, 490];            // ring radii boundaries
const DATA = (typeof EMOTIONS !== "undefined") ? EMOTIONS : [];
if (!DATA.length) {
  document.querySelector("header p").innerHTML =
    '⚠️ The emotions couldn\'t be loaded — there may be a typo in emotions.js. <a href="check.html">Open check.html</a> to find it.';
}
// Embed mode (for putting the wheel on another website): add #embed or ?embed to the address
if (location.hash === "#embed" || /[?&]embed/.test(location.search)) document.body.classList.add("embed");
const kidsOf = n => n.more || [];
const leavesTotal = DATA.reduce((s,c)=>s+kidsOf(c).reduce((t,m)=>t+Math.max(1,kidsOf(m).length),0),0);
const STEP = 360/leavesTotal;
const nodes = []; let li = 0;
const NEEDS = {};
const cores = DATA.map(c=>{
  const core = {name:c.name, def:c.definition, depth:0, color:c.color, children:[], start:li*STEP};
  NEEDS[c.name] = c.whatItMayMean || "";
  kidsOf(c).forEach(m=>{
    const mid = {name:m.name, def:m.definition, depth:1, parent:core, children:[], start:li*STEP};
    const leaves = kidsOf(m);
    if (!leaves.length) li++;                       // middle feeling with no outer words still gets a slice
    leaves.forEach(l=>{
      mid.children.push({name:l.name, def:l.definition, depth:2, parent:mid, children:[], start:li*STEP, end:(li+1)*STEP});
      li++;
    });
    mid.end = li*STEP; core.children.push(mid);
  });
  core.end = li*STEP; return core;
});
// colours: blend toward neighbouring core near the edges, lighten outward
cores.forEach((core,ci)=>{
  const prev = cores[(ci-1+cores.length)%cores.length].color, next = cores[(ci+1)%cores.length].color;
  const span = core.end-core.start;
  const tint = (n, light) => {
    const p = ((n.start+n.end)/2 - core.start)/span;      // 0..1 position in core
    let c = core.color;
    if (p<.5) c = mix(c, prev, (.5-p)*0.4); else c = mix(c, next, (p-.5)*0.4);
    return mix(c, "#FFFFFF", light);
  };
  core.fill = core.color;
  core.children.forEach(m=>{ m.fill = tint(m,.28); m.color=core.color;
    m.children.forEach(l=>{ l.fill = tint(l,.52); l.color=core.color; }); });
});
const walk = (n,f)=>{f(n); n.children.forEach(k=>walk(k,f));};
cores.forEach(c=>walk(c,n=>nodes.push(n)));

/* ---------- draw ---------- */
const NS="http://www.w3.org/2000/svg";
const rotor = document.getElementById("rotor");
const rad = d => d*Math.PI/180;
function arcPath(r0,r1,a0,a1){
  const p=(r,a)=>[r*Math.cos(rad(a)), r*Math.sin(rad(a))];
  const large = (a1-a0)>180?1:0;
  const [x0,y0]=p(r1,a0),[x1,y1]=p(r1,a1),[x2,y2]=p(r0,a1),[x3,y3]=p(r0,a0);
  return `M${x0} ${y0}A${r1} ${r1} 0 ${large} 1 ${x1} ${y1}L${x2} ${y2}A${r0} ${r0} 0 ${large} 0 ${x3} ${y3}Z`;
}
// angles: 0° = 3 o'clock; offset so the wheel starts with Happy-ish at top
const BASE = -90;
nodes.forEach(n=>{
  const g = document.createElementNS(NS,"g");
  g.setAttribute("class",`seg ring${n.depth}`);
  const a0 = n.start+BASE, a1 = n.end+BASE;
  const path = document.createElementNS(NS,"path");
  path.setAttribute("d", arcPath(R[n.depth], R[n.depth+1], a0, a1));
  path.setAttribute("fill", n.fill);
  const t = document.createElementNS(NS,"text");
  t.textContent = n.name;
  t.setAttribute("text-anchor","middle"); t.setAttribute("dominant-baseline","central");
  n.mid = (a0+a1)/2; n.rmid = (R[n.depth]+R[n.depth+1])/2 + (n.depth===0?6:0);
  g.append(path,t); rotor.append(g);
  n.g=g; n.t=t;
});

/* ---------- rotation state ---------- */
let rot = 0, vel = 0, anim = null, moved = false;
function layoutText(){
  for(const n of nodes){
    const a = n.mid + rot;
    const flip = Math.cos(rad(a)) < 0 ? 180 : 0;
    n.t.setAttribute("transform", `rotate(${n.mid}) translate(${n.rmid} 0) rotate(${flip})`);
  }
}
function apply(){ rotor.setAttribute("transform",`rotate(${rot})`); layoutText(); }
apply();

const svg = document.getElementById("wheel");
function angleAt(e){
  const b = svg.getBoundingClientRect();
  return Math.atan2(e.clientY-(b.top+b.height/2), e.clientX-(b.left+b.width/2))*180/Math.PI;
}
let dragging=false, lastA=0, lastT=0, startX=0, startY=0;
svg.addEventListener("pointerdown", e=>{
  if (e.target.closest("#hub")) return;
  cancelAnimationFrame(anim); anim=null;
  dragging=true; moved=false; vel=0;
  lastA=angleAt(e); lastT=performance.now(); startX=e.clientX; startY=e.clientY;
  svg.setPointerCapture?.(e.pointerId);
});
svg.addEventListener("pointermove", e=>{
  if(!dragging) return;
  if(!moved && Math.hypot(e.clientX-startX,e.clientY-startY)>5){ moved=true; svg.classList.add("dragging"); }
  if(!moved) return;
  const a = angleAt(e); let d = a-lastA; if(d>180)d-=360; if(d<-180)d+=360;
  const now=performance.now(), dt=Math.max(1,now-lastT);
  rot += d; vel = vel*0.6 + (d/dt*16)*0.4; lastA=a; lastT=now; apply();
});
function endDrag(e){
  if(!dragging) return; dragging=false; svg.classList.remove("dragging");
  if(moved){
    if (performance.now()-lastT > 80) vel = 0;
    inertia();
  } else {
    // pointer capture redirects pointerup to svg: find the segment under the pointer
    const el = document.elementFromPoint(e.clientX,e.clientY);
    const n = nodes.find(n=>n.g.contains(el));
    if (n) select(n);
  }
}
svg.addEventListener("pointerup", endDrag);
svg.addEventListener("pointercancel", endDrag);
function inertia(){
  const tick=()=>{ vel*=0.955; rot+=vel; apply(); if(Math.abs(vel)>0.02) anim=requestAnimationFrame(tick); else anim=null; };
  anim=requestAnimationFrame(tick);
}
svg.addEventListener("wheel", e=>{
  e.preventDefault(); cancelAnimationFrame(anim); anim=null;
  vel = Math.max(-14,Math.min(14,(e.deltaY+e.deltaX)*0.06)); inertia();
},{passive:false});

function rotateTo(target, dur=850){
  cancelAnimationFrame(anim);
  let d = ((target-rot)%360+540)%360-180;            // shortest path
  const from=rot, t0=performance.now();
  const ease=t=>1-Math.pow(1-t,4);
  const tick=now=>{ const t=Math.min(1,(now-t0)/dur); rot=from+d*ease(t); apply(); if(t<1) anim=requestAnimationFrame(tick); else anim=null; };
  anim=requestAnimationFrame(tick);
}

/* ---------- selection + popup ---------- */
const narrow = () => matchMedia("(max-width: 860px)").matches;
const pointer = document.getElementById("pointer");
function pointerAngle(){ return narrow()? 90 : 0; }
function placePointer(){ pointer.style.transform = `rotate(${pointerAngle()}deg)`; }
placePointer(); addEventListener("resize", placePointer);

const popup=document.getElementById("popup"), placeholder=document.getElementById("placeholder");
let current=null;
function lineage(n){ const a=[]; while(n){a.unshift(n); n=n.parent;} return a; }
function select(n){
  current=n;
  rotateTo(pointerAngle() - n.mid);
  const keep = new Set(lineage(n)); walk(n,k=>keep.add(k));
  nodes.forEach(k=>{ k.g.classList.toggle("dim", !keep.has(k)); k.g.classList.toggle("sel", k===n); });
  // fill popup
  const core = lineage(n)[0];
  document.getElementById("swatch").style.background = `linear-gradient(90deg, ${core.color}, ${n.fill})`;
  const crumbs=document.getElementById("crumbs"); crumbs.innerHTML="";
  lineage(n).forEach((k,i,arr)=>{
    const b=document.createElement("button");
    b.innerHTML=`<span class="dot" style="background:${k.fill}"></span>${k.name}`;
    b.onclick=()=>select(k); crumbs.append(b);
    if(i<arr.length-1){ const s=document.createElement("span"); s.className="sep"; s.textContent="›"; crumbs.append(s); }
  });
  document.getElementById("title").textContent=n.name;
  document.getElementById("def").textContent=n.def;
  document.getElementById("need").innerHTML=NEEDS[core.name];
  const kids=document.getElementById("kids"), wrap=document.getElementById("kidsWrap");
  kids.innerHTML=""; wrap.style.display=n.children.length?"":"none";
  if(!n.children.length && n.parent){ // show siblings for leaves
    wrap.style.display=""; wrap.querySelector(".kids-label").textContent="Nearby emotions";
    n.parent.children.filter(s=>s!==n).forEach(s=>kids.append(chip(s)));
  } else {
    wrap.querySelector(".kids-label").textContent="More specifically";
    n.children.forEach(s=>kids.append(chip(s)));
  }
  popup.classList.remove("show"); void popup.offsetWidth; popup.classList.add("show");
  placeholder.style.opacity=0;
}
function chip(n){ const b=document.createElement("button"); b.textContent=n.name; b.style.background=n.fill; b.onclick=()=>select(n); return b; }
function clearSel(){
  current=null; popup.classList.remove("show"); placeholder.style.opacity=1;
  nodes.forEach(k=>k.g.classList.remove("dim","sel"));
}
placeholder.style.transition="opacity .3s";
document.getElementById("close").onclick=clearSel;
document.getElementById("hub").addEventListener("click",()=>{ clearSel(); rotateTo(0,900); });
addEventListener("keydown",e=>{
  if(e.key==="Escape") clearSel();
  if(e.key==="ArrowLeft"||e.key==="ArrowRight"){ cancelAnimationFrame(anim); vel = e.key==="ArrowLeft"?-4:4; inertia(); }
});
setTimeout(()=>document.getElementById("hint").style.opacity=0, 6000);
document.getElementById("hint").style.transition="opacity 1s";
