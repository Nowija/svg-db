$.get('http://localhost:3001/load/svgs', function(svgList){
    if(svgList.length > 0){        
        for(var i=0; i<svgList.length; i++){
            $("main").append(`<h2>${svgList[i].directory}</h2>`);
    
            for(var n=0; n<svgList[i].svgs.length; n++){
                const colors = [
                    '#35bf2f',
                    '#5979da',
                    '#f71828',
                    '#fc5b1f',
                    '#be42ff',
                    '#be4c57',
                    '#360cd9',
                    '#34b0f0'
                ];
                var color = colors[Math.floor(Math.random()*colors.length)];
                $("main").append(`
                    <a style="color:${color};">
                        ${svgList[i].svgs[n].code}
                    </a>
                `);
            }
        };
    } else {
        $("main").append(`
            <div class="error">
                <h2>An error occured!</h2>
                <p>
                    Either there are no folders with svgs to load or there
                    <br>was an error fetching json data from the api
                </p>
            </div>
        `);
    }

    // $("svg").click(function(){
    //     console.log($(this)[0].outerHTML);
    // });
});