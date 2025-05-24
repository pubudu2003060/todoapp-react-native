# 📝 React Native To-Do List App

A simple, clean, and efficient mobile To-Do list application built using **React Native CLI**, **TypeScript**, and **Zustand** for state management. This app allows users to manage their tasks effectively with features like priority setting, sorting, and persistent local storage.

---

## 📱 Features

- ➕ **Add New Tasks**: Easily create tasks with a title and description.
- ✏️ **Edit Existing Tasks**: Modify the title, description, and priority of tasks.
- ✅ **Mark Tasks as Complete/Incomplete**: Toggle task status with a checkbox.
- 🗑️ **Delete Tasks**: Remove tasks from the list with a confirmation step.
- 🔥 **Set Task Priority**: Assign priority levels (Low, Medium, High) to tasks.
- 📊 **Sort Tasks**: Organize tasks by:
  - Priority (Low to High, High to Low)
  - Creation Date (Oldest First, Newest First)
- 🔗 **Share Tasks**: Share task details (title and description) using the native share functionality.
- 💾 **Persistent Local Storage**: Tasks are saved locally using AsyncStorage, so they persist across app sessions.
- 💅 **Clean UI**: Modern, user-friendly interface.

---

## 🛠️ Tech Stack

- **React Native CLI** (with TypeScript)
- **Zustand** (state management)
- **AsyncStorage** (data persistence)
- **StyleSheet** (custom styling for UI components)
- **react-native-vector-icons** (for icons, e.g., Feather icons)
- **@react-native-picker/picker** (for priority and sort selection)
- **React Navigation** (for potential future screen management, though current app is single-screen focused)
- **Lottie for React Native** (for animations, if used - though not explicitly in current core features)

---

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/pubudu2003060/todoapp-react-native.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd todoapp-react-native
    ```
    (Note: The original README mentioned `todo-app-react-native`, ensure you use the correct directory name if it differs)
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Install iOS pods (for iOS development):**
    ```bash
    npx pod-install
    ```
    (or `cd ios && pod install && cd ..`)

---

## 🚀 Running the App

Ensure you have a development environment set up for React Native (Node.js, Watchman, JDK, Android Studio/Xcode).

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx react-native run-ios
```

> 📱 Make sure your emulator/simulator or connected device is running.

---

## 🎨 Design Reference

This project is based on the Figma design below. The UI closely follows this layout:

🔗 [Figma Design](https://www.figma.com/design/HCZyEIWzvyEla3P5cV4Fk5/todo-app-react-native?node-id=0-1&p=f&t=cXxkpfgVc7vOcv0d-0)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the MIT License.
