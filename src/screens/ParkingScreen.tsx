import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { confirmSpot, cancelSpot } from "../store/spotSlice";
import Animated, { BounceIn, Layout } from "react-native-reanimated";

type Slot = {
    id: string;
    status: "available" | "booked";
};

const sections = { US: 15, LS: 8, B3: 7 };

const generateSlots = (section: string, count: number): Slot[] =>
    Array.from({ length: count }, (_, i) => ({
        id: `${section}-P${i + 1}`,
        status: "available",
    }));

const initialSlots: Slot[] = [
    ...generateSlots("US", sections.US),
    ...generateSlots("LS", sections.LS),
    ...generateSlots("B3", sections.B3),
];

const ParkingScreen = () => {
    const dispatch = useDispatch();
    const { available, total } = useSelector((state: RootState) => state.spots);
    const [activeBooking, setActiveBooking] = useState<Slot | null>(null);
    const [slots, setSlots] = useState<Slot[]>(initialSlots);

    const handlePress = (slot: Slot) => {
        if (slot.status === "booked") {
            Alert.alert("Cancel Booking", `Cancel ${slot.id}?`, [
                {
                    text: "Yes",
                    onPress: () => {
                        setSlots(prev =>
                            prev.map(s => s.id === slot.id ? { ...s, status: "available" } : s)
                        );
                        dispatch(cancelSpot());
                        if (activeBooking?.id === slot.id) setActiveBooking(null);
                    },
                },
                { text: "No" },
            ]);

        } else {
            Alert.alert("Confirm Booking", `Book ${slot.id}?`, [
                {
                    text: "Yes",
                    onPress: () => {
                        setSlots(prev =>
                            prev.map(s => s.id === slot.id ? { ...s, status: "booked" } : s)
                        );
                        dispatch(confirmSpot());
                        setActiveBooking({ ...slot, status: "booked" });
                    },
                },
                { text: "No" },
            ]);
        }
    };
    // Inactivity reminder timer
    useEffect(() => {
        let timer: any;

        const startReminder = () => {
            if (!activeBooking) return;

            timer = setTimeout(() => {
                Alert.alert(
                    "Reminder",
                    "You haven’t parked your vehicle yet. Would you like to cancel this?",
                    [
                        {
                            text: "Cancel Booking",
                            onPress: () => {
                                setSlots(prev =>
                                    prev.map(s =>
                                        s.id === activeBooking.id ? { ...s, status: "available" } : s
                                    )
                                );
                                dispatch(cancelSpot());
                                setActiveBooking(null); // stop reminders
                            },
                        },
                        {
                            text: "No, I will be there",
                            onPress: () => {
                                // Restart reminder after 10s
                                startReminder();
                            },
                        },
                    ]
                );
            }, 10000); // 10 seconds for demo
        };

        startReminder();

        return () => clearTimeout(timer); // cleanup if component unmounts
    }, [activeBooking]);


    const renderSection = (prefix: string, index: number) => {
        const sectionSlots = slots.filter(s => s.id.startsWith(prefix));

        return (
            <Animated.View
                key={prefix}
                entering={BounceIn.delay(index * 150)}
                layout={Layout.springify()}
                style={styles.sectionCard}
            >
                <Text style={styles.sectionTitle}>{prefix} Section</Text>
                <View style={styles.grid}>
                    {sectionSlots.map(slot => (
                        <Animated.View
                            key={slot.id}
                            entering={BounceIn.delay(100)}
                            layout={Layout.springify()}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.slot,
                                    {
                                        backgroundColor:
                                            slot.status === "available" ? "#34d399" : "#f87171",
                                    },
                                ]}
                                onPress={() => handlePress(slot)}
                            >
                                <Text style={styles.slotText}>{slot.id}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </Animated.View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Parking Layout</Text>
            <Text style={styles.availableText}>
                Available Spots: {available} / {total}
            </Text>

            {Object.keys(sections).map((prefix, index) => renderSection(prefix, index))}
        </ScrollView>
    );
};

export default ParkingScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12, backgroundColor: "#f0f4f8" },
    header: { fontSize: 26, fontWeight: "700", marginBottom: 8, color: "#1f2937" },
    availableText: { fontSize: 16, marginBottom: 16, color: "#374151" },
    sectionCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        elevation: 5,
    },
    sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: "#111827" },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10
    },
    slot: {
        width: 80,
        height: 80,
        aspectRatio: 1.2,
        margin: "1%",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
        elevation: 4,
    },
    slotText: { color: "#fff", fontWeight: "700", fontSize: 12 },
});
