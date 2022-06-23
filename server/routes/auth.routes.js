const router = require('express').Router();
const { signUpUser, loginUser, logOutUser } = require('../controller/user.controller');

router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.post('/logout', logOutUser)

module.exports = router;
