import React, {useEffect, useState} from 'react' 
import {Text, View,SafeAreaView,StyleSheet,TouchableOpacity,ImageBackground, StatusBar, Image} from 'react-native'
import { faMusic} from '@fortawesome/free-solid-svg-icons'
import { faAssistiveListeningSystems} from '@fortawesome/free-solid-svg-icons'
import { faTrophy} from '@fortawesome/free-solid-svg-icons'
import { faBookOpen, faCog, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import admob, { MaxAdContentRating, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';
import { LogBox } from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import { YellowBox } from 'react-native'
import * as RNLocalize from "react-native-localize";
import I18n from "../utils/i18n";
import ok from "react-native-i18n";
import Icon from '../../assets/icon2.png';

import Lottie from 'lottie-react-native'
import G from '../animations/lalala.json'
import Ad from '../components/rewardAds'



YellowBox.ignoreWarnings([
    'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
  ])

export default function Menu ( {navigation, props})  {

   const [language, setLanguage] = useState (0)
  
   const isFocused = useIsFocused()
   
   const [timeLeft, setTimeLeft] = useState(100);

   useEffect(() => {
    
       if(timeLeft===0){
        
          setTimeLeft(null)
       }
   
       // exit early when we reach 0

       if (!timeLeft) return;
      
       // save intervalId to clear the interval when the
       // component re-renders
       const intervalId = setInterval(() => {
   
         setTimeLeft(timeLeft - 1);
       }, 1000);
   
       // clear interval on re-render to avoid memory leaks
       return () => clearInterval(intervalId);
       // add timeLeft as a dependency to re-rerun the effect
       // when we update it
     }, [timeLeft]);





    useEffect(() => {
        
        CarregarIdioma()
        
        // mudarIdioma()
        
        //  mudarIdioma()
            admob()
            .setRequestConfiguration({
            // Update all future requests suitable for parental guidance
            maxAdContentRating: MaxAdContentRating.PG,

            // Indicates that you want your content treated as child-directed for purposes of COPPA.
            tagForChildDirectedTreatment: true,

            // Indicates that you want the ad request to be handled in a
            // manner suitable for users under the age of consent.
            tagForUnderAgeOfConsent: true,
            })
            .then(() => {
            // Request config successfully set!
            });
            InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
            
      },[isFocused, language]);
     
     

      const CarregarIdioma = async () =>{
       
         const json = await AsyncStorage.getItem("index3")
        
         const opcaoJson = JSON.parse(json)
        
      
        if (opcaoJson==0){
            // setLanguage(0)
            setLanguage(opcaoJson)
            I18n.locale = 'pt';
           
           
        }else{
            // setLanguage(1)
            setLanguage(opcaoJson)
            I18n.locale = 'en';
           
          
        }
        mudarIdioma()
         
        
    } 
    const mudarIdioma = ()=>{
        
        
        if (language===0){
           
            I18n.locale = 'pt';
        }
        else {
            
            I18n.locale = 'en';
          
        }
        
       
       }
      
    return (
    <SafeAreaView style={styles.safeArea} >
        <StatusBar barStyle="light-content" backgroundColor='#000'/>
        <AnimatedLinearGradient   useNativeDriver={true}  support='useNativeDriver' customColors={presetColors.instagram} useNativeDriver='true'  speed={4000}> 
        <View style={styles.menu}>
        <Image tintColor="#000" resizeMode="stretch" style={styles.iconImg} source={Icon}/>
       
            <TouchableOpacity onPress={()=>navigation.navigate('Partitura')} style={styles.botao}>
                <FontAwesomeIcon color="#000" resizeMode='cover' icon={faMusic} size={30}style={styles.imgMenu}/>
                <Text style={styles.txtMenu}>{I18n.t('reading')}</Text>
            </TouchableOpacity>
           
            <TouchableOpacity onPress={()=>navigation.navigate('Listen')} style={styles.botao}>
                <FontAwesomeIcon color="#000"resizeMode='cover' icon={faAssistiveListeningSystems} size={30} style={styles.imgMenu}/>
                <Text style={styles.txtMenu}>{I18n.t('listen')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={()=>navigation.navigate('Pratice')}>
                <FontAwesomeIcon color="#000"resizeMode='cover' icon={faBookOpen} size={30} style={styles.imgMenu}/>
                <Text style={styles.txtMenu}>{I18n.t('practice')}</Text>
            </TouchableOpacity>
           
        </View>
        <View style={styles.viewConfig}>
                <TouchableOpacity style={{flex:1 }} onPress={()=>navigation.navigate('Help')}>
                    <FontAwesomeIcon color="#000"resizeMode='cover' icon={faQuestionCircle} size={30} style={styles.itemsConfig}/>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, alignItems: 'flex-end', marginRight: 5  }} onPress={()=>navigation.navigate('Settings')}>
                    <FontAwesomeIcon color="#000"resizeMode='cover' icon={faCog} size={30} style={styles.itemsConfig}/>
                </TouchableOpacity>
          </View>
        </AnimatedLinearGradient>
        
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea:{
        flex:1,
        backgroundColor:'#BE0',
    },
    imagemMenu:{
        flex:1,
        height: undefined, width: undefined ,
        resizeMode:'contain',
    },
    menu :{
        flex: 3,
        flexDirection: 'column',
        // backgroundColor:'#be0',
        alignItems: 'center',
        justifyContent:'center',
    },
    iconImg:{
        marginTop:-100,
        marginBottom:20,
        height: 170,
        width: 230,
    },
    botao:{
        // backgroundColor:'#fff3',
        backgroundColor:'#fff1',
        width:260,
        height:80,
        marginTop:15,
        marginBottom: 5,
        // padding:50,
        borderColor: '#fff',
        borderWidth: 1.5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:40,
    },  
    imgMenu:{
        flex: 0.2,
        marginLeft:25,
        width:50,
        height:50,
    },
    txtMenu:{
        flex: 0.8,
        color:'#fff',
        alignContent:'flex-start',
        fontSize:20,
    },
    viewConfig: {
        flex: 0.2,
        
        flexDirection: 'row',
        marginEnd: 5,
        marginLeft: 5,
    },
    itemsConfig:{
        flex: 1,
        marginLeft: 10,
    }
});
