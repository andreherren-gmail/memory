'use strict';
const animals=[
 {id:'cat',emoji:'🐱',name:'Katze',call:'Miau!',bg:'#f5e5d5'},
 {id:'dog',emoji:'🐶',name:'Hund',call:'Wuff, wuff!',bg:'#eee4d6'},
 {id:'cow',emoji:'🐮',name:'Kuh',call:'Muuuh!',bg:'#e6ebdb'},
 {id:'duck',emoji:'🦆',name:'Ente',call:'Quak, quak!',bg:'#e0e9df'},
 {id:'pig',emoji:'🐷',name:'Schwein',call:'Oink, oink!',bg:'#f5e0df'},
 {id:'sheep',emoji:'🐑',name:'Schaf',call:'Määäh!',bg:'#eee9d7'},
 {id:'horse',emoji:'🐴',name:'Pferd',call:'Hüüü!',bg:'#e9ded2'},
 {id:'chick',emoji:'🐥',name:'Küken',call:'Piep, piep!',bg:'#f7eccb'},
 {id:'lion',emoji:'🦁',name:'Löwe',call:'Roaaar!',bg:'#f2dfc7'},
 {id:'frog',emoji:'🐸',name:'Frosch',call:'Quaaak!',bg:'#dde9cd'}
];
const board=document.querySelector('#board'),hint=document.querySelector('#hint');
let pairCount=6,found=0,moves=0,open=[],locked=false,sound=true,audio,round=0;
const timers=new Set();
function later(fn,delay){const id=setTimeout(()=>{timers.delete(id);fn();},delay);timers.add(id);}
function tone(freq,duration,type='sine',volume=.12,delay=0,end=freq){
 if(!sound||!audio)return;
 const t=audio.currentTime+delay,osc=audio.createOscillator(),gain=audio.createGain();
 osc.type=type;osc.frequency.setValueAtTime(freq,t);osc.frequency.exponentialRampToValueAtTime(Math.max(20,end),t+duration);
 gain.gain.setValueAtTime(.001,t);gain.gain.exponentialRampToValueAtTime(volume,t+.02);gain.gain.exponentialRampToValueAtTime(.001,t+duration);
 osc.connect(gain);gain.connect(audio.destination);osc.start(t);osc.stop(t+duration);
}
// Playful synthesized animal calls for this prototype; no recordings or network needed.
function animalSound(id){
 switch(id){
 case 'cat':tone(720,.65,'triangle',.16,0,330);tone(420,.3,'sine',.09,.3,650);break;
 case 'dog':for(let i=0;i<2;i++){tone(190,.18,'sawtooth',.09,i*.28,85);tone(380,.14,'triangle',.1,i*.28,130);}break;
 case 'cow':tone(140,.95,'sawtooth',.055,0,82);tone(220,.9,'sine',.13,0,120);break;
 case 'duck':for(let i=0;i<3;i++)tone(500,.15,'square',.035,i*.22,260);break;
 case 'pig':for(let i=0;i<2;i++){tone(170,.2,'sawtooth',.07,i*.3,95);tone(320,.17,'triangle',.07,i*.3,210);}break;
 case 'sheep':for(let i=0;i<6;i++)tone(300+i%2*80,.15,'sawtooth',.045,i*.1,230);break;
 case 'horse':for(let i=0;i<5;i++)tone(650-i*70,.18,'triangle',.12,i*.13,350-i*35);break;
 case 'chick':for(let i=0;i<3;i++)tone(1700,.12,'sine',.1,i*.2,2400);break;
 case 'lion':tone(90,.9,'sawtooth',.06,0,42);tone(130,.8,'triangle',.13,0,60);break;
 case 'frog':for(let i=0;i<2;i++)tone(180,.23,'square',.04,i*.35,80);break;
 }
}
function shuffle(items){for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]];}return items;}
function update(){document.querySelector('#progress').style.width=`${found/pairCount*100}%`;const track=document.querySelector('.progress-track');track.setAttribute('aria-valuemax',pairCount);track.setAttribute('aria-valuenow',found);}
function start(){
 round++;timers.forEach(clearTimeout);timers.clear();if(audio&&audio.state==='running')audio.suspend();
 document.querySelector('#victory').close();document.querySelector('#confetti').replaceChildren();
 found=0;moves=0;open=[];locked=false;update();hint.textContent='Dreh zwei Karten um. Wer versteckt sich hier?';
 board.className='board'+(pairCount===3?' mini':pairCount===10?' large':'');board.replaceChildren();
 document.querySelectorAll('[data-pairs]').forEach(b=>{const active=Number(b.dataset.pairs)===pairCount;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
 const selected=shuffle([...animals]).slice(0,pairCount);
 shuffle([...selected,...selected]).forEach((animal,index)=>{
 const b=document.createElement('button');b.className='card';const artIndex=animals.indexOf(animal);b.style.setProperty('--animal-x',`${artIndex%5*25}%`);b.style.setProperty('--animal-y',`${Math.floor(artIndex/5)*100}%`);b.setAttribute('aria-label',`Karte ${index+1} aufdecken`);b.setAttribute('aria-pressed','false');
 b.innerHTML=`<span class="card-inner"><span class="face back" aria-hidden="true"></span><span class="face front" aria-hidden="true"><span class="animal-art"></span></span></span>`;
 b.addEventListener('click',()=>flip(b,animal));board.append(b);
 });
}
function flip(card,animal){
 if(locked||card.classList.contains('flipped')||card.classList.contains('matched'))return;
 if(sound){try{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume().catch(()=>{});}catch{}}
 card.classList.add('flipped');card.setAttribute('aria-label',animal.name);card.setAttribute('aria-pressed','true');tone(450,.09,'sine',.045,0,720);open.push({card,animal});
 if(open.length<2)return;
 moves++;update();locked=true;
 const [a,b]=open;
 if(a.animal.id===b.animal.id){
 found++;update();hint.textContent=`${animal.call} Du hast die ${animal.name} gefunden!`;
 later(()=>{animalSound(animal.id);for(const x of open){x.card.classList.add('matched','celebrate');x.card.setAttribute('aria-label',`${animal.name}, Paar gefunden`);x.card.setAttribute('aria-disabled','true');}open=[];locked=false;if(found===pairCount)later(win,1000);},350);
 }else{
 hint.textContent='Noch kein Paar. Merk dir die beiden!';
 later(()=>{for(const x of open){x.card.classList.remove('flipped');x.card.setAttribute('aria-label',`Karte ${Array.from(board.children).indexOf(x.card)+1} aufdecken`);x.card.setAttribute('aria-pressed','false');}open=[];locked=false;hint.textContent='Probier es noch mal. Du schaffst das!';},1100);
 }
}
function win(){
 document.querySelector('#result').textContent=`Du hast alle ${pairCount} Tierpaare in ${moves} Zügen gefunden.`;document.querySelector('#victory').showModal();
 [523,659,784,1047].forEach((f,i)=>tone(f,.3,'sine',.09,i*.15));
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)for(let i=0;i<45;i++){const bit=document.createElement('i');bit.className='confetto';bit.style.left=Math.random()*100+'%';bit.style.background=['#2345a3','#e57c38','#f5c640','#f4ebd4'][i%4];bit.style.animationDelay=Math.random()*.7+'s';document.querySelector('#confetti').append(bit);}
 later(()=>document.querySelector('#confetti').replaceChildren(),4000);
}
document.querySelectorAll('[data-pairs]').forEach(b=>b.addEventListener('click',()=>{pairCount=Number(b.dataset.pairs);start();}));
document.querySelector('#restart').addEventListener('click',start);document.querySelector('#again').addEventListener('click',start);document.querySelector('#close-dialog').addEventListener('click',()=>document.querySelector('#victory').close());
document.querySelector('#sound').addEventListener('click',e=>{sound=!sound;e.currentTarget.setAttribute('aria-pressed',sound);e.currentTarget.setAttribute('aria-label',sound?'Ton ausschalten':'Ton einschalten');if(!sound&&audio)audio.suspend();});
start();
