import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Update this path

const { width } = Dimensions.get("window");

export default function Dashboard() {
    const [greeting, setGreeting] = useState("Hello");

    const employeeName = "sejal Jaiswal"; // Replace with actual employee name from state or props
    const { total, available } = useSelector((state: RootState) => state.spots);


    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>{greeting}, {employeeName}</Text>

            <View style={styles.cardContainer}>
                <Animated.View entering={FadeInDown.delay(100)} style={[styles.card, styles.totalCard]}>
                    <Text style={styles.cardTitle}>Total Spots</Text>
                    <Text style={styles.cardValue}>{total}</Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(300)} style={[styles.card, styles.availableCard]}>
                    <Text style={styles.cardTitle}>Available Spots</Text>
                    <Text style={styles.cardValue}>{available}</Text>
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
    totalCard: {
        backgroundColor: "#4f83cc",
    },
    availableCard: {
        backgroundColor: "#34d399",
    },
    cardTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
    },
    cardValue: {
        fontSize: 32,
        fontWeight: "700",
        color: "#fff",
        marginTop: 10,
    },
});
