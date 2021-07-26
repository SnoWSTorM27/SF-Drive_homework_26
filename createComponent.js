const yargs = require("yargs");
const fs = require('fs').promises;
const chalk = require("chalk");
const path = require("path");


const errorColor = chalk.red.bold;
const successColor = chalk.green;
const warningColor = chalk.yellow.bold;

const argv = yargs 
    .command(["create <filename> [filepath]", "c"], "Creates a new file and write a passed content to it", {},
    (argv) => {
        if(argv.functional) {
            console.log('hello')
        }
        
        const filenameWithExt = argv.filename + '.js';
        const defaultFilePath = "./src/components/";
        const filepath = path.resolve(((argv.filepath) ? argv.filepath : defaultFilePath), filenameWithExt);
        const defaultFunctional =`import React from "react";
        
function ${argv.filename} () {
    return (
        <div>
            ${argv.filename}
        </div>
    ); 
}

export default ${argv.filename};`;




        fs.writeFile((filepath), defaultFunctional)
            .then(() => console.log(successColor("Your component has been saved successfully")))
            .catch(e => console.error(errorColor("As error has occured"), e));

    })
    .boolean('functional')
    .alias('functional', ['f'])
    .demandCommand(1, warningColor("At least 1 command should be passed"))
    .argv;