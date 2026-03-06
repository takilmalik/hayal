const Phases = {

menu() {

  const app = document.getElementById("app");

  app.innerHTML = `
    <h1>ERONEX</h1>
    <h2>Faz Seç</h2>

    <button onclick="Game.goTo('PHASE1')">
      Faz 1 – Kapı Hafıza
    </button>

    <button onclick="Game.goTo('PHASE2')">
      Faz 2 – Zihin Tarlası
    </button>

    <button onclick="Game.goTo('PHASE3')">
      Faz 3 – Stack
    </button>
    
    <button onclick="Game.goTo('PHASE4')">
    Faz 4 – XOX
    </button>
  `;

},

/* ========================= */
/* FAZ 1 */
/* ========================= */

phase1(){

const app = document.getElementById("app");

let doorCount;
let columns;
let sequenceLength;

/* SEVİYE ZORLUK SİSTEMİ */

if(Game.currentStage === 1){

doorCount = 4;
columns = 2;
sequenceLength = 3;

}

else if(Game.currentStage === 2){

doorCount = 6;
columns = 3;
sequenceLength = 3;

}

else{

doorCount = 9;
columns = 3;

if(Game.currentStage <= 3) sequenceLength = 3;
else if(Game.currentStage <= 5) sequenceLength = 4;
else if(Game.currentStage <= 7) sequenceLength = 5;
else if(Game.currentStage <= 9) sequenceLength = 6;
else if(Game.currentStage <= 11) sequenceLength = 7;
else if(Game.currentStage <= 13) sequenceLength = 8;
else if(Game.currentStage <= 15) sequenceLength = 9;
else if(Game.currentStage <= 17) sequenceLength = 10;
else if(Game.currentStage <= 18) sequenceLength = 11;
else sequenceLength = 12;

}

app.innerHTML = `

<button class="back-btn"
onclick="Game.goTo('PHASES')">
← Menü
</button>

<h1>ERONEX</h1>
<h2>Faz 1 - Seviye ${Game.currentStage}</h2>

<div class="memory-grid"
style="grid-template-columns: repeat(${columns}, auto);">
${Array.from({length: doorCount}, (_,i)=>
`<div class="memory-cell" data-id="${i}"></div>`
).join("")}
</div>

<p id="status">Hazırlan...</p>
<p>Skor: ${Game.score}</p>
`;

const cells = document.querySelectorAll(".memory-cell");
const status = document.getElementById("status");

let sequence = [];
let userInput = [];
let showing = true;

sequence = Array.from({length: sequenceLength}, () =>
Math.floor(Math.random() * doorCount)
);

let index = 0;

/* SEQUENCE GÖSTERME */

function showSequence(){

if(index >= sequence.length){
showing = false;
status.innerText = "Sıra sende!";
return;
}

const cell = cells[sequence[index]];

cell.classList.add("active");

setTimeout(()=>{

cell.classList.remove("active");

index++;

setTimeout(showSequence,350);

},600);

}

/* KAPI TIKLAMA */

cells.forEach(cell=>{

cell.onclick = ()=>{

if(showing) return;

const id = parseInt(cell.dataset.id);

/* KAPI AÇILMA EFEKTİ */

cell.classList.add("open");
cell.classList.add("active");

setTimeout(()=>{
cell.classList.remove("open");
cell.classList.remove("active");
},600);

userInput.push(id);

/* YANLIŞ KAPI */

if(id !== sequence[userInput.length-1]){

cell.classList.add("wrong");

/* MOBİL TİTREŞİM */

if(navigator.vibrate){
navigator.vibrate(200);
}

setTimeout(()=>{

if(Game.currentStage > 1){
Game.currentStage--;
}

Game.goTo("PHASE1");

},800);

return;

}

/* SEVİYE TAMAMLANDI */

if(userInput.length === sequence.length){

Game.addScore(20*Game.currentStage);

/* EKRAN GEÇİŞ ANİMASYONU */

app.style.transform="scale(0.85)";
app.style.opacity="0";

setTimeout(()=>{

app.style.transform="scale(1)";
app.style.opacity="1";

/* 5 SEVİYE SİSTEMİ */

if(Game.currentStage < 19){

Game.currentStage++;

Game.goTo("PHASE1");

}else{

Game.currentStage = 1;

Game.goTo("PHASE2");

}

},700);

}

};

});

showSequence();

},

/* ========================= */
/* FAZ 2 */
/* ========================= */

phase2(){

const app=document.getElementById("app");

const size=7;
const mineCount=3;

let lives=3;

const grid=[];
const mines=new Set();

while(mines.size<mineCount){
mines.add(Math.floor(Math.random()*(size*size)));
}

for(let y=0;y<size;y++){

const row=[];

for(let x=0;x<size;x++){

const index=y*size+x;

row.push({
mine:mines.has(index),
open:false,
number:0
});

}

grid.push(row);

}

function countMines(x,y){

let count=0;

for(let dy=-1;dy<=1;dy++){
for(let dx=-1;dx<=1;dx++){

const nx=x+dx;
const ny=y+dy;

if(
nx>=0 &&
ny>=0 &&
nx<size &&
ny<size &&
grid[ny][nx].mine
){
count++;
}

}
}

return count;

}

function openNeighbors(x,y){

for(let dy=-1;dy<=1;dy++){
for(let dx=-1;dx<=1;dx++){

const nx=x+dx;
const ny=y+dy;

if(
nx>=0 &&
ny>=0 &&
nx<size &&
ny<size
){

const neighbor=grid[ny][nx];

/* sadece kapalı ve mayın olmayan kare */

if(!neighbor.open && !neighbor.mine){

neighbor.open=true;

/* %50 ihtimalle aç */

if(Math.random() < 0.5){
neighbor.open=true;
}

}

}

}
}

}

function revealAll(){

for(let y=0;y<size;y++){
for(let x=0;x<size;x++){
grid[y][x].open=true;
}
}

}

for(let y=0;y<size;y++){
for(let x=0;x<size;x++){

if(!grid[y][x].mine){
grid[y][x].number=countMines(x,y);
}

}
}

function render(){

app.innerHTML=`
<button class="back-btn"
onclick="Game.goTo('PHASES')">
← Menü
</button>
<h1>ERONEX</h1>
<h2>Faz 2 - Zihin Tarlası</h2>
<p>❤️ ${lives}</p>
<div class="maze-grid"
style="grid-template-columns: repeat(${size}, 1fr);"></div>
<p>Skor: ${Game.score}</p>
`;

const gridEl=document.querySelector(".maze-grid");

for(let y=0;y<size;y++){
for(let x=0;x<size;x++){

const cell=document.createElement("div");
cell.classList.add("maze-cell");

const data=grid[y][x];

if(data.open){

if(data.mine){
cell.innerText="💀";
cell.style.background="#8b0000";
}else{
cell.innerText=data.number||"";
cell.style.background="#111";
}

}

cell.onclick=()=>{

if(data.open) return;

data.open=true;

if(!data.mine && data.number===0){
openNeighbors(x,y);
}

if(data.mine){

data.open=true;
render();

lives--;

if(lives<=0){

revealAll();
render();

setTimeout(()=>{
Game.goTo("GAMEOVER");
},1800);

return;

}

}else{

Game.addScore(5);

}

let opened=0;

for(let yy=0;yy<size;yy++){
for(let xx=0;xx<size;xx++){

if(grid[yy][xx].open && !grid[yy][xx].mine){
opened++;
}

}
}

const safeCells=size*size-mineCount;

if(opened===safeCells){

revealAll();
render();

setTimeout(()=>{
Game.goTo("PHASE3");
},1000);

return;

}

render();

};

gridEl.appendChild(cell);

}
}

}

render();

},

/* ========================= */
/* FAZ 3 - STACK */
/* ========================= */

phase3(){
  

const app=document.getElementById("app");

let stack=[];
let currentX=0;
let direction=1;
let width=120;
let speed=3;
let score=0;

app.innerHTML=`
<button class="back-btn"
onclick="Game.goTo('PHASES')">
← Menü
</button>
<h1>ERONEX</h1>
<h2>Faz 3 - Stack</h2>

<div class="stack-game">
<div class="tower"></div>
<div class="moving-block"></div>
</div>

<p>Skor: <span id="score">0</span></p>
`;

const tower=document.querySelector(".tower");
const block=document.querySelector(".moving-block");

block.style.width=width+"px";

function move(){

currentX+=speed*direction;

if(currentX>200 || currentX<0){
direction*=-1;
}

block.style.left=currentX+"px";

requestAnimationFrame(move);

}

move();

document.querySelector(".stack-game").onclick=()=>{

const last=stack[stack.length-1];

if(!last){

stack.push({x:currentX,width});
placeBlock();
return;

}

const overlap=
Math.min(currentX+width,last.x+last.width)-
Math.max(currentX,last.x);

if(overlap<=0){

Game.lastScore = score;

setTimeout(()=>{
Game.goTo("PHASE3");
},600);

return;

}

width=overlap;
currentX=Math.max(currentX,last.x);

score++;

document.getElementById("score").innerText=score;

stack.push({x:currentX,width});

placeBlock();

};

function placeBlock(){

const newBlock=document.createElement("div");

newBlock.className="stack-block";

newBlock.style.width=width+"px";
newBlock.style.left=currentX+"px";

newBlock.style.bottom = stack.length * 20 + "px";

tower.appendChild(newBlock);

block.style.width=width+"px";

}

},


/* ========================= */
/* FAZ 4 - XOX */
/* ========================= */

phase4(){

const app=document.getElementById("app");

let board=["","","","","","","","",""];
let player="X";
let mode=null;

/* MOD SEÇME */

app.innerHTML=`

<button class="back-btn"
onclick="Game.goTo('PHASES')">
← Menü
</button>

<h1>ERONEX</h1>
<h2>Faz 4 - XOX</h2>

<button class="menu-btn" id="pvp">👥 2 Kişi</button>
<button class="menu-btn" id="ai">🤖 AI'ya Karşı</button>

`;

document.getElementById("pvp").onclick=()=>{
startGame("pvp");
};

document.getElementById("ai").onclick=()=>{
startGame("ai");
};

function startGame(selectedMode){

mode=selectedMode;

app.innerHTML=`

<h1>ERONEX</h1>
<h2>XOX</h2>
<button class="back-btn"
onclick="Game.goTo('PHASES')">
← Menü
</button>

<div class="xox-grid"></div>

<p id="status">Sıra: X</p>

`;

const grid=document.querySelector(".xox-grid");

board=["","","","","","","","",""];

board.forEach((cell,i)=>{

const div=document.createElement("div");
div.className="xox-cell";

div.onclick=()=>move(i,div);

grid.appendChild(div);

});

}

function move(i,div){

if(board[i]!=="") return;

board[i]=player;
div.innerText=player;

if(checkWin()){

document.getElementById("status").innerText=player+" kazandı";

setTimeout(()=>{
Game.goTo("MENU");
},1200);

return;

}

if(board.every(c=>c!=="")){

document.getElementById("status").innerText="Berabere";

setTimeout(()=>{
Game.goTo("PHASES");
},1200);

return;

}

player=player==="X"?"O":"X";

document.getElementById("status").innerText="Sıra: "+player;

/* AI */

if(mode==="ai" && player==="O"){
setTimeout(aiMove,500);
}

}

function aiMove(){

const cells=document.querySelectorAll(".xox-cell");

/* kazanma hamlesi */

for(let i=0;i<9;i++){

if(board[i]===""){

board[i]="O";

if(checkWin()){

board[i]="";
cells[i].click();
return;

}

board[i]="";

}

}

/* engelleme hamlesi */

for(let i=0;i<9;i++){

if(board[i]===""){

board[i]="X";

if(checkWin()){

board[i]="";
cells[i].click();
return;

}

board[i]="";

}

}

/* rastgele hamle */

let empty=board
.map((v,i)=>v===""?i:null)
.filter(v=>v!==null);

if(empty.length===0) return;

let moveIndex=empty[Math.floor(Math.random()*empty.length)];

cells[moveIndex].click();

}

function checkWin(){

const win=[

[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]

];

return win.some(combo=>
combo.every(i=>board[i]===player)
);

}

}, /* <-- İŞTE HATA BURADAYDI! BURAYI DÜZELTTİM */

/* ========================= */
/* FAZ 5 - ALGI TESTİ */
/* ========================= */

phase5(){
 Game.score = 0;

const app=document.getElementById("app");

const words=["KIRMIZI","MAVI","YESIL","SARI"];

const colors={
KIRMIZI:"red",
MAVI:"blue",
YESIL:"green",
SARI:"yellow"
};

let score=0;
let time=3;
let round=0;
let timer;
let bestScore = localStorage.getItem("eronexBest") || 0;
function startTimer(){


const timerText=document.getElementById("timer");

timerText.innerText=time;

timer=setInterval(()=>{

time--;

timerText.innerText=time;

if(time<=0){

clearInterval(timer);
Game.goTo("GAMEOVER");

}

},1000);

}

function nextRound(){
  clearInterval(timer);
 round++;

/* ZORLUK SİSTEMİ */

if(round > 40){
time = 0.8;
}
else if(round > 30){
time = 1;
}
else if(round > 20){
time = 1.5;
}
else if(round > 10){
time = 2;
}
else{
time = 3;
}

const word=words[Math.floor(Math.random()*words.length)];
const colorKey=words[Math.floor(Math.random()*words.length)];
const color=colors[colorKey];

app.innerHTML=`

<button class="back-btn"
onclick="Game.goTo('PHASES')">
← Menü
</button>

<h1>ERONEX</h1>
<h2>Faz 5 - Algı Testi</h2>

<p>Kelimeyi değil <b>RENKİ</b> seç!</p>

<div style="
font-size:60px;
margin:40px;
color:${color};
font-weight:bold;
">
${word}
</div>

<div id="buttons"></div>
<p>⏱ Süre: <span id="timer">${time}</span></p>
<p>Skor: ${Game.score}</p>
<p>🏆 Rekor: ${bestScore}</p>

`;

const btnArea=document.getElementById("buttons");

words.forEach(w=>{

const btn=document.createElement("button");

btn.className="menu-btn";

btn.innerText=w;

btn.onclick=()=>{

if(w===colorKey){

Game.score += 10;
if(Game.score > bestScore){

bestScore = Game.score;

localStorage.setItem("eronexBest", bestScore);

}
nextRound();

}else{

Game.goTo("GAMEOVER");

}

};

btnArea.appendChild(btn);

});
startTimer();

}

nextRound();

} /* <-- BURAYI DA DÜZELTTİM */
}; /* <-- VE EN SONU DA BURASI */