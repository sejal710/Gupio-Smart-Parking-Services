import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
    FadeInDown,
    SlideInRight,
    BounceIn,
    Layout,
} from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { LogOut } from "lucide-react-native"; // lucide icon
import { logout } from "../store/authSlice"; // adjust if needed

const { width } = Dimensions.get("window");

export default function Dashboard({ navigation }: any) {
    const [greeting, setGreeting] = useState("Hello");
    const employeeName = "Sejal Jaiswal"; // Replace with actual employee name
    const { total, available } = useSelector((state: RootState) => state.spots);
    const dispatch = useDispatch();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        // navigate to login
        navigation.replace("Login");
    };

    return (
        <View className="flex-1 bg-blue-50 justify-center items-center p-5">
            {/* Logout Button */}
            <TouchableOpacity
                className="absolute top-10 right-5 bg-red-500 p-3 rounded-full shadow-lg z-10"
                onPress={handleLogout}
            >
                <LogOut size={28} color="#fff" />
            </TouchableOpacity>

            {/* Greeting */}
            <Animated.Text
                entering={FadeInDown.duration(800).delay(100)}
                className="text-3xl font-bold text-gray-800 mb-10 text-center"
            >
                {greeting}, {employeeName}
            </Animated.Text>

            {/* Cards */}
            <View className="flex-row justify-center space-x-5 gap-6">
                <Animated.View
                    entering={BounceIn.delay(200).duration(800)}
                    layout={Layout.springify()}
                    className="w-[40%] p-6 rounded-2xl bg-blue-600 justify-center items-center shadow-lg"
                >
                    <Text className="text-white text-base font-medium">Total Spots</Text>
                    <Animated.Text
                        entering={SlideInRight.delay(400).duration(600)}
                        className="text-white text-3xl font-bold mt-2"
                    >
                        {total}
                    </Animated.Text>
                </Animated.View>

                <Animated.View
                    entering={BounceIn.delay(800).duration(800)}
                    layout={Layout.springify()}
                    className="w-[40%] p-6 rounded-2xl bg-green-500 justify-center items-center shadow-lg"
                >
                    <Text className="text-white text-base font-medium">Available Spots</Text>
                    <Animated.Text
                        entering={SlideInRight.delay(500).duration(600)}
                        className="text-white text-3xl font-bold mt-2"
                    >
                        {available}
                    </Animated.Text>
                </Animated.View>
            </View>
        </View>
    );
}

