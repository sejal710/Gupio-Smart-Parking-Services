import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Toast from "react-native-toast-message";
import { z, ZodError } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { setOTP, setEmployeeId, loadFromStorage, setLogin } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            // if (isLoggedIn == 'true') navigation.replace("Home");
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
            setOtpSent(true);
            // showToast("success", `OTP sent to Employee ID: ${employeeId}`, `Your OTP is ${generatedOTP}`);
            Alert.alert("OTP Sent", `Your OTP is ${generatedOTP}`);
        } catch (err: any) {
            let errors = JSON.parse(err);
            if (err instanceof ZodError) {

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
                dispatch(setLogin(true));
            } else showToast("error", "Invalid OTP");
        } catch (err: any) {
            let errors = JSON.parse(err);
            if (err instanceof ZodError) {
                const firstErrorMessage = errors[0]?.message || "Validation error";
                showToast("error", firstErrorMessage);
            } else console.error(err);
        }
    };

    return (
        <View className="flex-1 justify-center px-6">
            <View className="bg-white p-6 rounded-2xl shadow-lg">
                <Text className="text-3xl font-bold text-center mb-6 text-blue-800">
                    Gupio Smart Parking
                </Text>

                {!otpSent ? (
                    <>
                        <TextInput
                            className="border border-gray-300 p-3 rounded-lg mb-4 shadow-sm"
                            placeholder="Employee ID"
                            value={employeeId}
                            onChangeText={setEmployeeIdLocal}
                        />
                        <TextInput
                            className="border border-gray-300 p-3 rounded-lg mb-4 shadow-sm"
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity className="mb-4 self-end">
                            <Text className="text-blue-600 font-medium">Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-blue-600 p-4 rounded-lg items-center shadow-md"
                            onPress={handleSendOTP}
                        >
                            <Text className="text-white font-bold text-lg">Send OTP</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <View>
                        <Text className="absolute top-3 right-3 text-sm text-gray-500">OTP: {reduxOtp}</Text>
                        <TextInput
                            className="border border-gray-300 p-3 rounded-lg mb-4 shadow-sm"
                            placeholder="Enter 6-digit OTP"
                            keyboardType="number-pad"
                            value={otp}
                            onChangeText={setOtp}
                        />
                        <TouchableOpacity
                            className="bg-green-600 p-4 rounded-lg items-center shadow-md"
                            onPress={handleVerifyOTP}
                        >
                            <Text className="text-white font-bold text-lg">Verify OTP</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}
