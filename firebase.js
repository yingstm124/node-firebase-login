var firebase = require('firebase');

const config = {
    apiKey: "AIzaSyB-gtX3I6CMlv8-Pu3tTv4wqqzJ2THUCVA",
    authDomain: "hbs-web.firebaseapp.com",
    databaseURL: "https://hbs-web.firebaseio.com",
    projectId: "hbs-web",
    storageBucket: "hbs-web.appspot.com",
    messagingSenderId: "33248330697",
    appId: "1:33248330697:web:f83e9cf53162e06df99e18",
    measurementId: "G-39RX47YYH4"
};

var fire = firebase.initializeApp(config);


module.exports = fire;

