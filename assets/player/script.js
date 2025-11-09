/*
Codes By VLM Dev....
*/

// Theme handling
const root = document.documentElement;
const body = document.querySelector("html");
const stored = localStorage.getItem('vlm-theme') || 'light';
root.setAttribute('data-theme', stored === 'dark' ? 'dark' : 'light');
body.className=stored == 'dark' ? 'drK' : 'light';
document.getElementById('themeIcon').textContent = stored === 'dark' ? 'light_mode' : 'dark_mode';

document.getElementById('themeToggle').addEventListener('click', ()=>{
  const cur = root.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  body.className = cur === 'dark' ? 'light' : 'drK';
  localStorage.setItem('vlm-theme', next);
  document.getElementById('themeIcon').textContent = next === 'dark' ? 'light_mode' : 'dark_mode';
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('homeBtn').addEventListener('click', ()=>{
  Swal.fire({icon:'info',title:'Sorry Still Working on it!',timer:1000,showConfirmButton:false});
});

// Disable right-click + long press
window.addEventListener('contextmenu', e=>{ e.preventDefault(); showDevAlert('Right-click disabled',seconds=0,redir=0); });
let touchTimer=null;
window.addEventListener('touchstart', e=>{
  if(e.touches.length===1){
    touchTimer=setTimeout(()=>showDevAlert('Long press disabled'),600);
  }
});
window.addEventListener('touchend', ()=>{ clearTimeout(touchTimer); });

// Disable F12 & Inspect
function showDevAlert(message='Inspecting detected', seconds=3, redir=1){
  if(window._vlm_blocked) return; window._vlm_blocked=true;
  Swal.fire({
    title:'Security',
    html:redir == 1 ? `${message}. Redirecting in <strong id=sw-count>${seconds}</strong>s.` : `That Not What you have to do right?`,
    allowOutsideClick:false,
    allowEscapeKey:false,
    didOpen:()=>{
      if(redir == 1){
          let t=seconds;
          const el=document.getElementById('sw-count');
          const iv=setInterval(()=>{
            if(!el) return;
            el.textContent=t;
            if(t <= 0){ clearInterval(iv); window.location.href='https://google.com'; }
            t--;
          },1000);
      }
    }
  });
}
window.addEventListener('keydown', e=>{
  if(e.key==='F12' || (e.ctrlKey && e.shiftKey && ['i','j'].includes(e.key.toLowerCase())) || 
     (e.ctrlKey && e.key.toLowerCase()==='u')){
    e.preventDefault();
    showDevAlert('DevTools or source view blocked');
  }
});

// Get parameter from URL
const params = new URLSearchParams(window.location.search);
const videoId = params.get('id');

if (videoId) {
  //console.log('Video ID:', videoId);
  const p = RvXPlayerV1.create({
    container: '#player-container',
  });
  p.loadById(videoId); 
} else {
  console.warn('No video ID found in URL');
  location.href="404.html";
}
