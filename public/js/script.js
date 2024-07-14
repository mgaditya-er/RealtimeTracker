// connection req to backend
const socket = io();

if(navigator.geolocation)
    {
        navigator.geolocation.watchPosition(
            (position) => {
            const {latitude, longitude} = position.coords;
            socket.emit('send-location', {latitude, longitude});// send location to server
        }, (error) => {
            console.log(error);
        },
        {  
            enableHighAccuracy: true, // true for more accurate location
            timeout: 5000,// 5000ms for timeout

            maximumAge: 0,// 0 for no cache

        }
    );
    }

const map = L.map('map').setView([0, 0], 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Aditya contributors'
}).addTo(map);


const markers = {};
socket.on('receive-location', (data) => {
    const {id, latitude,longitude} = data;
    map.setView([latitude, longitude]);
    if(!markers[id])
    {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    
        updateMarkerCount()

    }
    markers[id].setLatLng([latitude, longitude]);
});

socket.on('disconnected', (data) => {
    const {id} = data;
    map.removeLayer(markers[id]);
    delete markers[id];
    updateMarkerCount()
});

function updateMarkerCount() {
    const markerCount = Object.keys(markers).length;
    console.log(`Current active markers: ${markerCount}`);
}