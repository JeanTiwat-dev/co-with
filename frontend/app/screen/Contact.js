import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useRef, useState } from "react";


function Contact() {

  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  function CardContact(props) {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: props.color,
          width: "45%",
          height: 200,
          marginHorizontal: "2.5%",
          borderRadius: 15,
          marginVertical: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: -2,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
        }}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <View style={{ paddingVertical: 20, alignItems: "center" }}>
          <Image
            style={{ width: 100, height: 100, marginBottom: 15, borderRadius: 999 }}
            source={props.image}
          />
          <Text style={{ fontWeight: "bold" }}>{props.txt}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={{ width: width, paddingHorizontal: 25}}>
      <View style={{ paddingVertical: 30 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Contact</Text>
        {/* search */}
        <TextInput
          style={{
            height: 40,
            borderWidth: 0.5,
            padding: 10,
            marginTop: 20,
            borderColor: "white",
            borderRadius: 10,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: -2,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 5,
          }}
          placeholder={"Search"}
          returnKeyType= 'search'
        ></TextInput>
      </View>
      {/* cardcontact */}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
          width: "100%",
          // marginTop: 10,
        }}
      >
        {/* card */}
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname'/>
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname'/>
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname'/>
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname'/>
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname'/>
        <CardContact color="#607EAA" image={require("../assets/logohugg_mini.png")} txt='name surname'/>
      </View>
        {/* modal */}
      <View style={styles.centeredView}>
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
              <Image style={{ width: 150, height: 150, marginBottom: 25 }} source={require('../assets/logohugg_mini.png')}/>
              <Text style={{fontSize: 25, marginBottom: 10}}>Name Surname</Text>
              <Text style={{fontSize: 14}}>ช่องทางการติดต่อของอาจารย์ช่องทางการติดต่อของอาจารย์ช่องทางการติดต่อของอาจารย์ช่องทางการติดต่อของอาจารย์</Text>
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
                    // { marginLeft: 5, marginRight: 5 },
                  ]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Back</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "70%",
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
    backgroundColor: "#FFB13C",
              width: 120,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: -2,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5,
              marginTop: 25,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Contact;
