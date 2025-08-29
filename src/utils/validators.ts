import { z } from "zod";

export const loginSchema = z.object({
    employeeId: z.string().min(3, "Employee ID required"),
    password: z.string().min(6, "Password must be at least 6 chars"),
});

export const otpSchema = z.object({
    otp: z.string().length(6, "OTP must be 6 digits"),
});
