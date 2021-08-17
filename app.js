// Imports
//####################################
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3001;
const handlebars = require('express-handlebars');


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


// Adding project-folders
//####################################
app.use(express.static('resources/'));


// Setting up handlebars
//####################################
app.set('view engine', 'hbs');

app.engine('hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: 'main',
    partialsDir: `${__dirname}/views/partials`,
    extname: 'hbs'
}));


// Routes
//####################################
app.get('/', (req, res) => {
    res.render('svgs');
});

app.get('/colors', (req, res) => {
    res.render('colors');
});

app.get('/links', (req, res) => {
    res.render('links');
});

app.get('/git', (req, res) => {
    res.render('git');
});

app.get('/load/svgs', (req, res) => {
    res.status(200);
    res.json(svgList);
});


// Custom 404 page
//####################################
app.use(function(req, res) {
    res.render('404');
});


// Starting server on port
//####################################
app.listen(port, () => console.log(`Up and running: http://localhost:${port}/`));