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
    <ScrollView style={{ paddingHorizontal: 25 }}>
      {/* content 1 */}
      <View style={styles.content1}>
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
        <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image source={require('../assets/coronavirus.png')} style={{ height: 100, width: 100 }} />
          <View style={{width: '70%', height: '90%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 28, fontWeight: 'bold'}}>XX คน</Text>
          </View>
        </View>
      </View>
      {/* content 2 */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* box 1 */}
        <View
          style={styles.content2_1}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            จำนวนผู้ติดเชื้อวันนี้
          </Text>
          <View style={{width: '100%', height: '85%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>XX คน</Text>
          </View>
        </View>
        {/* box 2 */}
        <View
          style={styles.content2_2}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            ยอดหายป่วยวันนี้
          </Text>
          <View style={{width: '100%', height: '85%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>XX คน</Text>
          </View>
        </View>
      </View>
      {/* content 3 */}
      <View
        style={styles.content3}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
          ยอดหายป่วยสะสม
        </Text>
        <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '100%'}}>
          <View style={{width: '40%', height: '90%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 28, fontWeight: 'bold'}}>XX คน</Text>
          </View>
          <Image source={require('../assets/logohugg_mini.png')} style={{ height: 110, width: 180}} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content1: {
    backgroundColor: "#446091",
    //   justifyContent: "center",
    //   alignItems: "center",
    height: 220,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
  },
  content2_1: {
    backgroundColor: "#F7A4A4",
            width: "47%",
            height: 175,
            marginTop: 20,
            borderRadius: 30,
            padding: 20,
    shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
  },
  content2_2: {
    backgroundColor: "#FEBE8C",
            width: "47%",
            height: 175,
            marginTop: 20,
            borderRadius: 30,
            padding: 20,
    shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
  },
  content3: {
    height: 205,
    backgroundColor: "#90A17D",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 30,
    padding: 20,
    shadowColor: "#000",
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
  },
});
export default DashBoard;
