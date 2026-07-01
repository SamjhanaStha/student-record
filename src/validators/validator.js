import {z} from "zod"

export let nameValidatorSchema = z.string().min(2, "name must be minimum 2 letter").max(100, "name must not exceed 100 letters")
// export let nameValidatorScheme = z.string().min(2, "name must be minimum 2 letter").max(100, "name must not exceed 100 letters").optional()

export let emailValidatorSchema = z.email("email must be valid")

export let idValidator = z.int().negative()
export let idvalidatorschema = z.object({
    id: idValidator,
})

export let createStudentValidatorSchema = z.object({
    name: nameValidatorSchema,
    email: emailValidatorSchema
})

export let updateStudentValidatorSchema = z.object({
    name: nameValidatorSchema.optional(),
    email: emailValidatorSchema.optional()
})