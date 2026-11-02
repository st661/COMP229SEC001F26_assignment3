import express from 'express'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router()
router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.param('userId', userCtrl.userByID)
router.route('/api/users/:userId').get(userCtrl.read)
router.route('/api/users/:userId').put(userCtrl.update)
router.route('/api/users/:userId').delete(userCtrl.remove)

// const router_contacts = express.Router();
// const router_projects = express.Router();
// const router_qualifications = express.Router();
// const router_users = express.Router();
// const { router_contacts, router_projects, router_qualifications, router_users } = express.Router();

// Contacts
// router_contacts.route('/api/contacts').post(contactCtrl.create)
// router_contacts.route('/api/contacts').get(contactCtrl.list)
// router_contacts.param('contactId', contactCtrl.contactByID)
// router_contacts.route('/api/contacts/:id').get(contactCtrl.read)
// router_contacts.route('/api/contacts/:id').put(contactCtrl.update)
// router_contacts.route('/api/contacts/:id').delete(contactCtrl.remove)
// router_contacts.route('/api/contacts/').delete(contactCtrl.removeAll)


// Projects
// router_projects.route('/api/projects').post(projectCtrl.create)
// router_projects.route('/api/projects').get(projectCtrl.list)
// router_projects.param('projectId', projectCtrl.projectByID)
// router_projects.route('/api/projects/:id').get(projectCtrl.read)
// router_projects.route('/api/projects/:id').put(projectCtrl.update)
// router_projects.route('/api/projects/:id').delete(projectCtrl.remove)
// router_projects.route('/api/projects/').delete(projectCtrl.removeAll)


// Qualifications
// router_qualifications.route('/api/qualifications').post(qualificationCtrl.create)
// router_qualifications.route('/api/qualifications').get(qualificationCtrl.list)
// router_qualifications.param('qualificationId', qualificationCtrl.qualificationByID)
// router_qualifications.route('/api/qualifications/:id').get(qualificationCtrl.read)
// router_qualifications.route('/api/qualifications/:id').put(qualificationCtrl.update)
// router_qualifications.route('/api/qualifications/:id').delete(qualificationCtrl.remove)
// router_qualifications.route('/api/qualifications/').delete(qualificationCtrl.removeAll)


// Users
// router_users.route('/api/users').post(userCtrl.create)
// router_users.route('/api/users').get(userCtrl.list)
// router_users.param('userId', userCtrl.userByID)
// router_users.route('/api/users/:id').get(userCtrl.read)
// router_users.route('/api/users/:id').put(userCtrl.update)
// router_users.route('/api/users/:id').delete(userCtrl.remove)
// router_users.route('/api/users/').delete(userCtrl.removeAll)


export default router
// module.exports = router;
// module.exports = {
//     router_contacts, 
//     router_projects, 
//     router_qualifications, 
//     router_users
// };