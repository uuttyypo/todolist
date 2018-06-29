var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('login', { title: '用户登录' });
});


router.get('/home', function(req, res) {
    var user={
        username:'admin',
        password:'123456'
    }
    res.render('home', { title: 'Home', user: user });
});


router.route('/login')
.get(function(req, res) {
    res.render('login', { title: '用户登录' });
})
.post(function(req, res) {
    var user={
        username: 'admin',
        password: '123456'
    }
    if(req.body.username === user.username && req.body.password === user.password){
        res.redirect('/home');
    }
    res.redirect('/login');
   
});

router.get('/logout', function(req, res) {
    res.render('login', { title: '用户登录' });
    res.redirect('/login');

});


module.exports = router;