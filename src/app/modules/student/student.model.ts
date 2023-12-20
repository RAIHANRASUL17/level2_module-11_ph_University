
// modal
import { Schema, model } from 'mongoose'
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface'
// // bcrypt
// import bcrypt from 'bcrypt'
// import config from '../../config'

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

// main Schema
const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
  user:{
    type: Schema.Types.ObjectId,
    required: [true, 'user id must be needed'],
    unique: true,
    ref: 'UserModel'
  },
  // password: { type: String, required: true },
  name: {
    type: userNameSchema,
    required: [true, 'first name must needed'],
    maxlength: [20, 'first name can not be allow more than 20 character'],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required:true
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    message: '{VALUE} email must be valid valid',
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: {
    type: String,
  },
  // isActive: {
  //   type: String,
  //   enum: ['active', 'blocked'],
  //   default: 'active',
  // },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

// // mongoose pre save middleware/hook: will work on create()/save()
// studentSchema.pre('save', async function (next) {
//   //  console.log('pre hook: we will save the data', this)
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this // doc
//   // hashing password and save in to DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   )
//   next()
// })

// // mongoose post save middleware/hook
// studentSchema.post('save', async function (doc, next) {
//   // console.log('post: after the save data ', doc)
//   doc.password = ''
//   next()
// })

// Query Middleware
studentSchema.pre('find', function (next) {
  // console.log(this, 'query middleware--->')
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('findOne', function (next) {
  // console.log(this, 'query middleware--->')
  this.find({ isDeleted: { $ne: true } })
  next()
})

// for aggregate
studentSchema.pre('aggregate', function () {
  console.log(this.pipeline())
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
})

export const StudentModel = model<Student>('Student', studentSchema)
