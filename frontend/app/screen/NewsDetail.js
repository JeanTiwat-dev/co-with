import {View, Text, StyleSheet, ScrollView, Image} from "react-native";


const NewsDetail = () => {
    // const news = props.news;
    return (
        <ScrollView>
            <Image source={{ uri : 'https://prod.static9.net.au/_/media/2020/01/22/12/27/9-news-australia-national.jpg' }} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.title}>header</Text>
                <Text style={styles.content}>In justo lorem, tempor a feugiat vel, lacinia non urna. Integer suscipit urna quis congue aliquet. Vestibulum blandit semper vehicula. Nam viverra ipsum ut tempor rutrum. Donec a suscipit purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed malesuada dignissim massa, id dignissim ipsum suscipit quis.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image : {
        width: '100%',
        height : 200
    },
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