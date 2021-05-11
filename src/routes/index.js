const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const validateSignUp = [
    check('email', 'Add valid email').isEmail(),
    check('password', 'Password must be 6 characters at least').isLength({ min: 6 }),
    check('name', 'Name must be 6 characters at least').isLength({ min: 6 }),
];
const validateSignIn = [check('email', 'Add valid email').isEmail(), check('password', 'Password must be 6 characters at least').isLength({ min: 6 })];

router.post('/signup', validateSignUp, userController.createUser);

router.post('/signin', validateSignIn, userController.signIn);

router.get('/signin', auth, userController.userAuth);

module.exports = router;
