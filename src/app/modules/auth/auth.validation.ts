import { z } from 'zod'

export const LoginAuthValidationSchema = z.object(
    {
        body: z.object({
            email: z.string().email({ message: "Invalid email address" }).refine(
                (email: string) => email.endsWith("@gmail.com"),
                { message: "Email must be from the domain '@gmail.com'" }
            ),
            password: z.string().min(8, { message: "Password must be at least 8 characters long" })
                .regex(
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    {
                        message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    }
                ),
        })
    }
)
