const REDIRECT_DATA_URL = "http://redirect.sorp.xyz/";

var path = window.location.pathname;

let REDIRECT_DATA;

function checkForRedirect(p){
    if(REDIRECT_DATA[p] !== undefined) return REDIRECT_DATA[p];
    else return false;
}

function executeRedirect(path){
    var redirect = checkForRedirect(path);
    if(redirect){
        window.location.href = redirect;
    } else {
        console.log("No redirect found for " + path);
        //Load 404 page
        window.location.href = "/not_found.html";
    }
}

function getRedirectData(url){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            REDIRECT_DATA = JSON.parse(this.responseText);

            if(path.endsWith(".html")){
                var pathWithoutHtml = path.split(".html")[0];
                executeRedirect(pathWithoutHtml.toLowerCase());
            } else {
                executeRedirect(path.toLowerCase());
            }

        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

getRedirectData(REDIRECT_DATA_URL);
