var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  var token = process.env.INSTAGRAM_TOKEN
  res.render('index', { title: 'Rollin\' Bones', data: token});
});

router.route('/contact').get(function(req, res, next){
  res.render('contact', {title: 'Contact'});
})

router.post('/contact', function (req, res) {
  console.log(req);
  console.log('hi')
  var mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PWORD
    }
  });

  mailOpts = {
    from: req.body.name + '&lt;' + req.body.email +'&gt;',
    to: process.env.EMAIL,
    subject: 'Website Contact Form',
    text: req.body.message
  }
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
        res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
    }
    //Yay!! Email sent
    else {
        res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
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
