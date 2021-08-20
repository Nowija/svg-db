$.get(`${window.location.href}load/svgs`, function(svgList){
    if(svgList.length > 0){
        for(var i=0; i<svgList.length; i++){
            $(".svgContainer").append(`<h2>${svgList[i].directory}</h2>`);
    
            for(var n=0; n<svgList[i].svgs.length; n++){
                $(".svgContainer").append(`
                    <a style="color:#615f68;" id="${svgList[i].svgs[n].name}">
                        ${svgList[i].svgs[n].code}
                    </a>
                `);
            }
        };
    } else {
        $(".svgContainer").append(`
            <div class="error">
                <h2>ERROR</h2>
                <p>
                    No svgs to load!
                </p>
            </div>
        `);
    }

    $("svg").click(function(){
        togglePopup($(this)[0]);
    });
});

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