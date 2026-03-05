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
  `;

},

/* ========================= */
/* FAZ 1 */
/* ========================= */

phase1(){

const app = document.getElementById("app");

let doorCount = 4;
let columns = 2;
let sequenceLength = 3;

/* SEVİYE SİSTEMİ */

if (Game.currentStage === 2) {
doorCount = 6;
columns = 3;
sequenceLength = 4;
}

if (Game.currentStage >= 3) {
doorCount = 9;
columns = 3;
sequenceLength = 6;
}

app.innerHTML = `

<button class="back-btn"
onclick="Game.goTo('PHASES')">
← Menü
</button>

<h1>ERONEX</h1>
<h2>Faz 1 - Seviye ${Game.currentStage}</h2>

<div class="memory-grid"
style="grid-template-columns: repeat(${columns}, minmax(80px,1fr));">
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

if(Game.currentStage>1){
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

if(Game.currentStage < 5){

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
const mineCount=6;

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

if(!neighbor.open && !neighbor.mine){

neighbor.open=true;

if(neighbor.number===0){
openNeighbors(nx,ny);
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

app.onclick=()=>{

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
Game.goTo("RESULT");
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

}

};