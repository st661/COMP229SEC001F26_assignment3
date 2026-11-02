import express from 'express'
import usersCtrl from '../controllers/users.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/users').post(usersCtrl.create)
router.route('/api/users').get(usersCtrl.list)

router.route('/api/users/:id')
// .get(authCtrl.requireSignin, authCtrl.hasAuthorization, usersCtrl.read)
.get(authCtrl.requireSignin, usersCtrl.read)
.put(authCtrl.requireSignin, authCtrl.hasAuthorization, usersCtrl.update)
.delete(authCtrl.requireSignin, authCtrl.hasAuthorization, usersCtrl.remove)

// router.route('/api/users')
// .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, usersCtrl.removeAll)

router.param('id', usersCtrl.usersByID)
router.route('/api/users/:id').get(usersCtrl.read)
router.route('/api/users/:id').put(usersCtrl.update)
router.route('/api/users/:id').delete(usersCtrl.remove)
router.route('/api/users/').delete(usersCtrl.removeAll)

export default router