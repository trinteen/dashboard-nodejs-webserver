window.onload = () => {
    console.log("Loading...");
}

const show = (pages) => {
    const audio = document.querySelector("#audio_switch");
    const page = document.querySelectorAll('div[id^="pages"]');
    const menu = document.querySelectorAll('div[id^="menu"]');
    page.forEach(el => {
        var new_id = "pages" + pages;
        if(el.id == new_id){
            el.setAttribute("style", "display:block;");
            audio.play();
        } else {
            el.setAttribute("style", "display:none;");
        }
    });

    menu.forEach(el => {
        if(el.id == "menu" + pages){
            el.setAttribute("class", "on");
        } else {
            el.setAttribute("class", "off");
        }
    });
}

const sendkey = (pages, key, loop) => {
    const audio = document.querySelector("#audio_click");
    const req = new XMLHttpRequest();
    req.open("GET", "/cmd/" + pages + "/" + key + "/" + loop);
    audio.play();
    req.send();
    req.onreadystatechange = () => {
        if(req.readyState == 4){
            if(req.status != 200) {
                console.log("err status: " + req.status);
            }
        }
    }
}