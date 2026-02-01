const Router = require('express');
const router = new Router();
const passport = require('passport');
const controller = require('../controllers/user.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/users', passport.authenticate('jwt', { session: false }), controller.getUsers);
router.patch('/users/status', passport.authenticate('jwt', { session: false }), controller.blockUsers);
router.delete('/users', passport.authenticate('jwt', { session: false }), controller.deleteUsers);

module.exports = router;