$(document).ready(function(){
    $.get('http://localhost:3001/load/svgs', function(svgList){
        for(var i=0; i<svgList.length; i++){
            $("main").append(`<h2>${svgList[i].directory}</h2>`);

            for(var n=0; n<svgList[i].svgs.length; n++){
                $("main").append(svgList[i].svgs[n].code);
            }
        };
    });
});