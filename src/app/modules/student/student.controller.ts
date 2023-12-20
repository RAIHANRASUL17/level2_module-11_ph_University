import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
// import studentZodSchema from './student.zod.validation'

// /*______________why-? send to user_______________________*/ 
// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body

//     /*_______________ zod validation str_________________*/
//     const zodParsedData = studentZodSchema.parse(studentData)
//     // main with zod
//     const result = await StudentServices.createStudentIntoDB(zodParsedData)
//     /*_______________ zod validation str_________________*/

//     // main response
//     res.status(200).json({
//       success: true,
//       message: 'student is created successfully',
//       data: result,
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'something is wrong, please check',
//       error: error,
//     })
//   }
// }
// /*______________why-? send to user_________________________*/ 

// get all students
const getAllStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentIntoDB()
    res.status(200).json({
      success: true,
      message: 'student is retrieved  successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// get single Student
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  // console.log(req.params)
try {
  const { studentId } = req.params
  const result = await StudentServices.getSingleStudentIntoDB(studentId)
  res.status(200).json({
    success: true,
    message: 'student is retrieved  successfully!',
    data: result,
  })
} catch (error) {
  next(error)
}
}

// delete student
const deleteStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentIntoDB(studentId)
    // console.log('--------79',result)
    res.status(200).json({
      success: true,
      message: 'student is deleted successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const StudentControllers = {
  // createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
}
