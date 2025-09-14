const Faculty = require('../models/faculty.models');
const Lecturer = require('../models/lecturer.models');

exports.createFaculty = async(req,res)=>{
    try{
        const {name, dean, establishedDate} = req.body;
        const existingFaculty = await Faculty.findOne({name});
        if (existingFaculty){
            return res.status(400).json ({success:false , message: "Faculty with this name already exsists"})
        }
        const newFaculty = new Faculty({name, dean, establishedDate})
        await newFaculty.save();
        res.status(201).json({success:true, message: "Faculty created successfully", data: newFaculty})
    }catch(error){
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }
 
    }


exports.getAllFaculties = async(req,res)=>{
    try{
        
        const faculties = await Faculty.find().populate('dean', 'name email');
        res.status(200).json({success:true, data: faculties});
    }catch (error){
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }
}
exports.getFaculty = async(req, res)=>{
    try{
        
        
        const foundFaculty = await Faculty.findOne({_id: req.params.id
           
        }).populate('dean', 'name email');
        if (!foundFaculty){
            return res.status(404).json({success:false, message: "Faculty not found"})
        }
        res.status(200).json({success:true, data: foundFaculty})
        console.log(foundFaculty)
    }catch (error){
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    }
}
exports.updateFaculty= async(req,res)=>{
    try{
        
        const {name, dean, establishedDate} = req.body;
        const faculty = await Faculty.findOneAndUpdate({_id: req.params.id},
            {name, dean, establishedDate}, {new:true, runValidators:true}
        );
        if (!faculty){
            return res.status(404).json({success:false, message: "Faculty not found"})
        }

        res.status(200).json({success:true, message: "Faculty updated successfully", data: faculty})
    }catch (error){
        return res.status(500).json({success:false, message: "Server Error", error: error.message})
    } }      