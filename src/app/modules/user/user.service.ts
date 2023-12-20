import config from "../../config";
import { Student } from "../student/student.interface";
import { StudentModel } from "../student/student.model";
import { TUser } from "./user.interface";
// import { NewUser, TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createStudentIntoDB = async (password:string, studentData: Student) => {
    // create a user object
   //  const user: NewUser = {}
   const userData: Partial<TUser> = {}

   // if password given, use default password
   userData.password = password || (config.default_pass as string)

 
   //set student role
   userData.role = 'student'

   // set generated manually id
   userData.id = '203010001'

   //create a user
    const result = await UserModel.create(userData)

   //  create a student
   if(Object.keys(result).length){
      // set id, _id as user
      studentData.id = result.id; //embedding id
      studentData.user = result._id; //reference _id
      const newStudent = await StudentModel.create(studentData)
      return newStudent
   }


   //  return result
  };


 export const UserServices = {
    createStudentIntoDB
 }


