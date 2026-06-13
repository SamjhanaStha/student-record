import prisma from "../db/prisma.js";

let FindAllTeacher = async(req, res) =>{
     try{
        let allTeacher = await prisma.teacher.findMany({
            include:{
                department: true,
                courses : true
            }
        })
        res.json({
            message: "all teachers found",
            data: allTeacher
        })
    } catch (e) {
        res.status(500).json({
            error: "something went wrong", 
            stack: e?.message 
        })
    }
}
let FindTeacherById = async(req, res) =>{
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
        let matchTeacher = await prisma.teacher.findUnique({
            where :{
                id: Number(id)
            },
            include:{
                department: true,
                courses : true
            }
        })
        res.status(201).json({
            message: "teacher Found",
            data: matchTeacher
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let CreateTeacher = async(req, res) =>{
    try{
        let {name, email, departmentId}= req.body
        let createTeacher = await prisma.teacher.create({
            data: {
                name, 
                email, 
                department: {connect:{
                    id: Number (departmentId)
                }}
            }
        })
        res.status(201).json({
            message:"teacher created successfully"
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let UpdateTeacher = async(req, res) =>{
    try{
        let id = req.params.id
        let {name, email} = req.body
        let updateTeacher = await prisma.teacher.update({
            where:{
                id : Number(id)
            },
            data: {
                name,
                email
            }
        })
        res.status(201).json({
            message: "teacher update successfully",
            data: updateTeacher
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let DeleteTeacher= async(req, res) =>{
    try{
        let id= req.params.id
        let deleteTeacher = await prisma.teacher.delete({
            where:{
                id: Number(id)
            }
        })
        res.status(201).json({
            message: `Teacher with id ${id} deleted successfully.`,
            data: deleteTeacher
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

export {FindAllTeacher, FindTeacherById, CreateTeacher, UpdateTeacher, DeleteTeacher}