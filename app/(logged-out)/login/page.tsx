"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PersonStandingIcon } from "lucide-react";
import Link from 'next/link';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});


const Login = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("login validation passed");
        router.push("/dashboard");
    };
    return (
        <>
            <PersonStandingIcon size={50} />
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle>Login</CardTitle>
                    <CardDescription className="font-light text-xs text-slate-400">Login to your Support Me account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form className="flex flex-col gap-4"
                            onSubmit={form.handleSubmit(handleSubmit)}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john@doe.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                            <PasswordInput {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Login</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex justify-between'>
                    <small>Don&apos;t have an account?</small>
                    <Button asChild variant="outline" size="sm">
                        <Link href="/sign-up">Sign up</Link>
                    </Button>
                </CardFooter>
            </Card>

        </>
    )
}

export default Login