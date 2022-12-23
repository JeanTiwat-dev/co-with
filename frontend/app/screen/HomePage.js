import { Zocial } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import path from "../../path";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Features(props) {
  let img = props.image;
  return (
    <TouchableOpacity
      onPress={() => {
        props.router();
      }}
      style={{
        backgroundColor: props.color,
        width: "45%",
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
    >
      <View style={{ padding: 15, alignItems: "center" }}>
        <Image
          style={{ width: 80, height: 80, marginBottom: 15 }}
          source={props.image}
        />
        <Text style={{ fontWeight: "bold" }}>{props.txt}</Text>
      </View>
    </TouchableOpacity>
  );
}

function HomePage({ route }) {
  // console.log(route);
  const router = useNavigation();
  const isCarousel = useRef();
  const { width } = useWindowDimensions();
  let s = Dimensions.get("window").width + 80;
  let i = Math.round(s * 0.7);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState([]);
  const [annouce, setAnnouce] = useState([]);
  // const [image, setImage] = useState(null);

  // console.log(user);
  async function Getuser() {
    const datauser = await AsyncStorage.getItem("@user");
    console.log(JSON.parse(datauser)._id);
    if (datauser) {
      await axios
        .post(`${path}/users/getUserId`, { _id: JSON.parse(datauser)._id })
        .then((res) => {
          // console.log(res.data[0].img);
          setUser(res.data);
          // if (res.data[0].img != null) {
          //   setImage(res.data[0].img);
          // }
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }

  useEffect(() => {
    Getuser();
    getNews();
    const willFocusSubscription = router.addListener("focus", () => {
      Getuser();
    });
    return willFocusSubscription;
  }, []);

  // console.log(annouce);
  const getNews = async () => {
    await axios
      .get(`${path}/news`)
      .then((res) => {
        // setData(res.data);
        // setBackup(res.data);
        setAnnouce(
          res.data.filter((value, index) => {
            if (index < 3) {
              return value;
            }
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CarouselCardItem = ({ item, index }) => {
    console.log(`${path}${item.image}`)
    return (
      <TouchableOpacity
      style={{padding: 5}}
        onPress={() => {
          router.navigate("NewsDetail", { data: item });
        }}
      >
        <View style={styles.container} key={index}>
          <Image
            source={{ uri: `${path}${item.image}` }}
            style={styles.image}
          />
          <Text style={styles.header}>{item.title}</Text>
          {/* <Text style={styles.body}>{item.body}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      {/* header */}
      <View style={styles.header1}>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 15 }}>Welcome</Text>
          <Text style={{ fontSize: 23 }}>
            {user.firstname + " " + user.lastname}
          </Text>
        </View>
        {/* user img */}
        <TouchableOpacity
          onPress={() => {
            router.navigate("Profile");
          }}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 999 }}
            source={{ uri: `${path}${user.img}` }}
          />
        </TouchableOpacity>
      </View>

      {/* Corousel */}
      {annouce && (
        <View style={{ marginTop: 25 }}>
          <Carousel
            layout="default"
            layoutCardOffset={9}
            ref={isCarousel}
            data={annouce}
            renderItem={CarouselCardItem}
            sliderWidth={width}
            itemWidth={width - 80}
            inactiveSlideShift={0}
            onSnapToItem={(index) => setIndex(index)}
            useScrollView={true}
          />
          {/* index page */}
          <Pagination
            dotsLength={annouce.length}
            activeDotIndex={index}
            carouselRef={isCarousel}
            dotStyle={{
              width: 5,
              height: 5,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: "rgba(0, 0, 0, 0.92)",
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
      )}

      <Text style={{ fontSize: 20, paddingHorizontal: 25, fontWeight: "bold" }}>
        Features
      </Text>
      <View style={styles.header2}>
        <Features
          image={require("../assets/mask.png")}
          txt={"Report Covid-19 Infection"}
          color={"#FFB13C"}
          router={() => {
            router.navigate("FormCovid19");
          }}
        />
        <Features
          image={require("../assets/dashboard.png")}
          txt={"DashBoard"}
          color={"#6E83B7"}
          router={() => {
            router.navigate("DashBoard");
          }}
        />
        <Features
          image={require("../assets/contacts.png")}
          txt={"Contacts"}
          color={"#6E83B7"}
          router={() => {
            router.navigate("Contact");
          }}
        />
        <Features
          image={require("../assets/journalism.png")}
          txt={"News"}
          color={"#FFB13C"}
          router={() => {
            router.navigate("News");
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    width: "100%",
    marginTop: 20,
  },
  header2: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    // justifyContent: "space-between",
    paddingHorizontal: 25,
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "white",
    height: 215,
    borderRadius: 8,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    // overflow: 'hidden'
  },
  image: {
    width: "100%",
    height: 120,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  header: {
    color: "#222",
    fontSize: 17,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  body: {
    color: "#222",
    fontSize: 10,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default HomePage;
