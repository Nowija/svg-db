// Imports
//####################################
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3001;
const handlebars = require('express-handlebars');


// Reading all svg-folders
//####################################
var svgDirs = fs.readdirSync('public/');
var svgList = [];

for(var i=0; i<svgDirs.length; i++){
    svgList.push(
        {
            directory: svgDirs[i],
            svgs: []
        }
    );
    var currentSvg = fs.readdirSync(`public/${svgDirs[i]}`);
    for(var n=0; n<currentSvg.length; n++){
        var currentSvgCode = fs.readFileSync(`public/${svgDirs[i]}/${currentSvg[n]}`)
        svgList[i].svgs.push(
            {
                name: currentSvg[n],
                code: currentSvgCode
            }
        );
    }
};

console.log(`Svg folders loaded:\n${svgDirs}`);


// Add the "styles" folder
//####################################
app.use(express.static('resources/css'));


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
    res.redirect('/svgs');
});

app.get('/svgs', (req, res) => {
    res.render('svgs', {
        svgs: svgList
    });
});
app.get('/colors', (req, res) => {
    res.render('colors', {
        colors: colors
    });
});


// Custom 404 page
//####################################
app.use(function(req, res) {
    res.redirect('/');
});


// Starting server on port
//####################################
app.listen(port, () => console.log(`Server is now listening on port ${port}.`));