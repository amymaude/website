var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin', function(req, res, next) {
  res.send('signin');
});

// router.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/');
// });
module.exports = router;
