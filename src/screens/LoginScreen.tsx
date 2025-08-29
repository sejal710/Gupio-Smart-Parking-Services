import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Toast from "react-native-toast-message";
import { z, ZodError } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { setOTP, setEmployeeId, loadFromStorage, setLogin } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { is } from "zod/locales";

const loginSchema = z.object({
    employeeId: z.string().min(1, "Employee ID is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = z.string().length(6, "OTP must be 6 digits");

export default function LoginScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const reduxOtp = useSelector((state: any) => state.auth.otp);

    const [employeeId, setEmployeeIdLocal] = useState("");
    const [password, setPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    // Load OTP & employeeId from AsyncStorage on mount
    useEffect(() => {
        const loadStorage = async () => {
            const otpStored = await AsyncStorage.getItem(" isLoggedIn");
            const empStored = await AsyncStorage.getItem("employeeId");
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
            console.log(isLoggedIn, 'isLoggedIn');
            if (isLoggedIn == 'true') navigation.replace("Home");
            dispatch(loadFromStorage({ otp: otpStored, employeeId: empStored, isLoggedIn: true }));
            if (empStored) setEmployeeIdLocal(empStored);
        };
        loadStorage();
    }, []);

    const showToast = (type: "success" | "error", text1: string, text2?: string) => {
        Toast.show({ type, text1, text2, visibilityTime: 4000 });
    };

    const handleSendOTP = () => {
        try {
            loginSchema.parse({ employeeId, password });
            const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
            dispatch(setOTP(generatedOTP));
            dispatch(setEmployeeId(employeeId));
            dispatch(setLogin(true));
            setOtpSent(true);
            // showToast("success", `OTP sent to Employee ID: ${employeeId}`, `Your OTP is ${generatedOTP}`);
            Alert.alert("OTP Sent", `Your OTP is ${generatedOTP}`);
        } catch (err: any) {
            if (err instanceof ZodError) {
                let errors = JSON.parse(err);
                const firstErrorMessage = errors[0]?.message || "Validation error";
                showToast("error", firstErrorMessage);
            } else console.error(err);
        }
    };

    const handleVerifyOTP = () => {
        try {
            otpSchema.parse(otp);
            if (otp === reduxOtp) {
                showToast("success", "OTP Verified", "Redirecting to Dashboard...");
                // In LoginScreen.tsx, after login success
                navigation.replace("Home");

            } else showToast("error", "Invalid OTP");
        } catch (err: any) {
            if (err instanceof ZodError) {
                let errors = JSON.parse(err);
                const firstErrorMessage = errors[0]?.message || "Validation error";
                showToast("error", firstErrorMessage);
            } else console.error(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Gupio Smart Parking Services</Text>

            {!otpSent ? (
                <>
                    <TextInput style={styles.input} placeholder="Employee ID" value={employeeId} onChangeText={setEmployeeIdLocal} />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
                        <Text style={styles.buttonText}>Send OTP</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <TextInput style={styles.input} placeholder="Enter 6-digit OTP" keyboardType="number-pad" value={otp} onChangeText={setOtp} />
                    <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
                        <Text style={styles.buttonText}>Verify OTP</Text>
                    </TouchableOpacity>
                </>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
    header: { fontSize: 24, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 6, marginBottom: 15 },
    forgotBtn: { marginBottom: 15, alignSelf: "flex-end" },
    forgotText: { color: "#007BFF" },
    button: { backgroundColor: "#007BFF", padding: 15, borderRadius: 6, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold" },
});
