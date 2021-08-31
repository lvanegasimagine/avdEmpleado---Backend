const router = require('express').Router();
const { addUser, lista} = require('../controller/user.controller.js');


router.post('/register', addUser);
router.get('/list', lista);
// router.post('/login', login);

module.exports = router;