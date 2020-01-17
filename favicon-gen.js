const fs = require("fs");
const pngToIco = require("png-to-ico");
const filecompare = require('filecompare');
const exec = require('child_process').exec;
const sharp = require('sharp');

function commitChanges() {
    console.log("New favicon.ico detected. Commiting changes...");

    exec("git add favicon.ico", (error, out, err) => {
        console.log("git add favicon.ico");
        if (error) {
            console.log(out);
            console.log(err);
            throw error;
        } else {
            exec("git commit -m \"Update favicon.ico\"", (error, out, err) => {
                console.log("git commit -m \"Update favicon.ico\"");

                if (error) {
                    console.log(out);
                    console.log(err);
                    throw error;
                } else {
                    console.log("Done.");
                }

            });
        }
    });
}


console.log("Checking for favicon.png...");

if (fs.existsSync("favicon.png")) {

    console.log("Scaling favicon.png to 64x64...");

    sharp("favicon.png").resize(64, 64).toFile("_favicon.png", (error, info) => {

        if (error) {
            throw error;
        } else {

            console.log("Scaled file: _favicon.png");

            console.log("Converting _favicon.png to favicon.ico");

            pngToIco("_favicon.png").then(buf => {

                if (fs.existsSync("favicon.ico")) {
                    console.log("Removing old favicon.ico...");

                    fs.copyFileSync("favicon.ico", "old-favicon.ico");
                    fs.unlinkSync("favicon.ico");
                }

                console.log("Writing new favicon.ico...")

                fs.writeFileSync("favicon.ico", buf);

                console.log("Done. Comparing...");

                if (fs.existsSync("old-favicon.ico")) {
                    filecompare("favicon.ico", "old-favicon.ico", (equal) => {

                        if (equal) {
                            console.log("No change detected.");
                        } else {
                            commitChanges();
                        }

                    });
                } else {
                    commitChanges();
                }

                console.log("Cleaning up...");

                if(fs.existsSync("favicon.png")) fs.unlinkSync("favicon.png");
                if(fs.existsSync("_favicon.png")) fs.unlinkSync("_favicon.png");
                if(fs.existsSync("old-favicon.ico")) fs.unlinkSync("old-favicon.ico");

            }).catch(error => {
                throw error;
            });
        }
    });

} else {
    throw Error("Couldn't find favicon.png");
}