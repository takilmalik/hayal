const UI = {

  clear() {
    document.getElementById("app").innerHTML = "";
  },

  renderTitle(text) {
    const h1 = document.createElement("h1");
    h1.innerText = text;
    document.getElementById("app").appendChild(h1);
  },

  renderText(text) {
    const p = document.createElement("p");
    p.style.marginTop = "10px";
    p.innerText = text;
    document.getElementById("app").appendChild(p);
  },

  renderButton(text, callback) {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = callback;
    document.getElementById("app").appendChild(btn);
  }

};