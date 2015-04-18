(function(){

    var event = document.getElementsByClassName("tL event"),
        autoPlay_event = 0,
        autoPlay,
        autoPlay_timer,
        bodyClicks = false;

    function removeOpenEvents()
    {
        for(var i=0; i<event.length;i++)
        {
            var addClass = "";
            if ((" " + event[i].className + " ").replace(/[\n\t]/g, " ").indexOf(' read-event ') > -1) {
                addClass = addClass +  " read-event ";
            }
            if ((" " + event[i].className + " ").replace(/[\n\t]/g, " ").indexOf(' early-open ') > -1) {
                addClass = addClass + " early-open ";
            }

            event[i].className = " tL event " + addClass;

        }
    }

    function scrollTo(element, to, duration) {
        if (duration < 0) return;
        var difference = to.offsetTop + 160 - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to.offsetTop + 160) return;
            scrollTo(element, to, duration - 10);
            if(element.scrollTop === 0)
            {
                to.scrollIntoView()
            }
        }, 10);
    }


    for(var i=0; i<event.length;i++)
    {
        event[i].addEventListener("click", function(e){

            e.stopPropagation(); // stops the body click from firing

            if(autoPlay_timer)
            {
                pause();
            }

            setTimeout(function(){ if (autoPlay_timer === null) { removeStatusBar(); } }, 100);

            setTimeout(function(){ bodyClicks = true; }, 50);

            document.getElementById("tL").className = "";

            if ((" " + this.className + " ").replace(/[\n\t]/g, " ").indexOf(' open ') > -1) {
                this.className = this.className.replace(" open ", "") + " read-event ";
            }else{
                removeOpenEvents();
                this.className = this.className + " open read-event ";
                if(this.dataset.side == "left" || this.getAttribute("data-side") == "left")
                {
                    document.getElementById("tL").className = " open-left ";
                }else{
                    document.getElementById("tL").className = " open-right ";

                }
            }

           scrollTo(document.body, this, 600);

        });
    }

    function removeStatusBar(){
        var node = document.getElementById("autoPlay-status");
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }

    function pause()
    {
        setTimeout(function(){ document.getElementById("tL-autoPlay").className = "tL ball"; }, 50);
        clearTimeout(autoPlay_timer);
        autoPlay_timer = null;
        bodyClicks = true;
    }

    function play(onEvent)
    {
        setTimeout(function(){
            document.getElementById("tL-autoPlay").className = document.getElementById("tL-autoPlay").className + " on ";
        },200);

        removeStatusBar();
        bodyClicks = false;

        autoPlay = event[onEvent];
        autoPlay_event = onEvent;

        var timer = autoPlay.dataset.timer || autoPlay.getAttribute("data-timer") || 12000;
        var statusTimer = timer - 450;

        var statusNode = document.createElement("div");
        statusNode.id = "autoPlay-status";
        statusNode.style.transition = " all " +  statusTimer + "ms linear";
        autoPlay.appendChild(statusNode);
        setTimeout(function(){var playStatus = document.getElementById("autoPlay-status"); if (playStatus) playStatus.style.width="100%";}, 115);

        if((" " + autoPlay.className + " ").replace(/[\n\t]/g, " ").indexOf(' open ') > -1){
            scrollTo(document.body, autoPlay, 600);
        }else{
            autoPlay.click();
        }

        autoPlay_timer = setTimeout(function(){

            var nextEvent = autoPlay_event + 1;
            if(nextEvent >= event.length){
                nextEvent = 0;
                pause();
                setTimeout(function(){autoPlay.click(); autoPlay_event = 0;},5);
                return;
            }
            play(nextEvent);
        }, timer);
    }

    document.getElementById("tL-autoPlay").addEventListener("click", function () {
        if(!autoPlay_timer){
            play(autoPlay_event);
        }
    });

    // Click on the body to close the bring the timeline back to the center
    document.addEventListener("click", function () {
        if(bodyClicks !== false) {
            if(autoPlay_timer){
                pause();
            }
            document.getElementById("tL").className = "";
            removeOpenEvents();
        }
    });

}());
