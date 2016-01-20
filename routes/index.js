var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  var token = process.env.INSTAGRAM_TOKEN
  res.render('index', { title: 'Rollin\' Bones', data: token});
});

router.get('/admin', function(req, res){
  res.render('signin', {title: 'Admin Sign In'})
})

router.route('/contact').get(function(req, res, next){
  res.render('contact', {title: 'Contact'});
})

router.post('/contact', function (req, res) {
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
    to: process.env.EMAIL,
    subject: 'Website Contact Form',
    text: req.body.message
  };

  console.log(mailOpts);
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log(error)
      res.render('contact', { msg: 'Error occured, message not sent.', err: true, page: 'contact' })
    }
    //Yay!! Email sent
    else {
        res.render('contact', { msg: 'Message sent! Thank you.', err: false, page: 'contact' })
    }
  });
});

router.get('/about', function(req, res, next){
  res.render('about', {title: 'About' });
});

router.get('/menu', function(req, res, next){
  res.render('menu', {title: 'Menu'});
});

router.get('/catering', function(req, res, next){
  res.render('catering', {title: 'Catering'});
});



module.exports = router;
