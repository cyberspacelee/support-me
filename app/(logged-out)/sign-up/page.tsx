"use client";
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

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
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
            companyName: "",
        },
    });

    const accountType = form.watch("accountType");

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("login validation passed: ", data);
        router.push("/dashboard");
    };

    const dobFromDate = new Date();
    dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);

    return (
        <>
            <PersonStandingIcon size={50} />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>Sign up for a new SupportMe account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@doe.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                          <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
                        </form></Form>
                </CardContent>
            </Card>
        </>
    )
}

export default SignUp