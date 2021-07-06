const url = new URL(window.location.href);

if(url.pathname == "/"){
    $.get('http://localhost:3001/load/svgs', function(svgList){
        if(svgList.length > 0){        
            for(var i=0; i<svgList.length; i++){
                $(".svgContainer").append(`<h2>${svgList[i].directory}</h2>`);
        
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
                    $(".svgContainer").append(`
                        <a style="color:${color};" id="${svgList[i].svgs[n].name}">
                            ${svgList[i].svgs[n].code}
                        </a>
                    `);
                }
            };
        } else {
            $(".svgContainer").append(`
                <div class="error">
                    <h2>An error occured!</h2>
                    <p>
                        Either there are no folders with svgs to load or there
                        <br>was an error fetching json data from the api
                    </p>
                </div>
            `);
        }
    
        $("svg").click(function(){
            togglePopup($(this)[0]);
        });
    });
}

function togglePopup(code){
    // Visar / gömmer popup
    $(".popup").toggle();
    // Tar bort förra svg:n
    $(".svgPlaceholder").children().remove();
    // Hämtar nuvarande färgen på svg:n
    // och sätter den på svg:n i popup:en
    var svgColor = code.parentElement.style.color;
    $(".svgPlaceholder").append(code.outerHTML).css("color", svgColor);
    // Visar svg:ns namn och kod i popupen
    var svgName = code.parentElement.id;
    $("#svgName").html(svgName).css("color", svgColor);
    $("#svgCode").html(code.outerHTML);
}

// https://randomcolorgenerator.net/