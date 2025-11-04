"use client"
import { useTheme } from "@/context/ThemeContext"
import { AntDesign } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Todo {
  _id: string
  title: string
  description?: string
  completed: boolean
  dueDate?: string
}

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    checkedCheckbox: {
      backgroundColor: colors.primary,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
      textDecorationLine: todo.completed ? "line-through" : "none",
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    deleteButton: {
      padding: 8,
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.checkbox, todo.completed && styles.checkedCheckbox]} onPress={onToggle}>
        {todo.completed && <AntDesign name="check" size={16} color="#FFFFFF" />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{todo.title}</Text>
        {todo.description && <Text style={styles.description}>{todo.description}</Text>}
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <AntDesign name="close" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  )
}
