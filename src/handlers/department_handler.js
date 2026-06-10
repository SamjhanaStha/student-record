import prisma from "../db/prisma.js"

let FindAllDepartment = async(req, res) =>{
    try{
        let allDepartment = await prisma.department.findMany({
            include:{
                students: true,
                teachers: true
            }
        })
        [
            {
                id: 1,
                name: "computer Science",
                students: [
                    {},{},
                ],
                teachers:[
                    {},{}
                ]
            }
        ]
        res.json({
            message: "all department found",
            data: allDepartment
        })
    } catch (e) {
        res.status(500).json({
            error: "something went wrong",
            stack: e?.message 
        })
    }

}
let FindDepartmentById = async(req, res) =>{
    try{
        let id = req.params.id
        if (id === ""){
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
        let matchdepartment = await prisma.department.findUnique({
            where:{
                id: Number(id)
            }
        })
        res.status(200).json({
            message: "department found",
            data: matchdepartment
        })
    } catch(e){
        res.status(500).json({
            error: "something went to wrong",
            stack: e?.message
        })
    }
}
let CreateDepartment = async(req, res) =>{
    try{
        let data = req.body
        let createDepartment = await prisma.department.create({
            data: {
                name: data.name,
            }
        })
        res.status(201).json({
            message:"department created successfully",
            data: createDepartment
        })

    }catch(e){
        res.status(500).json({
            error: "something went to wrong",
            stack: e?.message
        })
    }
}
let UpdateDepartment = async(req, res) =>{
    try{
        let id = req.params.id
        let data = req.body
        let updateDepartment = await prisma.department.update({
            where: {
                id: Number(id)
            },
            data: data
        })
        res.status(201).json({
            message: "department Updated successfully",
            data: updateDepartment
        })
    }catch(e){
        res.status(500).json({
            error: "something went to wrong",
            stack: e?.message
        })
    }
}
let DeleteDepartment = async(req, res) =>{
    try{
        let id = req.params.id
        let deletedepartment = await prisma.department.delete({
            where:{ 
                id: Number(id)}
        })
        res.status(201).json({
            message: `department with ${id} deleted successfully`,
            data: deletedepartment
        })
    }catch(e){
        res.status(500).json({
            error: "something went to wrong",
            stack: e?.message
        })
    }
}

export {FindAllDepartment, FindDepartmentById, CreateDepartment, UpdateDepartment, DeleteDepartment}