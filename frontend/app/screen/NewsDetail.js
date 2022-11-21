import { useState } from "react";
import {View, Text, StyleSheet, ScrollView, Image, useWindowDimensions} from "react-native";
import path from "../../path";


const NewsDetail = ({route}) => {
    const {width} = useWindowDimensions();
    const ratio = width/541
    // console.log(route);
    // const news = props.news;
    const [news, setNews] = useState(route.params.data);
    console.log(news.image);
    return (
        <ScrollView>
            <Image source={{ uri : `${path}${news.image}` }} style={{width : width, height : 362 * ratio}} />
            <View style={styles.container}>
                <Text style={styles.title}>{news.title}</Text>
                <Text style={styles.content}>{news.content}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal : 30,
        marginTop : 20
    },
    title : {
        fontWeight : 'bold',
        fontSize : 22
    },
    content : {
        marginTop : 20,
        fontSize : 18

    }
})
export default NewsDetail;