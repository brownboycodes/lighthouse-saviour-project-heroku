let mapContainer = document.getElementById('map-container');

//TODO: declaring variables for later use
let latitude, longitude;
let gpsStatus = false;
let latUp, latDown, longLeft, longRight;
let mapTiles, mapAttributes;


//* custom leaflet marker
let LeafIcon = L.Icon.extend({
    options: {
        iconSize: [24, 24],
        iconAnchor: [0, 0]
    }
});

let gpsIcon = L.icon({
    iconUrl: '/img/location.png',
    iconSize: [36, 36], // size of the icon
    iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
});

//TODO: individually add ._icon.classList.add("marker-class"); to each icon

let isolatedIcon = new LeafIcon({ iconUrl: '/img/isolated.png' }),
    badPeopleIcon = new LeafIcon({ iconUrl: '/img/gone_bad.png' }),
    pervertIcon = new LeafIcon({ iconUrl: '/img/perverts.png' });


//TODO: selecting tile layer from session storage
if (sessionStorage.getItem('mapStyle') === null || sessionStorage.getItem('mapStyle') === 'carto') {
    mapTiles = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";
    mapAttributes = "<a href='https://cartodb.com/basemaps/'>CartoDB</a>";

} else if (sessionStorage.getItem('mapStyle') === 'osm') {
    mapTiles = "https://a.tile.osm.org/{z}/{x}/{y}.png";
    mapAttributes = "<a href='link':'http://openstreetmap.org'>OpenStreetMap</a>";
}

//TODO: changing map style on button click
let mapChanger = () => {
    if (sessionStorage.getItem('mapStyle') === null || sessionStorage.getItem('mapStyle') === 'carto') {
        sessionStorage.setItem('mapStyle', 'osm');
        window.location.reload();
    } else {
        sessionStorage.setItem('mapStyle', 'carto');
        window.location.reload();
    }
}

//* on GPS button clicked dialog box pops up seeking gps permission
let getGps = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        alert("Geolocation is not supported by this browser");
    }
};
//TODO: showPosition retrieves gps coordinates
let showPosition = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    //TODO: set myMap view to gps coordinates

    sessionStorage.setItem('gpsLat', lat);
    sessionStorage.setItem('gpsLong', long);

    sessionStorage.setItem('gpsStatus', true)
    window.location.reload();
};


if (sessionStorage.getItem('gpsLat') === null) {
    //* setting default geographical coordinates to {Hawthorn, Melbourne, Victoria, Australia}

    latitude = -37.824056697103664;  //19 characters
    longitude = 145.03154754638675;  //18 characters

} else {
    latitude = parseFloat(sessionStorage.getItem('gpsLat'));
    longitude = parseFloat(sessionStorage.getItem('gpsLong'));

}

//* setting the view of the map
let myMap = L.map(mapContainer, { zoomControl: false }).setView([latitude, longitude], 13);  //zoom:13
new L.Control.Zoom({
    minZoom: 5,
    maxZoom: 22, position: 'topright'
}).addTo(myMap);
L.control.scale().addTo(myMap);




//* adding a tile layer
L.tileLayer(mapTiles, {
    minZoom: 5,
    maxZoom: 22,
    attribution: mapAttributes,
}).addTo(myMap);

if (sessionStorage.getItem('gpsLat') !== null) {
    let gpsLocation = L.marker([latitude, longitude], { icon: gpsIcon }).addTo(myMap);
    gpsLocation._icon.classList.add("marker-class");
}
//TODO: set limits for maximum allowable gps coordinates

//* maximum gps latitude and longitude
latUp = latitude + .5;
latDown = latitude - .5;
//* maximum gps longitude
longLeft = longitude - .5;
longRight = longitude + .5;


//TODO: getting the toggle button
let toggle = document.getElementById('toggle');
let toggleCount = 0;
//*getting the size of the menu bar
const menubar = document.getElementById('menu-container');
let menuSize = menubar.offsetWidth;
let coords = "", eventLat = "", eventLong = "";
let localeData = document.getElementsByClassName('data-locales');
let toggler;

if (window.matchMedia("(min-width: 300px) and (max-width: 600px)").matches) {
    if (sessionStorage.getItem('menuStatus') === null || sessionStorage.getItem('menuStatus') === 'open') {
        toggle.innerHTML = "&#10096;";
        toggle.title = "close menu";
        mapContainer.parentElement.style.float = 'right';
        mapContainer.style.width = '40vw'; //*map-container
        mapContainer.parentElement.style.width = '40vw'; //*map-portion
        menubar.style.display = 'block'; //*menu-portion
        menuSize = menubar.offsetWidth;
        toggleCount = 0;
    } else {
        menubar.style.display = 'none';
        mapContainer.parentElement.style.width = '100vw';
        mapContainer.style.width = '100vw';
        mapContainer.parentElement.style.float = 'none';
        menuSize = menubar.offsetWidth;
        toggle.innerHTML = "&#10097;";
        toggle.title = "open menu";
        toggleCount = 1;
    }


    toggler = () => {
        //? check if menubar is open or closed
        if (toggleCount === 0) {
            //TODO: this part runs if menubar is open
            menubar.style.display = 'none';
            mapContainer.parentElement.style.width = '100vw';
            mapContainer.style.width = '100vw';
            mapContainer.parentElement.style.float = 'none';
            menuSize = menubar.offsetWidth;
            toggle.innerHTML = "&#10097;";
            toggle.title = "open menu";
            toggleCount = 1;
            sessionStorage.setItem('menuStatus', 'close');
        } else {
            //TODO: this part runs if menubar is closed
            toggleCount = 0;
            toggle.innerHTML = "&#10096;";
            toggle.title = "close menu";
            mapContainer.parentElement.style.float = 'right';
            mapContainer.style.width = '40vw';
            mapContainer.parentElement.style.width = '40vw';
            menubar.style.display = 'block';
            menuSize = menubar.offsetWidth;
            sessionStorage.setItem('menuStatus', 'open');
        }

    };
} else {
    //* if user refreshes while menu is closed or open
    //* state of menubar remains same as before refresh
    if (sessionStorage.getItem('menuStatus') === null || sessionStorage.getItem('menuStatus') === 'open') {
        toggle.innerHTML = "&#10096;";
        toggle.title = "close menu";
        mapContainer.parentElement.style.float = 'right';
        mapContainer.style.width = '77vw';
        mapContainer.parentElement.style.width = '77vw';
        menubar.style.display = 'block';
        menuSize = menubar.offsetWidth;
        toggleCount = 0;
    } else {
        menubar.style.display = 'none';
        mapContainer.parentElement.style.width = '100vw';
        mapContainer.style.width = '100vw';
        mapContainer.parentElement.style.float = 'none';
        menuSize = menubar.offsetWidth;
        toggle.innerHTML = "&#10097;";
        toggle.title = "open menu";
        toggleCount = 1;
    }


    toggler = () => {
        //? check if menubar is open or closed
        if (toggleCount === 0) {
            //TODO: this part runs if menubar is open
            menubar.style.display = 'none';
            mapContainer.parentElement.style.width = '100vw';
            mapContainer.style.width = '100vw';
            mapContainer.parentElement.style.float = 'none';
            menuSize = menubar.offsetWidth;
            toggle.innerHTML = "&#10097;";
            toggle.title = "open menu";
            toggleCount = 1;
            sessionStorage.setItem('menuStatus', 'close');
        } else {
            //TODO: this part runs if menubar is closed
            toggleCount = 0;
            toggle.innerHTML = "&#10096;";
            toggle.title = "close menu";
            mapContainer.parentElement.style.float = 'right';
            mapContainer.style.width = '77vw';
            mapContainer.parentElement.style.width = '77vw';
            menubar.style.display = 'block';
            menuSize = menubar.offsetWidth;
            sessionStorage.setItem('menuStatus', 'open');
        }

    };
}


//TODO: right click state management
const rightClick = document.getElementById('right-click')
mapContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    coords = myMap.mouseEventToLatLng(event);
    eventLat = coords.lat;
    eventLong = coords.lng;

    if (sessionStorage.getItem('gpsStatus') === null) {
        alert('set GPS first!');
    } else {

        if (event.target.className === "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive marker-class") {
            alert('you cannot mark the same location once again !');
        } else if (eventLat < latDown || eventLat > latUp || eventLong < longLeft || eventLong > longRight) {
            alert("you can only mark locations within a 55.5 km radius !");
            rightClick.style.display = 'none';
        } else {
            //TODO: if right click crosses the map width
            if (event.clientX + rightClick.offsetWidth > screen.availWidth) {
                rightClick.style.left = event.clientX - rightClick.offsetWidth - menuSize + 'px';

                //TODO: if right click crosses the map height
                if ((event.clientY + rightClick.offsetHeight) > screen.availHeight) {
                    rightClick.style.top = event.clientY - rightClick.offsetHeight + 'px';
                } else {
                    //TODO: if right click doesn't cross the map height
                    rightClick.style.top = event.clientY + 'px';
                }
                rightClick.style.display = 'block';

            } else if ((event.clientY + rightClick.offsetHeight) > screen.availHeight) {
                //TODO: if right click crosses the map height
                rightClick.style.top = event.clientY - rightClick.offsetHeight + 'px';
                rightClick.style.left = event.clientX - menuSize + 'px';

                rightClick.style.display = 'block';

            } else if ((event.clientX - menuSize - rightClick.offsetWidth) < 0) {
                //TODO: if right click crosses the map start from the left
                rightClick.style.display = 'none';

            } else {
                //TODO: if right click is made anywhere in between the map boundaries
                rightClick.style.left = event.clientX - menuSize + 'px';
                rightClick.style.top = event.clientY + 'px';

                rightClick.style.display = 'block';
            }



            //TODO: close right click menu
            mapContainer.addEventListener('click', e => rightClick.style.display = 'none');

        }

    }

});


//! not allowing right click on menubar
menubar.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    rightClick.style.display = 'none';
});
//! not allowing right click on right click menu
rightClick.addEventListener('contextmenu', (event) => {
    event.preventDefault();

});
//! not allowing right click on toggle button
toggle.addEventListener('contextmenu', (event) => {
    event.preventDefault();

});

let isolatedCount = (dataLength) => {

    localeData[0].innerText = dataLength;
};
let badPeopleCount = (dataLength) => {

    localeData[1].innerText = dataLength;
};
let pervertCount = (dataLength) => {

    localeData[2].innerText = dataLength;
};


let isolatedPlace = () => {

    fetch('/isolatedplaces', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            latitude: eventLat,
            longitude: eventLong
        })
    })
        .then((returnedID) => returnedID.json().then((data) => isolatedCount(data)))
        .catch((err) => console.log("error " + err));

    rightClick.style.display = 'none';
    L.marker([eventLat, eventLong], { icon: isolatedIcon }).addTo(myMap)._icon.classList.add("marker-class");
};

let badPeople = () => {

    fetch('/badpeople', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            latitude: eventLat,
            longitude: eventLong
        })
    })
        .then((returnedID) => returnedID.json().then((data) => badPeopleCount(data)))
        .catch((err) => console.log("error " + err));
    //! the then method is working use it update live commits

    rightClick.style.display = 'none';
    L.marker([eventLat, eventLong], { icon: badPeopleIcon }).addTo(myMap)._icon.classList.add("marker-class");

};

let lewdBehaviour = () => {

    fetch('/perverts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            latitude: eventLat,
            longitude: eventLong
        })
    })
        .then((returnedID) => returnedID.json().then((data) => pervertCount(data)))
        .catch((err) => console.log("error " + err));
    rightClick.style.display = 'none';
    L.marker([eventLat, eventLong], { icon: pervertIcon }).addTo(myMap)._icon.classList.add("marker-class");

};

//! gotta learn sequelize querying
window.onload = async () => {

    // ! something is going wrong with fetching isolated places
    //TODO: display all isolated places from database
    let isolatedSpaces = await fetch('/isolatedplaces');
    let isolatedData = await isolatedSpaces.json();

    for (let item of isolatedData) {

        L.marker([parseFloat(item.latitude), parseFloat(item.longitude)], { icon: isolatedIcon }).addTo(myMap)._icon.classList.add("marker-class");
        isolatedCount(isolatedData.length);
    }
    // ! needs to be fixed ASAP

    //TODO: display all places with bad people from database
    let badSpaces = await fetch('/badpeople');
    let badPeopleData = await badSpaces.json();

    for (let item of badPeopleData) {

        L.marker([parseFloat(item.latitude), parseFloat(item.longitude)], { icon: badPeopleIcon }).addTo(myMap)._icon.classList.add("marker-class");
        badPeopleCount(badPeopleData.length);
    }


    //TODO: display all places where people experienced lewd behaviour from database
    let pervertedSpaces = await fetch('/perverts');
    let pervertData = await pervertedSpaces.json();

    for (let item of pervertData) {

        L.marker([parseFloat(item.latitude), parseFloat(item.longitude)], { icon: pervertIcon }).addTo(myMap)._icon.classList.add("marker-class");
        pervertCount(pervertData.length);
    }
};



let instructionsBox = document.getElementById('instructionsBox');

let showInstructions = () => {
    instructionsBox.style.display = 'grid';
};

let closeInstructionsBox = () => instructionsBox.style.display = 'none';

instructionsBox.addEventListener('contextmenu', e => e.preventDefault());

let rapeZone = async () => {
    if (document.getElementById('checker').checked) {
        //TODO: display all places where people are watching rape pornography
        let rapeSpaces = await fetch('/rapeporn');
        let rapeData = await rapeSpaces.json();

        for (let item of rapeData) {

            L.circle([parseFloat(item.latitude), parseFloat(item.longitude)], { radius: 10000 }).setStyle({ color: 'red' }).addTo(myMap).bindTooltip(item.city).openTooltip();

        }

        myMap.setView([27.591066424185087, 79.66674442009051], 7);
    } else {
        window.location.reload();
    }
};

setInterval(() => window.location.reload(), 250000);
