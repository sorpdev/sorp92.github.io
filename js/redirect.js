const REDIRECT_DATA = {
    "/youtube": "https://www.youtube.com/channel/UCkxDSg55pwsr7PSAagbz4MA",
    "/github": "https://github.com/sorp92",
    "/trakt": "https://trakt.tv/users/sorp",
    "/twitch": "https://www.twitch.tv/sorp"
};

var path = window.location.pathname;

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
    }
}

if(path.endsWith(".html")){
    var pathWithoutHtml = path.split(".html")[0];
    executeRedirect(pathWithoutHtml.toLowerCase());
} else {
    executeRedirect(path.toLowerCase());
}