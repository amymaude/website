var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var token = process.env.INSTAGRAM_TOKEN


/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.user || null
  res.render('index', { title: 'Rollin\' Bones', data: token, user: user, msg: '' });
});

router.post('/', function (req, res) {

  var mailOpts, smtpTrans;
  var auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN
    }
  };
  smtpTrans = nodemailer.createTransport(mg(auth));

  mailOpts = {
    from: req.body.name +' <'+ req.body.email +'>',
    to: process.env.EMAIL,
    subject: 'Website Contact Form',
    text: "from: " + req.body.name +", "+  req.body.email +"\nmessage: " + req.body.message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.send('index', { msg: 'Error occured, message not sent.', err: true, page: 'index', data: token })
    }
    //Yay!! Email sent
    else {
      res.render('index', { msg: 'Message sent! Thank you.', err: false, page: 'index', data: token })
    }
  });
});


router.get('/login', function(req, res){
  var user = req.user || null
  res.render('signin', {title: "Sign-in", message: req.flash('error'),  user: user})
})

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureFlash: true })
);

router.get('/admin', function (req, res){
  if (!req.user) {
       return res.redirect('/');
     }
     else {
       return res.render('admin', {title: "Edit the site", user: req.user});
     }
}),

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy();
  res.redirect('/'); //Can fire before session is destroyed?
});


router.get('/catering', function(req, res, next){
  res.render('catering', {title: 'Catering'});
});



module.exports = router;
