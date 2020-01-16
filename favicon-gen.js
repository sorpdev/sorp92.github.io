const fs = require("fs");
const pngToIco = require("png-to-ico");
const filecompare = require('filecompare');
const exec = require('child_process').exec;

console.log("Checking for favicon.png...");

if (fs.existsSync("favicon.png")) {

    console.log("Converting favicon.png to favicon.ico");

    pngToIco("favicon.png").then(buf => {

        console.log("Removing old favicon.ico...");

        fs.copyFileSync("favicon.ico", "old-favicon.ico");
        fs.unlinkSync("favicon.ico");

        console.log("Writing new favicon.ico...")

        fs.writeFileSync("favicon.ico", buf);

        console.log("Done. Comparing...");

        filecompare("favicon.ico", "old-favicon.ico", (equal) => {

            if (equal) {
                console.log("No change detected.");
            } else {
                console.log("New favicon.ico detected. Commiting changes...");

                exec("git add favicon.ico", (error, out, err) => {
                    console.log("git add favicon.ico");
                    if (error) {
                        console.error(error);
                        console.log(out);
                        console.log(err);
                    } else {
                        exec("git commit -m \"Update favicon.ico\"", (error, out, err) => {
                            console.log("git commit");

                            if (error) {
                                console.error(error);
                                console.log(out);
                                console.log(err);
                            } else {
                                console.log("Done.");
                            }

                        });
                    }
                });
            }

            console.log("Cleaning up...");

            fs.unlinkSync("old-favicon.ico");

        });

    }).catch(console.error);

} else {
    throw Error("Couldn't find favicon.png");
}