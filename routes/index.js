var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


/* GET home page. */
router.get('/', function(req, res, next) {
  var token = process.env.INSTAGRAM_TOKEN
  var user = req.user || null
  res.render('index', { title: 'Rollin\' Bones', data: token, user: user});
});

router.post('/', function (req, res) {
  var token = process.env.INSTAGRAM_TOKEN
  var mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PWORD
    }
  });
  mailOpts = {
    from: req.body.name +' <'+ req.body.email +'>',
    to: "pitmaster@rollinbonesbbq.com",
    subject: 'Website Contact Form',
    text: "from: " + req.body.name +", "+  req.body.email +"\nmessage: " + req.body.message
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('index', { msg: 'Error occured, message not sent.', err: true, page: 'index', data: token })
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
