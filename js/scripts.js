(function() {

    var globalTooltip =null;


    function createTooltip(text, options){ //funkcja tworząca tooltip i wstawiająca w niego napis (pobrany ze znacznika title z html)
        var tooltip = document.createElement("div"); //tworzymy element "div"
        tooltip.className = "tooltip hidden";// do elementu "div" dodajemy klasę CSS tooltip klasa hidden dodaje animację ale musimy ją później usunąć
       // tooltip.appendChild(document.createTextNode(text)); // równoznaczne zapisy
        tooltip.textContent=text; // dodajemy do tooltip jego opis (pobrany z title z html)
        //tooltip.style.display="absolute";

        document.body.appendChild(tooltip); // przypinamy tooltip do body, najpierw wstawiamy później stylujemy
        
        //tooltip.style.width = options.w + 'px';
        tooltip.style.top = (options.y - tooltip.offsetHeight - 10) + 'px'; //pozycjonowanie tootipa w osi Y
                            //(odsunięcie od góry taga html z title - wysokość tooltpia - 10) - zamiast wysokość tooltipa
                            // można byłoby przyjąć od razu z palca wartość nieco większą niż - 10 ale
                            // dzięki temu mamy zachowaną dynamikę. Gdyby tooltip zawierał dużo tekstu
                            // to odsunąłby się tylko o stała wartość z palca a tak odsuwa się o swoją wysokość i wartość z palca
        console.log('tooltip offset height: '+ tooltip.offsetHeight +'\n element with html tag title: '+ options.y);

        tooltip.style.left = (options.x + (options.w/2) - (tooltip.offsetWidth/2)) + 'px';
                            //odsunięcie taga title od lewej + połowa szerokości taga title - połowa szerokości tooltipa
        
        console.log('tooltip offset left: '+ tooltip.offsetWidth +'\n element width html tag title: '+ options.x);
        
       tooltip.classList.remove("hidden"); // usuwamy hidden z css, bo nie wyświetli się element (animacja go wygasi i będzie niewidoczny)
      

        globalTooltip=tooltip; // dodanie do globalnej zmiennej naszego całego tooltipa (diva z klasą i opisem z title z html)
    }

    function showTooltip(e){
       
        var options = { //zbieranie współrzędnych, w których znajduje się na stronie tag z title z html
            w: e.target.offsetWidth, //pokaż jaką ma szerokość w px obiekt na który najechałeś myszką
            x: e.target.offsetLeft, //pokaż ile px obiekt, na który najechałeś myszką jest odsunięty od lewej
            y: e.target.offsetTop  //pokaż ile px obiekt, na który najechałeś myszką jest odsunięty od góry
        };

        console.log(options); // wyświetlanie informacji gdzie znajduje się na stronie tag z tiltle (html)

        var text = e.target.title; // lub getAttribute("title"); - pobranie zawartości title
        //elementu na który została skierowana myszka
        // var element =e.target;
        
    

        createTooltip(text, options); // przekazanie tytułu do funkcji createTooltip, która stworzy wizualnie tooltip
        
        e.target.removeAttribute('title'); // usunięcie taga title znacznika z html aby zapobiec domyślnej
                                          // akcji przeglądarki - wyświetlanie domyślnego tootltpia przeglądarki
                                          // aby wyświetlał się tylko nasz

    }


    function removeTooltip(e){
        e.target.setAttribute("title", globalTooltip.textContent); //pobranie z elementu na który najechaliśmy myszką i ustawienie
                                                                   //mu spowrotem title (ze względu na brak możliwości
                                                                   // zablokowania domyślnej akcji przeglądarki)
                                                                   // a tytuł podbieramy z globalTooltip przed jego usunięciem
        globalTooltip.parentNode.removeChild(globalTooltip); //odwołanie do zmiennej globalnej globalTooltip, która
                                                             // w createTooltip dodawała cały Tooltip do tej zmiennej.
                                                             // zmienna globalna ponieważ, można się do niej odwołać
                                                             // w każdej funkcji
                                                             // dzięki tej funkcji mamy widoczny tylko jeden dymek,
                                                             // na który aktualnie najeżdżamy myszką
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