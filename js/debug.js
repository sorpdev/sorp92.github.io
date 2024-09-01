let debug_mode = false;

function checkParameter(...parameters) {
  let foundAmount = 0;
  let search = location.search;

  if (search != "") {
    if (search.startsWith("?")) {
      //Remove ? at the beginning
      search = search.substr(1);

      let searchArray = [];
      if (search.includes("&")) {
        searchArray = search.split("&");
      } else {
        searchArray = [search];
      }

      parameters.forEach((param) => {
        if (searchArray.includes(param)) {
          foundAmount++;
        }
      });
    }
  }

  return foundAmount == parameters.length;
}

/* Debug functions*/
function debug(message, ...optionalParams) {
  if (debug_mode === true) console.log(message, optionalParams);
}
if (document.cookie === "DEBUG=true" || checkParameter("DEBUG_MODE")) debug_mode = true;
