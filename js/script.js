---
layout: js_minifier
---

if (location.protocol != "https:" && location.hostname != "localhost") location.href = "https:" + window.location.href.substring(window.location.protocol.length);

const ICON_SIZE = 64;
const DISCORD_TAG = "Sorp#1337";

window.onresize = responsiveChange;

function responsiveChange() {
  var element = document.getElementById("sorp-text");
  //Change text color for better visuality
  if (window.innerWidth < 1550) {
    element.style.color = "white";
  } else {
    element.style.color = "black";
  }

  //Change size of icons
  // width > 325 = 1
  // width < 434 = / 2
  // width < 306 = / 4
  var factor = window.innerWidth < 434 ? (window.innerWidth < 306 ? 4 : 2) : 1;
  document.querySelectorAll("img").forEach((img) => {
    img.width = ICON_SIZE / factor;
    img.height = ICON_SIZE / factor;
  });

  //Change discord tag size
  // factor 1 = 16px
  // factor 2 = 9px
  // factor 3 = 6px
  var dTagFontSize = factor == 1 ? 16 : factor == 2 ? 9 : 6;
  var dTag = document.querySelector("#discord-tag");
  if (dTag !== null) dTag.style.fontSize = dTagFontSize + "px";
}

var hasClicked = false;

function clickItem(event) {
  if (hasClicked || event.button == 2) return;
  if(event.button == 0) hasClicked = true;

  if (this.dataset.href) {
    if (event.button == 0) {
      if (this.dataset.href == "discord") {
        var dTag = document.querySelector(".dtag");

        if (dTag !== null) {
          dTag.style.animation = "none";
          dTag.offsetLeft;
          dTag.style.cssText = "animation: 0.5s dtagAnimation; animation-direction: reverse;";
        } else {
          var child = document.createElement("div");
          child.classList.add("dtag");
          child.innerHTML = `<p id="discord-tag">${DISCORD_TAG}</p>`;
          document.querySelector(".links").appendChild(child);
          responsiveChange();
        }

        setTimeout(() => {
          if (dTag !== null) {
            dTag.remove();
            dTagEnabled = false;
          }
          hasClicked = false;
        }, 499);

        return;
      } else {
        event.target.outerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
      }
    }
    executeRedirect("/" + this.dataset.href, () => {}, null, event.button == 1);
  }
}

document.querySelectorAll(".links > img").forEach((element) => {
  //element.addEventListener("click", clickItem);
  element.addEventListener("mousedown", clickItem);
});
