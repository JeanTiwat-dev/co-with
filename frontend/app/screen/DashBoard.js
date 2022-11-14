import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
} from "react-native";

function DashBoard() {
  const { width } = useWindowDimensions();

  return (
    <View style={{ marginHorizontal: 25 }}>
      {/* content 1 */}
      <View style={styles.numcovid}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            padding: 20,
            fontSize: 15,
          }}
        >
          จำนวนผู้ติดเชื้อสะสม
        </Text>
        <View style={{padding: 20}}>
          <Image source={require('../assets/coronavirus.png')} style={{ height: 140, width: 140 }} />
        </View>
      </View>
      {/* content 2 */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* box 1 */}
        <View
          style={{
            backgroundColor: "#F7A4A4",
            width: "47%",
            height: 175,
            marginTop: 20,
            borderRadius: 30,
            padding: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            จำนวนผู้ติดเชื้อวันนี้
          </Text>
        </View>
        {/* box 2 */}
        <View
          style={{
            backgroundColor: "#FEBE8C",
            width: "47%",
            height: 175,
            marginTop: 20,
            borderRadius: 30,
            padding: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            ยอดหายป่วยวันนี้
          </Text>
        </View>
      </View>
      {/* content 3 */}
      <View
        style={{
          height: 205,
          backgroundColor: "#90A17D",
          marginTop: 20,
          borderRadius: 30,
          padding: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          ยอดหายป่วยสะสม
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  numcovid: {
    backgroundColor: "#446091",
    //   justifyContent: "center",
    //   alignItems: "center",
    height: 280,
    borderRadius: 30,
    marginTop: 20,
  },
});
export default DashBoard;
