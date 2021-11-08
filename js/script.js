if (location.protocol != "https:" && location.hostname != "localhost") location.href = "https:" + window.location.href.substring(window.location.protocol.length);

const IconSize = 64;

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(elems, {});
  responsiveChange();
});

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
  // width < 325 = / 2
  // width < 230 = / 4
  var factor = window.innerWidth < 325 ? (window.innerWidth < 230 ? 4 : 2) : 1;
  document.querySelectorAll("img").forEach((img) => {
    img.width = IconSize / factor;
    img.height = IconSize / factor;
  });
}

var hasClicked = false;
function clickItem(event) {
  if (hasClicked || event.button == 2) return;

  if (this.dataset.href) {
    if (event.button == 0) {
      hasClicked = true;
      event.target.outerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    }
    executeRedirect("/" + this.dataset.href, () => {}, null, event.button == 1);
  }
}

document.querySelectorAll(".links > img").forEach((element) => {
  //element.addEventListener("click", clickItem);
  element.addEventListener("mousedown", clickItem);
});
