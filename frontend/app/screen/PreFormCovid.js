import {
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

function Preformcovid() {
  const { height, width } = useWindowDimensions();
  console.log(height);
  return (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View style={[styles.covidcontainer, { width: width }]}>
        <Image
          style={{ width: 250, height: 250 }}
          source={require("../assets/virus.png")}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          backgroundColor: "white",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          height : "45%",
          width : width
        }}
      >
        <View style={{ marginTop: 70 }}>
          <Text
            style={{ fontSize: 26, textAlign: "center", fontWeight: "bold" }}
          >
            ฟอร์มสำหรับผู้ที่ติดเชื้อ
          </Text>
          <Text
            style={{
              fontSize: 26,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 5,
            }}
          >
            Covid-19
          </Text>
          <Text style={{ fontSize: 18, textAlign: "center", marginTop: 15 }}>
            เริ่มกรอกฟอร์มเพื่อแจ้งว่าติดเชื้อ Covid-19
          </Text>
        </View>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "orange",
              width: 150,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>START</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  covidcontainer: {
    backgroundColor: "#476E9E",
    justifyContent: "center",
    alignItems: "center",
    height: 450,
    // borderBottomLeftRadius: 200,
    // borderBottomRightRadius: 200,
  },
});
export default Preformcovid;