"use client"
import { useTheme } from "@/context/ThemeContext"
import { Feather } from "@expo/vector-icons"
import { StyleSheet, TouchableOpacity } from "react-native"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.button} activeOpacity={0.7}>
      <Feather name={theme === "light" ? "moon" : "sun"} size={24} color="#FFFFFF" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
})
