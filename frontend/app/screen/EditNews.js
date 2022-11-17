import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    useWindowDimensions,
    Dimensions,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import NewsDetail from "./NewsDetail";
  import Card from "../component/Card";
  import Carousel, { Pagination } from "react-native-snap-carousel";
  import { useNavigation } from "@react-navigation/native";


const EditNews = () => {
    const router = useNavigation();
    const [data, setData] = useState([
        {
          id: 1,
          title: "news1",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla eros volutpat nisl semper, vitae tempor diam vulputate. Pellentesque a lobortis libero. Vivamus mauris arcu, ultrices sed condimentum et, iaculis sit amet enim. Fusce porta lacinia libero, eu dignissim neque pulvinar id. Ut et dignissim mauris. Proin fermentum et sem eget tristique. Donec imperdiet nulla iaculis enim finibus malesuada. Duis vel risus nisl. Nulla tristique mi in orci auctor, nec dignissim ligula euismod. In varius eu nulla vel commodo. Maecenas sodales mi sit amet tortor euismod, vel porta nulla dapibus. Nunc semper sollicitudin mi id porta.",
          uri: "https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/ogimage.png",
        },
        {
          id: 2,
          title: "news2",
          content:
            "In justo lorem, tempor a feugiat vel, lacinia non urna. Integer suscipit urna quis congue aliquet. Vestibulum blandit semper vehicula. Nam viverra ipsum ut tempor rutrum. Donec a suscipit purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed malesuada dignissim massa, id dignissim ipsum suscipit quis.",
          uri: "https://www.howtogeek.com/wp-content/uploads/2019/05/img_5cf05d111ada0.png?height=200p&trim=2,2,2,2&crop=16:9",
        },
        {
          id: 3,
          title: "news2",
          content:
            "In justo lorem, tempor a feugiat vel, lacinia non urna. Integer suscipit urna quis congue aliquet. Vestibulum blandit semper vehicula. Nam viverra ipsum ut tempor rutrum. Donec a suscipit purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed malesuada dignissim massa, id dignissim ipsum suscipit quis.",
          uri: "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png",
        },
        {
          id: 4,
          title: "news2",
          content:
            "In justo lorem, tempor a feugiat vel, lacinia non urna. Integer suscipit urna quis congue aliquet. Vestibulum blandit semper vehicula. Nam viverra ipsum ut tempor rutrum. Donec a suscipit purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed malesuada dignissim massa, id dignissim ipsum suscipit quis.",
          uri: "https://imgeng.jagran.com/images/2022/jul/breaking-news-21657073755002.jpg",
        },
        {
          id: 5,
          title: "news2",
          content:
            "In justo lorem, tempor a feugiat vel, lacinia non urna. Integer suscipit urna quis congue aliquet. Vestibulum blandit semper vehicula. Nam viverra ipsum ut tempor rutrum. Donec a suscipit purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed malesuada dignissim massa, id dignissim ipsum suscipit quis.",
          uri: "https://static.files.bbci.co.uk/ws/simorgh-assets/public/news/images/metadata/poster-1024x576.png",
        },
        {
          id: 6,
          title: "news2",
          content:
            "In justo lorem, tempor a feugiat vel, lacinia non urna. Integer suscipit urna quis congue aliquet. Vestibulum blandit semper vehicula. Nam viverra ipsum ut tempor rutrum. Donec a suscipit purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed malesuada dignissim massa, id dignissim ipsum suscipit quis.",
          uri: "https://prod.static9.net.au/_/media/2020/01/22/12/27/9-news-australia-national.jpg",
        },
      ]);
      
    return (    <ScrollView style={styles.scrollview}>
        <Text style={styles.topic}>แก้ไขข่าว</Text>
        <View style={styles.newsContainer}>
          {data.map((data) => (
            <TouchableOpacity key={data.id} onPress={()=>{
              router.navigate('NewsDetail', {data: data});
            }}>
              <Card>
                <View style={styles.imageContainer}>
                  <Image style={styles.newsImage} source={{ uri: data.uri }} />
                </View>
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>{data.title}</Text>
                  <View>
                    <Text numberOfLines={3}>{data.content}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>);
}

const styles = StyleSheet.create({
    scrollview: {
      // width : '100%',
      // paddingHorizontal : 40,
    },
    topic: {
      fontSize: 35,
      paddingHorizontal: 40,
      marginTop: 30,
    },
    newsContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      flexWrap: "wrap",
      paddingHorizontal: 35,
      marginTop: 30,
    },
    newsImage: {
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      height: "40%",
    },
    newsContent: {
      paddingHorizontal: 10,
      marginTop: 10,
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
      paddingRight: 20,
    },
    imageCarousel: {
      width: "100%",
      height: 100,
    },
    newsTitle: {
      fontWeight: "bold",
    },
  });

export default EditNews;