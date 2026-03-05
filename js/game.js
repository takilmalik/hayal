const Game = {

  state: null,
  score: 0,
  currentStage: 1,
  _timer: null,

  start() {
    this.goTo("INTRO");
  },

  goTo(newState) {

    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }

    this.state = newState;
    this.render();
  },

  addScore(amount) {
    this.score += amount;
  },

  reset() {
    this.score = 0;
    this.currentStage = 1;
    this.goTo("MENU");
  },

  render() {
    States[this.state].render();
  }

};

function createParticles(){

const container=document.createElement("div");
container.id="particles";

document.body.appendChild(container);

for(let i=0;i<60;i++){

const p=document.createElement("div");
p.className="particle";

p.style.left=Math.random()*100+"%";
p.style.top=Math.random()*100+"%";

p.style.animationDuration=15+Math.random()*10+"s";

container.appendChild(p);

}

}

createParticles();
Game.start();