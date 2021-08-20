// Imports
//####################################
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3001;


// Reading all svg-folders
//####################################
function isDirectory(path) {  
    const stats = fs.statSync(path)
    return stats.isDirectory()
}

var public = fs.readdirSync(`public/`);
var svgDirs = [];
var svgList = [];

for(var i=0; i<public.length; i++){
    if(isDirectory(`public/${public[i]}`)){
        svgDirs.push(`public/${public[i]}`);
    }
}

if(svgDirs.length == 0){
    console.log('There are no folders and svgs to load!');
} else {
    for(var i=0; i<svgDirs.length; i++){        
        svgList.push({
            directory: svgDirs[i].slice(7),
            svgs: []
        });
        var currentSvg = fs.readdirSync(svgDirs[i]);
        for(var n=0; n<currentSvg.length; n++){
            var currentSvgCode = fs.readFileSync(`${svgDirs[i]}/${currentSvg[n]}`, 'utf-8');
            svgList[i].svgs.push({
                name: currentSvg[n],
                code: currentSvgCode
            });
        }
    };

    console.log(svgDirs)
}


// Setting up ejs
//####################################
app.set('view engine', 'ejs');


// Adding project-folders
//####################################
app.use(express.static('resources/'));


// Routes
//####################################
app.get('/', (req, res) => {
    res.render('svgs');
});


app.get('/load/svgs', (req, res) => {
    res.status(200).json(svgList);
});


// Starting server on port
//####################################
app.listen(port, () => {
    console.log(`Up and running on: http://localhost:${port}/`);
});