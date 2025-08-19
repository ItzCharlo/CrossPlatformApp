import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
            backgroundColor: "#25292e"
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
            backgroundColor: "#0f0d23",
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 26,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "0f0d23",
        }
    }}
    >
      <Tabs.Screen name="index" options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({focused, color}) => <Ionicons 
        name={focused ? "home" : "home-outline"} 
        color={color}
        size={30}/>
      }}/>

      <Tabs.Screen name="search" options={{
        title: "Search",
        headerShown: false,
        tabBarIcon: ({focused, color}) => <Ionicons 
        name={focused ? "search" : "search"} 
        color={color}
        size={30}/>
      }}/>

      <Tabs.Screen name="Saved" options={{
        title: "Saved",
        headerShown: false,
        tabBarIcon: ({focused, color}) => <Ionicons 
        name={focused ? "bookmark-outline" : "bookmark-outline"} 
        color={color}
        size={30}/>
      }}/>

      <Tabs.Screen name="+not-found" options={{
        headerShown: false,
      }}
      />
    </Tabs>
  );
}
