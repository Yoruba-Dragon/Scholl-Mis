const Department = require('../models/department.models');
const Faculty = require('../models/faculty.models');




exports.createDepartment = async(req,res)=>{
    try{
        const {name, code, faculty, head, establishedDate}= req.body;
        const existingDepartment = await Department.findOne({code})
        if(existingDepartment){
           return res.status(400).json({success: false, message:"Department with this code already exists"})

        }
        const newDepartment = new Department({name, code, faculty, head, establishedDate})
        await newDepartment.save()
        return res.status(201).json({success:true, message: "Department created successfully", data: newDepartment})
    }catch(error){
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }
}

exports.getAllDepartments = async(req,res)=>{
    try{
        const departments = await Department.find().populate('faculty', 'name').populate('head', 'name email');
        res.status(200).json({success:true, data: departments})
        if(!departments){
            return res.status(404).json({success:false, message: "No departments found"})
        }
    }catch (error){
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }}

exports.getDepartment = async(req,res)=>{
    try{
        const departmentId = req.params.id
        const department = await Department.findOne({_id: departmentId}).populate('faculty', 'name').populate('head', 'name email');


        if(!department){
            return res.status(400).json({success:false, message: "Department ID is required"})
        }
        res.status(200).json({success:true, data: department})
    }catch (error){
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
        }}
exports.updateDepartment = async(req,res)=>{
    try{
        const{name,code, facult,head, establishedDate}= req.body
        const department = await Department.findByIdAndUpdate({_id:req.params.id}, {name,code, faculty,head, establishedDate}, {new:true, runValidators:true})
        if(!department){
            return res.status(404).json({success:false, message: "Department not found"})
        }
    }catch (error){
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }
}