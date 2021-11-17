if (location.protocol != "https:" && location.hostname != "localhost") location.href = "https:" + window.location.href.substring(window.location.protocol.length);

const ICON_SIZE = 64;
const DISCORD_TAG = "Sorp#1337";

window.onload = responsiveChange;
window.onresize = responsiveChange;

/*
  Optimize elements for certain window widths
*/
function responsiveChange() {
  var element = document.getElementById("sorp-text");
  //Change text color for better visuality
  if (window.innerWidth < 1550 || document.querySelector(".button") == undefined) {
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
    if (img.dataset.href) {
      img.width = ICON_SIZE / factor;
      img.height = ICON_SIZE / factor;
    }
  });

  //Change discord tag size
  // factor 1 = 16px
  // factor 2 = 9px
  // factor 3 = 6px
  var dTagFontSize = factor == 1 ? 16 : factor == 2 ? 9 : 6;
  var dTag = document.querySelector("#discord-tag");
  if (dTag !== null) dTag.style.fontSize = dTagFontSize + "px";

  //Disable projects for phone devies
  if (window.innerWidth < 700) {
    document.querySelectorAll(".button").forEach((button) => {
      button.style = `display:none`;
    });
  } else {
    //Change buttons size
    var factor = 1920 / window.innerWidth;
    if (window.innerWidth < 390) {
      factor *= 0.95;
    }
    document.querySelectorAll(".button").forEach((button) => {
      var right = window.innerWidth < 390 ? `; right:${window.innerWidth > 368 ? "0" : "-10"}%` : "";
      button.style = `width: ${10 * factor}%${right}`;
    });
  }
}

var hasClicked = false; //Has the user clicked on a item?

function animationTimeout(dTag) {
  setTimeout(() => {
    if (dTag !== null) {
      dTag.remove();
      dTagEnabled = false;
    }
    hasClicked = false;
  }, 499);
}

function hidedTag(dTag) {
  dTag.style.animation = "none";
  dTag.offsetLeft;
  dTag.style.cssText = "animation: 0.5s dtagAnimation; animation-direction: reverse;";
  animationTimeout(dTag);
}

function clickItem(event) {
  if (hasClicked || event.button == 2) return; //Block if already clicked or using right click
  if (event.button == 0) hasClicked = true; //Only set clicked if using left click
  var dTag = document.querySelector(".dtag");

  //Check if left click
  if (event.button == 0) {
    //Check if discord item is clicked
    if (this.dataset.href == "discord") {
      //Check if dTag is already existing
      if (dTag !== null) {
        //Hide dTag
        hidedTag(dTag);
      } else {
        //Create new dTag
        var child = document.createElement("div");
        child.classList.add("dtag");
        child.innerHTML = `<p id="discord-tag">${DISCORD_TAG}</p>`;
        document.querySelector(".links").appendChild(child);
        responsiveChange();
        animationTimeout(null);
      }
      return;
    } else {
      //Hide discord tag when clicking on a other link
      if (dTag !== null) {
        hidedTag(dTag);
      }

      //Play bounce animation
      event.target.classList.add("bounce");
    }
  }

  //Redirect user to page
  executeRedirect("/" + this.dataset.href, () => {}, null, event.button == 1);
}

function loadProjects() {
  $("#content").load("/data/content.html", () => {
    document.querySelector("#content").style = "";
    document.querySelectorAll(".content").forEach((element) => {
      element.style = "transform: scale(0,0)";
    });
  });

  document.querySelector("#pContent").style = "animation: GoAwayAll 1s";
  document.querySelector(".button").style = "animation: GoAway 1s";
  setTimeout(() => {
    document.querySelector(".button").remove();
    document.querySelector(".links").style = "bottom: 10%; animation: ComeHere 1.5s";
    document.querySelector("#sorp-text").style = "color: white; position: relative; top: 95%";
    document.querySelector(".sorp").appendChild(document.querySelector("#sorp-text"));
    document.querySelector(".sorp").style = "position: fixed; margin-left: -50px; margin-top: -65px; transform: scale(0.5, 0.5); animation: GoToSide2 1.5s;";

    setTimeout(() => {
      var index = 0;
      document.querySelectorAll(".content").forEach((element) => {
        element.style = "transform: scale(0,0)";
        setTimeout(() => {
          element.style = "animation: contentAnimation 1s";
        }, index * 250);
        index++;
      });
    }, 1500);
  }, 999);
}

function clickButton(event) {
  if (event.button != 0) return;

  var a = event.target.parentNode.parentNode;
  if (!a.dataset.button) {
    a = event.target.parentNode;
    if (!a.dataset.button) return;
  }

  var action = a.dataset.button;
  if (action == "projects") {
    //Load content
    loadProjects();
  }
}

document.querySelectorAll(".links > img").forEach((element) => {
  //Only add event listener if href is existing
  if (element.dataset.href) {
    element.addEventListener("mousedown", clickItem);
  }
});

document.querySelectorAll("a").forEach((element) => {
  element.addEventListener("mousedown", clickButton);
});

if (checkParameter("projects")) {
  window.history.pushState({}, document.title, "/");
  loadProjects();
}
