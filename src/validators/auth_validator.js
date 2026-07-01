import zod, {email} from 'zod'

export let registerUserValidationSchema = zod.object({
    email: zod.email("Email is invalid"),
    username: zod.string().min(4, "username must be minimum 4 characters long"),
    password: zod.string().min(6, "password must be minimum 6 characters long")
})

export let logginUserValidationSchema = zod.object({
    email: zod.email("please provide the valid email"),
    password: zod.string().min(1, "password is required")
})