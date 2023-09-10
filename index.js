const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const robot = require("kbm-robot");
const config = require("./config.json");

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 

var dash_config = "";
fs.readFile("./dashboard/dash.json", "utf-8", function (err, data) {
    if(err){ console.error(err); return; } dash_config = JSON.parse(data);
});

function HTML_design(data_source){
    var code = "";
    code += '<html>';
    code += '<head>';
        code += '<meta charset="UTF-8">';
        code += '<meta http-equiv="X-UA-Compatible" content="IE=edge">';
        code += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        code += '<link rel="stylesheet" href="/dashboard/dash.css">'; 
        code += '<title>DASHBOARD NODEJS</title>'; 
    code += '</head>';
    code += '<body>';

    var pages = Object.keys(data_source).length;
    for(var page=1; page<=pages; page++){
        var disp = "";
        if(page == 1) { disp = "block"; } else { disp = "none"; }

        code += '<div id="pages' + page + '" style="display:' + disp + ';">';
            var btn_ind         = 0;
            const btn_data      = Object.keys(data_source[page]).length;
            const table_col     = config.UI.table_col;
            const table_cell_w  = Math.ceil(100/table_col);
            const table_row     = Math.ceil((btn_data/table_col));

            code += '<table>';
            for(var tab_row=1; tab_row<=table_row; tab_row++){
                code += '<tr>';
                for(var tab_col=1; tab_col<=table_col; tab_col++){
                    var inn = Object.keys(data_source[page])[btn_ind];
                    if(typeof inn == "undefined"){
                        code += '<td width="' + table_cell_w + '%"></td>';
                    } else {
                        code += '<td width="' + table_cell_w + '%">';
                        if(data_source[page][inn]["name"].length > 0){
                            var font = "";
                            var bacg = "";
                            if(data_source[page][inn]["font"].length > 0){ font = data_source[page][inn]["font"];}
                            if(data_source[page][inn]["bacg"].length > 0){ bacg = data_source[page][inn]["bacg"];}
                            var loop = ""
                            if(typeof data_source[page][inn]["loop"] != "undefined"){
                                loop = data_source[page][inn]["loop"];
                            }
                            code += '<div id="button" class="on" style="color:' + font + ';background:' + bacg + ';">';
                            code += '<a href="#" onClick="sendkey(\'' + page + '\',\'' + inn + '\',\'' + loop + '\');" style="color:' + font + ';">';
                        } else {
                            code += '<div id="button" class="off">';
                        }
                        code += '<h2>';
                        if(typeof data_source[page][inn]["name"] === "undefined") {
                        } else {
                            code += data_source[page][inn]["name"];
                        }
                        code += '<h2>';
                        code += '<h4>';
                        if(typeof data_source[page][inn]["info"] === "undefined"){
                        } else {
                            code += data_source[page][inn]["info"];
                        }
                        code += '<h4>';
                        if(data_source[page][inn]["name"].length > 0) {
                            code += '</a>';
                        }
                        code += '</div>';
                        code += '</td>';
                    }
                    btn_ind += 1;
                }
                code += '</tr>'; 
            }
            code += '<tr>';
            code += '<td class="table_menu" colspan="' + table_col + '">';
            code += '<table><tr>';
            for(var menu=1; menu<=pages; menu++){
                var menu_sel = "";
                if(menu == 1){ menu_sel = " on"; } else { menu_sel = " off"; }
                code += '<td>';
                if(menu == 1){
                    code += '<div id="menu' + menu +'" class="on">';
                    code += '<a href="#" onClick="show(\'' + menu + '\');">' + menu + '</a>';
                    code += '</div>';
                } else {
                    code += '<div id="menu' + menu + '" class="off">';
                    code += '<a href="#" onClick="show(\'' + menu + '\');">' + menu + '</a>';
                    code += '</div>';
                }
                code += '</td>';
            }
            code += '</tr></table>';
            code += '</td>';
            code += '</tr>';
            code += '</table>';
        code += '</div>';
    }
    code += '<script src="/dashboard/dash.js"></script>'
    code += '<audio id="audio_click" src="/dashboard/audio/click.mp3"></audio>'
    code += '<audio id="audio_switch" src="/dashboard/audio/switch.mp3"></audio>'
    code += '</body>';
    code += '</html>';
    return code;
}

const server = http.createServer((req, res) => {
    if(req.url == "/"){
        res.writeHead(200, { "Content-Type" : "text/html" });
        res.write(HTML_design(dash_config));
        res.end();
    } else if(req.url == "/cmd/" || req.url.includes("/cmd/")){
        //run cmd => send keys:
        var cmd_str = req.url.split("/cmd/")[1];
        var cmd = cmd_str.split("/");
        var p = cmd[0];
        var key = cmd[1];
        var loop = cmd[2];
        if(p.length > 0 && key.length > 0){
            if(dash_config[p].hasOwnProperty(key)){
                if(typeof loop === "undefined" || loop.length == 0 || loop == ""){
                    robot.startJar();
                    robot.press(key)
                        .sleep(100)
                        .release(key)
                        .sleep(100)
                        .go()
                        .then(robot.stopJar);
                } else {
                    robot.startJar();
                    robot.press(key)
                        .sleep(loop)
                        .release(key)
                        .sleep(loop)
                        .press(key)
                        .sleep(loop)
                        .release(key)
                        .sleep(loop)
                        .press(key)
                        .sleep(loop)
                        .release(key)
                        .sleep(loop)
                        .press(key)
                        .sleep(loop)
                        .release(key)
                        .sleep(loop)
                        .press(key)
                        .sleep(loop)
                        .release(key)
                        .sleep(loop)
                        .press(key)
                        .sleep(loop)
                        .release(key)
                        .sleep(loop)
                        .press(key)
                        .sleep(loop)
                        .release(key)
                        .sleep(loop)
                        .go()
                        .then(robot.stopJar);
                        delay(1000);
                }
                
                console.log(
                    "SEND >> " +
                    "KEY:  " + key + ", " +
                    "NAME: " + dash_config[p][key]["name"] + ", " + 
                    "INFO: " + dash_config[p][key]["info"] + ", " +
                    "LOOP: " + dash_config[p][key]["loop"] + ", " +
                    "PAGE: " + p
                );

            /*
               console.log("Press: " + key);
               robot.startJar("6");
               robot.press(key)
                .sleep(100)
                .release(key)
                .sleep(100)
                .type(key)
                .go()
                .then(robot.stopJar);
            */   
            
            } else {
                console.log("Key: " + key + " not found!");
            }
        }
        res.end();
    } else {
        //check others files:
        var request = url.parse(req.url, true);
        var action  = request.pathname;
        var filePath = path.join(__dirname, action).split("%20").join(" ");
        fs.exists(filePath, (exists) => {
            if(!exists){
                res.writeHead(404, {"Context-Type": "text/plain"});
                res.end("404 Not Found");
                return;
            }
            var ext = path.extname(action);
            var contentType = "text/plain";   
            if(ext == ".png") { contentType = "image/png"; }
            if(ext == ".css") { contentType = "text/css"; }
            if(ext == ".svg") { contentType = "image/svg+xml"; }
            res.writeHead(200, { "Content-Type" : contentType });
            fs.readFile(filePath, (err, content) => {
                res.end(content);
            })
        });
    }
});

server.listen(config.server.port, config.server.host, () => {
    console.log("Server start: " + config.server.host + ":" + config.server.port);
});