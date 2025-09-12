const Person = require('../models/person.models');
const User = require('../models/users.models');
const Student =require('../models/students.models')
const Lecturer = require('../models/lecturer.models')


exports.updatePerson = async (req, res) => {
    try{


        console.log('=== updatePerson called ===');
    console.log('req.user:', req.user);
    console.log('req.headers:', req.headers);
    console.log('req.body:', req.body);

        const userId = req.user.id;
        const userRole = req.user.role;
        const updates = req.body;


        let person = await User.findOne({user: userId});

        if (!person){
        
        const personType = userRole === 'lecturer' ? 'lecturer' : 'student';

        const newPersonData ={
             ...updates,
            user: userId,
           
            };


            if (personType ==='student'){
                const Student = require('../models/students.models');
                person = new Student(newPersonData);
            }
            else if(personType === 'lecturer'){
                const Lecturer = require('../models/lecturer.models');
                person = new Lecturer(newPersonData);
            }

            await person.save();
            return res.status(201).json({success: true, message: 'Person created',data: person});


        }
        const allowedBaseFields = [
            'lastName', 'firstName', 'otherName','gender',
             'email', 'dateOfBirth', 'phoneNumber',
             'emergencyContactName', 'emergencyContact', 'address'];
        
        
        const allowedStudentFields = [
            'level', 'department', 'faculty', 'program', 'admissionYear', 'status',
            'graduationDate','cgpa', 'accommodationType'
        ];
        const allowedTeacherFields = [
           'employeeId', 'department', 'faculty', 'qualification', 'specialization'
        ];
        let allowedFields = [...allowedBaseFields];

        if (userRole === 'student'){
            allowedFields = [...allowedFields, ...allowedStudentFields];
        } else if (userRole === 'lecturer'){
            allowedFields = [...allowedFields, ...allowedTeacherFields];
        }

        const filteredUpdate={};
        Object.keys(updates).forEach(key=>{
            if( allowedFields.includes(key)){
                filteredUpdate[key]= updates[key];
            }
        })
       delete filteredUpdate.type;
       delete filteredUpdate.user;

       const updatePesron = await Person.findByIdAndUpdate(
        person._id,
        filteredUpdate,
        {
            new:true,
            runValidators: true,
            populate:
            [{path:'department',select :'name code'},
            {path:'faculty', select: 'name code'}]
         });res.status(200).json({success: true, message: 'Person updated', data: updatePesron});
         
        }catch (error){
        console.error('Error updating person:', error);
        res.status(500).json({success: false, message: 'Error updating person', error: error.message});
        
        if (error.name=== 'ValidationError'){
            return res.status(400).json({success: false, message: 'Validation error', error: error.message});
        }
        if (error.code === 11000){
            return res.status(400).json({success: false, message: 'Email or student already exists', error: error.message});
        }
        res.status(500).json({success: false, message: 'Server error', error: error.message});
}       

};
exports. getProfile = async(req,res)=>{
    try{
        const userId = req.user.id
        const person = await Person.findOne({ user : userId })
        .populate('department', 'name code')
        .populate('faculty', 'name code')
        .populate('user', 'username role lastLogin createdAt');

        if (!person){
            return res.status(404).json({success: false, message: 'Person not found'});
        }
        res.status(200).json({success: true, data: person});
    }catch (error){
        console.error('Error fetching profile:', error);
        res.status(500).json({success: false, message: 'Error fetching profile', error: error.message});
    }
}
exports.deleteProfile = async (req,res)=>{
    try{
        const userId = req.user.id;

        const person = await Person.findOneAndDelete({user: userId})
        if (!person){
            return res.status(404).json({success: false, message: 'Person not found'});
        }
        await User.findByIdAndDelete(userId)

        res.status(200).json({success: true, message: ''})
    }catch (error){
        console.error('Error deleting profile:', error);
        res.status(500).json({success: false, message: 'Error deleting profile', error: error.message});
    }
}