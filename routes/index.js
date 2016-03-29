var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


/* GET home page. */
router.get('/', function(req, res, next) {
  var token = process.env.INSTAGRAM_TOKEN
  res.render('index', { title: 'Rollin\' Bones', data: token});
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

  console.log(mailOpts);
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      console.log(error)
      res.render('index', { msg: 'Error occured, message not sent.', err: true, page: 'index', data: token })
    }
    //Yay!! Email sent
    else {
        res.render('index', { msg: 'Message sent! Thank you.', err: false, page: 'index', data: token })
    }
  });
});



router.get('/admin', function(req, res){
  res.render('signin', {title: 'Admin Sign In'})
})

router.route('/contact').get(function(req, res, next){
  res.render('contact', {title: 'Contact'});
})


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
