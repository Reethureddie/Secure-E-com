const express = require('express');
const router = express.Router();

const {
  signup,
  signin,
  signout,
  requireSignin,
  forgotpassword
} = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.post('/forgotpassword', forgotpassword);

module.exports = router;
