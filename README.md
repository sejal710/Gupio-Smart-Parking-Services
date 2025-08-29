# Gupio Smart Parking Services

A **React Native CLI** application built with **TypeScript**, implementing a smart parking management system with a mobile-first responsive design.

---

## 🛠 Tech Stack

- **React Native CLI** (Not Expo)
- **TypeScript**
- **React Navigation** (Routing)
- **Redux Toolkit** (State Management)
- **Zod** (Input Validation)
- **React Native Reanimated** / Animated API (Animations)
- **NativeWind** (TailwindCSS Styling)
- **React Native Toast** (Toast Notifications – optional bonus implemented)

---

## 📱 Features Implemented

### 1. Login Screen
- Header: `Gupio Smart Parking Services`
- Employee ID and Password inputs with **Zod validation**
- Forgot Password link
- Send OTP button triggers a **6-digit OTP input**
- OTP stored in frontend mock state; validated OTP redirects to **Dashboard**

### 2. Dashboard (Greeting + Stats)
- Greeting based on system time (Good Morning / Afternoon / Evening) + Employee Name
- Animated stat cards:
  - Total Spots: 100
  - Available Spots: 30
- Logout button with icon (**lucide-react-native**)

### 3. Parking Layout
- Grid layout (like BookMyShow / Redbus seat map)
- Sections: `US`, `LS`, `B3`
- Slots (P1, P2, …) with **color coding**:
  - Green = Available
  - Red = Booked
- Fully **mobile-responsive layout**

### 4. Booking Flow
- Tap on an available slot → Modal shows:
  - Title, Status, Buttons (**Confirm / Close**)
- On Confirm:
  - Slot added to **Active Bookings** (local state)
  - Animated confirmation: “Waiting… Thank you for your patience.”
  - Active Booking card displays:
    - Slot ID
    - Booking Time
    - Cancel Button

### 5. Cancel Flow
- Cancel button triggers confirmation popup: “Do you want to cancel your booking?”
- Yes → Slot freed, **available spots updated**

### 6. Inactivity Reminder
- After **30 minutes** (mocked with 10s for demo):
  - Popup: “You haven’t parked your vehicle yet. Would you like to cancel this?”
  - Options: Cancel / No, I will be there
- Reminder resets if user cancels


https://github.com/user-attachments/assets/6b968ad3-2210-4b91-ba25-8cd173b77f06


---

## 📊 Mock Data

- **ParkingSlot Type**
```ts
type ParkingSlot = {
  id: string;
  section: "US" | "LS" | "B3";
  status: "available" | "booked";
  bookedBy?: string;
  bookedAt?: string;
}





## 🚀 Getting Started

Follow these steps to start the project locally:

### 1. Clone the repository
```bash
git clone <https://github.com/sejal710/Gupio-Smart-Parking-Services.git>
cd Gupio-Smart-Parking-Services
npm install
npm run android
