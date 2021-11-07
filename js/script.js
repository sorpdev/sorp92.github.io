if (location.protocol != "https:" && location.hostname != "localhost")
  location.href =
    "https:" + window.location.href.substring(window.location.protocol.length);

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(elems, {});
});

function clickItem() {
  if (this.dataset.href) {
    document.querySelector(
      ".links"
    ).innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    executeRedirect("/" + this.dataset.href, () => {});
  }
}

document.querySelectorAll(".links > img").forEach((element) => {
  element.addEventListener("click", clickItem);
});
