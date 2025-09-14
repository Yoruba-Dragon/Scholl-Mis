const express =require ('express')
const router= express.Router()
const {createFaculty, getAllFaculties, getFaculty, updateFaculty} = require('../controllers/faculty.controller')

router.get('/all', getAllFaculties)
router.get('/:id', getFaculty)
router.post('/create', createFaculty)
router.put('/update/:id', updateFaculty)




module.exports = router