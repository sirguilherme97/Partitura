import React, {useState, useEffect} from 'react'

import {SafeAreaView, StyleSheet, View, Text, StatusBar, ImageBackground, TouchableOpacity,TouchableWithoutFeedback,Image, } from 'react-native';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import I18n from "../utils/i18n";
// import { Row, Rows } from 'react-native-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useIsFocused } from '@react-navigation/native'
import { faTrophy,faBookOpen, faGuitar } from '@fortawesome/free-solid-svg-icons'
import BR from '../../assets/br_flag.png'
import UK from '../../assets/uk_flag.png'
import Piano_icon from '../../assets/piano_icon.png'
import Sax_icon from '../../assets/sax_icon.png'
import F_Clef from '../../assets/f_clef.png'
import G_Clef from '../../assets/g_clef.png'
import '../commomStyles'
import commomStyles from '../commomStyles';
import Btn from '../components/Button'
import admob, { MaxAdContentRating, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob'

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1007113334518871/4008457186';



export default function Settings ({navigation})  {
    const isFocused = useIsFocused()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedIndex2, setSelectedIndex2] = useState(0)
    const [selectedIndex3, setSelectedIndex3] = useState(0)
    const [botaoSelecao, setBotaoSelecao] = useState(0)
    const [loadData1, setLoadData1] = useState (0)
    const [locale, setLocale] = useState ('en')

    
    useEffect(() => {
        Verificar()
        
       
        carregarIndex1()
        carregarIndex2()
        carregarIndex3()
        admob()
        .setRequestConfiguration({
      
        maxAdContentRating: MaxAdContentRating.PG,

      
        tagForChildDirectedTreatment: true,

        tagForUnderAgeOfConsent: true,
        })
        .then(() => {
   
        });
        InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);
      
        
      },[isFocused]);



    const carregarIndex1 = async ()=>{
       
        const json = await AsyncStorage.getItem("index1")
        const opcaoJson = JSON.parse(json)
        setSelectedIndex (parseInt(opcaoJson))
       
        
      
    }
    const Verificar = async () =>{
        const value  = await  AsyncStorage.getItem("index1")
        const value2 = await  AsyncStorage.getItem("index2")
        const idioma = await AsyncStorage.getItem("index3")
        if(value===null){
            await AsyncStorage.setItem("index1", JSON.stringify(0))   
            setSelectedIndex(0)                 
        }
        if(value2===null){
            await AsyncStorage.setItem("index2", JSON.stringify(0))   
            setSelectedIndex2(0)
        }
        if(idioma===null){
            await AsyncStorage.setItem("index3", JSON.stringify(0))   
            setSelectedIndex3(0)                 
        }
       
       

    }
    carregarIndex3 = async ()=>{
       
        const json = await AsyncStorage.getItem("index3")
        const opcaoJson = JSON.parse(json)
        setSelectedIndex3 (parseInt(opcaoJson))

        
      
    }
   
    carregarIndex2 = async ()=>{
       
        const json = await AsyncStorage.getItem("index2")
        const opcaoJson = JSON.parse(json)
        setSelectedIndex2 (parseInt(opcaoJson))

        
      
    }
   
 
    const salvarOpcao =async(id)=>{
       
       setSelectedIndex(id)
        
        await AsyncStorage.setItem("index1", JSON.stringify(id))
     
    }
    const salvarOpcao3 =async(id)=>{
       
       setSelectedIndex3(id)
        
        await AsyncStorage.setItem("index3", JSON.stringify(id))
 
        
    }
    const salvarOpcao2 =async(id)=>{
       
     
        await AsyncStorage.setItem("index2", JSON.stringify(id))
        setSelectedIndex2(id)
        
    
        
    }
  

    
    return (
        
        <SafeAreaView style={styles.safeArea} >
            <StatusBar barStyle="light-content"  backgroundColor='#000' hidden={false}/>
            <AnimatedLinearGradient  useNativeDriver={true}  support='useNativeDriver' customColors={presetColors.instagram} useNativeDriver='true'  speed={4000}> 
            <View  style={styles.principal}>
                  <Text style={styles.txt}>{I18n.t('instruments')}</Text> 
                            <View style={styles.viewInstrumentos}>
                                <TouchableWithoutFeedback onPress={()=>salvarOpcao(0)}>
                                    <View style={selectedIndex==0 ? styles.botaoSelected : styles.botao}>
                                        {/* <FontAwesomeIcon color={selectedIndex!=0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} resizeMode='cover' icon={faBookOpen} size={20} style={styles.imgBotaoNovo} /> */}
                                        <Image tintColor={selectedIndex!=0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} style={styles.icone} source={Piano_icon}></Image>
                                        <Text style={selectedIndex==0 ? styles.txtSelected : styles.txtMenu}>Piano</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback  onPress={()=>salvarOpcao(1)}>
                                    <View style={selectedIndex==1 ? styles.botaoSelected : styles.botao}>
                                        {/* <FontAwesomeIcon color={selectedIndex!=1 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'}resizeMode='cover' icon={faBookOpen} size={20} style={styles.imgBotaoNovo} /> */}
                                        <Image tintColor={selectedIndex!=1 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} style={{width: 30, height: 30, marginLeft: 5,}} source={Sax_icon}></Image>
                                        <Text style={selectedIndex==1 ? styles.txtSelected : styles.txtMenu}>Sax</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback  onPress={()=>salvarOpcao(2)}>
                                    <View style={selectedIndex==2 ? styles.botaoSelected : styles.botao}>
                                        <FontAwesomeIcon resizeMode='cover' icon={faGuitar} size={20} color={selectedIndex!=2 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} style={styles.imgBotaoNovo} />
                                        <Text style={selectedIndex==2 ? styles.txtSelected : styles.txtMenu}>{I18n.t('guitar')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <Text style={styles.txt}>{I18n.t('clef')}</Text> 
                            <View style={styles.viewClave}>
                                <TouchableWithoutFeedback onPress={()=>salvarOpcao2(0)}>
                                    <View style={selectedIndex2==0 ? styles.botaoSelected : styles.botao}>
                                        {/* <FontAwesomeIcon color={selectedIndex2!=0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} resizeMode='cover' icon={faBookOpen} size={20} style={styles.imgBotaoNovo} /> */}
                                        <Image tintColor={selectedIndex2!=0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} style={{height: 40, width: 35, marginRight: 5,}} source={G_Clef}></Image>
                                        <Text style={selectedIndex2==0 ? styles.txtSelected : styles.txtMenu}>{I18n.t('G')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback  onPress={()=>salvarOpcao2(1)}>
                                    <View style={selectedIndex2==1 ? styles.botaoSelected : styles.botao}>
                                        {/* <FontAwesomeIcon color={selectedIndex2!=1 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'}resizeMode='cover' icon={faBookOpen} size={20} style={styles.imgBotaoNovo} /> */}
                                        <Image tintColor={selectedIndex2!=1 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} style={{height: 30, width: 30, marginRight: 5,}} source={F_Clef}></Image>
                                        <Text style={selectedIndex2==1 ? styles.txtSelected : styles.txtMenu}>{I18n.t('F')}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <Text style={styles.txt}>Idioma</Text> 
                            <View style={styles.viewIdioma}>
                                <TouchableWithoutFeedback onPress={()=>salvarOpcao3(0)}>
                                    <View style={selectedIndex3==0 ? styles.botaoSelected : styles.botao}>
                                        {/* <FontAwesomeIcon color={selectedIndex3!=0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} resizeMode='cover' icon={faBookOpen} size={20} style={styles.imgBotaoNovo} /> */}
                                        <Image tintColor={selectedIndex3!=0 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} style={styles.icone} source={BR}></Image>
                                        <Text style={selectedIndex3==0 ? styles.txtSelected : styles.txtMenu}>Português BR</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            
                                <TouchableWithoutFeedback  onPress={()=>salvarOpcao3(1)}>
                                    <View style={selectedIndex3==1 ? styles.botaoSelected : styles.botao}>
                                       
                                     {/* <FontAwesomeIcon color={selectedIndex3!=1 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'}resizeMode='cover' icon={faBookOpen} size={20} style={styles.imgBotaoNovo} /> */}
                                        <Image tintColor={selectedIndex3!=1 ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,1)'} style={{width: 40, height: 40, marginLeft: -10, marginRight: 5,}} source={UK}></Image>
                                        <Text style={selectedIndex3==1 ? styles.txtSelected : styles.txtMenu}>English UK</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
            <View style={styles.ViewAd}>
                <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER}/>
            </View>
            </View>
            </AnimatedLinearGradient>
        </SafeAreaView>
        )
}
const styles = StyleSheet.create({
    safeArea:{
        flex:1,
        
      
    },
    principal:{
        flex:1,
        backgroundColor: 'rgba(255,255,255, 0.3)',
        zIndex: 5,
    },
    testePrincipal:{
        color:'#fff',
        fontSize:50,
    },
    txt:{
        color: commomStyles.colors.texto,
        fontSize: 20,
        alignContent: 'center',
        alignSelf: 'center',
        marginTop:15,

    },
    viewInstrumentos:{
        flex: 1,
        // backgroundColor: '#be0',
        marginTop: 15,
        flexDirection: 'row',
    },
    viewClave:{
        flex: 1,
        marginTop: 15,
        // backgroundColor: '#be0',
        flexDirection: 'row',
    },  
    viewIdioma:{
        marginTop: 15,
        flex: 10,
        flexDirection: 'row',
    },
    viewBtn:{
        flex: 1,
        marginTop: 15,
        justifyContent: 'center',
        
        flexDirection: 'row',
       
    },
    Btn:{
        width: 80,
        height: 50,
        borderRadius: 10,
        borderWidth: 5,
    },
    tabsContainerStyle:{
       marginTop: 15,
       height: 50,
       justifyContent: 'center',
       
       
    },
    tabStyle :{
        backgroundColor:'rgba(255,255,255,0.5)',
        borderWidth: 0,
        borderColor: 'rgba(255,255,255, 0)',
      
    },
    activeTabStyle:{
        backgroundColor: '#fff',
        color:'#666',
    },
    activeTabTextStyle:{
        color:'#333',
    },
    tabTextStyle:{
        color:'#666',
        fontSize:20,
    },
    firstTabStyle:{
        marginRight:1,
    },
    firstTabStyle_clave:{
        marginRight:-1,
    },
    imgMenu:{
        
        zIndex: 5,
        marginTop: -45,
        // marginLeft: 10,
    },
    viewIcones:{
        marginTop:15,
        flex: 2,
        flexDirection:'row',
       
    },
  
    imgBotaoNovo:{
      
      marginRight: 10,
    },
    txtMenu:{
        color: '#888',
        fontSize: 22,
        textAlign: 'center',
    },
    botao:{
        backgroundColor:'rgba(255,255,255,0.5)',
        width: 130,
        flex:1,
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    botaoSelected:{
        flex: 1,
       
        backgroundColor: '#fff',
        height: 50,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    txtSelected:{
        color: '#000',
        fontSize: 22,
        textAlign: 'center',
    },
    icone:{
        height: 35,
        width: 35,
        marginLeft: -10,
        marginRight: 5,
    },
    ViewAd:{
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },

});
