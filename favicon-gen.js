const fs = require("fs");
const pngToIco = require("png-to-ico");

console.log("Checking for favicon.png...");

if(fs.existsSync("favicon.png")){

    console.log("Converting favicon.png to favicon.ico");

    pngToIco("favicon.png").then(buf => {
            
        console.log("Removing old favicon.ico...");

        fs.unlinkSync("favicon.ico");

        console.log("Writing new favicon.ico...")

        fs.writeFileSync("favicon.ico", buf);

        console.log("Done. favicon.ico exists? " + fs.existsSync("favicon.ico"));

    }).catch(console.error);

} else {
    throw Error("Couldn't find favicon.png");
}