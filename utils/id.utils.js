const mongoose = require('mongoose')


exports.generateStudentNumber = async(enrollmentYear) => {
    try{

        const Student = mongoose.model('Student');
        const yearSuffix = enrollmentYear.toString().slice(-2);

        const yearPattern = new RegExp(`^${yearSuffix}/`)
        const latestStudent = await Student.findOne({
            studentNumber: yearPattern
        }).sort({studentNumber: -1});
        let nextSequence=1

        if (latestStudent){
            const sequencePart = latestStudent.studentNumber.split('/')[1];
            nextSequence = parseInt(sequencePart, 10) + 1;
        }
        const sequenceNumber = nextSequence.toString().padStart(4, '0');
        return `${yearSuffix}/${sequenceNumber}`;
    }catch (error){
        console.error('Error generating student number:', error);
        throw new Error('Error generating student number');
    }
}