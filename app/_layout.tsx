import { ThemeProvider } from "@/context/ThemeContext"
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { Stack } from "expo-router"

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL || "")

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </ConvexProvider>
  )
}
