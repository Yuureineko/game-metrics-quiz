/* 게임지표 길드 v2.7 */
(function(){
"use strict";

window.addEventListener("error",function(){
 var box=document.getElementById("fatalError");
 if(box)box.hidden=false;
});
window.addEventListener("unhandledrejection",function(){
 var box=document.getElementById("fatalError");
 if(box)box.hidden=false;
});

const TERMS=[{"id": "DAU", "term": "DAU", "full": "Daily Active Users", "meaning": "하루 동안 게임에 접속한 중복되지 않은 이용자 수", "category": "이용자"}, {"id": "MAU", "term": "MAU", "full": "Monthly Active Users", "meaning": "한 달 동안 게임에 접속한 중복되지 않은 이용자 수", "category": "이용자"}, {"id": "NRU", "term": "NRU", "full": "New Registered Users", "meaning": "새로 가입하거나 게임을 처음 시작한 신규 유저 수", "category": "이용자"}, {"id": "PU", "term": "PU", "full": "Paying User", "meaning": "하루 동안 결제한 중복되지 않은 유저 수", "category": "결제"}, {"id": "NPU", "term": "NPU", "full": "New Pay User", "meaning": "게임에서 처음으로 결제한 유저 수", "category": "결제"}, {"id": "MPU", "term": "MPU", "full": "Monthly Pay User", "meaning": "한 달 동안 결제한 중복되지 않은 유저 수", "category": "결제"}, {"id": "PUR", "term": "PUR", "full": "Paying User Rate", "meaning": "DAU 중 결제한 유저의 비율", "category": "결제"}, {"id": "MPUR", "term": "MPUR", "full": "Monthly Paying User Rate", "meaning": "MAU 중 한 달 동안 결제한 유저의 비율", "category": "결제"}, {"id": "ARPPU", "term": "ARPPU", "full": "Average Revenue Per Paying User", "meaning": "결제 유저 1명당 평균 결제 금액", "category": "매출"}, {"id": "ARPDAU", "term": "ARPDAU", "full": "Average Revenue Per Daily Active User", "meaning": "하루 이용자 1명당 평균 매출", "category": "매출"}, {"id": "GROSS", "term": "Gross Sales", "full": "Gross Sales", "meaning": "수수료와 세금 등을 빼기 전 게임이 발생시킨 총매출", "category": "매출"}, {"id": "NET", "term": "Net Sales", "full": "Net Sales", "meaning": "세금과 마켓·플랫폼 수수료 등을 제외한 순매출", "category": "매출"}, {"id": "RET", "term": "Retention", "full": "Retention", "meaning": "특정 시점에 들어온 유저가 며칠 뒤에도 다시 접속하는 비율", "category": "잔존·마케팅"}, {"id": "ORG", "term": "Organic", "full": "Organic User", "meaning": "광고나 마케팅 없이 자연스럽게 유입된 유저", "category": "잔존·마케팅"}, {"id": "NONORG", "term": "Non-Organic", "full": "Non-Organic User", "meaning": "광고나 마케팅을 통해 유입된 유저", "category": "잔존·마케팅"}, {"id": "CU", "term": "CU", "full": "Concurrent User", "meaning": "현재 같은 시간에 접속해 있는 동시접속자 수", "category": "운영"}, {"id": "MCU", "term": "MCU", "full": "Maximum Concurrent User", "meaning": "일정 기간 동안 기록한 최고 동시접속자 수", "category": "운영"}, {"id": "UV", "term": "UV", "full": "Unique Visit", "meaning": "한 번 이상 방문한 중복되지 않은 순방문자 수", "category": "이용자"}, {"id": "TS", "term": "TS", "full": "Time Spend", "meaning": "유저가 게임에 접속해 플레이한 이용시간", "category": "운영"}, {"id": "KPI", "term": "KPI", "full": "Key Performance Indicator", "meaning": "목표 달성 여부를 판단하는 핵심 성과 지표", "category": "사업"}, {"id": "LTV", "term": "LTV", "full": "Life Time Value", "meaning": "유저 1명이 게임에서 완전히 이탈할 때까지 결제하는 금액(순이익 기준)", "category": "잔존·마케팅"}, {"id": "PLC", "term": "PLC", "full": "Product Life Cycle", "meaning": "게임이나 제품이 성장하고 쇠퇴하기까지의 수명주기", "category": "사업"}, {"id": "BEP", "term": "BEP", "full": "Break Even Point", "meaning": "누적 비용과 누적 수익이 같아지는 손익분기점", "category": "사업"}, {"id": "ROI", "term": "ROI", "full": "Return On Investment", "meaning": "투자한 금액 대비 얻은 이익의 비율", "category": "사업"}, {"id": "CAC", "term": "CAC / UAC / UA", "full": "Customer Acquisition Cost / User Acquisition Cost / User Acquisition", "meaning": "유저 1명을 새로 확보하는 데 필요한 비용", "category": "잔존·마케팅"}, {"id": "CRC", "term": "CRC", "full": "Customer Retention Cost", "meaning": "기존 유저 1명을 유지하는 데 필요한 비용", "category": "잔존·마케팅"}, {"id": "RS", "term": "RS", "full": "Revenue Share", "meaning": "개발사와 퍼블리셔 사이의 수익 분배 비율", "category": "계약"}, {"id": "LF", "term": "LF", "full": "License Fee", "meaning": "퍼블리셔가 판권을 받으며 개발사에 지급하는 계약금", "category": "계약"}, {"id": "MG", "term": "MG", "full": "Minimum Guarantee", "meaning": "개발사의 최소 수익을 보장하기 위해 퍼블리셔가 선지급하고 이후 수익에서 회수하는 금액", "category": "계약"}, {"id": "MOU", "term": "MOU", "full": "Memorandum of Understanding", "meaning": "정식 계약 전 협의 내용과 비밀유지 등을 정리한 양해각서로, 일반적으로 법적 구속력은 약함", "category": "계약"}];
const FORMULAS=[{"name": "일 결제율", "formula": "PUR = PU ÷ DAU × 100", "tip": "문제에서 4%는 계산할 때 0.04로 사용"}, {"name": "월 결제율", "formula": "MPUR = MPU ÷ MAU × 100", "tip": "한 달 기준 이용자와 결제자를 사용"}, {"name": "결제자당 평균 매출", "formula": "ARPPU = Sales ÷ PU", "tip": "분모는 결제한 사람만"}, {"name": "일 이용자당 평균 매출", "formula": "ARPDAU = Sales ÷ DAU", "tip": "무과금 유저도 포함한 전체 DAU가 분모"}, {"name": "일매출", "formula": "Sales = DAU × PUR × ARPPU", "tip": "PUR은 소수로 변환"}, {"name": "월매출", "formula": "Sales = MAU × MPUR × ARPPU", "tip": "월간 지표끼리 맞춰 사용"}, {"name": "잔존율", "formula": "Retention = 재방문 유저 ÷ 기준 유저 × 100", "tip": "같은 코호트의 재방문 여부를 비교"}, {"name": "유저 획득비용", "formula": "CAC = 마케팅비 ÷ 신규 확보 유저 수", "tip": "LTV보다 지나치게 높으면 손해"}];
const SCENARIOS=[{"type": "calc", "prompt": "오늘 DAU가 1,000명이고 PU가 50명이다. PUR은?", "answer": "5%", "options": ["0.5%", "5%", "20%", "50%"], "explain": "PUR = 50 ÷ 1,000 × 100 = 5%", "termId": "PUR"}, {"type": "calc", "prompt": "오늘 매출이 2,000,000원이고 PU가 40명이다. ARPPU는?", "answer": "50,000원", "options": ["5,000원", "20,000원", "50,000원", "80,000원"], "explain": "ARPPU = 2,000,000 ÷ 40 = 50,000원", "termId": "ARPPU"}, {"type": "calc", "prompt": "오늘 매출이 1,000,000원이고 DAU가 1,000명이다. ARPDAU는?", "answer": "1,000원", "options": ["100원", "500원", "1,000원", "10,000원"], "explain": "ARPDAU = 1,000,000 ÷ 1,000 = 1,000원", "termId": "ARPDAU"}, {"type": "calc", "prompt": "신규 유저 1,000명 중 다음 날 400명이 다시 접속했다. D+1 리텐션은?", "answer": "40%", "options": ["4%", "25%", "40%", "60%"], "explain": "400 ÷ 1,000 × 100 = 40%", "termId": "RET"}, {"type": "calc", "prompt": "광고비 10,000,000원으로 신규 유저 5,000명을 확보했다. CAC는?", "answer": "2,000원", "options": ["500원", "1,000원", "2,000원", "5,000원"], "explain": "CAC = 10,000,000 ÷ 5,000 = 2,000원", "termId": "CAC"}, {"type": "scenario", "prompt": "오늘 결제한 사람 중 게임에서 생애 첫 결제를 한 유저를 세는 지표는?", "answer": "NPU", "options": ["PU", "NPU", "MPU", "PUR"], "explain": "NPU는 New Paying User, 첫 결제 유저 수다.", "termId": "NPU"}, {"type": "scenario", "prompt": "이벤트 시간에 기록된 가장 높은 동시접속자 수를 보고 싶다. 사용할 지표는?", "answer": "MCU", "options": ["CU", "MCU", "DAU", "TS"], "explain": "MCU는 Maximum Concurrent User, 최고 동시접속자 수다.", "termId": "MCU"}, {"type": "scenario", "prompt": "게임의 출시·성장·전성기·쇠퇴 흐름을 분석하는 지표는?", "answer": "PLC", "options": ["KPI", "PLC", "BEP", "ROI"], "explain": "PLC는 Product Life Cycle, 제품 수명주기다.", "termId": "PLC"}, {"type": "scenario", "prompt": "누적 수익이 개발비·운영비·마케팅비 등 누적 비용과 같아졌다. 무엇을 달성한 것인가?", "answer": "BEP", "options": ["ROI", "BEP", "LTV", "Net Sales"], "explain": "BEP는 손익분기점이다.", "termId": "BEP"}, {"type": "scenario", "prompt": "개발사와 퍼블리셔가 순수익을 4:6으로 나누기로 했다. 이 비율은?", "answer": "RS", "options": ["RS", "LF", "MG", "MOU"], "explain": "RS는 Revenue Share, 수익 분배 비율이다.", "termId": "RS"}, {"type": "scenario", "prompt": "퍼블리셔가 개발사에 최소 수익 3억 원을 선지급했다. 이 돈은?", "answer": "MG", "options": ["LF", "MG", "RS", "CRC"], "explain": "MG는 Minimum Guarantee다. 먼저 지급하지만 보통 이후 RS 수익에서 회수한다.", "termId": "MG"}, {"type": "scenario", "prompt": "광고를 보지 않고 친구 추천과 검색으로 들어온 유저는?", "answer": "Organic", "options": ["Organic", "Non-Organic", "NRU", "UV"], "explain": "마케팅 비용 없이 자연스럽게 들어온 유저다.", "termId": "ORG"}, {"type": "scenario", "prompt": "신규 유저 수는 높은데 D+1과 D+7에 대부분 떠난다. 가장 먼저 개선해야 할 지표는?", "answer": "Retention", "options": ["ARPPU", "Retention", "MCU", "RS"], "explain": "유저가 남지 않으면 상품과 이벤트를 보여 줄 대상도 사라진다.", "termId": "RET"}, {"type": "scenario", "prompt": "결제자는 적지만 결제자 한 명이 평균 10만 원을 쓴다. 직접 설명하는 지표는?", "answer": "ARPPU", "options": ["PUR", "ARPPU", "ARPDAU", "MPUR"], "explain": "ARPPU는 결제 유저 1인당 평균 매출이다.", "termId": "ARPPU"}, {"type": "scenario", "prompt": "전체 DAU 대비 결제한 사람의 비율을 높이고 싶다. 직접 관리할 지표는?", "answer": "PUR", "options": ["PU", "PUR", "ARPPU", "TS"], "explain": "PUR은 일일 이용자 중 결제자의 비율이다.", "termId": "PUR"}];
const ENEMIES=[{"name": "이탈 슬라임", "emoji": "🟢", "desc": "유저를 게임 밖으로 밀어낸다."}, {"name": "과금 미믹", "emoji": "🎁", "desc": "PUR과 ARPPU를 뒤섞어 혼란을 준다."}, {"name": "동접 골렘", "emoji": "🗿", "desc": "CU와 MCU를 구분하지 못하게 만든다."}, {"name": "수수료 유령", "emoji": "👻", "desc": "Gross와 Net을 몰래 바꿔 놓는다."}, {"name": "KPI 드래곤", "emoji": "🐉", "desc": "모든 지표를 시험하는 최종 보스다."}];
const ACHIEVEMENTS={"firstWin": {"name": "첫 던전 클리어", "icon": "🏅", "desc": "처음으로 전투에서 승리"}, "combo5": {"name": "집중력 폭발", "icon": "🔥", "desc": "5콤보 달성"}, "perfect": {"name": "무결점 분석가", "icon": "💎", "desc": "한 판을 오답 없이 클리어"}, "scholar": {"name": "도감 수집가", "icon": "📚", "desc": "학습실에서 카드 20개 열람"}, "boss": {"name": "KPI 정복자", "icon": "🐲", "desc": "보스전 승리"}, "level5": {"name": "주니어 게임기획자", "icon": "🎓", "desc": "레벨 5 달성"}};


const SafeStore={
 get(key,fallback=null){
  try{
   const value=window.localStorage.getItem(key);
   return value===null?fallback:value;
  }catch(e){return fallback}
 },
 set(key,value){
  try{window.localStorage.setItem(key,value);return true}
  catch(e){return false}
 },
 remove(key){
  try{window.localStorage.removeItem(key);return true}
  catch(e){return false}
 }
};

/* 외부 음원 없이 브라우저가 직접 만드는 오리지널 칩튠 */
const AudioEngine={
 ctx:null,master:null,musicGain:null,sfxGain:null,
 enabled:true,volume:.45,timer:null,step:0,mode:"home",
 init(){
  if(this.ctx)return true;
  try{
   const AC=window.AudioContext||window.webkitAudioContext;
   if(!AC)return false;
   this.ctx=new AC();
   this.master=this.ctx.createGain();
   this.musicGain=this.ctx.createGain();
   this.sfxGain=this.ctx.createGain();
   this.musicGain.gain.value=.18;
   this.sfxGain.gain.value=.55;
   this.musicGain.connect(this.master);
   this.sfxGain.connect(this.master);
   this.master.connect(this.ctx.destination);
   this.master.gain.value=this.enabled?this.volume:0;
   return true;
  }catch(e){this.ctx=null;return false}
 },
 resume(){
  try{
   if(!this.init())return;
   if(this.ctx.state==="suspended")this.ctx.resume().catch(()=>{});
  }catch(e){}
 },
 setEnabled(value){
  this.enabled=value;
  SafeStore.set("gameMetricsSoundEnabled",value?"1":"0");
  try{
   this.resume();
   if(this.master&&this.ctx)this.master.gain.setTargetAtTime(value?this.volume:0,this.ctx.currentTime,.03);
  }catch(e){}
  const button=document.getElementById("soundToggle");
  if(button)button.textContent=value?"🔊":"🔇";
  if(value)this.startMusic(this.mode);else this.stopMusic();
 },
 setVolume(value){
  this.volume=Math.max(0,Math.min(1,value));
  SafeStore.set("gameMetricsSoundVolume",String(this.volume));
  try{
   if(this.master&&this.ctx)this.master.gain.setTargetAtTime(this.enabled?this.volume:0,this.ctx.currentTime,.03);
  }catch(e){}
 },
 tone(freq,dur=.1,type="square",gain=.1,delay=0,target="sfx"){
  try{
   if(!this.enabled)return;
   this.resume();
   if(!this.ctx)return;
   const now=this.ctx.currentTime+delay;
   const osc=this.ctx.createOscillator();
   const amp=this.ctx.createGain();
   osc.type=type;
   osc.frequency.setValueAtTime(freq,now);
   amp.gain.setValueAtTime(.0001,now);
   amp.gain.exponentialRampToValueAtTime(Math.max(.0002,gain),now+.008);
   amp.gain.exponentialRampToValueAtTime(.0001,now+dur);
   osc.connect(amp);
   amp.connect(target==="music"?this.musicGain:this.sfxGain);
   osc.start(now);
   osc.stop(now+dur+.03);
  }catch(e){}
 },
 noise(dur=.07,gain=.09){
  try{
   if(!this.enabled)return;
   this.resume();
   if(!this.ctx)return;
   const length=Math.floor(this.ctx.sampleRate*dur);
   const buffer=this.ctx.createBuffer(1,length,this.ctx.sampleRate);
   const data=buffer.getChannelData(0);
   for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(1-i/length);
   const source=this.ctx.createBufferSource();
   const amp=this.ctx.createGain();
   source.buffer=buffer;
   amp.gain.value=gain;
   source.connect(amp);
   amp.connect(this.sfxGain);
   source.start();
  }catch(e){}
 },
 click(){this.tone(520,.04,"square",.05)},
 correct(){
  this.tone(523.25,.08,"square",.10);
  this.tone(659.25,.08,"square",.09,.07);
  this.tone(783.99,.13,"square",.08,.14);
 },
 wrong(){
  this.tone(220,.13,"sawtooth",.09);
  this.tone(164.81,.2,"sawtooth",.08,.1);
 },
 attack(){this.noise(.05,.08);this.tone(150,.1,"square",.08)},
 hurt(){this.noise(.1,.1);this.tone(120,.17,"sawtooth",.09)},
 victory(){[523.25,659.25,783.99,1046.5].forEach((f,i)=>this.tone(f,.16,"square",.09,i*.1))},
 defeat(){[392,329.63,261.63,196].forEach((f,i)=>this.tone(f,.2,"triangle",.09,i*.13))},
 levelUp(){[523.25,659.25,783.99,1046.5,1318.5].forEach((f,i)=>this.tone(f,.14,"square",.08,i*.08))},
 stopMusic(){
  if(this.timer){clearInterval(this.timer);this.timer=null}
 },
 startMusic(mode="home"){
  this.mode=mode;
  if(!this.enabled)return;
  this.resume();
  if(!this.ctx)return;
  this.stopMusic();
  this.step=0;
  const sets={
   home:[261.63,392,329.63,440,349.23,523.25,392,329.63],
   battle:[261.63,329.63,392,523.25,392,329.63,293.66,392],
   boss:[146.83,174.61,220,146.83,196,233.08,174.61,130.81]
  };
  const seq=sets[mode]||sets.battle;
  const interval=mode==="boss"?220:310;
  const play=()=>{
   const i=this.step%seq.length;
   const f=seq[i];
   this.tone(f,mode==="boss" ? 0.16 : 0.22,mode==="boss" ? "sawtooth" : "triangle",mode==="boss" ? 0.04 : 0.03,0,"music");
   if(i%2===0)this.tone(f/2,.1,"square",.018,0,"music");
   this.step++;
  };
  play();
  this.timer=setInterval(play,interval);
 }
};

const $=id=>document.getElementById(id);
const shuffle=a=>[...a].sort(()=>Math.random()-.5);
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const normalize=s=>String(s == null ? "" : s)
 .normalize("NFKC")
 .trim()
 .toLocaleUpperCase("en-US")
 .replace(/[^0-9A-Z가-힣]/g,"");
const SAVE_KEY="gameMetricsGuildV2";
const defaultPlayer={level:1,xp:0,gold:0,wins:0,bossWins:0,bestCombo:0,studyViews:0,mastery:{},mistakes:[],achievements:[],lastMode:"adventure"};
let player=loadPlayer();
let battle=null,flashIndex=0,flashFlipped=false,studyTab="glossary";
AudioEngine.enabled=SafeStore.get("gameMetricsSoundEnabled","1")!=="0";
AudioEngine.volume=Number(SafeStore.get("gameMetricsSoundVolume",".45")||".45");

function loadPlayer(){
 try{
  const saved=JSON.parse(SafeStore.get(SAVE_KEY,"{}")||"{}");
  const merged={...defaultPlayer,...saved};
  if(!merged.mastery||typeof merged.mastery!=="object"||Array.isArray(merged.mastery))merged.mastery={};
  if(!Array.isArray(merged.mistakes))merged.mistakes=[];
  if(!Array.isArray(merged.achievements))merged.achievements=[];
  if(!Number.isFinite(Number(merged.level))||Number(merged.level)<1)merged.level=1;
  if(!Number.isFinite(Number(merged.xp))||Number(merged.xp)<0)merged.xp=0;
  if(!Number.isFinite(Number(merged.gold))||Number(merged.gold)<0)merged.gold=0;
  return merged;
 }catch(e){return {...defaultPlayer,mastery:{},mistakes:[],achievements:[]}}
}
function savePlayer(){SafeStore.set(SAVE_KEY,JSON.stringify(player));updateHeader()}
function xpNeed(level){return 100+level*40}
function rankFor(level){
 if(level>=10)return["수석 게임사업가","🧙‍♀️"];
 if(level>=7)return["시니어 지표 분석가","🧝‍♂️"];
 if(level>=5)return["주니어 게임기획자","🧑‍💻"];
 if(level>=3)return["견습 지표 분석가","🧙"];
 return["인턴 분석가","🧙‍♂️"];
}
function gainXp(amount){
 let leveled=false;player.xp+=amount;
 while(player.xp>=xpNeed(player.level)){player.xp-=xpNeed(player.level);player.level++;leveled=true}
 if(player.level>=5)unlock("level5");
 return leveled;
}
function unlock(id,newList=[]){
 if(!player.achievements.includes(id)){player.achievements.push(id);newList.push(id);return true}return false
}
function updateHeader(){
 try{
  const need=xpNeed(player.level);
  if($("miniLevel"))$("miniLevel").textContent=player.level;
  if($("miniGold"))$("miniGold").textContent=player.gold;
  if($("miniXp"))$("miniXp").style.width=`${player.xp/need*100}%`;
  const rankInfo=rankFor(player.level),rank=rankInfo[0],av=rankInfo[1];
  if($("rankName"))$("rankName").textContent=rank;
  if($("homeAvatar"))$("homeAvatar").textContent=av;
  const mastered=TERMS.filter(t=>masteryPercent(t.id)>=70).length;
  if($("homeProgress"))$("homeProgress").textContent=`도감 숙련도 ${Math.round(mastered/TERMS.length*100)}%`;
  if($("wrongCount"))$("wrongCount").textContent=`오답 ${player.mistakes.length}개`;
 }catch(e){}
}
function masteryRecord(id){return player.mastery[id]||{correct:0,wrong:0}}
function masteryPercent(id){const r=masteryRecord(id),n=r.correct+r.wrong;if(!n)return 0;return Math.round(r.correct/n*100)}
function masteryLabel(id){
 const r=masteryRecord(id),n=r.correct+r.wrong;
 return n?`숙련도 ${masteryPercent(id)}% · ${r.correct}/${n} 정답`:"미학습";
}
function recordAnswer(id,correct){
 const r=masteryRecord(id);correct?r.correct++:r.wrong++;player.mastery[id]=r;
 if(correct){if(player.mistakes.includes(id)&&r.correct>=r.wrong+1)player.mistakes=player.mistakes.filter(x=>x!==id)}
 else if(!player.mistakes.includes(id))player.mistakes.push(id);
}
function showScreen(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");
 try{window.scrollTo({top:0,behavior:"smooth"})}catch(e){try{window.scrollTo(0,0)}catch(ignore){}}
 if(id==="home"){updateHeader();AudioEngine.startMusic("home")}
 else if(id==="study"||id==="profile")AudioEngine.startMusic("home");
}
document.querySelectorAll("[data-home]").forEach(b=>b.onclick=()=>showScreen("home"));

function termById(id){return TERMS.find(t=>t.id===id)}
function makeTermQuestion(t,difficulty=1){
 const roll=Math.random();
 if(roll<.2){
  const wrong=shuffle(TERMS.filter(x=>x.id!==t.id))[0];
  const isTrue=Math.random()<.5;
  return {kind:"OX 판정",prompt:`${t.term}은(는) “${isTrue?t.meaning:wrong.meaning}”을 뜻한다.`,answer:isTrue?"O":"X",options:["O","X"],explain:`${t.term} = ${t.meaning}`,termId:t.id}
 }
 if(roll<.38&&difficulty>=2){
  return {kind:"직접 입력",prompt:`다음 설명에 맞는 용어를 입력해 봐.\n${t.meaning}`,answer:t.term,input:true,explain:`${t.term} = ${t.full}`,termId:t.id}
 }
 if(roll<.56){
  const options=shuffle([t,...shuffle(TERMS.filter(x=>x.id!==t.id&&x.category===t.category)).slice(0,3)]);
  while(options.length<4)options.push(shuffle(TERMS.filter(x=>!options.some(o=>o.id===x.id)))[0]);
  return {kind:"영문 해독",prompt:`${t.term}의 영문 풀네임은?`,answer:t.full,options:shuffle(options).map(x=>x.full),explain:`${t.term} = ${t.full}`,termId:t.id}
 }
 if(roll<.78){
  const options=shuffle([t,...shuffle(TERMS.filter(x=>x.id!==t.id)).slice(0,3)]);
  return {kind:"뜻 맞히기",prompt:`${t.term}의 뜻은?`,answer:t.meaning,options:options.map(x=>x.meaning),explain:`${t.full}`,termId:t.id}
 }
 const options=shuffle([t,...shuffle(TERMS.filter(x=>x.id!==t.id)).slice(0,3)]);
 return {kind:"용어 찾기",prompt:t.meaning,answer:t.term,options:options.map(x=>x.term),explain:`${t.term} = ${t.full}`,termId:t.id}
}

const HARD_SCENARIOS=[
 {kind:"복합 계산",prompt:"DAU가 20,000명, PUR이 3%, ARPPU가 40,000원이다. 예상 일매출은?",answer:"24,000,000원",accept:["24000000","2400만원"],input:true,placeholder:"금액 입력",explain:"20,000 × 0.03 × 40,000 = 24,000,000원",termId:"ARPDAU"},
 {kind:"역산 계산",prompt:"일매출이 12,000,000원이고 ARPPU가 30,000원이다. PU는 몇 명인가?",answer:"400명",accept:["400"],input:true,placeholder:"인원 입력",explain:"PU = 12,000,000 ÷ 30,000 = 400명",termId:"PU"},
 {kind:"역산 계산",prompt:"DAU가 25,000명이고 PU가 750명이다. PUR은?",answer:"3%",accept:["3","0.03"],input:true,placeholder:"비율 입력",explain:"750 ÷ 25,000 × 100 = 3%",termId:"PUR"},
 {kind:"복합 계산",prompt:"MAU가 80,000명이고 MPU가 4,000명이다. MPUR은?",answer:"5%",accept:["5","0.05"],input:true,placeholder:"비율 입력",explain:"4,000 ÷ 80,000 × 100 = 5%",termId:"MPUR"},
 {kind:"복합 계산",prompt:"신규 유저 2,500명 중 D+7에 425명이 접속했다. D+7 Retention은?",answer:"17%",accept:["17","0.17"],input:true,placeholder:"비율 입력",explain:"425 ÷ 2,500 × 100 = 17%",termId:"RET"},
 {kind:"역산 계산",prompt:"광고비 18,000,000원을 썼고 CAC가 3,000원이었다. 확보한 신규 유저 수는?",answer:"6,000명",accept:["6000"],input:true,placeholder:"인원 입력",explain:"신규 유저 = 18,000,000 ÷ 3,000 = 6,000명",termId:"CAC"},
 {kind:"지표 비교",prompt:"오늘 PU는 500명이고 그중 NPU가 120명이다. 기존에 결제 경험이 있던 결제자는 몇 명인가?",answer:"380명",accept:["380"],input:true,placeholder:"인원 입력",explain:"PU 500명 중 첫 결제자 120명을 제외하면 380명",termId:"NPU"},
 {kind:"매출 구조",prompt:"Gross Sales가 100,000,000원이고 플랫폼 수수료가 30%다. 다른 공제는 없다고 할 때 Net Sales는?",answer:"70,000,000원",accept:["70000000","7000만원"],input:true,placeholder:"금액 입력",explain:"100,000,000 × 0.70 = 70,000,000원",termId:"NET"},
 {kind:"수익 분배",prompt:"Net Sales 50,000,000원을 개발사와 퍼블리셔가 4:6으로 나눈다. 개발사 몫은?",answer:"20,000,000원",accept:["20000000","2000만원"],input:true,placeholder:"금액 입력",explain:"50,000,000 × 0.4 = 20,000,000원",termId:"RS"},
 {kind:"상황 분석",prompt:"LTV가 18,000원인데 CAC가 24,000원이다. 가장 적절한 판단은?",answer:"유저를 확보할수록 손실 가능성이 크다",options:["유저를 확보할수록 손실 가능성이 크다","광고 효율이 매우 좋다","Retention은 반드시 100%다","ARPPU가 CAC보다 높다는 뜻이다"],explain:"유저 한 명의 기대가치보다 획득비용이 더 크다.",termId:"LTV"},
 {kind:"지표 비교",prompt:"현재 CU가 6,500명이고 오늘 MCU가 9,200명이다. 올바른 설명은?",answer:"현재 동접은 오늘 최고치보다 2,700명 낮다",options:["현재 동접은 오늘 최고치보다 2,700명 낮다","현재 동접이 오늘 최고치다","오늘 DAU는 9,200명이다","오늘 신규 유저는 2,700명이다"],explain:"MCU는 기간 중 최고 동접, CU는 현재 동접이다.",termId:"MCU"},
 {kind:"개념 구분",prompt:"광고 캠페인 링크를 통해 들어온 신규 유저를 가장 직접적으로 설명하는 표현은?",answer:"Non-Organic NRU",options:["Organic MPU","Non-Organic NRU","Organic PU","MCU"],explain:"광고 유입이므로 Non-Organic, 신규 유저이므로 NRU다.",termId:"NONORG"},
 {kind:"개념 구분",prompt:"같은 유저가 오늘 10번 접속해도 DAU에는 몇 명으로 집계되는가?",answer:"1명",accept:["1"],input:true,placeholder:"인원 입력",explain:"DAU는 중복을 제거한 일일 활성 이용자 수다.",termId:"DAU"},
 {kind:"변화 해석",prompt:"D+1 Retention이 48%, D+7 Retention이 18%다. 두 지표의 차이는?",answer:"30%p",accept:["30","30퍼센트포인트","30%포인트"],input:true,placeholder:"차이 입력",explain:"48% - 18% = 30%p이며, 단순히 30% 감소라고 표현하면 다르다.",termId:"RET"},
 {kind:"의사결정",prompt:"DAU는 그대로인데 PUR이 상승하고 ARPPU는 동일하다. 다른 조건이 같다면 일매출은?",answer:"상승한다",options:["상승한다","하락한다","반드시 동일하다","판단할 수 없다"],explain:"Sales = DAU × PUR × ARPPU이므로 PUR 상승은 매출 상승으로 이어진다.",termId:"PUR"},
 {kind:"의사결정",prompt:"PU는 늘었지만 ARPPU가 크게 하락했다. 매출 변화에 대한 올바른 판단은?",answer:"두 변화의 크기를 알아야 판단할 수 있다",options:["반드시 상승한다","반드시 하락한다","두 변화의 크기를 알아야 판단할 수 있다","DAU만 알면 판단할 수 있다"],explain:"매출은 PU × ARPPU이므로 두 변화 폭을 함께 봐야 한다.",termId:"ARPPU"},
 {kind:"계약 이해",prompt:"MG를 지급받은 뒤 발생한 개발사 RS 수익이 MG보다 작다. 일반적인 MG 구조에서 가장 적절한 설명은?",answer:"아직 MG가 전부 회수되지 않았다",options:["아직 MG가 전부 회수되지 않았다","MG는 즉시 두 배가 된다","RS 계약은 자동 종료된다","Net Sales가 Gross Sales보다 커진다"],explain:"MG는 선지급 후 개발사 몫 수익에서 회수하는 구조가 일반적이다.",termId:"MG"},
 {kind:"KPI 판단",prompt:"신규 유입은 충분하지만 유저가 하루 만에 대부분 떠난다. 가장 우선해서 볼 지표는?",answer:"D+1 Retention",options:["D+1 Retention","MCU","RS","License Fee"],explain:"초기 이탈 문제는 초반 잔존율에서 직접 드러난다.",termId:"RET"}
];

function randomFrom(list){return list[Math.floor(Math.random()*list.length)]}

function makeRandomAdvancedCalc(){
 const type=Math.floor(Math.random()*7);
 if(type===0){
  const dau=randomFrom([8000,12000,15000,20000,25000]);
  const pur=randomFrom([2,3,4,5]);
  const pu=dau*pur/100;
  return {kind:"랜덤 역산",prompt:`DAU가 ${dau.toLocaleString()}명이고 PUR이 ${pur}%다. PU는?`,answer:`${pu.toLocaleString()}명`,accept:[String(pu)],input:true,placeholder:"인원 입력",explain:`${dau.toLocaleString()} × ${pur/100} = ${pu.toLocaleString()}명`,termId:"PU"};
 }
 if(type===1){
  const pu=randomFrom([200,300,400,500,600]);
  const arppu=randomFrom([20000,25000,30000,40000]);
  const sales=pu*arppu;
  return {kind:"랜덤 복합 계산",prompt:`PU가 ${pu.toLocaleString()}명이고 ARPPU가 ${arppu.toLocaleString()}원이다. 일매출은?`,answer:`${sales.toLocaleString()}원`,accept:[String(sales)],input:true,placeholder:"금액 입력",explain:`${pu.toLocaleString()} × ${arppu.toLocaleString()} = ${sales.toLocaleString()}원`,termId:"ARPPU"};
 }
 if(type===2){
  const base=randomFrom([1000,1500,2000,2500,3000]);
  const rate=randomFrom([12,15,18,20,25]);
  const ret=base*rate/100;
  return {kind:"랜덤 잔존율",prompt:`신규 유저 ${base.toLocaleString()}명 중 D+7에 ${ret.toLocaleString()}명이 재접속했다. Retention은?`,answer:`${rate}%`,accept:[String(rate),String(rate/100)],input:true,placeholder:"비율 입력",explain:`${ret.toLocaleString()} ÷ ${base.toLocaleString()} × 100 = ${rate}%`,termId:"RET"};
 }
 if(type===3){
  const users=randomFrom([3000,4000,5000,6000]);
  const cac=randomFrom([1500,2000,2500,3000]);
  const cost=users*cac;
  return {kind:"랜덤 CAC",prompt:`광고비 ${cost.toLocaleString()}원으로 신규 유저 ${users.toLocaleString()}명을 확보했다. CAC는?`,answer:`${cac.toLocaleString()}원`,accept:[String(cac)],input:true,placeholder:"금액 입력",explain:`${cost.toLocaleString()} ÷ ${users.toLocaleString()} = ${cac.toLocaleString()}원`,termId:"CAC"};
 }
 if(type===4){
  const sales=randomFrom([8000000,12000000,16000000,20000000]);
  const dau=randomFrom([8000,10000,16000,20000]);
  const arpdau=sales/dau;
  if(Number.isInteger(arpdau))return {kind:"랜덤 ARPDAU",prompt:`일매출이 ${sales.toLocaleString()}원이고 DAU가 ${dau.toLocaleString()}명이다. ARPDAU는?`,answer:`${arpdau.toLocaleString()}원`,accept:[String(arpdau)],input:true,placeholder:"금액 입력",explain:`${sales.toLocaleString()} ÷ ${dau.toLocaleString()} = ${arpdau.toLocaleString()}원`,termId:"ARPDAU"};
  return makeRandomAdvancedCalc();
 }
 if(type===5){
  const gross=randomFrom([50000000,80000000,100000000,120000000]);
  const fee=randomFrom([20,25,30]);
  const net=gross*(100-fee)/100;
  return {kind:"랜덤 Net Sales",prompt:`Gross Sales가 ${gross.toLocaleString()}원이고 공제율이 ${fee}%다. Net Sales는?`,answer:`${net.toLocaleString()}원`,accept:[String(net)],input:true,placeholder:"금액 입력",explain:`${gross.toLocaleString()} × ${(100-fee)/100} = ${net.toLocaleString()}원`,termId:"NET"};
 }
 const mau=randomFrom([40000,50000,80000,100000]);
 const rate=randomFrom([2,3,4,5]);
 const mpu=mau*rate/100;
 return {kind:"랜덤 MPUR",prompt:`MAU가 ${mau.toLocaleString()}명이고 MPU가 ${mpu.toLocaleString()}명이다. MPUR은?`,answer:`${rate}%`,accept:[String(rate),String(rate/100)],input:true,placeholder:"비율 입력",explain:`${mpu.toLocaleString()} ÷ ${mau.toLocaleString()} × 100 = ${rate}%`,termId:"MPUR"};
}

const INPUT_ALIASES={
 GROSS:["Gross","Sales","Gross Sales"],
 NET:["Net","Net Sales","Net Gross"],
 RET:["Retention","리텐션","잔존율","지속율","재방문율"],
 ORG:["Organic","자연유입","자연 유입"],
 NONORG:["Non-Organic","Non Organic","Nonorganic","비자연유입","비자연 유입"],
 CAC:["CAC","UAC","UA","CAC/UAC","CAC / UAC / UA"],
 TS:["TS","Time Spend","Time Spent"],
 UV:["UV","Unique Visit"],
};

/* 용어의 핵심 뜻을 직접 떠올리는 빈칸 채우기 문제 */
const CLOZE_BANK={
 DAU:{prompt:"DAU는 하루 동안 게임에 접속한 ________ 이용자 수다.",answer:"중복되지 않은",accept:["중복되지않은","순수한","고유한"]},
 MAU:{prompt:"MAU는 ________ 동안 게임에 접속한 중복되지 않은 이용자 수다.",answer:"한 달",accept:["한달","월간"]},
 NRU:{prompt:"NRU는 새로 가입하거나 게임을 처음 시작한 ________ 수다.",answer:"신규 유저",accept:["신규유저","신규 이용자","신규이용자"]},
 PU:{prompt:"PU는 하루 동안 ________ 중복되지 않은 유저 수다.",answer:"결제한",accept:["결제한 유저","결제유저"]},
 NPU:{prompt:"NPU는 게임에서 생애 ________를 한 유저 수다.",answer:"첫 결제",accept:["첫결제","최초 결제","최초결제"]},
 MPU:{prompt:"MPU는 ________ 동안 결제한 중복되지 않은 유저 수다.",answer:"한 달",accept:["한달","월간"]},
 PUR:{prompt:"PUR은 ________ 중 결제한 유저의 비율이다.",answer:"DAU",accept:["dau"]},
 MPUR:{prompt:"MPUR은 ________ 중 한 달 동안 결제한 유저의 비율이다.",answer:"MAU",accept:["mau"]},
 ARPPU:{prompt:"ARPPU는 ________ 1명당 평균 결제 금액이다.",answer:"결제 유저",accept:["결제유저","결제자"]},
 ARPDAU:{prompt:"ARPDAU는 하루 ________ 1명당 평균 매출이다.",answer:"이용자",accept:["유저","사용자"]},
 GROSS:{prompt:"Gross Sales는 수수료와 세금 등을 빼기 전 발생한 ________이다.",answer:"총매출",accept:["총 매출","전체 매출","전체매출"]},
 NET:{prompt:"Net Sales는 세금과 플랫폼 수수료 등을 제외한 ________이다.",answer:"순매출",accept:["순 매출","순수 매출","순수매출"]},
 RET:{prompt:"Retention은 특정 시점에 들어온 유저가 며칠 뒤에도 ________ 비율이다.",answer:"다시 접속하는",accept:["재접속하는","재방문하는","다시접속하는"]},
 ORG:{prompt:"Organic 유저는 광고나 마케팅 비용 없이 ________ 유입된 유저다.",answer:"자연스럽게",accept:["자연적으로","자연 유입으로","자연유입으로"]},
 NONORG:{prompt:"Non-Organic 유저는 광고나 마케팅을 ________ 유입된 유저다.",answer:"통해",accept:["통해서","이용해","이용해서"]},
 CU:{prompt:"CU는 ________ 같은 시간에 접속해 있는 동시접속자 수다.",answer:"현재",accept:["지금"]},
 MCU:{prompt:"MCU는 일정 기간 동안 기록한 ________ 동시접속자 수다.",answer:"최고",accept:["최대","가장 높은","가장높은"]},
 UV:{prompt:"UV는 한 번 이상 방문한 ________ 순방문자 수다.",answer:"중복되지 않은",accept:["중복되지않은","고유한"]},
 TS:{prompt:"TS는 유저가 게임에 접속해 플레이한 ________이다.",answer:"이용시간",accept:["이용 시간","플레이 시간","플레이시간"]},
 KPI:{prompt:"KPI는 목표 달성 여부를 판단하는 ________ 지표다.",answer:"핵심 성과",accept:["핵심성과","핵심","주요 성과","주요성과"]},
 LTV:{prompt:"LTV는 유저 1명이 완전히 ________까지 만들어 내는 가치다.",answer:"이탈할 때",accept:["이탈할때","떠날 때","떠날때"]},
 PLC:{prompt:"PLC는 게임이나 제품이 성장하고 쇠퇴하기까지의 ________다.",answer:"수명주기",accept:["수명 주기","생애주기","생애 주기"]},
 BEP:{prompt:"BEP는 누적 비용과 누적 수익이 ________ 손익분기점이다.",answer:"같아지는",accept:["동일해지는","일치하는","같은"]},
 ROI:{prompt:"ROI는 투자한 금액 대비 얻은 ________의 비율이다.",answer:"이익",accept:["수익","성과"]},
 CAC:{prompt:"CAC/UAC는 유저 1명을 새로 ________ 데 필요한 비용이다.",answer:"확보하는",accept:["획득하는","유치하는"]},
 CRC:{prompt:"CRC는 ________ 유저 1명을 유지하는 데 필요한 비용이다.",answer:"기존",accept:["현재","남아 있는","남아있는"]},
 RS:{prompt:"RS는 개발사와 퍼블리셔 사이의 ________ 비율이다.",answer:"수익 분배",accept:["수익분배","매출 분배","매출분배"]},
 LF:{prompt:"LF는 퍼블리셔가 판권을 받으며 개발사에 지급하는 ________이다.",answer:"계약금",accept:["계약 금액","계약금액"]},
 MG:{prompt:"MG는 개발사의 최소 수익을 보장하기 위해 퍼블리셔가 ________ 금액이다.",answer:"선지급하는",accept:["미리 지급하는","미리지급하는","먼저 지급하는","먼저지급하는"]},
 MOU:{prompt:"MOU는 정식 계약 ________ 협력 방향을 정리한 양해각서다.",answer:"전",accept:["이전","전에"]}
};

function termChoices(target,sameCategory=false){
 let candidates=TERMS.filter(x=>x.id!==target.id&&(!sameCategory||x.category===target.category));
 const picked=shuffle(candidates).slice(0,3);
 while(picked.length<3){
  const extra=shuffle(TERMS.filter(x=>x.id!==target.id&&!picked.some(p=>p.id===x.id)))[0];
  if(!extra)break;
  picked.push(extra);
 }
 return shuffle([target,...picked]);
}

function makeForcedTermQuestion(t,kind){
 if(kind==="ox"){
  const wrong=shuffle(TERMS.filter(x=>x.id!==t.id))[0];
  const isTrue=Math.random()<.5;
  return {kind:"OX 판정",prompt:`${t.term}은(는) “${isTrue?t.meaning:wrong.meaning}”을 뜻한다.`,answer:isTrue?"O":"X",options:["O","X"],explain:`${t.term} = ${t.meaning}`,termId:t.id};
 }
 if(kind==="input"){
  return {kind:"직접 입력",prompt:`다음 설명에 맞는 용어를 입력해 봐.\n${t.meaning}`,answer:t.term,accept:INPUT_ALIASES[t.id]||[],input:true,placeholder:"용어 입력",explain:`${t.term} = ${t.full}`,termId:t.id};
 }
 if(kind==="cloze"){
  const c=CLOZE_BANK[t.id];
  if(c)return {kind:"뜻 빈칸 채우기",prompt:c.prompt,answer:c.answer,accept:c.accept||[],input:true,placeholder:"빈칸에 들어갈 말",explain:`${t.term}: ${t.meaning}`,termId:t.id};
  return {kind:"뜻 빈칸 채우기",prompt:`다음 설명에 맞는 용어를 입력해 봐.\n${t.meaning.replace(t.term,"______")}`,answer:t.term,accept:INPUT_ALIASES[t.id]||[],input:true,placeholder:"빈칸 정답 입력",explain:`${t.term} = ${t.full}`,termId:t.id};
 }
 if(kind==="full"){
  const options=termChoices(t,true);
  return {kind:"영문 해독",prompt:`${t.term}의 영문 풀네임은?`,answer:t.full,options:options.map(x=>x.full),explain:`${t.term} = ${t.full}`,termId:t.id};
 }
 if(kind==="meaning"){
  const options=termChoices(t);
  return {kind:"뜻 맞히기",prompt:`${t.term}의 뜻은?`,answer:t.meaning,options:options.map(x=>x.meaning),explain:`${t.full}`,termId:t.id};
 }
 const options=termChoices(t);
 return {kind:"용어 찾기",prompt:t.meaning,answer:t.term,options:options.map(x=>x.term),explain:`${t.term} = ${t.full}`,termId:t.id};
}

function buildQuestions(mode){
 const terms=shuffle(TERMS);
 let termIndex=0;
 const nextTerm=()=>terms[(termIndex++)%terms.length];
 const calcPool=shuffle(SCENARIOS.filter(x=>x.type==="calc"));
 const situationPool=shuffle(SCENARIOS.filter(x=>x.type==="scenario"));
 let calcIndex=0,situationIndex=0;
 const nextScenario=type=>{
  const pool=type==="calc"?calcPool:situationPool;
  const index=type==="calc"?calcIndex++:situationIndex++;
  const s=pool[index%pool.length];
  return {...s,kind:type==="calc"?"계산 공격":"상황 판단"};
 };

 if(mode==="wrong"){
  const pool=player.mistakes.map(termById).filter(Boolean);
  const usable=shuffle(pool.length?pool:TERMS.slice(0,8));
  const kinds=["term","meaning","cloze","ox","input","full"];
  const total=Math.max(8,Math.min(12,usable.length*2));
  const qs=[];
  for(let i=0;i<total;i++)qs.push(makeForcedTermQuestion(usable[i%usable.length],kinds[i%kinds.length]));
  return qs;
 }

 if(mode==="advanced"){
  const hard=shuffle(HARD_SCENARIOS);
  const questions=[];
  for(let i=0;i<10;i++)questions.push({...hard[i%hard.length]});
  for(let i=0;i<5;i++)questions.push(makeRandomAdvancedCalc());
  return shuffle(questions);
 }

 const blueprints={
  adventure:["term","meaning","cloze","ox","scenario","term","calc","input","scenario","cloze"],
  quick:["term","cloze","ox","full","term","scenario","cloze","ox","meaning","term"],
  boss:["scenario","calc","cloze","scenario","calc","input","scenario","calc","cloze","scenario","calc","full"]
 };
 return blueprints[mode].map(kind=>{
  if(kind==="scenario")return nextScenario("scenario");
  if(kind==="calc")return nextScenario("calc");
  return makeForcedTermQuestion(nextTerm(),kind);
 });
}
function startBattle(mode){
 player.lastMode=mode;
 const enemy=(mode==="boss"||mode==="advanced")?ENEMIES[4]:shuffle(ENEMIES.slice(0,4))[0];
 const questions=buildQuestions(mode);
 const maxEnemy=(mode==="boss"||mode==="advanced")?questions.length*38:questions.length*34;
 const playerMaxHp=(mode==="advanced"||mode==="boss")?160:100;
 battle={mode,enemy,questions,index:0,playerHp:playerMaxHp,maxPlayer:playerMaxHp,enemyHp:maxEnemy,maxEnemy,combo:0,score:0,correct:0,wrong:0,answered:false};
 $("playerFace").textContent=rankFor(player.level)[1];$("enemyFace").textContent=enemy.emoji;$("enemyName").textContent=enemy.name;
 $("battleTotal").textContent=battle.questions.length;showScreen("battle");AudioEngine.startMusic((mode==="boss"||mode==="advanced")?"boss":"battle");renderBattle();
}
document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>startBattle(b.dataset.mode));
$("wrongDungeon").onclick=()=>{
 if(!player.mistakes.length){alert("아직 저장된 오답이 없어. 먼저 던전을 플레이해 봐!");return}
 startBattle("wrong")
};
$("quitBattle").onclick=()=>{if(confirm("전투를 포기하고 길드로 돌아갈까?"))showScreen("home")};

function renderBattle(){
 const q=battle.questions[battle.index];battle.answered=false;
 $("playerHpBar").style.width=`${battle.playerHp/battle.maxPlayer*100}%`;$("enemyHpBar").style.width=`${battle.enemyHp/battle.maxEnemy*100}%`;
 $("playerHpText").textContent=`${battle.playerHp}/${battle.maxPlayer}`;$("enemyHpText").textContent=`${battle.enemyHp}/${battle.maxEnemy}`;
 $("battleCombo").textContent=battle.combo;$("battleNumber").textContent=battle.index+1;$("battleScore").textContent=battle.score;
 $("qType").textContent=(battle.mode==="advanced"?"심화 시험 · ":"")+q.kind;$("qText").textContent=q.prompt;$("feedback").innerHTML="";$("nextQuestion").style.display="none";
 const area=$("answerArea");area.innerHTML="";
 if(q.input){
  const wrap=document.createElement("div");wrap.className="input-answer";
  const inp=document.createElement("input");inp.placeholder=q.placeholder||"정답 입력";inp.autocomplete="off";inp.autocapitalize="off";inp.spellcheck=false;
  const btn=document.createElement("button");btn.className="btn primary";btn.textContent="공격";btn.onclick=()=>submitAnswer(inp.value,btn);
  inp.onkeydown=e=>{if(e.key==="Enter")btn.click()};wrap.append(inp,btn);area.append(wrap);setTimeout(()=>inp.focus(),50)
 }else{
  const choices=document.createElement("div");choices.className="choices";
  shuffle(q.options).forEach(opt=>{const b=document.createElement("button");b.className="choice";b.textContent=opt;b.onclick=()=>submitAnswer(opt,b);choices.append(b)});
  area.append(choices)
 }
}
function submitAnswer(value,button){
 if(battle.answered)return;battle.answered=true;
 const q=battle.questions[battle.index];
 const accepted=[q.answer,...(q.accept||[])];
 const numericValue=String(value == null ? "" : value).replace(/,/g,"").match(/-?\d+(?:\.\d+)?/);
 const correct=accepted.some(answer=>{
  if(normalize(value)===normalize(answer))return true;
  const numericAnswer=String(answer == null ? "" : answer).replace(/,/g,"").match(/-?\d+(?:\.\d+)?/);
  if(!numericValue||!numericAnswer)return false;
  const a=Number(numericValue[0]),b=Number(numericAnswer[0]);
  if(!Number.isFinite(a)||!Number.isFinite(b))return false;
  if(Math.abs(a-b)<1e-9)return true;
  const answerHasPercent=String(answer).includes("%");
  const valueHasPercent=String(value).includes("%");
  return answerHasPercent!==valueHasPercent && (Math.abs(a*100-b)<1e-9||Math.abs(a-b*100)<1e-9);
 });
 document.querySelectorAll("#answerArea button,#answerArea input").forEach(x=>x.disabled=true);
 if(correct){
  AudioEngine.correct();setTimeout(()=>AudioEngine.attack(),120);
  battle.combo++;battle.correct++;const dmg=22+Math.min(16,battle.combo*3);battle.enemyHp=clamp(battle.enemyHp-dmg,0,battle.maxEnemy);
  battle.score+=100+battle.combo*20;if(button)button.classList.add("correct");recordAnswer(q.termId,true);
  $("feedback").innerHTML=`✅ <b>정답!</b> ${q.explain}<br><span style="color:#86efac">적에게 ${dmg} 피해 · ${battle.combo}콤보</span>`;
  popDamage(`-${dmg}`,"#86efac");
  if(battle.combo>=5)unlock("combo5");
 }else{
  AudioEngine.wrong();setTimeout(()=>AudioEngine.hurt(),100);
  battle.combo=0;battle.wrong++;
  const receivedDamage=(battle.mode==="advanced"||battle.mode==="boss")?18:20;
  battle.playerHp=clamp(battle.playerHp-receivedDamage,0,battle.maxPlayer);
  if(button)button.classList.add("wrong");recordAnswer(q.termId,false);
  const correctChoice=[...document.querySelectorAll("#answerArea .choice")].find(x=>normalize(x.textContent)===normalize(q.answer));
  if(correctChoice)correctChoice.classList.add("correct");
  $("feedback").innerHTML=`❌ 정답은 <b>${q.answer}</b><br>${q.explain}<br><span style="color:#fda4af">플레이어가 피해를 입었다.</span>`;
  popDamage(`-${receivedDamage}`,"#fda4af");
 }
 player.bestCombo=Math.max(player.bestCombo,battle.combo);
 $("playerHpBar").style.width=`${battle.playerHp}%`;$("enemyHpBar").style.width=`${battle.enemyHp/battle.maxEnemy*100}%`;
 $("playerHpText").textContent=`${battle.playerHp}/${battle.maxPlayer}`;$("enemyHpText").textContent=`${battle.enemyHp}/${battle.maxEnemy}`;
 $("battleCombo").textContent=battle.combo;$("battleScore").textContent=battle.score;
 const done=battle.playerHp<=0||battle.index>=battle.questions.length-1;
 $("nextQuestion").textContent=done?"전투 결과 보기":"다음 공격";
 $("nextQuestion").style.display="block";
 try{savePlayer()}catch(e){};
}
function popDamage(text,color){
 const d=document.createElement("div");d.className="damage";d.textContent=text;d.style.color=color;document.body.append(d);setTimeout(()=>d.remove(),850)
}
$("nextQuestion").onclick=()=>{
 const done=battle.playerHp<=0||battle.index>=battle.questions.length-1;
 if(done)finishBattle();else{battle.index++;renderBattle()}
};
function finishBattle(){
 const passRate=(battle.mode==="advanced"||battle.mode==="boss") ? 0.75 : 0.65;
 const requiredCorrect=Math.ceil(battle.questions.length*passRate);
 const won=battle.playerHp>0&&battle.correct>=requiredCorrect;
 if(won)battle.enemyHp=0;
 const xp=won?55+battle.correct*8:20+battle.correct*4,gold=won?25+battle.correct*3:5+battle.correct;
 const newly=[];player.gold+=gold;const leveled=gainXp(xp);
 if(won){player.wins++;unlock("firstWin",newly)}
 if(won&&battle.wrong===0)unlock("perfect",newly);
 if(won&&battle.mode==="boss"){player.bossWins++;unlock("boss",newly)}
 if(player.level>=5)unlock("level5",newly);savePlayer();
 AudioEngine.stopMusic();
 if(won)AudioEngine.victory();else AudioEngine.defeat();
 if(leveled)setTimeout(()=>AudioEngine.levelUp(),650);
 $("resultIcon").textContent=won?"🏆":"🛡️";$("resultTitle").textContent=won?"던전 클리어!":"퇴각했지만 경험은 남았다";
 $("resultDesc").textContent=`정답 ${battle.correct}/${battle.questions.length}개 · 통과 기준 ${requiredCorrect}개 · 오답 ${battle.wrong}개 · 최고 콤보 ${player.bestCombo}${leveled?" · 레벨 업!":""}`;
 $("rewardXp").textContent=xp;$("rewardGold").textContent=gold;
 $("newAchievements").innerHTML=newly.length?`<div class="notice">새 업적: ${newly.map(id=>ACHIEVEMENTS[id].icon+" "+ACHIEVEMENTS[id].name).join(", ")}</div>`:"";
 showScreen("result")
}
$("retryMode").onclick=()=>startBattle(player.lastMode);

$("openStudy").onclick=()=>{renderStudy();showScreen("study")};
document.querySelectorAll("[data-study]").forEach(b=>b.onclick=()=>{
 studyTab=b.dataset.study;document.querySelectorAll("[data-study]").forEach(x=>x.classList.toggle("active",x===b));
 $("studyGlossary").style.display=studyTab==="glossary"?"block":"none";$("studyFlash").style.display=studyTab==="flash"?"block":"none";$("studyFormula").style.display=studyTab==="formula"?"block":"none";
 if(studyTab==="flash")renderFlash()
});
function renderStudy(){
 const cats=["전체",...new Set(TERMS.map(t=>t.category))];$("categoryFilter").innerHTML=cats.map(c=>`<option>${c}</option>`).join("");
 renderTermCards();renderFormulas();renderFlash()
}
function renderTermCards(){
 const query=$("termSearch").value.trim().toLowerCase(),cat=$("categoryFilter").value||"전체";
 const list=TERMS.filter(t=>(cat==="전체"||t.category===cat)&&(!query||`${t.term} ${t.full} ${t.meaning}`.toLowerCase().includes(query)));
 $("termCards").innerHTML=list.map(t=>`<article class="term-card" data-term="${t.id}"><h3>${t.term}</h3><small>${t.category}</small><p class="term-detail" style="display:none"><b>${t.full}</b><br>${t.meaning}</p><div class="mastery" title="숙련도"><div style="width:${masteryPercent(t.id)}%"></div></div><small>${masteryLabel(t.id)}</small></article>`).join("")||'<div class="empty">검색 결과가 없어.</div>';
 document.querySelectorAll("#termCards .term-card").forEach(c=>c.onclick=()=>{
  const detail=c.querySelector(".term-detail");detail.style.display=detail.style.display==="none"?"block":"none";
  player.studyViews++;if(player.studyViews>=20)unlock("scholar");savePlayer()
 })
}
$("termSearch").oninput=renderTermCards;$("categoryFilter").onchange=renderTermCards;
function renderFormulas(){
 $("formulaGrid").innerHTML=FORMULAS.map(f=>`<article class="formula"><b>${f.name}</b><code>${f.formula}</code><p>${f.tip}</p></article>`).join("")
}
function renderFlash(){
 const t=TERMS[flashIndex%TERMS.length];
 $("flashCard").innerHTML=flashFlipped?`<div class="flash-back"><b>${t.full}</b><br><br>${t.meaning}</div><div class="hint">눌러서 용어 보기</div>`:`<div class="front">${t.term}</div><div class="hint">눌러서 뜻 보기</div>`;
}
$("flashCard").onclick=$("flipFlash").onclick=()=>{flashFlipped=!flashFlipped;player.studyViews++;if(player.studyViews>=20)unlock("scholar");savePlayer();renderFlash()};
$("prevFlash").onclick=()=>{flashIndex=(flashIndex-1+TERMS.length)%TERMS.length;flashFlipped=false;renderFlash()};
$("nextFlash").onclick=()=>{flashIndex=(flashIndex+1)%TERMS.length;flashFlipped=false;renderFlash()};

$("openProfile").onclick=()=>{renderProfile();showScreen("profile")};
function renderProfile(){
 const [rank,av]=rankFor(player.level);$("profileRank").textContent=`Lv.${player.level} ${rank}`;$("profileAvatar").textContent=av;
 $("profileStats").innerHTML=`승리 ${player.wins}회 · 보스 처치 ${player.bossWins}회 · 최고 콤보 ${player.bestCombo}<br>보유 골드 ${player.gold} · 누적 도감 열람 ${player.studyViews}회`;
 $("achievementCount").textContent=`${player.achievements.length}/${Object.keys(ACHIEVEMENTS).length}`;
 $("achievementGrid").innerHTML=Object.entries(ACHIEVEMENTS).map(([id,a])=>`<div class="ach ${player.achievements.includes(id)?"unlocked":""}"><div class="aicon">${a.icon}</div><b>${a.name}</b><small>${a.desc}</small></div>`).join("");
 const weak=TERMS.map(t=>({...t,m:masteryPercent(t.id),r:masteryRecord(t.id)})).sort((a,b)=>(a.m-b.m)||((b.r.wrong)-(a.r.wrong))).slice(0,6);
 $("weakTerms").innerHTML=weak.map(t=>`<article class="term-card"><h3>${t.term}</h3><p>${t.meaning}</p><div class="mastery"><div style="width:${t.m}%"></div></div><small>${(t.r.correct+t.r.wrong)?`숙련도 ${t.m}% · ${t.r.correct}/${t.r.correct+t.r.wrong} 정답`:"미학습"}</small></article>`).join("")
}
$("resetSave").onclick=()=>{if(confirm("레벨, 오답, 업적을 모두 초기화할까?")){SafeStore.remove(SAVE_KEY);player={...defaultPlayer,mastery:{},mistakes:[],achievements:[]};updateHeader();showScreen("home")}};


function showSoundToast(text){
 const t=$("soundToast");t.textContent=text;t.classList.add("show");clearTimeout(showSoundToast.timer);
 showSoundToast.timer=setTimeout(()=>t.classList.remove("show"),1300)
}
if($("soundToggle"))$("soundToggle").textContent=AudioEngine.enabled?"🔊":"🔇";
if($("volumeSlider"))$("volumeSlider").value=Math.round(AudioEngine.volume*100);
if($("soundToggle"))$("soundToggle").onclick=e=>{
 e.stopPropagation();AudioEngine.setEnabled(!AudioEngine.enabled);
 showSoundToast(AudioEngine.enabled?"BGM과 효과음이 켜졌어":"소리를 껐어");
};
if($("volumeSlider"))$("volumeSlider").oninput=e=>AudioEngine.setVolume(Number(e.target.value)/100);
document.addEventListener("pointerdown",e=>{
 AudioEngine.resume();
 if(AudioEngine.enabled&&!AudioEngine.timer)AudioEngine.startMusic("home");
 if(e.target.closest("button")&&!e.target.closest("#soundToggle"))AudioEngine.click();
},{once:false});

updateHeader();
window.__GAME_METRICS_READY__=true;
var fatalBox=document.getElementById("fatalError");
if(fatalBox)fatalBox.hidden=true;

})();
