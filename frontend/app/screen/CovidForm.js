import {View, TextInput, StyleSheet, Text, ScrollView, ImageBackground, Image, TouchableOpacity} from "react-native";

function CovidForm(){
    return (
        <View>
            <ImageBackground source={require('../assets/FormBG.png')} resizeMode="cover" style={styles.background}>
            <Image
        style={styles.logo}
        source={require('../assets/coronavirus.png')}
      />
            <View style={styles.container}>
                <Text style={styles.text}>ฟอร์มสำหรับนักศึกษาติดเชื้อ</Text>
                <Text style={styles.text}>Covid-19</Text>
                <Text style={styles.description}>เริ่มกรอกฟอร์มเพื่อแจ้งว่าติดเชื้อ Covid-19</Text>
                <TouchableOpacity style={styles.button}>
                    <Text>Start</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    );  
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignContent : 'center',
        marginHorizontal : 50,
        flexWrap : 'wrap',
        alignItems : 'center',
        marginTop : '55%'
    },
    description : {
        color : 'grey',
        marginTop : 8
    },
    text : {
        textAlign : 'center',
        fontWeight : 'bold',
        fontSize : 25,
        marginBottom : 10
    },
    button : {
        alignItems: "center",
        backgroundColor: "rgb(255,173,20)",
        paddingVertical: 20,
        paddingHorizontal : 80,
        marginTop : 40,
        borderRadius : 20

    },
    background: {
        justifyContent: "center",
        width: '100%',
        height: '100%',
      },
      logo : {
        height : '30%',
        alignSelf : 'center',
        resizeMode : 'contain',
        top : '12%',
        // backgroundColor: 'black'
      }
})

export default CovidForm;
