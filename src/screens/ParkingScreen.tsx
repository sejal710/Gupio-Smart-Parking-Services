import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";   // adjust path as per your project
import { confirmSpot, cancelSpot } from "../store/spotSlice";
import { SafeAreaView } from "react-native-safe-area-context";

type Slot = {
    id: string;
    status: "available" | "booked";
};

// Sections (like BookMyShow seat map)
const sections = {
    US: 6,
    LS: 6,
    B3: 8,
};

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

    const [slots, setSlots] = useState<Slot[]>(initialSlots);

    const handlePress = (slot: Slot) => {
        if (slot.status === "booked") {
            Alert.alert("Cancel Booking", `Cancel ${slot.id}?`, [
                {
                    text: "Yes",
                    onPress: () => {
                        setSlots((prev) =>
                            prev.map((s) =>
                                s.id === slot.id ? { ...s, status: "available" } : s
                            )
                        );
                        dispatch(cancelSpot()); // update Redux
                    },
                },
                { text: "No" },
            ]);
        } else {
            Alert.alert("Confirm Booking", `Book ${slot.id}?`, [
                {
                    text: "Yes",
                    onPress: () => {
                        setSlots((prev) =>
                            prev.map((s) =>
                                s.id === slot.id ? { ...s, status: "booked" } : s
                            )
                        );
                        dispatch(confirmSpot()); // update Redux
                    },
                },
                { text: "No" },
            ]);
        }
    };

    const renderSection = (prefix: string) => {
        const sectionSlots = slots.filter((s) => s.id.startsWith(prefix));

        return (
            <View key={prefix} style={styles.section}>
                <Text style={styles.sectionTitle}>{prefix} Section</Text>
                <View style={styles.grid}>
                    {sectionSlots.map((slot) => (
                        <TouchableOpacity
                            key={slot.id}
                            style={[
                                styles.slot,
                                { backgroundColor: slot.status === "available" ? "green" : "red" },
                            ]}
                            onPress={() => handlePress(slot)}
                        >
                            <Text style={styles.slotText}>{slot.id}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Parking Layout</Text>
            <Text style={styles.availableText}>
                Available Spots: {available} / {total}
            </Text>

            {Object.keys(sections).map(renderSection)}
        </ScrollView>
    );
};

export default ParkingScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12, backgroundColor: "#fafafa" },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
    availableText: { fontSize: 16, marginBottom: 16, color: "#333" },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    slot: {
        width: "22%",
        aspectRatio: 1.2,
        margin: "1%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    slotText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});
