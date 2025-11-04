"use client"
import { useTheme } from "@/context/ThemeContext"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface TodoFilterProps {
  active: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void
}

export default function TodoFilter({ active, onFilterChange }: TodoFilterProps) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 12,
      justifyContent: "center",
      paddingVertical: 16,
    },
    button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "transparent",
    },
    activeButton: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.textSecondary,
    },
    activeButtonText: {
      color: "#FFFFFF",
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, active === "all" && styles.activeButton]}
        onPress={() => onFilterChange("all")}
      >
        <Text style={[styles.buttonText, active === "all" && styles.activeButtonText]}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, active === "active" && styles.activeButton]}
        onPress={() => onFilterChange("active")}
      >
        <Text style={[styles.buttonText, active === "active" && styles.activeButtonText]}>Active</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, active === "completed" && styles.activeButton]}
        onPress={() => onFilterChange("completed")}
      >
        <Text style={[styles.buttonText, active === "completed" && styles.activeButtonText]}>Completed</Text>
      </TouchableOpacity>
    </View>
  )
}
