import {workbooks} from './content.js';
import {icon} from './icons.js';
const app = document.querySelector('#app');
const KEY = 'quiet-notebook-v1';
let answers = {}, storageAvailable = true;
try { answers = JSON.parse(localStorage.getItem(KEY) || '{}'); if (!answers || typeof answers !== 'object' || Array.isArray(answers)) answers = {}; } catch { storageAvailable = false; }
let current = null, page = 0, saveTimer;
const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const answer = (id,i) => typeof answers[id]?.[i] === 'string' ? answers[id][i] : '';
const count = id => workbooks.find(w=>w.id===id).pages.filter((_,i)=>answer(id,i).trim()).length;
function save() {
 clearTimeout(saveTimer);
 try { localStorage.setItem(KEY,JSON.stringify(answers)); storageAvailable = true; } catch { storageAvailable = false; }
 const status = document.querySelector('#save-status');
 if(status) status.textContent = storageAvailable ? 'Saved in this browser' : 'Not saved — browser storage unavailable';
}
function home() {
 save(); current = null;
 app.innerHTML = '<section class="library"><div class="intro"><div class="eyebrow">YOUR OWN PACE. YOUR OWN WORDS.</div><h1>Your workbooks</h1><p>What would you like to make space for today?</p></div><div class="grid">' + workbooks.map((w,i)=>
 '<button class="workbook '+w.color+'" style="--i:'+i+'" data-id="'+w.id+'"><div class="card-top"><span class="symbol" aria-hidden="true">'+icon(w.icon)+'</span><span class="arrow" aria-hidden="true">'+icon('arrowUpRight')+'</span></div><h2>'+w.title+'</h2><p>'+w.subtitle+'</p><div class="card-bottom"><span>'+(count(w.id) ? count(w.id)+' of 5 reflections written' : '5 gentle reflections')+'</span><span class="dots" aria-hidden="true">'+w.pages.map((_,j)=>'<i class="'+(answer(w.id,j).trim()?'filled':'')+'"></i>').join('')+'</span></div></button>').join('')+'</div><div class="storage-note"><span class="note-icon" aria-hidden="true">'+icon('shield')+'</span><p>Your words stay in this browser, not on a server.<br><span>Use a private device. Clearing browser data clears your notebook.</span></p></div></section>';
 app.querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>open(b.dataset.id));
}
function open(id){ current=workbooks.find(w=>w.id===id); page=current.pages.findIndex((_,i)=>!answer(id,i).trim()); if(page<0)page=0; render(); window.scrollTo(0,0); }
function render(focus = false){
 const w=current, p=w.pages[page];
 app.innerHTML = '<section class="writing"><div class="writing-nav"><button id="back" class="text-button">'+icon('arrowLeft','ico-l')+'<span>All workbooks</span></button><span id="save-status" role="status">'+(storageAvailable?'Saved in this browser':'Not saved — browser storage unavailable')+'</span></div><div class="workbook-heading"><span class="symbol '+w.color+'" aria-hidden="true">'+icon(w.icon)+'</span><div><div class="eyebrow">'+w.title.toUpperCase()+' WORKBOOK</div><h1>'+w.label+'</h1></div></div><p class="workbook-intro">'+w.intro+'</p><div class="notebook"><div class="tabs" aria-label="Reflections">'+w.pages.map((p,i)=>'<button class="step '+(i===page?'active':'')+'" data-page="'+i+'" '+(i===page?'aria-current="step"':'')+' aria-label="Reflection '+(i+1)+': '+p[0]+'"><span>'+(i+1)+'</span><i class="'+(answer(w.id,i).trim()?'done':'')+'">'+icon('check')+'</i></button>').join('')+'</div><div class="paper"><div class="page-number">REFLECTION 0'+(page+1)+' / 05</div><h2 tabindex="-1" id="reflection-title">'+p[0]+'</h2><p class="guidance">'+p[1]+'</p><label for="answer">'+p[2]+'</label><textarea id="answer" spellcheck="true" placeholder="'+escape(p[3])+'">'+escape(answer(w.id,page))+'</textarea><div class="paper-bottom"><span>No perfect answers needed.</span><span id="word-count">'+words(answer(w.id,page))+'</span></div></div><div class="page-controls"><button id="previous" class="text-button" '+(page===0?'disabled':'')+'>'+icon('arrowLeft','ico-l')+'<span>Previous</span></button><span>'+(page+1)+' of 5</span><button id="next" class="next-button">'+(page===4?'Back to workbooks':'Next reflection')+icon('arrowRight','ico-r')+'</button></div></div></section>';
 document.querySelector('#back').onclick=home;
 document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{save();page=Number(b.dataset.page);render(true);});
 document.querySelector('#previous').onclick=()=>{save();page--;render(true);};
 document.querySelector('#next').onclick=()=>{save();if(page===4)home();else{page++;render(true);}};
 document.querySelector('#answer').oninput=e=>{
 if(!answers[w.id] || typeof answers[w.id] !== 'object') answers[w.id]={};
 answers[w.id][page]=e.target.value;
 document.querySelector('#word-count').textContent=words(e.target.value);
 document.querySelector('.step.active i').classList.toggle('done',!!e.target.value.trim());
 document.querySelector('#save-status').textContent='Saving…';
 clearTimeout(saveTimer);saveTimer=setTimeout(save,350);
 };
 if(focus)document.querySelector('#reflection-title').focus({preventScroll:true});
}
function words(s){const n=s.trim()?s.trim().split(/\s+/).length:0;return n+' '+(n===1?'word':'words');}
document.querySelector('.brand').onclick=e=>{e.preventDefault();home();window.scrollTo(0,0);};
window.addEventListener('pagehide',save);
home();
