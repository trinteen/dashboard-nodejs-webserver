WEB DASHBOARD PANEL 2.0 Beta
Autor: Trinteen, (c)2023


Working with:
--
NodeJS
Java (for kbm-robot module)


Audio sound from: Pixabay.com



Files:

>> ROOT\config.json:
    - server > host = IP address for start webserver
    - server > port = PORT for start webserver
    - UI > table_col = number column in table UI

>> ROOT\dasboard\dash.css:
    - Stylesheets for dasboard page

>> ROOT\dasboard\dash.js:
    - Functions dasboard page

>> ROOT\dasboard\dash.json:
    - settings keys (buttons) for dasboard page



    Structure file:

    {
        "1" : {                     <<== Number page/scene
            "Q" : {                 <<== Name key for send (simulation)
                "name" : "name",    <<== Name button in dasboard page
                "info" : "info",    <<== Information text in dasboard page
                "font" : "font",    <<== Hex code color for font
                "bacg" : "bacg",    <<== Hex code color for backgroud
                "loop" : "loop"     <<== Time MS waiting send key (section line 141 in index.js)
            }
        }
    }