import prisma from "../db/prisma.js";

let FindAllCourse = async(req, res) =>{
     try{
        let allCourse = await prisma.course.findMany()
        res.json({
            message: "all courses found",
            data: allCourse
        })
    } catch (e) {
        res.status(500).json({
            error: "something went wrong",
            stack: e?.message 
        })
    }
}
let FindCourseById = async(req, res) =>{
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
        let matchCourse = await prisma.course.findUnique({
            where :{
                id: Number(id)
            }
        })
        res.status(201).json({
            message: "course Found",
            data: matchCourse
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let CreateCourse = async(req, res) =>{
    try{
        let data= req.body
        let createCourse = await prisma.course.create({
            data: data
        })
        res.status(201).json({
            message:"course created successfully"
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let UpdateCourse = async(req, res) =>{
    try{
        let id = req.params.id
        let data = req.body
        let updateCourse = await prisma.course.update({
            where:{
                id: Number(id)
            },
            data: data
        })
        res.status(201).json({
            message: "course update successfully",
            data: updateCourse
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let DeleteCourse= async(req, res) =>{
    try{
        let id= req.params.id
        let deleteCourse = await prisma.course.delete({
            where:{
                id: Number(id)
            }
        })
        res.status(201).json({
            message: `Course with id ${id} deleted successfully.`,
            data: deletedStudent
        })
    }catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

export {FindAllCourse, FindCourseById, CreateCourse, UpdateCourse, DeleteCourse}