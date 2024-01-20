import React from 'react' 
import {Text, View,SafeAreaView,StyleSheet,TouchableOpacity,ImageBackground, StatusBar, Image } from 'react-native'
// import { faMusic} from '@fortawesome/free-solid-svg-icons'
// import { faAssistiveListeningSystems} from '@fortawesome/free-solid-svg-icons'
// import { faTrophy} from '@fortawesome/free-solid-svg-icons'
// import { faBookOpen} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
// import Icon from '../../assets/icon2.png'
// import Table from '../components/table'
// import Loading from '../../assets/loading.json'
import Lottie from 'lottie-react-native'
import Tela from '../animations/loading2.json'
import Clave from '../animations/clave.json'

import Bar from '../animations/loading_bar.json'
import Nota from '../animations/musica.json'
import musical from '../animations/Nota_musical.json'

// import Icon from '../../assets/icon2.png'
export default function Splash ({navigation}) {
    
    return (
    <SafeAreaView style={styles.safeArea} >
         <AnimatedLinearGradient customColors={presetColors.instagram} useNativeDriver='true'  speed={400}>
        <StatusBar barStyle="light-content" backgroundColor='#000' hidden={false}/>
        
         <View style={styles.principal}>
        <Lottie   resizeMode='contain' source={Tela} autoPlay ></Lottie>
           
        <Lottie style={{marginLeft: -10, transform: [{scaleX: 1.0}, {scaleY: 0.8}, {scaleX: 0.8}]}} loop={false} resizeMode='contain'onAnimationFinish={()=>navigation.navigate('Menu')} source={Clave} autoPlay ></Lottie>
        </View>
       
  
        </AnimatedLinearGradient>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea:{
        flex:1,
        backgroundColor:'#000',
    },
    principal:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding: 100,
    },
    testePrincipal:{
        color:'#fff',
        fontSize:50,
    },
});
