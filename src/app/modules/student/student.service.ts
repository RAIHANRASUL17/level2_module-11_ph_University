import { StudentModel } from './student.model'
// import { Student } from './student.interface'

// /*_________why? send to user st________________*/ 
// const createStudentIntoDB = async (student: Student) => {
//   const result = await StudentModel.create(student)
//   return result
// }
// /*_________why? send to user end________________*/ 

// get all students
const getAllStudentIntoDB = async () => {
  const result = await StudentModel.find()
  return result
}
// specific student/ dynamic route
const getSingleStudentIntoDB = async (id: string) => {
  // const result = await StudentModel.findOne({id})
  // if use aggregate
  const result = await StudentModel.aggregate([{ $match: { id } }])
  return result
}
// delete student
const deleteStudentIntoDB = async (id: string) => {
  const result = await StudentModel.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  // createStudentIntoDB,
  getAllStudentIntoDB,
  getSingleStudentIntoDB,
  deleteStudentIntoDB,
}
