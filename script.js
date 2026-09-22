const answerPools = {
  all: [
    ["그래.","긍정"],["좋아.","긍정"],["해도 돼.","긍정"],["지금 해.","긍정"],["망설이지 마.","긍정"],
    ["안 돼.","부정"],["하지 마.","부정"],["오늘은 아니야.","부정"],["다시 생각해.","부정"],["이번엔 패스해.","부정"],
    ["조금 기다려.","보류"],["아직 때가 아니야.","보류"],["일단 보류.","보류"],["타이밍을 기다려.","보류"],
    ["반반이야.","애매"],["첫 느낌을 믿어봐.","애매"],["네가 이미 답을 알고 있잖아.","애매"],["그건 네 선택이야.","애매"]
  ],
  love: [
    ["연락해.","연애"],["지금은 연락하지 마.","연애"],["먼저 사과해.","연애"],["답장 좀 기다려.","연애"],["솔직하게 말해.","연애"],
    ["괜히 떠보지 마.","연애"],["전화보단 문자.","연애"],["이번엔 네가 먼저 움직여.","연애"],["그 사람도 생각할 시간이 필요해.","연애"],["밀당하지 마.","연애"],
    ["오늘은 만나도 돼.","연애"],["조금 더 지켜봐.","연애"],["감정부터 정리해.","연애"],["기대치를 조금 낮춰.","연애"],["답은 대화 안에 있어.","연애"]
  ],
  money: [
    ["사.","돈·소비"],["사지 마.","돈·소비"],["장바구니에 하루 넣어둬.","돈·소비"],["중고부터 찾아봐.","돈·소비"],["가격 비교부터 해.","돈·소비"],
    ["할인할 때 사.","돈·소비"],["통장 잔고 보고 결정해.","돈·소비"],["카드값부터 확인해.","돈·소비"],["비슷한 거 이미 있으면 사지 마.","돈·소비"],["한 달 뒤에도 원하면 사.","돈·소비"],
    ["이번 달 예산 안이면 사.","돈·소비"],["지금은 현금 지켜.","돈·소비"],["필요한 거면 사.","돈·소비"],["욕심이면 멈춰.","돈·소비"],["세일을 기다려.","돈·소비"]
  ],
  work: [
    ["그대로 진행해.","일·결정"],["지금 결정해.","일·결정"],["한 번 더 검토해.","일·결정"],["오늘은 보류해.","일·결정"],["첫 번째 선택이 낫다.","일·결정"],
    ["리스크를 줄여.","일·결정"],["자료부터 더 모아.","일·결정"],["지금 밀어붙여도 돼.","일·결정"],["오늘은 타이밍이 아니야.","일·결정"],["결정하고 움직여.","일·결정"],
    ["혼자 결정하지 마.","일·결정"],["마감부터 끝내.","일·결정"],["우선순위부터 정해.","일·결정"],["작게 테스트해봐.","일·결정"],["이번엔 직감을 믿어.","일·결정"]
  ],
  life: [
    ["밥부터 먹고 생각해.","생활"],["일단 자.","생활"],["물 한 잔 마셔.","생활"],["폰 내려놔.","생활"],["잠깐 산책하고 와.","생활"],
    ["지금 피곤하면 결정하지 마.","생활"],["오늘 할 일부터 끝내.","생활"],["씻고 와.","생활"],["내일 아침의 너에게 맡겨.","생활"],["조금 쉬었다 해.","생활"],
    ["오늘은 무리하지 마.","생활"],["지금은 집에 있어.","생활"],["밖에 나가도 좋아.","생활"],["커피 한 잔 하고 다시 생각해.","생활"],["오늘은 일찍 자.","생활"]
  ],
  action: [
    ["가.","행동"],["가지 마.","행동"],["일찍 출발해.","행동"],["예약부터 해.","행동"],["일단 해보고 판단해.","행동"],
    ["첫 단계만 해.","행동"],["10분만 해봐.","행동"],["오늘 끝내버려.","행동"],["작게 시작해.","행동"],["미루지 말고 지금 하나만 해.","행동"],
    ["준비가 70%면 출발해.","행동"],["오늘은 집에 있어.","행동"],["이번엔 직접 부딪혀봐.","행동"],["준비하고 나가.","행동"],["지금 움직여.","행동"]
  ]
};

const chaosAnswers = [
  ["소라고동이 지금 파업 중이야.","혼돈"],["오늘의 정답은 치킨.","혼돈"],["대답 대신 동전 던지기 추천.","혼돈"],["아마도. 근데 책임은 못 져.","혼돈"],["정답은 있지만 비공개야.","혼돈"],["이미 마음속으로 결정했잖아.","혼돈"]
];

const topicLabels={all:'전체',love:'연애',money:'돈·소비',work:'일·결정',life:'생활',action:'행동'};
const $=s=>document.querySelector(s);
const els={conch:$('#conchBtn'),stage:$('.stage'),answer:$('#answerText'),card:$('#answerCard'),badge:$('#categoryBadge'),vibrate:$('#vibrateToggle'),sound:$('#soundToggle'),tts:$('#ttsToggle'),chaos:$('#chaosToggle'),settings:$('#settingsDialog'),installBtn:$('#installBtn'),toast:$('#toast')};
const settingsKey='magicConchSettingsV7';
let lastAnswer='';let toastTimer;let audioCtx;let deferredPrompt=null;let currentTopic='all';

function loadSettings(){try{const s=JSON.parse(localStorage.getItem(settingsKey)||'{}');['vibrate','sound','tts','chaos'].forEach(k=>{if(typeof s[k]==='boolean')els[k].checked=s[k]});if(s.topic&&answerPools[s.topic])selectTopic(s.topic,false)}catch{}}
function saveSettings(){localStorage.setItem(settingsKey,JSON.stringify({vibrate:els.vibrate.checked,sound:els.sound.checked,tts:els.tts.checked,chaos:els.chaos.checked,topic:currentTopic}))}
function selectTopic(topic,announce=true){currentTopic=topic;document.querySelectorAll('.topic-chip').forEach(b=>b.classList.toggle('active',b.dataset.topic===topic));els.badge.textContent=topicLabels[topic];if(announce)toast(`${topicLabels[topic]} 주제로 설정`);saveSettings()}
function chooseAnswer(){let pool=[...(answerPools[currentTopic]||answerPools.all)];if(els.chaos.checked)pool=pool.concat(chaosAnswers);let pick=pool[Math.floor(Math.random()*pool.length)];if(pool.length>1&&pick[0]===lastAnswer)pick=pool[(pool.indexOf(pick)+1+Math.floor(Math.random()*(pool.length-1)))%pool.length];lastAnswer=pick[0];return pick}
function ctx(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();return audioCtx}
function playSound(){if(!els.sound.checked)return;try{const c=ctx(),now=c.currentTime;[260,390,585].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain(),d=i*.055;o.type=i===2?'sine':'triangle';o.frequency.setValueAtTime(f,now+d);o.frequency.exponentialRampToValueAtTime(f*1.17,now+d+.12);g.gain.setValueAtTime(.0001,now+d);g.gain.exponentialRampToValueAtTime(.06,now+d+.015);g.gain.exponentialRampToValueAtTime(.0001,now+d+.18);o.connect(g).connect(c.destination);o.start(now+d);o.stop(now+d+.19)})}catch{}}
function toast(t){clearTimeout(toastTimer);els.toast.textContent=t;els.toast.classList.add('show');toastTimer=setTimeout(()=>els.toast.classList.remove('show'),1400)}
function animate(){els.answer.classList.remove('pop');els.card.classList.remove('flash');els.conch.classList.remove('burst');els.stage.classList.remove('flash');void els.answer.offsetWidth;els.answer.classList.add('pop');els.card.classList.add('flash');els.conch.classList.add('burst');els.stage.classList.add('flash')}
function ask(){const[text,cat]=chooseAnswer();els.answer.textContent=text;els.badge.textContent=cat;animate();playSound();if(els.vibrate.checked&&navigator.vibrate)navigator.vibrate([50,35,90]);if(els.tts.checked&&'speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='ko-KR';u.rate=.94;u.pitch=.92;speechSynthesis.speak(u)}}

els.conch.addEventListener('click',ask);
document.querySelectorAll('.topic-chip').forEach(b=>b.addEventListener('click',()=>selectTopic(b.dataset.topic)));
[els.vibrate,els.sound,els.tts,els.chaos].forEach(x=>x.addEventListener('change',saveSettings));
$('#settingsBtn').onclick=()=>els.settings.showModal();
$('#shareBtn').onclick=async()=>{const t=`[${topicLabels[currentTopic]}] 소라고동의 대답: ${els.answer.textContent}`;try{if(navigator.share)await navigator.share({title:'마법의 소라고동',text:t,url:location.href});else if(navigator.clipboard){await navigator.clipboard.writeText(`${t}\n${location.href}`);toast('복사했습니다.')}}catch{}};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;els.installBtn.classList.remove('hidden')});window.addEventListener('appinstalled',()=>{deferredPrompt=null;els.installBtn.classList.add('hidden');toast('설치가 완료되었습니다.')});els.installBtn.onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();try{await deferredPrompt.userChoice}catch{}deferredPrompt=null;els.installBtn.classList.add('hidden')};
loadSettings();
if('serviceWorker'in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{}))}
