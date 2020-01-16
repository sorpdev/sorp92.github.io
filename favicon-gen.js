const fs = require("fs");
const pngToIco = require("png-to-ico");
const request = require("request");

if(process.argv.length >= 3){
    const target = process.argv[2];
    console.log("Generating favicon: " + target);

    console.log("Starting download...");

    request(target).pipe(fs.createWriteStream("favicon.png")).on("close", () => {

        console.log("Finished download.");

        console.log("Converting to ico file...");

        pngToIco("favicon.png").then(buf => {
            
            fs.writeFileSync("favicon.ico", buf);

            console.log("Removing old file...");
            
            fs.unlinkSync("favicon.png");

        }).catch(console.error);

    });

}