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

if(process.argv.length >= 3){
    const target = process.argv[2];
    console.log("Generating favicon: " + target);

    console.log("Starting download...");

    download.image({ url: target, dest: "favicon.png" }).then(() => {

        console.log("Finished download.");

        console.log("Converting to ico file...");
    
        pngToIco("favicon.png").then(buf => {
            
            fs.writeFileSync("favicon.ico", buf);

            console.log("Removing old file...");
            
            fs.unlinkSync("favicon.png");

        }).catch(console.error);

    }).catch(err => console.error(err));

}