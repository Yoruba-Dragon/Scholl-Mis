const express = require('express')
const router= express.Router ()
const {updatePerson,deleteProfile,getProfile} = require('../controllers/person.controller')
const {protect}=require('../middleware/auth.middleware')


router.put('/updateprofile', protect, updatePerson);
router.delete('/deleteprofile', deleteProfile);
router.get('/profile', protect, getProfile)


module.exports = router
