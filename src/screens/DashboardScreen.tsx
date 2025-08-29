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
        <View style={styles.container}>
            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <LogOut size={28} color="#fff" />
            </TouchableOpacity>

            <Animated.Text
                entering={FadeInDown.duration(800).delay(100)}
                style={styles.greeting}
            >
                {greeting}, {employeeName}
            </Animated.Text>

            <View style={styles.cardContainer}>
                <Animated.View
                    entering={BounceIn.delay(200).duration(800)}
                    layout={Layout.springify()}
                    style={[styles.card, styles.totalCard]}
                >
                    <Text style={styles.cardTitle}>Total Spots</Text>
                    <Animated.Text
                        entering={SlideInRight.delay(400).duration(600)}
                        style={styles.cardValue}
                    >
                        {total}
                    </Animated.Text>
                </Animated.View>

                <Animated.View
                    entering={BounceIn.delay(800).duration(800)}
                    layout={Layout.springify()}
                    style={[styles.card, styles.availableCard]}
                >
                    <Text style={styles.cardTitle}>Available Spots</Text>
                    <Animated.Text
                        entering={SlideInRight.delay(500).duration(600)}
                        style={styles.cardValue}
                    >
                        {available}
                    </Animated.Text>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f6ff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    logoutButton: {
        position: "absolute",
        top: 40,
        right: 20,
        backgroundColor: "#ef4444",
        padding: 10,
        borderRadius: 50,
        zIndex: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 5,
    },
    greeting: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 40,
        color: "#333",
        textAlign: "center",
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    card: {
        width: width * 0.4,
        padding: 25,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 8,
    },
    totalCard: { backgroundColor: "#4f83cc" },
    availableCard: { backgroundColor: "#34d399" },
    cardTitle: { fontSize: 16, color: "#fff", fontWeight: "500" },
    cardValue: { fontSize: 32, fontWeight: "700", color: "#fff", marginTop: 10 },
});
