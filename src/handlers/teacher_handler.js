import prisma from "../db/prisma.js";

let FindAllTeachers = async (req, res) => {
    try {
        let teachers = await prisma.teachers.findMany() 
        res.json({
            message: "all teachers found",
            data: teachers
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",      
            stack: e?.message
        })
    }
}

let FindTeacherById = async (req, res) => {
    try {
        let matchTeacher = await prisma.teachers.findUnique({   
            where: {
                id: Number(req.params.id),
            }
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

let CreateTeacher = async (req, res) => {
    try {
        // let data = req.body
        let {name, email, departmentId} = req.body
        let createTeacher = await prisma.teacher.create({
            data: {
                name,
                email,
                department:{
                    connect: {id: Number(departmentId)}
                }
                
            }
        })
        res.status(201).json({
            message: "teacher created successfully",
            data: createTeacher
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

let UpdateTeacher = async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let updatedTeacher = await prisma.teachers.update({
            where: {
                id: Number(id)
            },
            data: data
        })
        res.status(200).json({
            message: "teacher updated successfully",
            data: updatedTeacher
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

let DeleteTeacher = async (req, res) => {
    try {
        let id = req.params.id
        let deletedTeacher = await prisma.teachers.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: `Teacher with id ${id} deleted successfully.`,
            data: deletedTeacher
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

export {FindAllTeachers, FindTeacherById, CreateTeacher, UpdateTeacher, DeleteTeacher}