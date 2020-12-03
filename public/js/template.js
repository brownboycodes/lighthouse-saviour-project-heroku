let mapContainer = document.getElementById('map-container');
//TODO: getting the toggle button
let toggle = document.getElementById('toggle');
let toggleCount = 0;
//*getting the size of the menu bar
const menubar = document.getElementById('menu-container');
let menuSize = menubar.offsetWidth;
let toggler;


if (window.matchMedia("(min-width: 300px) and (max-width: 600px)").matches) {
    if (sessionStorage.getItem('menuStatus') === null || sessionStorage.getItem('menuStatus') === 'open') {
        toggle.innerHTML = "&#10096;"
        toggle.title = "close menu"
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
        toggle.innerHTML = "&#10097;"
        toggle.title = "open menu"
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
            toggle.innerHTML = "&#10097;"
            toggle.title = "open menu"
            toggleCount = 1;
            sessionStorage.setItem('menuStatus', 'close');
        } else {
            //TODO: this part runs if menubar is closed
            toggleCount = 0;
            toggle.innerHTML = "&#10096;"
            toggle.title = "close menu"
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
        toggle.innerHTML = "&#10096;"
        toggle.title = "close menu"
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
        toggle.innerHTML = "&#10097;"
        toggle.title = "open menu"
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
            toggle.innerHTML = "&#10097;"
            toggle.title = "open menu"
            toggleCount = 1;
            sessionStorage.setItem('menuStatus', 'close');
        } else {
            //TODO: this part runs if menubar is closed
            toggleCount = 0;
            toggle.innerHTML = "&#10096;"
            toggle.title = "close menu"
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

document.body.addEventListener('contextmenu', (event) => event.preventDefault());
mapContainer.addEventListener('contextmenu', (event) => event.preventDefault());




//! not allowing right click on menubar
menubar.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    rightClick.style.display = 'none';
});

//! not allowing right click on toggle button
toggle.addEventListener('contextmenu', (event) => {
    event.preventDefault();

});


