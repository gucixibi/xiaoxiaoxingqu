const petTypes = {
  fox: {species:'小狐狸',name:'栗栗',icon:'🦊',color:'#eaa363',voice:'嘤嘤～',trait:'好奇又机灵，喜欢陪你发现新知识'},
  cat: {species:'小猫咪',name:'糯米',icon:'🐱',color:'#c6b4d8',voice:'喵呜～',trait:'温柔又专注，喜欢安静地陪你读书'},
  rabbit: {species:'小兔子',name:'团团',icon:'🐰',color:'#e9c2b7',voice:'蹦蹦～',trait:'活泼又热心，想和你一起挑战难题'},
  dog: {species:'小狗狗',name:'布丁',icon:'🐶',color:'#d8b57e',voice:'汪汪～',trait:'勇敢又忠诚，每一点进步都为你欢呼'},
  panda: {species:'熊猫',name:'竹竹',icon:'🐼',color:'#e7e7df',voice:'嗯嗯～',trait:'慢慢来不着急，认真思考就是进步'},
  dragon: {species:'小恐龙',name:'豆豆',icon:'🦖',color:'#a8bc8b',voice:'嗷呜～',trait:'想象力满满，和你一起探索大世界'}
};
let petReaction=null,petReactionTimer;
function initPets(){
  if(!petTypes[state.activePet])state.activePet='fox';
  if(!state.pets||typeof state.pets!=='object')state.pets={};
  if(!state.pets[state.activePet])state.pets[state.activePet]={name:state.pet,xp:state.xp,energy:state.energy,joy:state.joy};
  for(const [id,p] of Object.entries(petTypes))if(!state.pets[id])state.pets[id]={name:p.name,xp:0,energy:60,joy:70};
  if(!state.petChats||typeof state.petChats!=='object')state.petChats={};
  loadPet();
}
function syncPet(){if(state.pets&&state.activePet)state.pets[state.activePet]={name:state.pet,xp:state.xp,energy:state.energy,joy:state.joy}}
function loadPet(){const p=state.pets[state.activePet];state.pet=p.name;state.xp=p.xp;state.energy=p.energy;state.joy=p.joy}
function choosePet(id){if(!petTypes[id])return;syncPet();state.activePet=id;loadPet();petReaction=null;clearTimeout(petReactionTimer);save();render();toast(`${state.pet}来陪你学习啦！`)}
function basePetArt(id=state.activePet){
  if(id==='fox')return fox.replace('伴学小狐狸栗栗','小狐狸伙伴');
  const p=petTypes[id],c=p.color;
  let ears='',extras='',face='';
  if(id==='cat'){ears=`<path d="M53 78L43 24L88 52M112 52L157 24L147 78" fill="${c}" stroke="#aa95be" stroke-width="2"/><path d="M57 57L53 38L72 54M128 54L147 38L143 57" fill="#e7b5b7"/>`;extras='<path d="M141 158Q182 163 168 120" fill="none" stroke="#c6b4d8" stroke-width="17" stroke-linecap="round"/>';face='<path d="M47 103L27 97M48 110L27 113M153 103L173 97M152 110L173 113" stroke="#947ca5" stroke-width="2"/>'}
  if(id==='rabbit')ears=`<ellipse cx="74" cy="43" rx="17" ry="40" fill="${c}" transform="rotate(-12 74 43)"/><ellipse cx="126" cy="43" rx="17" ry="40" fill="${c}" transform="rotate(12 126 43)"/><ellipse cx="74" cy="38" rx="8" ry="25" fill="#f5ddd1"/><ellipse cx="126" cy="38" rx="8" ry="25" fill="#f5ddd1"/>`;
  if(id==='dog')ears='<path d="M62 58Q28 45 30 104Q35 120 57 104M138 58Q172 45 170 104Q165 120 143 104" fill="#a88351"/>';
  if(id==='panda'){ears='<circle cx="60" cy="57" r="23" fill="#65705f"/><circle cx="140" cy="57" r="23" fill="#65705f"/>';face='<ellipse cx="73" cy="90" rx="17" ry="20" fill="#65705f" transform="rotate(25 73 90)"/><ellipse cx="127" cy="90" rx="17" ry="20" fill="#65705f" transform="rotate(-25 127 90)"/>'}
  if(id==='dragon'){ears='<path d="M69 60L77 23L94 53L110 18L123 55L145 39L143 79" fill="#829d62"/>';extras='<path d="M132 160Q179 169 180 118L163 130L162 115L147 139" fill="#a8bc8b"/>';face='<circle cx="53" cy="103" r="5" fill="#d1dfa9"/><circle cx="147" cy="103" r="5" fill="#d1dfa9"/>'}
  return `<svg class="fox animal-${id}" viewBox="0 0 200 200" role="img" aria-label="${p.species}伙伴"><ellipse cx="100" cy="181" rx="52" ry="7" fill="#d8caac" opacity=".3"/>${extras}<ellipse cx="100" cy="147" rx="37" ry="34" fill="${c}"/><ellipse cx="100" cy="151" rx="22" ry="26" fill="#fff5e0"/>${ears}<ellipse cx="100" cy="91" rx="56" ry="47" fill="${c}"/>${id==='dog'?'<ellipse cx="100" cy="108" rx="28" ry="21" fill="#fff0d2"/>':''}${face}<path d="M64 89Q72 81 80 89M120 89Q128 81 136 89" stroke="${id==='panda'?'#fff9e9':'#544b40'}" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="100" cy="105" rx="6" ry="4" fill="#544b40"/><path d="M100 109V115M92 115Q100 124 108 115" fill="none" stroke="#544b40" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="59" cy="103" rx="8" ry="4" fill="#df9f92" opacity=".5"/><ellipse cx="141" cy="103" rx="8" ry="4" fill="#df9f92" opacity=".5"/><path d="M74 130L100 139L126 130L121 145L99 147L78 142Z" fill="#7f9664"/><path d="M73 143L63 155M127 143L137 155" stroke="${c}" stroke-width="12" stroke-linecap="round"/><ellipse cx="82" cy="177" rx="13" ry="7" fill="${c}"/><ellipse cx="118" cy="177" rx="13" ry="7" fill="${c}"/></svg>`;
}
function petCard(large=false){
  const p=petTypes[state.activePet],r=petReaction;
  return `<section class="pet-card ${large?'pet-large':''}"><div class="pet-head"><h3>我的伴学伙伴</h3><button class="text-button" data-page="pet">${large?'选择下方伙伴 ↓':'切换伙伴 ⇄'}</button></div><button class="pet-stage pet-touch ${r?'react-'+r.action:''}" data-action="pet-touch" aria-label="摸摸${esc(state.pet)}">${petArt()}${r?`<span class="reaction-prop" aria-hidden="true">${r.icon}</span>`:''}</button><p class="pet-name">${esc(state.pet)} <small>Lv.${1+Math.floor(state.xp/50)}</small></p><p class="pet-species">${p.icon} ${p.species} · ${state.energy>=40?'元气满满':'需要休息'}</p><p class="pet-quote" role="status">“${r?esc(r.text):state.daily.sessions?'和你一起学习，是最开心的事！':'点点我，和我打个招呼吧！'}”</p><div class="meter-label"><span>♡ 成长值</span><span>${state.xp%50} / 50</span></div><div class="meter"><i style="width:${state.xp%50*2}%"></i></div><div class="meter-label"><span>ϟ 活力值</span><span>${state.energy} / 100</span></div><div class="meter energy"><i style="width:${state.energy}%"></i></div><div class="meter-label"><span>♡ 亲密度</span><span>${state.joy} / 100</span></div><div class="meter"><i style="width:${state.joy}%"></i></div>${petEconomyPanel()}<div class="pet-actions"><button data-action="feed">🥕 喂背包零食</button><button data-action="play">♡ 摸摸脑袋</button><button data-action="pet-ball">⚽ 一起玩球</button><button data-action="pet-rest">☾ 休息一下</button><button data-action="pet-highfive">✋ 击掌</button><button data-action="pet-hug">💗 抱抱</button><button data-action="pet-dance">🎵 跳个舞</button></div><p class="pet-note">点击伙伴也可以互动 · 每只伙伴独立成长</p></section>`;
}
function petsPage(){return title('选一位伙伴，一起长大','六种伙伴都可以自由选择、单独取名；切换后仍会记得你们的成长。')+`<div class="pet-room"><div>${petCard(true)}<form class="pet-rename" id="pet-rename"><label for="pet-name-input">给${petTypes[state.activePet].species}取个名字</label><div><input id="pet-name-input" name="petName" maxlength="10" required value="${esc(state.pet)}"><button class="primary" type="submit">保存名字</button></div></form></div><section class="pet-collection"><div class="section-head"><h3>伙伴图鉴 <small>6 位好朋友</small></h3><span class="badge">✦ ${state.stars} 学习积分</span></div><div class="pet-choices">${Object.entries(petTypes).map(([id,p])=>{const saved=state.pets[id],active=id===state.activePet;return `<button class="pet-choice ${active?'selected':''}" data-pet="${id}" aria-pressed="${active}"><span class="pet-thumb">${petArt(id)}</span><strong>${esc(saved.name)}</strong><span>${p.species} · Lv.${1+Math.floor(saved.xp/50)}</span><em>${active?'✓ 正在伴学':'选择伙伴'}</em></button>`}).join('')}</div><div class="pet-personality"><strong>${petTypes[state.activePet].icon} ${esc(state.pet)}的小档案</strong><p>${petTypes[state.activePet].trait}。</p><p>摸摸 +5 亲密度；玩球消耗 10 活力、+10 亲密度；休息 +15 活力；零食效果见背包。学习获得的成长值属于当前伙伴；也可以用积分特训升级。</p></div></section></div>${petChatPanel()}`}
function interactPet(action){
  const voice=petTypes[state.activePet].voice;
  if(action==='feed'){return quickFeed()}
  if(action==='pet-ball'){
    if(state.energy<10){reactPet('rest','☾',`${voice}有点累啦，先休息一下再玩球吧。`);return}
    state.energy-=10;state.joy=Math.min(100,state.joy+10);reactPet('ball','⚽',`${voice}接到球啦！活力 −10，亲密度 +10。`);
  }else if(action==='pet-rest'){
    const gain=Math.min(15,100-state.energy);state.energy+=gain;reactPet('rest','💤',gain?`${voice}伸个懒腰，活力 +${gain}！你也看看远处吧。`:`${voice}已经精神满满啦！陪你安静待一会儿。`);
  }else {state.joy=Math.min(100,state.joy+5);reactPet('touch','💕',`${voice}最喜欢你摸摸我的脑袋！亲密度 +5。`)}
  save();
}
function reactPet(action,icon,text){clearTimeout(petReactionTimer);petReaction={action,icon,text};render();paintPetReaction(action,icon,text);petReactionTimer=setTimeout(()=>{clearPetMotion();document.querySelectorAll('.pet-quote').forEach(el=>el.textContent='“谢谢你陪我，一起慢慢长大吧！”')},2800)}
document.addEventListener('submit',e=>{if(e.target.id!=='pet-rename')return;e.preventDefault();const name=new FormData(e.target).get('petName').trim();if(!name){toast('给伙伴取个名字吧');return}state.pet=name;save();render();toast('伙伴记住自己的新名字啦！')});

function petChatPanel(){const rows=state.petChats[state.activePet]||[];return `<section class="pet-chat"><div class="section-head"><h3>${petTypes[state.activePet].icon} 和${esc(state.pet)}聊聊天</h3><span class="badge">内置知识对话</span></div><p class="chat-scope">可以聊心情、学习进度、简单加减乘除，以及课程内的英语与汉字。当前使用内置回复，尚未连接 AI；对话只保存在本浏览器。</p><div class="chat-log" role="log" aria-label="宠物对话记录" aria-live="polite"><div class="chat-message pet"><b>${esc(state.pet)}</b><p>${petTypes[state.activePet].voice}我是你的${petTypes[state.activePet].species}伙伴！今天想聊什么？试试问我“8+5等于多少”或“am和is怎么用”。</p></div>${rows.map((m,i)=>`<div class="chat-message ${m.role}"><b>${m.role==='user'?'我':esc(state.pet)}</b><p>${esc(m.text)}</p>${m.role==='pet'?`<button class="text-button" data-chat-read="${i}" aria-label="朗读这条回复">♫ 听回复</button>`:''}</div>`).join('')}</div><div class="chat-prompts">${['你好呀','我今天学得怎么样','我有点难过','8+5等于多少','am和is怎么用','陪我学汉字'].map(t=>`<button data-chat-prompt="${t}">${t}</button>`).join('')}</div><form id="pet-chat-form"><label class="sr-only" for="pet-chat-input">想和宠物说的话</label><input id="pet-chat-input" name="message" autocomplete="off" maxlength="200" placeholder="和伙伴说句话，或问个小问题…" required><button class="primary" type="submit">发送 ↗</button></form></section>`}
function petReply(raw){const t=raw.trim(),voice=petTypes[state.activePet].voice;
  const poem=typeof poems!=='undefined'?poems.find(p=>t.includes(p.title)||p.lines.some(line=>t.includes(line.replace(/[，。]/g,'')))):null;if(poem)return `${voice}《${poem.title}》是${poem.author}写的。${poem.lines.join('')} ${poem.meaning} 可以到诗词小天地一起听读！`;if(/古诗|诗词|背诗/.test(t))return `${voice}我们从《静夜思》开始吧：床前明月光，疑是地上霜。举头望明月，低头思故乡。这是李白写的思乡诗，你也可以到诗词小天地听读。`;if(/难过|伤心|不开心|害怕|孤单|紧张/.test(t))return `${voice}我在这里陪你。可以慢慢说说发生了什么，也可以找爸爸妈妈或信任的老师聊一聊。先一起深呼吸，再做一件喜欢的小事吧。`;
  if(/学得|进度|多少星|几颗星|成绩/.test(t))return `${voice}你今天完成了 ${state.daily.sessions} 组练习，答对 ${state.daily.correct} 题，现在有 ${state.stars} 学习积分。每一点努力，我都看见啦！`;
  if(/名字|你是谁/.test(t))return `${voice}我叫${state.pet}，是陪你学习的${petTypes[state.activePet].species}！你可以在上面给我改名字。`;
  if(/你好|hello|hi\b|早上好/i.test(t))return `${voice}你好，${state.name}！见到你真开心。想先聊聊心情，还是一起学点新知识？`;
  const math=t.replace(/加上?|＋/g,'+').replace(/减去?|－/g,'-').replace(/乘以?|×|x/g,'*').replace(/除以|÷/g,'/').match(/(-?\d+(?:\.\d+)?)\s*([+*/-])\s*(-?\d+(?:\.\d+)?)/);
  if(math){const a=Number(math[1]),b=Number(math[3]),op=math[2];if(op==='/'&&b===0)return '这个问题有个小秘密：0 不能作除数。换个不为 0 的除数再试试吧！';const result=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;return `${voice}${a} ${op==='*'?'×':op==='/'?'÷':op} ${b} = ${Number(result.toFixed(6))}。${op==='+'?'加法就是把数量合在一起。':op==='-'?'减法可以想成从原来的数量里拿走一部分。':op==='*'?'乘法可以看作相同数量反复相加。':'除法可以想成把数量平均分。'}再给我一个小算式吧！`}
  if(/am|\bis\b|\bare\b|be动词/i.test(t))return 'I 用 am；he、she、it 或单数用 is；you、we、they 或复数用 are。比如：I am happy. She is kind. We are friends. 你能用 I am 说一句话吗？';
  if(/\ban\b|冠词|a和an/i.test(t))return 'a 和 an 都能表示“一个”。辅音音素前用 a，如 a book；元音音素前用 an，如 an apple。注意看开头的发音哦！';
  if(/现在时|likes|plays/i.test(t))return '一般现在时可以描述经常做的事情。I like apples. 当主语是 he、she、it 时，动词常要变化，比如 She likes apples. 一起来“英语语法”练习吧！';
  const words={日:'“日”读 rì，意思是太阳，也可以表示一天。组词：日出、日光。',月:'“月”读 yuè，组词：月亮、月光。',山:'“山”读 shān，一共三画：竖、竖折、竖。',水:'“水”读 shuǐ，第三声。组词：河水、水果。',木:'“木”读 mù。两个木组成“林”，三个木组成“森”。',花:'“花”读 huā，第一声，组词：花朵、鲜花。',鸟:'“鸟”读 niǎo，第三声，组词：小鸟、鸟儿。',火:'“火”读 huǒ，第三声，组词：火苗、火光。'};
  if(/汉字|拼音|怎么读|组词|[日月山水木花鸟火]/.test(t)){const key=Object.keys(words).find(k=>t.includes(k));return key?`${voice}${words[key]}`:'我们先认识“木”吧！木像一棵树，两个木是“林”，三个木是“森”。你也可以问我“水怎么读”或“山有几画”。'}
  if(/累|休息|睡觉/.test(t))return `${voice}休息也是成长的一部分。看看远处、喝点水，等精神好了再学。你还可以点“休息一下”帮我恢复活力！`;
  if(/喜欢|开心|谢谢|好棒/.test(t))return `${voice}和你在一起我也很开心！今天的小进步值得庆祝，给自己一个大大的拥抱吧！`;
  if(/学习|不会|难题|笨|答错/.test(t))return `${voice}不会很正常，我们可以慢慢来。先读一遍题，再找已知条件。你可以问我一个简单算式，或到错题小本再试一遍，我会一直陪你。`;
  return `${voice}我听到你说“${t}”啦。我目前能聊学习和心情，也能讲简单算式、am/is/are、a/an 和基础汉字。这个话题我还没学会，可以和爸爸妈妈一起找答案！`;
}
function sendPetMessage(message){const t=message.trim().slice(0,200);if(!t)return;daily();const rows=state.petChats[state.activePet]||[];rows.push({role:'user',text:t},{role:'pet',text:petReply(t)});state.petChats[state.activePet]=rows.slice(-40);save();render();const log=$('.chat-log');if(log)log.scrollTop=log.scrollHeight;$('#pet-chat-input')?.focus()}
document.addEventListener('submit',e=>{if(e.target.id!=='pet-chat-form')return;e.preventDefault();sendPetMessage(new FormData(e.target).get('message'))});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.chatPrompt)sendPetMessage(b.dataset.chatPrompt);if(b.dataset.chatRead!==undefined){const m=state.petChats[state.activePet]?.[Number(b.dataset.chatRead)];if(m?.role==='pet')speak(m.text)}});
