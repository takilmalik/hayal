const Game={

state:null,

score:0,

currentStage:1,

start(){

this.goTo("INTRO");

createParticles();

},

goTo(newState){

this.state=newState;

this.render();

},

addScore(amount){

this.score+=amount;

},

reset(){

this.score=0;

this.currentStage=1;

this.goTo("MENU");

},

render(){

States[this.state].render();

}

};

Game.start();


function createParticles(){

const container=document.getElementById("particles");

for(let i=0;i<60;i++){

const p=document.createElement("div");

p.style.position="fixed";
p.style.width="3px";
p.style.height="3px";

p.style.background="#00e5ff";

p.style.left=Math.random()*100+"%";
p.style.top=Math.random()*100+"%";

p.style.opacity="0.5";

container.appendChild(p);

}

}