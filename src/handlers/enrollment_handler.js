import prisma from "../db/prisma.js";

let FindAllEnrollment = async(req, res) =>{
     try{
        let allEnrollment = await prisma.enrollment.findMany()
        res.json({
            message: "all enrollments found",
            data: allEnrollment
        })
    } catch (e) {
        res.status(500).json({
            error: "something went wrong",
            stack: e?.message 
        })
    }
}
let FindEnrollmentById = async(req, res) =>{
    try{
        let id = req.params.id
        if(id === ""){
            res.status(400).json({
                error: "id cannot be empty",
            })
            return
        }
        if (isNaN(id)){
            res.status(400).json({
                error: "id must be a number",
            })
            return
        }
        let matchEnrollment = await prisma.enrollment.findUnique({
            where :{
                id: Number(id)
            }
        })
        res.status(201).json({
            message: "enrollment Found",
            data: matchEnrollment
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let CreateEnrollment = async(req, res) =>{
    try{
        // let {name, credit, teacherId}= req.body
        let data = req.body
        let createEnrollment = await prisma.enrollment.create({
            // data: {
            //     name, 
            //     credit, 
            //     teacher: {connect:{
            //         id: teacherId
            //     }}
            // }
            data : data
        })
        res.status(201).json({
            message:"enrollment created successfully"
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let UpdateEnrollment = async(req, res) =>{
    try{
        let id = req.params.id
        let data = req.body
        let updateEnrollment = await prisma.enrollment.update({
            where:{
                id: Number(id)
            },
            data: data
        })
        res.status(201).json({
            message: "enrollment update successfully",
            data: updateEnrollment
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let DeleteEnrollment= async(req, res) =>{
    try{
        let id= req.params.id
        let deleteEnrollment = await prisma.enrollment.delete({
            where:{
                id: Number(id)
            }
        })
        res.status(201).json({
            message: `Enrollment with id ${id} deleted successfully.`,
            data: deletedStudent
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

export {FindAllEnrollment, FindEnrollmentById, CreateEnrollment, UpdateEnrollment, DeleteEnrollment}