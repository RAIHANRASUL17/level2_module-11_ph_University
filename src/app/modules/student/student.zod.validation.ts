// import { z } from "zod";

// const contactNoSchema = z
//   .string()
//   .min(10, 'Contact number should have at least 10 digits')
//   .max(15, 'Contact number should not exceed 15 digits')
//   .regex(/^\d+$/, 'Contact number should only contain digits');

// const emergencyContactNoSchema = z.string().refine(
//   value => value !== contactNoSchema.parse(value),
//   { message: 'Emergency contact number cannot be same as contact number' }
// );

// const studentSchema = z.object({
//   id: z.string().required('Student ID is required'),
//   name: z.object({
//     firstName: z.string().max(20, 'First name cannot exceed 20 characters').required('First name is required'),
//     middleName: z.string().optional(),
//     lastName: z.string().required('Last name is required'),
//   }),
//   gender: z.enum(['male', 'female', 'other']).optional(),
//   dateOfBirth: z.string().optional(),
//   email: z.string().email('Invalid email format').required('Email is required'),
//   contactNo: contactNoSchema.required('Contact number is required'),
//   emergencyContactNo: emergencyContactNoSchema.required('Emergency contact number is required'),
//   bloodGroup: z.union([z.literal('A+'), z.literal('A-'), z.literal('B+'), z.literal('B-'), z.literal('AB+'), z.literal('AB-'), z.literal('O+'), z.literal('O-')]).required('Blood group is required'),
//   presentAddress: z.string().required('Present address is required'),
//   permanentAddress: z.string().required('Permanent address is required'),
//   guardian: z.object({
//     fatherName: z.string().required('Father name is required'),
//     fatherOccupation: z.string().required('Father occupation is required'),
//     fatherContactNo: contactNoSchema.required('Father contact number is required'),
//     motherName: z.string().required('Mother name is required'),
//     motherOccupation: z.string().required('Mother occupation is required'),
//     motherContactNo: contactNoSchema.required('Mother contact number is required'),
//   }),
//   localGuardian: z.object({
//     name: z.string().required('Local guardian name is required'),
//     occupation: z.string().required('Local guardian occupation is required'),
//     contactNo: contactNoSchema.required('Local guardian contact number is required'),
//     address: z.string().required('Local guardian address is required'),
//   }),
//   profileImg: z.string().optional(),
//   isActive: z.enum(['active', 'blocked']).default('active'),
// });

/*_________________________________________________________*/
import { z } from 'zod'

const contactNoSchema = z
  .string()
  .min(10, 'Contact number should have at least 10 digits')
  .max(15, 'Contact number should not exceed 15 digits')
  .regex(/^\d+$/, 'Contact number should only contain digits')

// const emergencyContactNoSchema = z.string().refine(
//   value => value !== contactNoSchema.parse(value),
//   { message: 'Emergency contact number cannot be same as contact number' }
// );
const emergencyContactNoSchema = z.string()

const studentZodSchema = z.object({
  id: z.string(),
  password: z.string().max(8),
  name: z.object({
    firstName: z.string().max(20, 'First name cannot exceed 20 characters'),
    middleName: z.string().optional(),
    lastName: z.string(),
  }),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email format'),
  contactNo: contactNoSchema,
  emergencyContactNo: emergencyContactNoSchema,
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: contactNoSchema,
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: contactNoSchema,
  }),
  localGuardian: z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: contactNoSchema,
    address: z.string(),
  }),
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean(),
})

export default studentZodSchema
