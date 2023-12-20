import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

// // will call controller function
// router.post('/create-student', StudentControllers.createStudent)

// get all student
router.get('/', StudentControllers.getAllStudent)
// get single student
router.get('/:studentId', StudentControllers.getSingleStudent)
// delete student
router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRoutes = router
