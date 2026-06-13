import prisma from "../db/prisma.js"
import { ValidateAllFieldTypes } from "../validators/field_validator.js"
let FindAllStudents = async (req, res) => {
    try {
        // select is used to specify which fields to retrieve from the database, while include is used to specifiy related models to include in the result.
        // please either use 'select' or 'include', but not both at the same time
        let allStudents = await prisma.students.findMany({
            // select: {
            //     name: true, rollNo:true, id: true , email: true, enrollment: true, department: true
            // },
            include: {
                department: {select: { 
                    name: true,
                    id: true
                }},
                enrollment: {
                    include: {
                        course: true
                    }
                }
            }
        })
        res.json({
            message: "all students found",
            data: allStudents
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

let getALlStudentsWithselect = async (req, res)=>{
    try{
        let students = await prisma.students.findMany({
            select:{
                name: true,
                email: true,
                id: true,
                department:{
                    select:{
                        id: true,
                        name: true,
                    }
                }
            }
        })
        res.status(201).json({
            message: "all students fetched successfully",
            data: students
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

// example for orderby or sorting
export let sortStudents = async(req, res)=>{
    try{ 
        let students = await prisma.students.findMany({
            orderBy: {
                name: "asc"
            }
        })
        res.status(201).json({
            message: "students sorted data",
            data: students
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

// multi level include example
let FindStudentById = async (req, res) => {
    try {
        let id = req.params.id
        // empty validation with bad request status
        if (id === "") {
            res.status(400).json({
                error: "id cannot be empty",
            })
            return
        }
        // check if id is number or not and must return status related to it
        if (isNaN(id)) {
            res.status(400).json({
                error: "id must be a number",
            })
            return
        }
        let matchStudent = await prisma.students.findUnique({
            where: {
                id: Number(req.params.id),
            },
            include: {
                department: {select: {
                    name: true,
                    id: true
                }},
                enrollment: {
                    include: {
                        course: true
                    }
                }
            }
        })
        res.status(200).json({
            message: "student found",
            data: matchStudent
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let CreateStudent = async (req, res) => {
    try {
        let data = req.body
        let { email, name, rollNo, departmentId } = data
        let validateMsg = ValidateAllFieldTypes("email", email)
        if (validateMsg != null) {
            res.status(400).json({
                error: validateMsg
            })
            return
        }
        validateMsg = ValidateAllFieldTypes("name", name)
        if (validateMsg != null) {
            res.status(400).json({
                error: validateMsg
            })
            return
        }
        let createdStudent = await prisma.students.create({
            data: {
                name,
                email,
                rollNo,
                department: {
                    connect: { id: Number(departmentId) }
                }
            }
        })
        res.status(201).json({
            message: "student created successfully",
            data: createdStudent
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

// prisma create example
let CreateStudentWithDepartment = async (req, res) => {
    try {
        let { name, email, rollNo, departmentName } = req.body
        let createStudentWithDepartment = await prisma.students.create({
            data: {
                name,
                email,
                rollNo,
                department: {
                    create: {
                        name: departmentName
                    }
                }
            }
        })
        res.status(201).json({
            message: "Student created successfully",
            data: createStudentWithDepartment
        })
    }
    catch (e) {
        res.status(500).json({
            error: "cannot update student",
            stack: e?.message
        })
    }
}

let UpdateStudent = async (req, res) => {
    try {
        let id = req.params.id
        let {name, email, rollNo} = req.body
        let updatedStudent = await prisma.students.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                email,
                rollNo
            }
        })
        res.status(200).json({
            message: "student updated successfully",
            data: updatedStudent
        })
    } catch (e) {
        res.status(500).json({
            error: "cannot update student",
            stack: e?.message
        })
    }
}


let DeleteStudent = async (req, res) => {
    try {
        let id = req.params.id
        let deletedStudent = await prisma.students.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(200).json({
            message: `Student with id ${id} deleted successfully.`,
            data: deletedStudent
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}



export { FindAllStudents,getALlStudentsWithselect, FindStudentById, CreateStudent, CreateStudentWithDepartment, UpdateStudent, DeleteStudent }