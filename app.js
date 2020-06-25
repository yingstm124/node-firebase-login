const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');


const { getHomePage, getLoginPage } = require('./routes');
const { Register, Login, Logout } = require('./controller/Auth');

const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(
    path.join(__dirname, 'public')
));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.get('/', getHomePage);
app.get('/login', getLoginPage);
app.get('/logout', Logout);
app.post('/register', Register);
app.post('/login', Login);


app.listen(process.env.PORT || 3000, () => {
    console.log("Port is working !!!")
});



