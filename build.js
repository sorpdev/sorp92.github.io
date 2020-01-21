const request = require('request');

if (process.argv.length === 4) {

    const owner = process.argv[2];
    const repo = process.argv[3];

    if (process.env.GITHUB_TOKEN) {

        request.post(`https://api.github.com/repos/${owner}/${repo}/pages/builds`, {
                headers: {
                    "User-Agent": "Rebuild",
                    "Authorization": "token " + process.env.GITHUB_TOKEN
                }
            },
            (error, res, body) => {

                if (error) {
                    throw error;
                }

                if(res.statusCode === 200){
                    console.log(body);
                } else {
                    console.log("Status code: " + res.statusCode);
                    console.log(body);
                }

            });

    } else {
        throw Error("No GITHUB_TOKEN env variable");
    }

}