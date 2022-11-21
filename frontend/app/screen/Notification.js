import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import path from "../../path";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function Notification() {
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(true);

  function Boxnotification(props) {
    return (
      <TouchableOpacity
        style={styles.boxnoti}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            style={{ width: 50, height: 50, marginRight: 20 }}
            source={require("../assets/virus.png")}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Student infection!!
            </Text>
            <Text style={{ fontSize: 16, marginTop: 5 }}>
              The subject that you teach has a student infected{" "}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView
      style={
        {
          // backgroundColor: "#1E4E89",
        }
      }
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        paddingVertical: 30,
      }}
    >
      {/* nothing here */}
      {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{ width: 130, height: 130 }}
          source={require("../assets/notification.png")}
        />
        <Text style={{ fontSize: 22, fontWeight: "500", marginTop: 35, color: '#B2B2B2' }}>
          Nothing here!!!
        </Text>
      </View> */}

      {/* have notification */}
      <View
        style={{ alignItems: "center", justifyContent: "center", width: width }}
      >
        <Boxnotification />
        <Boxnotification />
      </View>
      <View>
        {/* model */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{ width: 100, height: 100 }}
                source={require("../assets/mask.png")}
              />
              <View>
                <Text style={{ fontSize: 22, marginTop: 25, fontWeight: '500' }}>นักศึกษาติดเชื้อ Covid-19</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>
                  ชื่อ: นายคัมภีร์ ไบเบิล 
                </Text>
                <Text style={{ fontSize: 18 }}>รหัสนักศึกษา: 63070111</Text>
                <Text style={{ fontSize: 18,  }}>
                  ลงทะเบียนเรียนรายวิชา:
                </Text>
                <Text style={{ fontSize: 18 }}>mobile app</Text>
                <Text style={{ fontSize: 18 }}>รหัสวิชา: 090675</Text>
              </View>
              {/* button */}
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {/* back */}
                <Pressable
                  style={[
                    styles.button,
                    // styles.buttonClose,
                    {
                      backgroundColor: "tomato",
                      //   marginRight: 15,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: -2,
                        height: 2,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      elevation: 5,
                      //   borderWidth: 1,
                      //   borderColor: "tomato",
                    },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text
                    style={{ color: "white", fontSize: 18, fontWeight: "500" }}
                  >
                    Back
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  boxnoti: {
    backgroundColor: "white",
    width: "85%",
    height: 100,
    borderRadius: 15,
    marginBottom: 15,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 10,
    width: "75%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 25,
  },
});

export default Notification;
