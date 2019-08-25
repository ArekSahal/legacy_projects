var names = ["Love", "Work", "Design", "Live", "See", "Feel", "breathe", "Are", "Do"];
var count = 0;
var myTimer;


$(document).ready(
    function() {
        setTimeout(function(){
            start();
        },3000)
    }
);

function rotAnimation() {
    count++;
    var nextName = names[count % names.length];
    $("#placeholder").html(nextName);
    $(".switch-container").addClass("animation");
    $(".switch-container").css("width",((document.getElementById("placeholder").offsetWidth) + 5) + "px");
    setTimeout(function() {
        $(".switch-container").html(nextName);
        $(".switch-container").removeClass("animation")
    }, 200);
}

function start() {
    //change animation by uncommenting typing animation and commenting rotanimation also add blinking class to switch-container
    $(".switch-container").removeClass("buffer");
    clearInterval(myTimer);
    //typingAnimation();
    rotAnimation();
    myTimer = setInterval(function(){
        //typingAnimation()
        rotAnimation();
    }, 2000)
}



function typingAnimation() {
    count++;
    var nextName = names[count % names.length];
    $("#placeholder").html(nextName);
    $(".switch-container").addClass("typing");
    $(".switch-container").css("max-width",((document.getElementById("placeholder").offsetWidth) + 3) + "px");
    $(".switch-container").html(nextName);
    setTimeout(function() {
        $(".switch-container").removeClass("typing");
    }, 1500);
}



//parralax


$(document).scroll(function() {
    var currentScroll = $(document).scrollTop();
    if(currentScroll < $(".header").height() - 305 ) {
        $(".header-text").css({
            "transform": "translate(-" + currentScroll * 2 / 70 + "%,-" + currentScroll * 17 /70 + "%)"
        })
    }
    else {
    }
});





//Tile-flip For Another Day

/*var amountOfTiles = 399;

function addTiles() {
    for (i = 0; i < amountOfTiles; i++) {
        $(".tile-grid").append("<div class='tile' id='tile" + i +"'>  </div>")
    }
}


function tileFlip() {
    for (i = 0; i < amountOfTiles; i++){
        var index = i;
        setTimeout(function(a) {
            $("#tile" + a).addClass("tile-flip")
        }, 10*i, i)
    }
}
*/