---
layout: js_minifier
replace_names: false
---

var path = window.location.pathname;

let REDIRECT_DATA;

//Remove / at the end
if (path.endsWith("/")) path = path.substr(0, path.length - 1);

function checkForRedirect(p) {
  var redirect;

  Object.keys(REDIRECT_DATA).forEach((trigger, index, array) => {
    debug("Comparing", p, "and", trigger, " INDEX", index);

    if (trigger.includes(",")) {
      debug("Doing alias check for", trigger, " INDEX", index);

      var triggerSplit = trigger.split(",");

      triggerSplit.forEach((t) => {
        t = t.trim();

        debug("Alias comparing", p, "and", t);

        if (p === t) {
          debug("Set redirect to", REDIRECT_DATA[array[index]]);
          redirect = REDIRECT_DATA[array[index]];
        }
      });
    } else {
      if (p === trigger) {
        debug("Set redirect to", REDIRECT_DATA[array[index]]);
        redirect = REDIRECT_DATA[array[index]];
      }
    }
  });

  debug("redirect=", redirect);

  if (redirect !== undefined) return redirect;
  else return false;
}

function executeRedirect(path, noRedirectCallback, parameter, newtab) {
  var redirect = checkForRedirect(path);
  if (redirect) {
    var url = redirect + (parameter ? parameter : "");
    if (newtab !== undefined && newtab == true) {
      open(url);
    } else {
      window.location.href = url;
    }
  } else {
    noRedirectCallback();
  }
}

function redirectToNotFound() {
  debug("No redirect found for " + path);
  if (debug_mode) return;
  //Load 404 page
  window.location.href = "/";
}

//Load redirect data from /data/redirect.json
$.getJSON("/data/redirect.json", (data) => {
  debug("Successfully got redirect data:");
  debug(data);
  REDIRECT_DATA = data;

  if (window.location.pathname != "/") {
    executeRedirect(path.toLowerCase(), () => {
      //Check for /.../...
      var pathSplit = path.split("/");
      if (pathSplit.length > 2) {
        var targetPath = "/" + pathSplit[1]; //Should result in /...
        var preParameter = pathSplit[0].length + pathSplit[1].length + 1;
        var parameter = path.substr(preParameter, path.length); //Should result in [/...]/...

        executeRedirect(targetPath.toLowerCase(), redirectToNotFound, parameter);
      } else {
        redirectToNotFound();
      }
    });
  }
});
