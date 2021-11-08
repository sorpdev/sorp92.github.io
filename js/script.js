if (location.protocol != "https:" && location.hostname != "localhost") location.href = "https:" + window.location.href.substring(window.location.protocol.length);

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(elems, {});
  changeTextColor();
});

window.onresize = changeTextColor;

function changeTextColor() {
  var element = document.getElementById("sorp-text");
  if (window.innerWidth < 1550) {
    element.style.color = "white";
  } else {
    element.style.color = "black";
  }
}

var hasClicked = false;
function clickItem(event) {
  if (hasClicked) return;

  if (this.dataset.href) {
    hasClicked = true;
    event.target.outerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    executeRedirect("/" + this.dataset.href, () => {}, null);
  }
}

document.querySelectorAll(".links > img").forEach((element) => {
  element.addEventListener("click", clickItem);
});
