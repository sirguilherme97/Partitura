import React, { useState, useEffect } from 'react'
import {Text, View,SafeAreaView,StyleSheet,TouchableOpacity,ImageBackground, StatusBar, Image} from 'react-native'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import Btn from '../components/Button'
import commomStyles from '../commomStyles'
import partitura from '../../assets/pauta.png'
import LinhaAux from '../../assets/linhaaux.png'
import Nota from '../../assets/nota.png'
import Posicoes from '../notas'
import admob, { MaxAdContentRating, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob'

export default function Pratice ({navigation}){
    const [combo, setCombo] = useState (1)
    const [multi, setMulti] = useState (1)
    const [score, setScore] = useState(0)
    const [core1, setCore1] = useState (true)
    const [core2, setCore2] = useState (true)
    const [core3, setCore3] = useState (true)
    const [notas, setNotas] = useState (Posicoes)
    const [posicao, setPosicao] = useState(130)
    const [aleatorio, setAleatorio] = useState (0)
    const [noturno, setNoturno] = useState(false)
    const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-1007113334518871/4008457186';

    useEffect(() => {
      notaAleatoria()
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
      
    },[]);




    const notaAleatoria  = () =>  {
      const value =  Math.floor((Math.random() * 12) + 0)
      if (value === 0){
        setPosicao (160)
        setAleatorio (value)
       
      }
      else {
        const valor =  Math.floor(Math.random() * (310 - 140 + 1) ) + 140
        setPosicao (valor)
        setAleatorio(value)
        
    }
  }

    const endGame = () =>{
      setisVisible(false)
    }
    
    const resetarVariaveis=()=>{
      setCore1(true)
      setCore2(true)
      setCore3(true)
      setScore(0)
    } 

    const Score = (id) => {
      // console.log(id)
      



    if (id === aleatorio){
     const  valor = 10
     const resultado =  valor * multi + score
      setScore(resultado)
      setMulti(multi+ 0.2)
      setCombo (combo+1)
      
      
    }else {
      
      
      setMulti(1)
      setCombo(1)
   
    }
   
  
    notaAleatoria()
    
  
  }

        return (
            <>
              <StatusBar barStyle="dark-content" />
              <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" backgroundColor='#000' />
              <AnimatedLinearGradient customColors={presetColors.instagram} useNativeDriver='true'  speed={4000}>
                <View style={ styles.viewPartitura }>
                  
                  <View style={styles.viewInfo}>
                          <Text style={ styles.scoreTxt}>Score:</Text>
                          <Text style={ styles.pontosTxt}>{score}</Text>
                      
                  </View>
                  <Text style={ styles.combo}>Combo: {combo }x</Text>
                </View>
                <View style={styles.viewImagens}>
                  <View style={styles.imgChild}>
                      <ImageBackground style={styles.image} source={ partitura}/>    
                      
                      <Image  style={[styles.imgNota, { marginTop: notas[aleatorio].posicao }, {marginLeft: posicao }  ] } source={Nota}/>
                      {aleatorio===0 ? <ImageBackground style={styles.linhaaux} source={LinhaAux}/> : null }
                    </View>
                  </View>   
                  <View style={styles.viewBotoes}>
                    <View  style={styles.viewBtn}>
                      <Btn style={styles.botoes} btnCor={aleatorio===0 ?  '#149e06' : null} nome='Dó'    rand={()=>Score(0)} ></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===1?   '#149e06' : null} nome='Ré'    rand={()=>Score(1)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===2 ?  '#149e06' : null} nome='Mi'    rand={()=>Score(2)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===3 ?  '#149e06' : null} nome='Fá'    rand={()=>Score(3)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===4 ?  '#149e06' : null} nome='Sol'   rand={()=>Score(4)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===5 ?  '#4e0' : null} nome='Lá'    rand={()=>Score(5)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===6 ?  '#4e0' : null} nome='Sí'    rand={()=>Score(6)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===7 ?  '#4e0' : null} nome='Dó'    rand={()=>Score(7)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===8 ?  '#4e0' : null} nome='Ré'    rand={()=>Score(8)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===9 ?  '#4e0' : null} nome='Mi'    rand={()=>Score(9)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===10 ? '#4e0' : null} nome='Fá'    rand={()=>Score(10)}></Btn>
                      <Btn style={styles.botoes} btnCor={aleatorio===11 ? '#4e0' : null} nome='Sol'   rand={()=>Score(11)}></Btn>
                    </View>
                  </View> 
                  <View style={styles.ViewAd}>
                    <BannerAd unitId={adUnitId} size={BannerAdSize.BANNER}/>
                  </View>
                </AnimatedLinearGradient>
              </SafeAreaView>
            </>
          );

  
}
const styles = StyleSheet.create({
    container:{
      flex: 1
    },
    viewPartitura:{
      flex: 1,
      backgroundColor: commomStyles.colors.corTela,
    },
    Imgcore:{
      margin: 2.5,
    },
    score: {
      flexDirection: 'column'
    },
    imgMoon:{
      flexDirection: 'row',
      margin: 20,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      alignSelf: 'flex-end'
    },
  

    botoes: { 
      borderWidth: 3,
      borderColor: commomStyles.colors.bordabtn,
      width: 60,
      height: 60,
      padding:10,
      marginTop: 10,
      marginRight: 15,
      alignContent: 'space-between',
      borderRadius: 20,
      // backgroundColor:commomStyles.colors.btns,
      backgroundColor: '#be0',
    },  
    botaoV: { 
      borderWidth: 3,
      borderColor: commomStyles.colors.bordabtn,
      width: 60,
      height: 60,
      padding:10,
      marginTop: 10,
      marginRight: 15,
      alignContent: 'space-between',
      borderRadius: 20,
      backgroundColor: '#be0',
    },
    image:{
      flex: 1,
      marginTop: 25,
      marginLeft:8.5,
      width: 375,
      // zIndex: 5,
      height: 210,
      
      
    },
    viewInfo:{
      flexDirection: 'row',
    },
    scoreTxt: {
      marginLeft: 5,
      padding: 10,
      fontWeight: 'bold',
      color:  commomStyles.colors.partScore ,
      fontSize: 20,
      alignSelf: 'center',
  
    },
    pontosTxt:{
      flex: 1,
      color: commomStyles.colors.partScore,
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
  
    },
    core: {
      flex:1,
      padding: 10,
      marginLeft: 90,
      flexDirection: 'row',
  
    },
    viewImagens:{
      flex: 2,
      backgroundColor: commomStyles.colors.corTela,
     
    },
    imgNota: {
      width: 30,
      height: 33,
      aspectRatio: 1.61, 
      resizeMode: 'contain',
     
  
    },
    viewBotoes:{
      flex: 2,
      backgroundColor:commomStyles.colors.corTela,
    },
    viewBtn:{
      flex: 1,
      marginTop: 20,
      marginLeft: 27,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    linhaaux: {
    // width: 55,
    // height: 55,
    width: 100,
    height: 200,
    marginTop: -133.7,
     
    marginLeft: 130,
    // backgroundColor:"#be02",
    },
    txtTitulo: {
      color: commomStyles.colors.partScore,
      marginTop: 5,
      fontSize: 20,
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center', 
    },
    combo:{
      marginLeft: 15,
      fontSize: 20,
      color: commomStyles.colors.partScore
    },
    ViewAd:{
      height:50,
      justifyContent:'flex-end',
      alignItems:'center',
    },
  });