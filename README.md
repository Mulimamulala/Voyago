# Voyago — Travel Booking App UI

A sleek and modern **travel booking app UI** built with **React Native (Expo)**.  
Designed to demonstrate clean architecture, UI composition, and developer workflow best practices.

---

## Features

- **Home Screen:** Destination cards, search bar, explore button  
- **Explore Page:** Browse places with categories and filters  
- **Booking Screen:** Form-style UI for trip selection  
- **Profile Screen:** Avatar, saved trips, settings  
- **Dark Mode Ready:** Easy theme switching  
- **Smooth Animations:** Framer Motion or Reanimated transitions  

---

## Tech Stack

| Tool | Purpose |
|------|----------|
| **Expo** | Framework for React Native |
| **TypeScript** | Static typing and safety |
| **NativeWind (Tailwind)** | Utility-first styling |
| **React Navigation** | Navigation and stack/tab structure |
| **Zustand** | Lightweight state management |
| **Reanimated / Moti** | Animations |
| **Lottie** | Animated icons and transitions |

---

## Folder Structure

voyago/
┣ assets/
┃ ┣ images/
┃ ┗ icons/
┣ src/
┃ ┣ components/
┃ ┣ screens/
┃ ┃ ┣ Home/
┃ ┃ ┣ Explore/
┃ ┃ ┣ Booking/
┃ ┃ ┣ Profile/
┃ ┗ navigation/
┣ App.tsx
┣ app.json
┣ package.json
┣ README.md
┗ LICENSE

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/<your-username>/voyago.git

# Navigate
cd voyago

# Install dependencies
npm install

# Run the app
npx expo start
