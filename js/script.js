if (location.protocol != "https:" && location.hostname != "localhost") location.href = "https:" + window.location.href.substring(window.location.protocol.length);

var hasClicked = false; //Has the user clicked on a item?
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
}

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
      //Revert click after 2 seconds to prevent infinite bouncing when going back to the page
      setTimeout(() => {
        hasClicked = false;
        event.target.classList.remove("bounce");
      }, 2000);
    }
  }

  //Redirect user to page
  executeRedirect("/" + this.dataset.href, () => {}, null, event.button == 1);
}

function loadProjects() {
  //Load content
  $(".container").load("/data/content.html", () => {
    //Show container
    $(".container").css({
      display: "none"
    });
    //Hide content
    for (var i = 0; i < $(".container").children().length; i++) {
      $($(".container").children()[i]).css("transform", "scale(0,0)");
    }
  });

  //Play animations
  $(".button").css("animation", "scaleDown50 1s");
  $("#pContent").css("animation", "scaleDown0 1s");
  $(".links").css("animation", "scaleDown50 1s");
  setTimeout(() => {
    $(".container").css({
      display: "grid",
      transform: "scale(0,0)"
    });
    //Destroy projects button
    $(".button").parent()[0].remove();
    //Show links
    $(".links").css({
      animation: "displayLinks 1.5s"
    });
    //Set options for sorp
    $(".sorp").css("animation", "showSorp 1.5s");
    $(".sorp").addClass("sorpProjects");
    $("#sorp-text").appendTo(".sorp");
    $("#sorp-text").css("color", "white");

    //Start showing container
    setTimeout(() => {
      $(".container").css({
        animation: "show0 1s",
        transform: "scale(1,1)"
      });
      //Start showing content
      setTimeout(() => {
        for (var i = 0; i < $(".container").children().length; i++) {
          $($(".container").children()[i]).css({
            animation: `showContent ${i + 1}s`,
            transform: "scale(1,1)"
          });
        }
      }, 999);
    }, 999);
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

/* Hover wave animation */
$(".sorp-hover").hover(
  () => {
    $(".sorp").css({
      "background-image": "url('/img/avatar2.png')",
      transition: "background 0.5s linear"
    });
  },
  () => {
    $(".sorp").css({
      "background-image": "url('/img/avatar.png')",
      transition: "background 0.5s linear"
    });
  }
);

/* Click shrug animation */
$(".sorp-hover").click(() => {
  $(".sorp").css({
    "background-image": "url('/img/avatar3.png')",
    transition: "background 0.5s linear"
  });
});

if (checkParameter("projects")) {
  window.history.pushState({}, document.title, "/");
  loadProjects();
}
