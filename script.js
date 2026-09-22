const normalAnswers = [
  ["그래.","긍정"],["좋아.","긍정"],["해도 돼.","긍정"],["지금 해.","긍정"],["한번 해봐.","긍정"],["오늘은 괜찮아.","긍정"],["가능성 있어.","긍정"],["그대로 진행해.","긍정"],["망설이지 마.","긍정"],["마음 가는 대로 해.","긍정"],
  ["안 돼.","부정"],["하지 마.","부정"],["오늘은 아니야.","부정"],["그건 접어.","부정"],["지금은 멈춰.","부정"],["다시 생각해.","부정"],["오늘은 참아.","부정"],["이번엔 패스해.","부정"],["너무 성급해.","부정"],["오늘은 운이 아니야.","부정"],
  ["아무것도 하지 마.","보류"],["조금 기다려.","보류"],["내일 다시 물어봐.","보류"],["아직 때가 아니야.","보류"],["일단 보류.","보류"],["상황을 좀 더 봐.","보류"],["타이밍을 기다려.","보류"],["지금은 숨 고르기.","보류"],
  ["모르겠어.","애매"],["반반이야.","애매"],["네가 이미 답을 알고 있잖아.","애매"],["그건 네 선택이야.","애매"],["운명에 맡겨.","애매"],["첫 느낌을 믿어봐.","애매"],["너의 직감을 믿어.","애매"],["둘 다 가능성 있어.","애매"],
  ["밥부터 먹고 생각해.","생활"],["일단 자.","생활"],["물 한 잔 마셔.","생활"],["폰 내려놔.","생활"],["카드값부터 확인해.","생활"],["통장 잔고 보고 결정해.","생활"],["잠깐 산책하고 와.","생활"],["지금 피곤하면 결정하지 마.","생활"],
  ["연락해.","관계"],["지금은 연락하지 마.","관계"],["먼저 사과해.","관계"],["답장 좀 기다려.","관계"],["솔직하게 말해.","관계"],["괜히 떠보지 마.","관계"],["전화보단 문자.","관계"],["이번엔 네가 먼저 움직여.","관계"],
  ["사.","소비"],["사지 마.","소비"],["장바구니에 하루 넣어둬.","소비"],["중고부터 찾아봐.","소비"],["가격 비교부터 해.","소비"],["할인할 때 사.","소비"],["비슷한 거 이미 있으면 사지 마.","소비"],["한 달 뒤에도 원하면 사.","소비"],
  ["가.","행동"],["가지 마.","행동"],["일찍 출발해.","행동"],["예약부터 해.","행동"],["일단 해보고 판단해.","행동"],["첫 단계만 해.","행동"],["10분만 해봐.","행동"],["오늘 끝내버려.","행동"],["작게 시작해.","행동"],["미루지 말고 지금 하나만 해.","행동"]
];

const chaosAnswers = [
  ["소라고동이 지금 파업 중이야.","혼돈"],["질문이 너무 인간적이야.","혼돈"],["오늘의 정답은 치킨.","혼돈"],["대답 대신 동전 던지기 추천.","혼돈"],["그건 미래의 네가 알아서 할 문제야.","혼돈"],["아마도. 근데 책임은 못 져.","혼돈"],["우주적 관점에서는 별일 아니야.","혼돈"],["그냥 가위바위보 하자.","혼돈"],["이미 마음속으로 결정했잖아.","혼돈"],["소라고동은 모든 것을 알지만 말해주진 않아.","혼돈"],["정답은 있지만 비공개야.","혼돈"],["오늘은 소라고동도 헷갈려.","혼돈"]
];

const $ = s => document.querySelector(s);
const els = {
  conch: $('#conchBtn'), stage: $('.stage'), answer: $('#answerText'), card: $('#answerCard'), badge: $('#categoryBadge'),
  vibrate: $('#vibrateToggle'), sound: $('#soundToggle'), tts: $('#ttsToggle'), chaos: $('#chaosToggle'),
  settings: $('#settingsDialog'), installBtn: $('#installBtn'), toast: $('#toast')
};

const settingsKey='magicConchSettingsV5';
let lastAnswer=''; let toastTimer; let audioCtx; let deferredPrompt=null;

function loadSettings(){try{const s=JSON.parse(localStorage.getItem(settingsKey)||'{}');['vibrate','sound','tts','chaos'].forEach(k=>{if(typeof s[k]==='boolean') els[k].checked=s[k]})}catch{}}
function saveSettings(){localStorage.setItem(settingsKey,JSON.stringify({vibrate:els.vibrate.checked,sound:els.sound.checked,tts:els.tts.checked,chaos:els.chaos.checked}))}
function chooseAnswer(){const pool=els.chaos.checked?normalAnswers.concat(chaosAnswers):normalAnswers;let pick=pool[Math.floor(Math.random()*pool.length)];if(pool.length>1&&pick[0]===lastAnswer)pick=pool[(pool.indexOf(pick)+1+Math.floor(Math.random()*(pool.length-1)))%pool.length];lastAnswer=pick[0];return pick}
function ctx(){if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)(); return audioCtx}
function playSound(){if(!els.sound.checked)return;try{const c=ctx(),now=c.currentTime;[240,360,540].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain(),d=i*.055;o.type=i===2?'sine':'triangle';o.frequency.setValueAtTime(f,now+d);o.frequency.exponentialRampToValueAtTime(f*1.16,now+d+.12);g.gain.setValueAtTime(.0001,now+d);g.gain.exponentialRampToValueAtTime(.06,now+d+.015);g.gain.exponentialRampToValueAtTime(.0001,now+d+.18);o.connect(g).connect(c.destination);o.start(now+d);o.stop(now+d+.19)})}catch{}}
function toast(t){clearTimeout(toastTimer);els.toast.textContent=t;els.toast.classList.add('show');toastTimer=setTimeout(()=>els.toast.classList.remove('show'),1500)}
function animate(){els.answer.classList.remove('pop');els.card.classList.remove('flash');els.conch.classList.remove('burst');els.stage.classList.remove('flash');void els.answer.offsetWidth;els.answer.classList.add('pop');els.card.classList.add('flash');els.conch.classList.add('burst');els.stage.classList.add('flash')}
function ask(){const [text,cat]=chooseAnswer();els.answer.textContent=text;els.badge.textContent=cat;animate();playSound();if(els.vibrate.checked&&navigator.vibrate)navigator.vibrate([50,35,90]);if(els.tts.checked&&'speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ko-KR';u.rate=.94;u.pitch=.92;speechSynthesis.speak(u)}}

els.conch.addEventListener('click',ask);
[els.vibrate,els.sound,els.tts,els.chaos].forEach(x=>x.addEventListener('change',saveSettings));
$('#settingsBtn').onclick=()=>els.settings.showModal();
$('#shareBtn').onclick=async()=>{const t=`소라고동의 대답: ${els.answer.textContent}`;try{if(navigator.share)await navigator.share({title:'마법의 소라고동',text:t,url:location.href});else if(navigator.clipboard){await navigator.clipboard.writeText(`${t}\n${location.href}`);toast('복사했습니다.')}}catch{}};

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;els.installBtn.classList.remove('hidden')});
window.addEventListener('appinstalled',()=>{deferredPrompt=null;els.installBtn.classList.add('hidden');toast('설치가 완료되었습니다.')});
els.installBtn.onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();try{await deferredPrompt.userChoice}catch{}deferredPrompt=null;els.installBtn.classList.add('hidden')};

loadSettings();
if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{}))}
