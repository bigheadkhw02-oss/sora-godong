const normalAnswers = [
  ["그래.","긍정"],["좋아.","긍정"],["해도 돼.","긍정"],["지금 해.","긍정"],["한번 해봐.","긍정"],["오늘은 괜찮아.","긍정"],["가능성 있어.","긍정"],["그 선택, 나쁘지 않아.","긍정"],["이번엔 가도 돼.","긍정"],["망설이지 마.","긍정"],["응.","긍정"],["그대로 진행해.","긍정"],["한 번쯤은 괜찮아.","긍정"],["운이 따라줄지도 몰라.","긍정"],["오늘은 네 편이야.","긍정"],["결정했으면 밀고 가.","긍정"],["이번 선택은 괜찮아 보여.","긍정"],["생각보다 잘 풀릴 거야.","긍정"],["기회가 왔을 때 잡아.","긍정"],["오늘은 해볼 만해.","긍정"],
  ["안 돼.","부정"],["하지 마.","부정"],["오늘은 아니야.","부정"],["그건 접어.","부정"],["가능성은 없어.","부정"],["지금은 멈춰.","부정"],["괜히 건드리지 마.","부정"],["다시 생각해.","부정"],["그 길은 아닌 것 같아.","부정"],["오늘은 참아.","부정"],["아니.","부정"],["그건 좀 아니다.","부정"],["포기하는 것도 답이야.","부정"],["돈 아껴.","부정"],["지금 사면 후회할지도 몰라.","부정"],["오늘은 위험 부담이 커.","부정"],["굳이 지금 할 필요 없어.","부정"],["한 번 더 생각하고 접어.","부정"],["이번엔 지나치는 게 나아.","부정"],["왠지 느낌이 안 좋아.","부정"],
  ["아무것도 하지 마.","보류"],["조금 기다려.","보류"],["내일 다시 물어봐.","보류"],["한 시간 뒤에 다시 생각해.","보류"],["아직 때가 아니야.","보류"],["좀 더 알아보고 결정해.","보류"],["오늘 말고 다음에.","보류"],["일단 보류.","보류"],["지금 결정할 필요 없어.","보류"],["마음이 정리될 때까지 기다려.","보류"],["조금 더 지켜봐.","보류"],["정보가 더 필요해.","보류"],["오늘 결론 내리지 마.","보류"],["급하게 정하면 꼬일 수 있어.","보류"],["일단 한 발 물러나.","보류"],
  ["모르겠어.","애매"],["반반이야.","애매"],["네가 이미 답을 알고 있잖아.","애매"],["왜 나한테 물어봐?","애매"],["질문을 바꿔서 다시 물어봐.","애매"],["그건 네 선택이야.","애매"],["운명에 맡겨.","애매"],["상황을 좀 더 봐.","애매"],["답이 아직 안 보여.","애매"],["이번엔 내가 침묵할게.","애매"],["마음 가는 쪽으로 해.","애매"],["어느 쪽이든 큰 차이는 없어.","애매"],["지금 답을 정하기엔 애매해.","애매"],["첫 느낌을 믿어봐.","애매"],["동전 던지기 직전까지 고민해봐.","애매"],
  ["밥부터 먹고 생각해.","생활"],["일단 자.","생활"],["물 한 잔 마셔.","생활"],["씻고 와.","생활"],["배고프면 판단력이 흐려져.","생활"],["폰 내려놔.","생활"],["충동구매 금지.","생활"],["카드값부터 확인해.","생활"],["통장 잔고 보고 결정해.","생활"],["내일 아침의 너에게 맡겨.","생활"],["오늘 할 일부터 끝내.","생활"],["커피 한 잔 하고 다시 생각해.","생활"],["잠깐 산책하고 와.","생활"],["지금 피곤하면 결정하지 마.","생활"],["해야 할 것부터 하고 해.","생활"],
  ["연락해.","관계"],["지금은 연락하지 마.","관계"],["먼저 사과해.","관계"],["답장 좀 기다려.","관계"],["그 사람도 생각할 시간이 필요해.","관계"],["솔직하게 말해.","관계"],["괜히 떠보지 마.","관계"],["읽씹했다고 끝난 건 아니야.","관계"],["전화보단 문자.","관계"],["이번엔 네가 먼저 움직여.","관계"],["말 돌리지 말고 본론부터.","관계"],["감정 정리하고 이야기해.","관계"],["한 번쯤 먼저 손 내밀어봐.","관계"],["오늘은 그냥 들어줘.","관계"],["기대치를 조금 낮춰.","관계"],
  ["사.","소비"],["사지 마.","소비"],["장바구니에 하루 넣어둬.","소비"],["중고부터 찾아봐.","소비"],["가격 비교부터 해.","소비"],["할인할 때 사.","소비"],["필요한 거랑 갖고 싶은 걸 구분해.","소비"],["이건 오래 쓸 것 같으면 사.","소비"],["지금 가진 걸 먼저 써.","소비"],["배송비 아까우면 더 사는 건 금지.","소비"],["이번 달 예산 안이면 사.","소비"],["비슷한 거 이미 있으면 사지 마.","소비"],["리뷰 세 개만 더 보고 사.","소비"],["급하지 않으면 세일을 기다려.","소비"],["한 달 뒤에도 원하면 사.","소비"],
  ["가.","행동"],["가지 마.","행동"],["일찍 출발해.","행동"],["준비하고 나가.","행동"],["오늘은 집에 있어.","행동"],["계획 없이 가도 괜찮아.","행동"],["예약부터 해.","행동"],["일단 해보고 판단해.","행동"],["첫 단계만 해.","행동"],["10분만 해봐.","행동"],["오늘 끝내버려.","행동"],["작게 시작해.","행동"],["미루지 말고 지금 하나만 해.","행동"],["준비가 70%면 출발해.","행동"],["이번엔 직접 부딪혀봐.","행동"]
];

const chaosAnswers = [
  ["소라고동이 지금 파업 중이야.","혼돈"],["질문이 너무 인간적이야.","혼돈"],["일단 냉장고부터 열어봐.","혼돈"],["오늘의 정답은 치킨.","혼돈"],["내가 방금 못 들은 걸로 할게.","혼돈"],["대답 대신 동전 던지기 추천.","혼돈"],["그건 미래의 네가 알아서 할 문제야.","혼돈"],["5분 뒤의 네 의견도 물어봐.","혼돈"],["가능은 한데 추천은 안 해.","혼돈"],["이 질문은 기록에서 삭제하고 싶다.","혼돈"],["아마도. 근데 책임은 못 져.","혼돈"],["우주적 관점에서는 별일 아니야.","혼돈"],["배터리 20% 아래면 하지 마.","혼돈"],["비 오는 날이면 다시 물어봐.","혼돈"],["한 번만 더 물으면 답이 바뀔 수도 있어.","혼돈"],["그냥 가위바위보 하자.","혼돈"],["너 지금 하고 싶은 거지?","혼돈"],["이미 마음속으로 결정했잖아.","혼돈"],["소라고동은 모든 것을 알지만 말해주진 않아.","혼돈"],["질문의 상태가 이상합니다.","혼돈"],["와이파이 신호가 약해서 답이 흐려.","혼돈"],["이건 소라고동 관할이 아니야.","혼돈"],["지금 답하면 세계선이 바뀔 수 있어.","혼돈"],["일단 새로고침 말고 인생부터 정리해.","혼돈"],["그 질문은 다음 업데이트에 답해줄게.","혼돈"]
];

const els = {
  input: document.querySelector('#questionInput'),
  answer: document.querySelector('#answerText'),
  answerCard: document.querySelector('#answerCard'),
  badge: document.querySelector('#categoryBadge'),
  conch: document.querySelector('#conchBtn'),
  pullCord: document.querySelector('#pullCord'),
  rope: document.querySelector('.rope'),
  knob: document.querySelector('.pull-knob'),
  clearQuestion: document.querySelector('#clearQuestion'),
  vibrate: document.querySelector('#vibrateToggle'),
  sound: document.querySelector('#soundToggle'),
  tts: document.querySelector('#ttsToggle'),
  chaos: document.querySelector('#chaosToggle'),
  toast: document.querySelector('#toast')
};

const settingsKey = 'magicConchSettingsV3';
let startY = 0;
let pulling = false;
let lastAnswer = '';
let toastTimer;
let audioCtx;

function loadSettings(){
  try{
    const saved = JSON.parse(localStorage.getItem(settingsKey) || '{}');
    if(typeof saved.vibrate === 'boolean') els.vibrate.checked = saved.vibrate;
    if(typeof saved.sound === 'boolean') els.sound.checked = saved.sound;
    if(typeof saved.tts === 'boolean') els.tts.checked = saved.tts;
    if(typeof saved.chaos === 'boolean') els.chaos.checked = saved.chaos;
  }catch{}
}

function saveSettings(){
  localStorage.setItem(settingsKey, JSON.stringify({
    vibrate: els.vibrate.checked,
    sound: els.sound.checked,
    tts: els.tts.checked,
    chaos: els.chaos.checked
  }));
}

function chooseAnswer(){
  const pool = els.chaos.checked ? normalAnswers.concat(chaosAnswers) : normalAnswers;
  let picked = pool[Math.floor(Math.random() * pool.length)];
  if(pool.length > 1 && picked[0] === lastAnswer){
    picked = pool[(pool.indexOf(picked) + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length];
  }
  lastAnswer = picked[0];
  return picked;
}

function getAudioContext(){
  if(!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playPullSound(){
  if(!els.sound.checked) return;
  try{
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(210, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + .16);
    gain.gain.setValueAtTime(.0001, now);
    gain.gain.exponentialRampToValueAtTime(.07, now + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, now + .18);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now); osc.stop(now + .2);
  }catch{}
}

function playAnswerSound(){
  if(!els.sound.checked) return;
  try{
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    [0, .07, .14].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 2 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime([330, 415, 520][i], now + delay);
      gain.gain.setValueAtTime(.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(.055, now + delay + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, now + delay + .12);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + delay); osc.stop(now + delay + .13);
    });
  }catch{}
}

function showToast(text){
  clearTimeout(toastTimer);
  els.toast.textContent = text;
  els.toast.classList.add('show');
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 1500);
}

function animateAnswer(){
  els.answer.classList.remove('pop');
  els.answerCard.classList.remove('flash');
  void els.answer.offsetWidth;
  els.answer.classList.add('pop');
  els.answerCard.classList.add('flash');
}

function askConch(){
  const [text, category] = chooseAnswer();
  els.answer.textContent = text;
  els.badge.textContent = category;
  animateAnswer();

  els.conch.classList.remove('pull');
  void els.conch.offsetWidth;
  els.conch.classList.add('pull');

  playAnswerSound();

  if(els.vibrate.checked && navigator.vibrate){
    navigator.vibrate([45, 32, 75]);
  }

  if(els.tts.checked && 'speechSynthesis' in window){
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = .94;
    u.pitch = .92;
    speechSynthesis.speak(u);
  }
}

function setCordPull(dy){
  const amount = Math.max(0, Math.min(100, dy));
  els.rope.style.transition = 'none';
  els.knob.style.transition = 'none';
  els.rope.style.height = `${74 + amount}px`;
  els.knob.style.transform = `translateY(${amount}px)`;
  els.pullCord.setAttribute('aria-valuenow', String(Math.round(amount)));
  els.pullCord.classList.toggle('ready', amount >= 52);
}

function resetCord(){
  els.rope.style.transition = '';
  els.knob.style.transition = '';
  els.rope.style.height = '74px';
  els.knob.style.transform = 'translateY(0px)';
  els.pullCord.setAttribute('aria-valuenow', '0');
  els.pullCord.classList.remove('ready');
}

function updateClearButton(){
  els.clearQuestion.classList.toggle('show', els.input.value.length > 0);
}

els.conch.addEventListener('click', askConch);
els.pullCord.addEventListener('pointerdown', e => {
  startY = e.clientY;
  pulling = true;
  playPullSound();
  els.pullCord.setPointerCapture(e.pointerId);
});
els.pullCord.addEventListener('pointermove', e => {
  if(!pulling) return;
  setCordPull(e.clientY - startY);
});
els.pullCord.addEventListener('pointerup', e => {
  if(!pulling) return;
  const dy = e.clientY - startY;
  pulling = false;
  resetCord();
  if(dy >= 52) askConch();
});
els.pullCord.addEventListener('pointercancel', () => { pulling = false; resetCord(); });
els.pullCord.addEventListener('keydown', e => {
  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); askConch(); }
});

els.input.addEventListener('input', updateClearButton);
els.clearQuestion.addEventListener('click', () => {
  els.input.value = '';
  updateClearButton();
  els.input.focus();
});

document.querySelectorAll('.chip').forEach(b => {
  b.addEventListener('click', () => {
    els.input.value = b.dataset.q;
    updateClearButton();
  });
});

[els.vibrate, els.sound, els.tts, els.chaos].forEach(el => el.addEventListener('change', saveSettings));

document.querySelector('#settingsBtn').onclick = () => document.querySelector('#settingsDialog').showModal();
document.querySelector('#helpBtn').onclick = () => document.querySelector('#helpDialog').showModal();
document.querySelector('#shareBtn').onclick = async () => {
  const q = els.input.value.trim();
  const text = q ? `질문: ${q}\n소라고동의 대답: ${els.answer.textContent}` : `소라고동의 대답: ${els.answer.textContent}`;
  const data = { title:'마법의 소라고동', text, url:location.href };
  try{
    if(navigator.share){ await navigator.share(data); }
    else if(navigator.clipboard){ await navigator.clipboard.writeText(`${text}\n${location.href}`); showToast('복사했습니다.'); }
  }catch{}
};

loadSettings();
updateClearButton();
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
