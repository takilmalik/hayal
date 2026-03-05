const States = {
INTRO:{
render(){

UI.clear();

const lines=[
"...",
"Sinyal bulundu.",
"...",
"Zihin bağlantısı kuruluyor.",
"...",
"Hoş geldin.",
"",
"Zihninden kaçamazsın."
];

let i=0;

function showLine(){

if(i>=lines.length){

UI.renderButton("Zihne Gir",()=>{
Game.goTo("MENU");
});

return;

}

UI.renderText(lines[i]);

i++;

setTimeout(showLine,1200);

}

UI.renderTitle("ERONEX");

setTimeout(showLine,800);

}
},

MENU: {
render(){

UI.clear();

UI.renderTitle("ERONEX");
UI.renderText("Zihin bir savaş alanıdır.");

UI.renderButton("Faz 1 – Kapı Hafıza",()=>{
Game.goTo("PHASE1");
});

UI.renderButton("Faz 2 – Zihin Tarlası",()=>{
Game.goTo("PHASE2");
});

UI.renderButton("Faz 3 – Stack",()=>{
Game.goTo("PHASE3");
});

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

GAMEOVER:{
render(){

const facts=[
"Biliyor muydun? Beyin saniyede milyonlarca bilgiyi işler.",
"Biliyor muydun? İnsan beyninde yaklaşık 86 milyar nöron vardır.",
"Biliyor muydun? Beyin vücudun enerjisinin %20'sini kullanır."
];

const fact=facts[Math.floor(Math.random()*facts.length)];

UI.clear();

UI.renderTitle("Game Over");

UI.renderText("Skor: "+Game.score);

UI.renderText(fact);

UI.renderButton("Tekrar Dene",()=>{
Game.goTo("PHASE2");
});

UI.renderButton("Menü",()=>{
Game.reset();
});

}
},

RESULT:{
render(){

UI.clear();

UI.renderTitle("Kazandın!");

UI.renderText("Skor: "+Game.score);

UI.renderButton("Menü",()=>{
Game.reset();
});

}
}

};