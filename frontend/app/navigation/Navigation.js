import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import HomePage from "../screen/HomePage";
import Notification from "../screen/Notification";
import Profile from "../screen/Profile";
import Preformcovid from "../screen/PreFormCovid";
import DashBoard from "../screen/DashBoard";
import Login from "../screen/Login";
import Loading from "../screen/Loading";
import Contact from "../screen/Contact";
import NewsPage from "../screen/NewsPage";
import NewsDetail from "../screen/NewsDetail";
import FormCovid from "../screen/FormCovid";
import PreLogin from "../screen/PreLogin";

const HomeNav = createNativeStackNavigator();
const TabBar = createBottomTabNavigator();
const PageLogin = createNativeStackNavigator();

function HomeStack() {
  return (
    <HomeNav.Navigator initialRouteName="Home">
      <HomeNav.Screen
        name="Home"
        component={HomePage}
        options={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Home",
        }}
      />
      <HomeNav.Screen
        name="FormCovid19"
        component={Preformcovid}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Report Covid-19",
        }}
      />
      <HomeNav.Screen
        name="FormCovid"
        component={FormCovid}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Report Covid-19",
        }}
      />
      <HomeNav.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Dashboard",
        }}
      />
      <HomeNav.Screen
        name="Contact"
        component={Contact}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "Contacts",
        }}
      />
      <HomeNav.Screen
        name="News"
        component={NewsPage}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: "News",
        }}
      />
      <HomeNav.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={({route})=>({
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          title: route.params.data.title,
        })}
      />
    </HomeNav.Navigator>
  );
}

function LoginStack() {
  return (
    <PageLogin.Navigator initialRouteName="LoadingLogin">
      <PageLogin.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <PageLogin.Screen
        name="LoadingLogin"
        component={Loading}
        options={{ headerShown: false }}
      />
      <PageLogin.Screen
        name="PreLogin"
        component={PreLogin}
        options={{ headerShown: false }}
      />
      <PageLogin.Screen name="TabHome" component={TabNavigation} options={{headerShown: false}}/>
    </PageLogin.Navigator>
  );
}

function TabNavigation() {
  return (
    <TabBar.Navigator
      initialRouteName="HomePage"
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
        name="HomePage"
        component={HomeStack}
        options={{
          headerShown: false,
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
            backgroundColor: "#f4511e",
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
      <LoginStack/>
      {/* <TabNavigation/> */}
    </NavigationContainer>
  );
}

export default Navigation;
