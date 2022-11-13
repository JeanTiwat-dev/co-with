import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import HomePage from "../screen/HomePage";
import Notification from "../screen/Notification";
import Profile from "../screen/Profile";

const ChatNavigator = createNativeStackNavigator();
const TabBar = createBottomTabNavigator();

function TabNavigation() {
    return (
        <TabBar.Navigator
            screenOptions={{
                tabBarStyle: { paddingTop: 10 },
            }}
        >
            <TabBar.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="notifications" size={size} color="black" />;
                    },
                }}
            />
            <TabBar.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="home" size={size} color="black" />;
                    },
                    headerStyle: {
                        backgroundColor: "#f4511e",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
            <TabBar.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome name="user" size={size} color="black" />;
                    },
                    headerStyle: {
                        backgroundColor: "#eeb711",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />
        </TabBar.Navigator>
    );
}

function Navigation() {
    return (
        <NavigationContainer>
            <TabNavigation />
        </NavigationContainer>
    );
}

export default Navigation;
