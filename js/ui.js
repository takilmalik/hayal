const UI={

clear(){

document.getElementById("app").innerHTML="";

},

renderTitle(text){

const h1=document.createElement("div");

h1.className="logo";

h1.innerText=text;

document.getElementById("app").appendChild(h1);

},

renderText(text){

const p=document.createElement("p");

p.innerText=text;

document.getElementById("app").appendChild(p);

},

renderButton(text,callback){

const btn=document.createElement("button");

btn.className="menu-btn";

btn.innerText=text;

btn.onclick=callback;

document.getElementById("app").appendChild(btn);

}

};
function startPhase(phase){

const overlay=document.createElement("div");
overlay.className="brain-overlay";

overlay.innerHTML=`
<div class="brain">
🧠
<p>Zihin hazırlanıyor...</p>
</div>
`;

document.body.appendChild(overlay);

setTimeout(()=>{

overlay.remove();
Game.goTo(phase);

},1200);

}