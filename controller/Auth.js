const fire = require('../firebase');
const { firestore } = require('../firebase');
const fireAuth = fire.auth();
const db = fire.firestore();

exports.Register = (req, res) => {
    const email = req.body.emailReg;
    const username = req.body.usernameReg;
    const password = req.body.passwordReg;
    const cf_password = req.body.cfpasswordReg;

    const docRef = db.collection('users');


    if(password === cf_password){
        

        fireAuth.createUserWithEmailAndPassword(email, password)
        .catch((err) => {
            
            var message = err.message;

            if(err){
                res.render('login.ejs', {
                    title: 'Login',
                    msg_login: '',
                    msg_reg: message
                });
            }
                    
        })
        .then(() => {
            
            var user = fireAuth.currentUser;
            let data = {
                username: username,
                uid: user.uid
            }

            // update user profile with firebase Authentication
            user.updateProfile({
                displayName: username
            })
            .then(() => {
                console.log('update profile is success');

                // add collection in firestore (optional)
                let addDoc = docRef.add(data)
                .then((ref) => {
                    console.log("Ref: "+ref);
                });

                return addDoc.then(
                    res.render('login.ejs', {
                        title: '',
                        msg_login: 'user is already work ! please login',
                        msg_reg: ''
                    })
                );
            })
            .catch(err => {
                res.render('login.ejs', {
                    title: 'register error',
                    msg_login: '',
                    msg_reg: err.message
                });
            });

            
        })
        
    }
    else {
        res.render('login.ejs', {
            title:'',
            msg_login: '',
            msg_reg: 'password do not match'
        });
    }
};

exports.Login = (req,res) => {
    const email = req.body.email_login;
    const password = req.body.password_login;

    fireAuth.signInWithEmailAndPassword(email, password)
    .catch(err => {
        var message = err.message;

        if(err){
            res.render('login.ejs', {
                title: 'login error',
                msg_login: message,
                msg_reg: ''
            });
        }
    })
    .then(() => {
        const user = fireAuth.currentUser;
        req.session.isLogined = true;
        req.session.username = user.displayName
        res.redirect('/');
    })
};

exports.Logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};
