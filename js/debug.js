---
layout: js_minifier
replace_names: false
---

var debug_mode = false;

/* Debug functions*/
function debug(message, ...optionalParams) {
  if (debug_mode === true) console.log(message, optionalParams);
}
if (document.cookie === "DEBUG=true") debug_mode = true;
