"use client"

import ThemeToggle from "@/components/ThemeToggle"
import TodoItem from "@/components/TodoItem"
import { useTheme } from "@/context/ThemeContext"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function HomeScreen() {
  const { colors, theme } = useTheme()
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const todos = useQuery(api.todos.list) || []
  const createTodo = useMutation(api.todos.create)
  const toggleComplete = useMutation(api.todos.toggleComplete)
  const removeTodo = useMutation(api.todos.remove)

  const handleAddTodo = async () => {
    if (newTodoTitle.trim()) {
      await createTodo({
        title: newTodoTitle,
        description: "",
      })
      setNewTodoTitle("")
    }
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const completedCount = todos.filter((t) => t.completed).length

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    gradientHeader: {
      paddingTop: 40,
      paddingBottom: 30,
      paddingHorizontal: 20,
      alignItems: "center",
    },
    headerContent: {
      width: "100%",
    },
    headerTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#FFFFFF",
      letterSpacing: 3,
    },
    inputContainer: {
      marginHorizontal: 20,
      marginTop: -15,
      marginBottom: 20,
    },
    input: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      color: colors.text,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    statsContainer: {
      marginBottom: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.surface,
      borderRadius: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statsText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: "center",
    },
    todoList: {
      gap: 12,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.gradient1, colors.gradient2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientHeader}
      >
        <View style={styles.headerTop}>
          <Text style={styles.title}>TODO</Text>
          <ThemeToggle />
        </View>
      </LinearGradient>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          placeholderTextColor={colors.textSecondary}
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          onSubmitEditing={handleAddTodo}
        />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>{filteredTodos.length} items left</Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity onPress={() => setFilter("all")}>
              <Text
                style={{
                  color: filter === "all" ? colors.primary : colors.textSecondary,
                  fontWeight: filter === "all" ? "600" : "400",
                }}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilter("active")}>
              <Text
                style={{
                  color: filter === "active" ? colors.primary : colors.textSecondary,
                  fontWeight: filter === "active" ? "600" : "400",
                }}
              >
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilter("completed")}>
              <Text
                style={{
                  color: filter === "completed" ? colors.primary : colors.textSecondary,
                  fontWeight: filter === "completed" ? "600" : "400",
                }}
              >
                Completed
              </Text>
            </TouchableOpacity>
            {completedCount > 0 && (
              <TouchableOpacity onPress={() => {}}>
                <Text style={{ color: colors.textSecondary }}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {filteredTodos.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {filter === "completed"
                ? "No completed todos yet"
                : filter === "active"
                  ? "No active todos. Great job!"
                  : "No todos yet. Add one to get started!"}
            </Text>
          </View>
        ) : (
          <View style={styles.todoList}>
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={() => toggleComplete({ id: todo._id })}
                onDelete={() => removeTodo({ id: todo._id })}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
