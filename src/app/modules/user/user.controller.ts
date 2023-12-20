import { NextFunction, Request, Response } from "express"
import { UserServices } from "./user.service"
import sendResponse from "../../utils/sendResponse"
import httpStatus from "http-status"

/*______________why-? use here_______________________*/ 
const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, student: studentData } = req.body

    /*_______________ zod validation str_________________*/
    // const zodParsedData = studentZodSchema.parse(studentData)
    // main 
    const result = await UserServices.createStudentIntoDB(password, studentData)
    // // main with zod
    // const result = await StudentServices.createStudentIntoDB(zodParsedData)
    /*_______________ zod validation str_________________*/

    // main response
    // res.status(200).json({
    //   success: true,
    //   message: 'student is created successfully',
    //   data: result,
    // })
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message:'student is created successfully',
      success: true,
      data: result
    })
  } catch (error) {
    next(error)
  }
}
/*______________why-? use here end_________________________*/ 

export const UserControllers = {
createStudent
}