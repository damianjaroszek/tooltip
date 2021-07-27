(function() {

    function createTooltip(text){
        var tooltip = document.createElement("div");
        tooltip.className = "tooltip";
       // tooltip.appendChild(document.createTextNode(text)); // równoznaczne zapisy
        tooltip.textContent=text;

        document.body.appendChild(tooltip);
    }

    function showTooltip(e){
        var text = e.target.title; // lub getAttribute("title"); - pobranie zawartości title
        //elementu na który została skierowana myszka
        createTooltip(text); // przekazanie tytułu do funkcji createTooltip, która stworzy wizualnie tooltip

    }


    function removeTooltip(e){
        //console.log("prywaciarzuu... gdzie jesteś??");
    }

    function assignEvent(elems, type, event){ //funckja dodająca do każdego
        // elems - elementu z title eventu oraz funcję do wykonania (mousenter showTooltip),
        // (mouseleave, removeTooltip)
        for (i=0; i<elems.length; i++){
            elems[i].addEventListener(type, event, false);
        }
    }



    function init(elems){ //funkcja init znajduje się w funkcji anonimowej
                          // i nie można się do niej odwołać z zewnątrz
                          // możemy ją jednak udostępnić poprzez window.t00ltip = init;
                          // umieszczone na samym końcu
                          // wtedy można się do niej odwołać z zewnątrz
                          // na przykład w index.html nad </body>
                          //<scripts>
                          //    t00ltip(document.querySelectorAll("[title]"));
                          //</script> 
                          // lub innym pliku js, albo tutaj poniżej
        
                          
       // obie funkcje przekazują elems - wszystkie elementy z html z tagiem title
       // mouseenter/mouseleave - event, showTooltip/removeTooltip = funkcja odpowiedzialna
       // za pokazywanie i ukrywanie tooltipa                   
       assignEvent(elems, "mouseenter", showTooltip); // funkcja pomocnicza, która
       // przypisuje element, event, funkcję do zdarzenia
       // elems[i].addEventListener(type, event, false);
                    
       assignEvent(elems, "mouseleave", removeTooltip); //to samo co powyżej, tylko
       // przekazuje inny event i wywołanie innej funkcji - usuwanie po opuszczenia
       // elementu myszką    


    }


window.t00ltip = init; // przekierowanie z t00ltip do init

})();