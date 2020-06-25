
module.exports = {

    getHomePage: (req, res) => {

        if(req.session.isLogined){
            res.render('home.ejs', {
                title: 'Happy birthday',
                msg: 'Hello '+req.session.username,
                isLogined: req.session.isLogined
            });
        }
        else{
            res.render('home.ejs', {
                title: 'Home',
                msg: 'please Login',
                isLogined: false
            })
        } 
    },

    getLoginPage: (req, res) => {

        res.render('login.ejs', {
            title: 'Login',
            msg_login: '',
            msg_reg: '',
            isLogined: false
        });
    },
    
}