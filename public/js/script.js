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

const map = L.map('map').setView([0, 0], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© Aditya contributors'
}).addTo(map);