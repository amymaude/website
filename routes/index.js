var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var token = process.env.INSTAGRAM_TOKEN
  console.log(token)
  res.render('index', { title: 'Rollin\' Bones', data: token});
});

router.get('/env', function(req, res){
  return({token: process.env.INSTAGRAM_TOKEN})
});

router.get('/contact', function(req, res, next){
  res.render('contact', {title: 'Contact'});
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
