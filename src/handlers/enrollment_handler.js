import prisma from "../db/prisma.js";

let FindAllEnrollment = async (req, res) => {
    try {
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
let FindEnrollmentById = async (req, res) => {
    try {
        let id = req.params.id
        if (id === "") {
            res.status(400).json({
                error: "id cannot be empty",
            })
            return
        }
        if (isNaN(id)) {
            res.status(400).json({
                error: "id must be a number",
            })
            return
        }
        let matchEnrollment = await prisma.enrollment.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.status(201).json({
            message: "enrollment Found",
            data: matchEnrollment
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let CreateEnrollment = async (req, res) => {
    try {
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
            data: data
        })
        res.status(201).json({
            message: "enrollment created successfully"
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let UpdateEnrollment = async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let updateEnrollment = await prisma.enrollment.update({
            where: {
                id: Number(id)
            },
            data: data
        })
        res.status(201).json({
            message: "enrollment update successfully",
            data: updateEnrollment
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}
let DeleteEnrollment = async (req, res) => {
    try {
        let id = req.params.id
        let deleteEnrollment = await prisma.enrollment.delete({
            where: {
                id: Number(id)
            }
        })
        res.status(201).json({
            message: `Enrollment with id ${id} deleted successfully.`,
            data: deleteEnrollment
        })
    } catch (e) {
        res.status(500).json({
            error: "Something went wrong",
            stack: e?.message
        })
    }
}

let EnrollmentStudentInCourse = async (req, res) => {
    try {
        let { student_id, course_id, enrolled_at } = req.body

        // require both ids
        if (!student_id || !course_id) {
            return res.status(400).json({
                message: "student id & course id is required"
            })
        }
        if (student_id && (isNaN(student_id) || Number(student_id) <= 0)) {
            return res.status(400).json({
                message: "student id not valid"
            })
        }
        if (course_id && (isNaN(course_id) || Number(course_id) <= 0)) {
            return res.status(400).json({
                message: "Course id not valid"
            })
        }
        // validation enrolled if provided
        if (enrolled_at && i(sNaN(Date.parse(enrolled_at)))) {
            return res.status(400).json({
                message: "enrolled_at must be a valid date"
            })
        }
        let enrollmentCreated = await prisma.enrollment.create({
            data: {
                studentId: student_id,
                courseId: course_id
            },
            select: {
                id: true,
                CreatedAt: true,
                status: true,
                enrolledAt: enrolled_at ?false : true,
                student: true,
                course:true
            },
        })
        res.status(201).json({
            message: "Student enrolled to course successfully",
            data: enrollmentCreated
        })
    } catch (e) {
        res.status(500).json({
            error: "Error occured while enrolling student in course",
            stack: e?.message
        })
    }
}


export { FindAllEnrollment, FindEnrollmentById, CreateEnrollment, UpdateEnrollment, DeleteEnrollment , EnrollmentStudentInCourse}