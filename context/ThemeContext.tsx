"use client"

import AsyncStorage from "@react-native-async-storage/async-storage"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"

type ThemeType = "light" | "dark"

interface ThemeColors {
  primary: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  accent: string
  gradient1: string
  gradient2: string
}

interface ThemeContextType {
  theme: ThemeType
  colors: ThemeColors
  toggleTheme: () => void
}

const lightColors: ThemeColors = {
  primary: "#8B5CF6",
  background: "#F8F8F8",
  surface: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  accent: "#EC4899",
  gradient1: "#8B5CF6",
  gradient2: "#4F46E5",
}

const darkColors: ThemeColors = {
  primary: "#A78BFA",
  background: "#0F172A",
  surface: "#1E293B",
  text: "#F1F5F9",
  textSecondary: "#CBD5E1",
  border: "#334155",
  accent: "#F472B6",
  gradient1: "#8B5CF6",
  gradient2: "#4F46E5",
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme() as ThemeType
  const [theme, setTheme] = useState<ThemeType>(systemTheme || "light")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("app-theme")
        if (savedTheme) {
          setTheme(savedTheme as ThemeType)
        }
      } catch (error) {
        console.error("Failed to load theme:", error)
      }
      setIsLoaded(true)
    }

    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    try {
      await AsyncStorage.setItem("app-theme", newTheme)
    } catch (error) {
      console.error("Failed to save theme:", error)
    }
  }

  const colors = theme === "light" ? lightColors : darkColors

  return <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
