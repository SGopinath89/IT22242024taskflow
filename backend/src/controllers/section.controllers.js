const Section= require('../models/section.js')
const Task = require('../models/task.js')

const createSection= async(req,res)=>{
    const {boardId}= req.params
    try {
        const section= await Section.create({board: boardId})
        section._doc.tasks = []
        res.status(201).json(section)
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const updateSection=async(req,res)=>{
    const {sectionId}= req.params
    try {
        const section = await Section.findByIdAndUpdate(sectionId,{$set: req.body})
        section._doc.tasks=[]
        res.status(200).json(section)
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

module.exports={
    createSection,
    updateSection

}