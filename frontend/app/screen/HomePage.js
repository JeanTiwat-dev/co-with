import { Zocial } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  useWindowDimensions,
  ViewPropTypes,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

function HomePage() {
  const isCarousel = useRef();
  const { width } = useWindowDimensions();
  let s = Dimensions.get("window").width + 80;
  let i = Math.round(s * 0.7);
  const [index, setIndex] = useState(0);
  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
  ];

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <Image source={{ uri: item.imgUrl }} style={styles.image} />
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  };

  function Features(props) {
    return (
    <View>
        
    </View>
    );
  }

  return (
    <ScrollView>
      {/* header */}
      <View style={styles.header1}>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 15 }}>Welcome</Text>
          <Text style={{ fontSize: 23 }}>name surname</Text>
        </View>
        <Image
          style={{ width: 50, height: 50, borderRadius: 999 }}
          source={require("../assets/user.png")}
        />
      </View>

      {/* Corousel */}
      <View style={{ marginTop: 25 }}>
        <Carousel
          layout="default"
          layoutCardOffset={`9`}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={width}
          itemWidth={width - 80}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
        />
        {/* index page */}
        <Pagination
          dotsLength={data.length}
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

      <View style={styles.header1}>
        <Text style={{ fontSize: 20 }}>Features</Text>
        <Features />
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
  container: {
    backgroundColor: "white",
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
  },
  image: {
    width: "100%",
    height: 100,
  },
  header: {
    color: "#222",
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20,
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
