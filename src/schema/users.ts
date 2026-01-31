import {email, z} from 'zod'


export const SignUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})

export const AddressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().nullable(),
    pincode: z.string().length(5),
    country: z.string(),
    city: z.string()
})

export const UpdateUserSchema = z.object({
    username: z.string().optional(),
    defaultBillingAddress: z.number().optional(),
    defaultShippingAddress: z.number().optional()

})