import React from 'react'
import { z } from 'zod'

const formSchema = z
    .object({
        email: z.string().email(),
        accountType: z.enum(["personal", "company"]),
        companyName: z.string().optional(),
        // coerce to number, but allow empty string
        numberOfEmployees: z.coerce.number().optional(),
        acceptTerms: z
            .boolean({
                required_error: "You must accept the terms and conditions",
            })
            // The refine method takes a function and a string as parameters
            // The function takes the value of the field as a parameter and returns a boolean indicating whether the validation passes
            // The string is the error message displayed when the validation fails
            .refine((checked) => checked, "You must accept the terms and conditions"),
        dob: z.date().refine((date) => {
            const today = new Date();
            const eighteedYearsAgo = new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
            );
            return date <= eighteedYearsAgo;
        }, "You must be at least 18 years old"),
        password: z
            .string()
            .min(8, "Password must contain at least 8 characters")
            .refine((password) => {
                // must contain at least 1 special character and 1 uppercase character
                return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
                // - `^` represents the start of the string.
                // - `(?=.*[!@#$%^&*])` is a lookahead assertion that requires at least one special character `!@#$%^&*` in the following characters.
                // - `(?=.*[A-Z])` is another lookahead assertion that requires at least one uppercase letter in the following characters.
                // - `.*$` represents any number of any characters until the end of the string.
            }, "Password must contain at least 1 special character and 1 uppercase letter"),
        passwordConfirm: z.string(),
    })
    // The superRefine method takes a function as a parameter, which accepts two arguments: the data object to be validated and the context object ctx.
    // This function does not return a value, but adds validation issues by calling the ctx.addIssue method.
    .superRefine((data, ctx) => {
        if (data.password !== data.passwordConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["passwordConfirm"],
                message: "Passwords do not match",
            });
        }
        if (data.accountType === "company" && !data.companyName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                // ZodIssueCode in the Zod library is an enum that defines all possible issue codes.
                // custom is one of the values, indicating that this is a custom issue.
                path: ["companyName"],
                message: "Company name is required",
            });
        }

        if (
            data.accountType === "company" &&
            (!data.numberOfEmployees || data.numberOfEmployees < 1)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["numberOfEmployees"],
                message: "Number of employees is required",
            });
        }
    });


const SignUp = () => {
    return (
        <div>SignUp</div>
    )
}

export default SignUp