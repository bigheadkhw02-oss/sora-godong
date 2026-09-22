const normalAnswers = [
  ["그래.","긍정"],["좋아.","긍정"],["해도 돼.","긍정"],["지금 해.","긍정"],["한번 해봐.","긍정"],
  ["오늘은 괜찮아.","긍정"],["가능성 있어.","긍정"],["그 선택, 나쁘지 않아.","긍정"],["이번엔 가도 돼.","긍정"],["망설이지 마.","긍정"],
  ["응.","긍정"],["그대로 진행해.","긍정"],["한 번쯤은 괜찮아.","긍정"],["운이 따라줄지도 몰라.","긍정"],["오늘은 네 편이야.","긍정"],
  ["안 돼.","부정"],["하지 마.","부정"],["오늘은 아니야.","부정"],["그건 접어.","부정"],["가능성은 없어.","부정"],
  ["지금은 멈춰.","부정"],["괜히 건드리지 마.","부정"],["다시 생각해.","부정"],["그 길은 아닌 것 같아.","부정"],["오늘은 참아.","부정"],
  ["아니.","부정"],["그건 좀 아니다.","부정"],["포기하는 것도 답이야.","부정"],["돈 아껴.","부정"],["지금 사면 후회할지도 몰라.","부정"],
  ["아무것도 하지 마.","보류"],["조금 기다려.","보류"],["내일 다시 물어봐.","보류"],["한 시간 뒤에 다시 생각해.","보류"],["아직 때가 아니야.","보류"],
  ["좀 더 알아보고 결정해.","보류"],["오늘 말고 다음에.","보류"],["일단 보류.","보류"],["지금 결정할 필요 없어.","보류"],["마음이 정리될 때까지 기다려.","보류"],
  ["모르겠어.","애매"],["반반이야.","애매"],["네가 이미 답을 알고 있잖아.","애매"],["왜 나한테 물어봐?", "애매"],["질문을 바꿔서 다시 물어봐.","애매"],
  ["그건 네 선택이야.","애매"],["운명에 맡겨.","애매"],["상황을 좀 더 봐.","애매"],["답이 아직 안 보여.","애매"],["이번엔 내가 침묵할게.","애매"],
  ["밥부터 먹고 생각해.","생활"],["일단 자.","생활"],["물 한 잔 마셔.","생활"],["씻고 와.","생활"],["배고프면 판단력이 흐려져.","생활"],
  ["폰 내려놔.","생활"],["충동구매 금지.","생활"],["카드값부터 확인해.","생활"],["통장 잔고 보고 결정해.","생활"],["내일 아침의 너에게 맡겨.","생활"],
  ["연락해.","관계"],["지금은 연락하지 마.","관계"],["먼저 사과해.","관계"],["답장 좀 기다려.","관계"],["그 사람도 생각할 시간이 필요해.","관계"],
  ["솔직하게 말해.","관계"],["괜히 떠보지 마.","관계"],["읽씹했다고 끝난 건 아니야.","관계"],["전화보단 문자.","관계"],["이번엔 네가 먼저 움직여.","관계"],
  ["사.","소비"],["사지 마.","소비"],["장바구니에 하루 넣어둬.","소비"],["중고부터 찾아봐.","소비"],["가격 비교부터 해.","소비"],
  ["할인할 때 사.","소비"],["필요한 거랑 갖고 싶은 걸 구분해.","소비"],["이건 오래 쓸 것 같으면 사.","소비"],["지금 가진 걸 먼저 써.","소비"],["배송비 아까우면 더 사는 건 금지.","소비"],
  ["가.","행동"],["가지 마.","행동"],["일찍 출발해.","행동"],["준비하고 나가.","행동"],["오늘은 집에 있어.","행동"],
  ["계획 없이 가도 괜찮아.","행동"],["예약부터 해.","행동"],["일단 해보고 판단해.","행동"],["첫 단계만 해.","행동"],["10분만 해봐.","행동"]
];

const chaosAnswers = [
  ["소라고동이 지금 파업 중이야.","혼돈"],["질문이 너무 인간적이야.","혼돈"],["일단 냉장고부터 열어봐.","혼돈"],["오늘의 정답은 치킨.","혼돈"],["내가 방금 못 들은 걸로 할게.","혼돈"],
  ["대답 대신 동전 던지기 추천.","혼돈"],["그건 미래의 네가 알아서 할 문제야.","혼돈"],["5분 뒤의 네 의견도 물어봐.","혼돈"],["가능은 한데 추천은 안 해.","혼돈"],["이 질문은 기록에서 삭제하고 싶다.","혼돈"],
  ["아마도. 근데 책임은 못 져.","혼돈"],["우주적 관점에서는 별일 아니야.","혼돈"],["배터리 20% 아래면 하지 마.","혼돈"],["비 오는 날이면 다시 물어봐.","혼돈"],["한 번만 더 물으면 답이 바뀔 수도 있어.","혼돈"],
  ["그냥 가위바위보 하자.","혼돈"],["너 지금 하고 싶은 거지?", "혼돈"],["이미 마음속으로 결정했잖아.","혼돈"],["소라고동은 모든 것을 알지만 말해주진 않아.","혼돈"],["질문의 상태가 이상합니다.","혼돈"]
];

const els = {
  input: document.querySelector('#questionInput'), answer: document.querySelector('#answerText'), badge: document.querySelector('#categoryBadge'),
  conch: document.querySelector('#conchBtn'), rope: document.querySelector('#rope'), history: document.querySelector('#historyList'),
  vibrate: document.querySelector('#vibrateToggle'), tts: document.querySelector('#ttsToggle'), chaos: document.querySelector('#chaosToggle')
};

let history = JSON.parse(localStorage.getItem('conchHistory') || '[]');
let startY = null, pulling = false;

function chooseAnswer(){
  const pool = els.chaos.checked ? normalAnswers.concat(chaosAnswers) : normalAnswers;
  return pool[Math.floor(Math.random()*pool.length)];
}

function askConch(){
  const q = els.input.value.trim() || '질문 없음';
  const [text, category] = chooseAnswer();
  els.answer.textContent = text;
  els.badge.textContent = category;
  els.conch.classList.remove('pull'); void els.conch.offsetWidth; els.conch.classList.add('pull');
  if (els.vibrate.checked && navigator.vibrate) navigator.vibrate([60,40,90]);
  if (els.tts.checked && 'speechSynthesis' in window){
    speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang='ko-KR'; u.rate=.95; speechSynthesis.speak(u);
  }
  history.unshift({q,a:text,t:Date.now()}); history = history.slice(0,12); localStorage.setItem('conchHistory',JSON.stringify(history)); renderHistory();
}

function renderHistory(){
  els.history.innerHTML = history.map(item => `<li>${escapeHtml(item.q)}<strong>${escapeHtml(item.a)}</strong></li>`).join('') || '<li>아직 기록이 없습니다.</li>';
}
function escapeHtml(s){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));}

els.conch.addEventListener('click', askConch);
els.conch.addEventListener('pointerdown', e=>{startY=e.clientY;pulling=true;els.conch.setPointerCapture(e.pointerId)});
els.conch.addEventListener('pointermove', e=>{if(!pulling)return; const dy=Math.max(0,Math.min(90,e.clientY-startY)); els.rope.style.height=`${90+dy}px`; els.conch.style.transform=`translateY(${dy*.18}px)`});
els.conch.addEventListener('pointerup', e=>{if(!pulling)return; const dy=e.clientY-startY; pulling=false; els.rope.style.height='90px'; els.conch.style.transform=''; if(dy>45) askConch();});

document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>els.input.value=b.dataset.q);
document.querySelector('#settingsBtn').onclick=()=>document.querySelector('#settingsDialog').showModal();
document.querySelector('#helpBtn').onclick=()=>document.querySelector('#helpDialog').showModal();
document.querySelector('#clearHistory').onclick=()=>{history=[];localStorage.removeItem('conchHistory');renderHistory()};
document.querySelector('#shareBtn').onclick=async()=>{
  const data={title:'마법의 소라고동',text:`소라고동의 대답: ${els.answer.textContent}`,url:location.href};
  try{ if(navigator.share) await navigator.share(data); else await navigator.clipboard.writeText(location.href); }catch{}
};

renderHistory();
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
