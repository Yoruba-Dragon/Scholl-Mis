const express= require('express')
const  router= express.Router()
const {createDepartment, getAllDepartments, getDepartment, updateDepartment} = require('../controllers/department.controller')
router.post('/create', createDepartment)
router.get('/all', getAllDepartments)
router.get('/:id', getDepartment)

router.put('/update/:id', updateDepartment)

module.exports = router