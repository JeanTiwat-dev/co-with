import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './app/screen/HomePage';
import Navigation from './app/navigation/Navigation';
import EditProfile from './app/screen/EditProfile';
import Login from './app/screen/Login';
import Loading from './app/screen/Loading';
import PreLogin from './app/screen/PreLogin';
import Contact from './app/screen/Contact';
import { ToastProvider } from 'react-native-toast-notifications'
import { Notification } from './app/screen/Notification';
export default function App() {
  return (
    <ToastProvider>
      <Navigation/>
    </ToastProvider>
    // <Login/> 
    // <Notification/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
