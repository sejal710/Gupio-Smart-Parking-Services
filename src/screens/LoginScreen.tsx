import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Toast from "react-native-toast-message";
import { z, ZodError } from "zod";

// Zod schemas
const loginSchema = z.object({
    employeeId: z.string().min(1, "Employee ID is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = z.string().length(6, "OTP must be 6 digits");

export default function LoginScreen({ navigation }: any) {
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [mockOtp, setMockOtp] = useState(""); // store OTP in frontend mock state

    const showToast = (type: "success" | "error", text1: string, text2?: string) => {
        Toast.show({
            type,
            text1,
            text2,
            visibilityTime: 4000,
        });
    };

    const handleSendOTP = () => {
        try {
            loginSchema.parse({ employeeId, password });
            const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            setMockOtp(generatedOTP);
            setOtpSent(true);
            Alert.alert("OTP Sent", `Your OTP is ${generatedOTP}`);
        } catch (err: any) {
            if (err instanceof ZodError) {
                let error = JSON.parse(err);
                const firstErrorMessage = error[0].message || "Validation error";
                showToast("error", firstErrorMessage); // your toast function
            } else {
                console.error(err);
            }
        }
    };

    const handleVerifyOTP = () => {
        try {
            otpSchema.parse(otp);
            if (otp === mockOtp) {
                showToast("success", "OTP Verified", "Redirecting to Dashboard...");
                // navigation.navigate("Dashboard"); // uncomment when navigation is set
            } else {
                showToast("error", "Invalid OTP");
            }
        } catch (err: any) {
            if (err instanceof ZodError) {
                let error = JSON.parse(err);
                const firstErrorMessage = error[0].message || "Validation error";
                showToast("error", firstErrorMessage); // your toast function
            } else {
                console.error(err);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Gupio Smart Parking Services</Text>

            {!otpSent ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Employee ID"
                        value={employeeId}
                        onChangeText={setEmployeeId}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                        <Text style={styles.buttonText}>Send OTP</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter 6-digit OTP"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                        <Text style={styles.buttonText}>Verify OTP</Text>
                    </TouchableOpacity>
                </>
            )}

            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 6,
        marginBottom: 15,
    },
    forgotBtn: {
        marginBottom: 15,
        alignSelf: "flex-end",
    },
    forgotText: {
        color: "#007BFF",
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
