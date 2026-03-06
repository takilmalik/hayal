const States = {

INTRO:{
render(){

UI.clear();

const app=document.getElementById("app");

app.innerHTML=`
<div class="logo">ERONEX</div>
<div id="intro-brain">🧠</div>
<div id="intro-text"></div>
`;

const lines=[

"Sinyal bulundu.",
"Zihin bağlantısı kuruluyor.",
"Hoş geldin.",
"Kahraman Çorumlu.",
"Zihninden kaçamazsın."

];

let i=0;

function showLine(){

if(i>=lines.length){

const btn=document.createElement("button");

btn.className="menu-btn";

btn.innerText="Zihne Gir";

btn.onclick=()=>{
Game.goTo("MENU");
};

app.appendChild(btn);

return;

}

const p=document.createElement("p");

p.className="intro-text";

p.innerText=lines[i];

document.getElementById("intro-text").appendChild(p);

if(lines[i]==="Kahraman Çorumlu."){

const credit=document.createElement("div");

credit.className="eer-credit";

credit.innerText="by eer";

document.getElementById("intro-text").appendChild(credit);

}

i++;

setTimeout(showLine,1200);

}

setTimeout(showLine,800);

}
},



MENU:{
render(){

UI.clear();

const app=document.getElementById("app");

app.innerHTML=`

<div class="logo">ERONEX</div>

<div class="subtitle">
Bir <b>Kahraman Çorumlu</b> Hikayesi
</div>

<button class="menu-btn"
onclick="Game.goTo('PHASES')">

▶ Başla

</button>

<button class="menu-btn"
onclick="Game.goTo('PHASES')">

🎮 Fazlar

</button>

<button class="menu-btn">

🏆 Skor

</button>

<button class="menu-btn">

⚙ Ayarlar

</button>

`;

}
},



PHASES:{
render(){

UI.clear();

const app=document.getElementById("app");

app.innerHTML=`

<button class="back-btn"
onclick="Game.goTo('MENU')">

← Menü

</button>

<div class="logo">ERONEX</div>

<h2>Faz Seç</h2>

<div class="phase-grid">

<div class="phase-card">

<h2>🚪 Faz 1</h2>

<p>Anektarlar Nerde</p>

<button class="menu-btn"
onclick="startPhase('PHASE1')">

Başla

</button>

</div>

<div class="phase-card">

<h2>💣 Faz 2</h2>

<p>Leblebi Tarlası</p>

<button class="menu-btn"
onclick="startPhase('PHASE2')">

Başla

</button>

</div>

<div class="phase-card">

<h2>🧱 Faz 3</h2>

<p>Saat Kulesi</p>

<button class="menu-btn"
onclick="restartPhase3()">

Tekrar Oyna

</button>

</div>

<div class="phase-card">

<h2>❌⭕ Faz 4</h2>

<p>X O Kapışması</p>

<button class="menu-btn"
onclick="startPhase('PHASE4')">

Başla

</button>

</div>

<div class="phase-card">

<h2>🧠 Faz 5</h2>

<p>Algı Testi</p>

<button class="menu-btn"
onclick="startPhase('PHASE5')">

Başla

</button>

</div>

</div>

`;

}
},



PHASE1:{
render(){
Phases.phase1();
}
},



PHASE2:{
render(){
Phases.phase2();
}
},



PHASE3:{
render(){
Phases.phase3();
}
},



PHASE4:{
render(){
Phases.phase4();
}
},



PHASE5:{
render(){
Phases.phase5();
}
},



GAMEOVER:{
render(){

UI.clear();

const app=document.getElementById("app");

app.innerHTML=`

<h1>Game Over</h1>

<p>Skor: ${Game.score}</p>

<button class="menu-btn"
onclick="Game.goTo('PHASES')">

Tekrar Dene

</button>

<button class="menu-btn"
onclick="Game.goTo('MENU')">

Menü

</button>

`;

}
},



RESULT:{
render(){

UI.clear();

const app=document.getElementById("app");

app.innerHTML=`

<h1>Kazandın!</h1>

<p>Stack Skoru: ${Game.lastScore || 0}</p>

<button class="menu-btn"
onclick="Game.goTo('PHASES')">

Tekrar Oyna

</button>

<button class="menu-btn"
onclick="Game.goTo('MENU')">

Menü

</button>

`;

}
}

};



function restartPhase3(){

Game.score = 0;
Game.lastScore = 0;

Game.goTo("PHASE3");

}