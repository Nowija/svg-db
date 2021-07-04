// Imports
//####################################
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3001;
const handlebars = require('express-handlebars');


// Svgs
//####################################
var svgNames = fs.readdirSync('public/');
var svgList = [];

for(var i=0; i<svgNames.length; i++){
    svgList.push(
        {
            name: svgNames[i],
            id: svgNames[i].replace('.svg', ''),
            number: i+1,
            code: fs.readFileSync(`public/${svgNames[i]}`)
        }
    );
}

console.log(`Svgs loaded: ${svgList.length}`);


// Colors
//####################################
const colors = [
    {
        name: 'Color-picker',
        testing: [
            "#262D37",
            "#39414E",
            "#59D4DB",
            "#599DDB",
            "#5AD9A4",
            "#27AE60",
            "#FF4758",
            "#FF2539"
        ]
    },
    {
        name: 'Fireship',
        testing: [
            "#0F0E17",
            "#85FD78",
            "#75F661",
            "#46ACDC",
            "#1692CD",
            "#FE70DC",
            "#FE53F8",
            "#FEE90C",
            "#FF9F4F",
            "#FD7273"
        ]
    },
    {
        name: 'Figma',
        testing: [
            "#333333",
            "#4f4f4f",
            "#828282",
            "#bdbdbd",
            "#e0e0e0", 
            "#f2f2f2",
            "#eb5757",
            "#f2994a",
            "#f2c94c",
            "#219653",
            "#27ae60",
            "#6fcf97",
            "#2f80ed",
            "#2d9cdb",
            "#56ccf2",
            "#9b51e0",
            "#bb6bd9"
        ]
    }
];

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