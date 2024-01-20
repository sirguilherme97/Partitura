import React, { useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, ImageBackground, Button, TouchableWithoutFeedback,  Image, } from 'react-native'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import { faHeart,faHeartBroken, faMoon, faSun, } from '@fortawesome/free-solid-svg-icons'
import SoundPlayer from 'react-native-sound-player'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob'
import partituraNoturno from '../../assets/partitura_noturno.png'
import partitura from '../../assets/pauta.png'
import NotaNoturna from '../../assets/nota_noturna.png'
import Posicoes from '../notas'
import Posicoes_FA from '../notas_fa'
import Nota from '../../assets/nota.png'
import LinhaAux from '../../assets/linhaaux.png'
import LinhaAuxNoturna from '../../assets/linhaaux_noturna.png'
import Btn from '../components/Button'
import I18n from "../utils/i18n";
import commomStyles from '../commomStyles'
// import AD from '../components/rewardAds'
import GameOver from '../components/gameover'
import Sons from '../sons'
import Sons_fa from '../sons_fa'
import Clave from '../components/clave_sol';
import Clave_FA from '../components/clave_fa'
import Btn_G from '../components/btn_sol'


export default function App  ({navigation})  {
  const [sons, setSons] = useState(Sons)
  const [isVisible, setisVisible] = useState(true)
  const [combo, setCombo] = useState (1)
  const [multi, setMulti] = useState (1)
  const [score, setScore] = useState(0)
  const [scorePartitura, SetPartitura] = useState (0)
  const [best, setBest] = useState(0)
  const [core1, setCore1] = useState (true)
  const [core2, setCore2] = useState (true)
  const [core3, setCore3] = useState (true)
  const [notas, setNotas] = useState (Posicoes_FA)
  const [posicao, setPosicao] = useState(130)
  const [aleatorio, setAleatorio] = useState (0)
  const [noturno, setNoturno] = useState(false)
  const [gameover, setGameover] = useState(false)
  const [primeiroR, setPrimeiroR] = useState(false)
  const [intrumento, setIntrumento] = useState (0)
  const [clave, setClave] = useState (0)
  const [ad, setAD] = useState (5)

  const adUnitId = __DEV__ ? TestIds.INTERSTITIAL  : 'ca-app-pub-1007113334518871/1389855090';
  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['music', 'song',],
  });
  

  
  useEffect ( () => {
    
  
     Opcoes()
     verificarbestPartitura()
     VerificarCLave()

  
},[core1]);



  const Load = ()=>{
    notaAleatoria()
    
    chamarTela()
   
  }
  const Opcoes = async () =>{
    Load()
  }
  
  const notaAleatoria  = async() =>  {

    const teste = await AsyncStorage.getItem('index1')
    const final = parseInt(teste) 

    setIntrumento(final)
   
    const value =  Math.floor((Math.random() * 12) + 0)
    if (clave===0){   
      if (value === 0){
      setPosicao (160)
      setAleatorio (value)
      
    }else {
      const valor =  Math.floor(Math.random() * (310 - 140 + 1) ) + 140
      setPosicao (valor)
      setAleatorio(value)
     }
  
    }else{

       if (value === 11){
      setPosicao (160)
      setAleatorio (value)
      
    }else {
      const valor =  Math.floor(Math.random() * (310 - 140 + 1) ) + 140
      setPosicao (valor)
      setAleatorio(value)
     }
    }
  

    if(final===0){
      SoundPlayer.playSoundFile(sons[value].som, 'mp3')
    }
    if(final===1){
      SoundPlayer.playSoundFile(sons[value].som_sax, 'mp3')
    }
    if(final===2){
      SoundPlayer.playSoundFile(sons[value].som_guitar, 'mp3')
    }
     
  
    NovoMelhor()
}
const VerificarCLave = async () =>{

  const getIndex = await AsyncStorage.getItem("index2")
  const final = parseInt(getIndex)
  setClave(final)
  if(final===0){
   setSons(Sons)
  }
  else{
    setSons(Sons_fa)
  }

}
const NovoMelhor = async()=>{

  if (score >  best){
    setBest(score)
    await AsyncStorage.setItem("bestPartitura", JSON.stringify(score))
  }
}
const verificarbestPartitura =async()=>{
  const value = await  AsyncStorage.getItem("bestPartitura");
  setBest(parseInt(value))
  if(value===null){
      await AsyncStorage.setItem("bestPartitura", JSON.stringify(0))   
  }
}

const showInterstitialAd = () => {
  // Create a new instance
  const interstitialAd = InterstitialAd.createForAdRequest(adUnitId,{
    requestNonPersonalizedAdsOnly: true,
    keywords: ['music', 'song',],
  });

  // Add event handlers
  interstitialAd.onAdEvent((type, error) => {
      if (type === AdEventType.LOADED) {
          interstitialAd.show();
      }
  });

  // Load a new advert
  interstitialAd.load();
}
const Score = (id) => {
    // console.log(id)
  if (id === aleatorio){
   const  valor = 10
   const resultado =  valor * multi + score
   setScore(resultado)
   SetPartitura(resultado)
   setMulti(multi+ 0.2)
   setCombo (combo+1)
   
  }else {
    
    setCore3(false)
    core3 ? null : setCore2(false)
    core2 ? null : setCore1(false)
    
    setMulti(1)
    setCombo(1)
 
  }

  notaAleatoria()

}

const chamarTela = ()=>{
  resetarVariaveis()
  
  if(primeiroR===false){
    setGameover(false)
    setPrimeiroR(true)
  }
  else{
    
    setAD(ad + 1)
    if(ad%10===0){
      showInterstitialAd()
    }
  
     setGameover(true)
   
  }
}

const resetarVariaveis=()=>{
  setCore1(true)
  setCore2(true)
  setCore3(true)
  setScore(0)
  // setGameover(false)
} 
const toggleNoturno = ()=>{
  setNoturno(!noturno)
}
const resetGame = ()=>{
  
  resetarVariaveis()
  setGameover (false)
  notaAleatoria()

}
   
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor='#000' />
      <GameOver isVisible={gameover} pontos={scorePartitura} best={best} play={()=>resetGame()} voltar={()=>navigation.navigate('Menu')}>
      </GameOver>
      <AnimatedLinearGradient customColors={presetColors.instagram} useNativeDriver='true'  speed={4000}>
      <View style={{marginBottom: 10}}>
      <TouchableWithoutFeedback onPress={()=>toggleNoturno()}>
        <FontAwesomeIcon style={styles.imgMoon} size={35} icon={noturno ?   faMoon: faSun }  color={noturno? '#0006' : '#facb00aa'}/>    
      </TouchableWithoutFeedback>
      </View>
      <View style={noturno ? [styles.viewPartitura, { backgroundColor: commomStyles.colorNoturne.corTela } ] : styles.viewPartitura }>
     
      {clave===0 ? <Clave core1={core1} core2={core2} core3={core3} noturno={noturno} posicao={posicao} combo={combo} aleatorio={aleatorio} score={score}></Clave> : 
      <Clave_FA core1={core1} core2={core2} core3={core3} noturno={noturno} posicao={posicao} combo={combo} aleatorio={aleatorio} score={score}></Clave_FA>
      }
        {/* <Clave core1={core1} core2={core2} core3={core3} noturno={noturno} posicao={posicao} combo={combo} aleatorio={aleatorio} score={score}></Clave> */}
       
      </View>
          <View style={noturno ? [styles.viewBotoes, { backgroundColor: commomStyles.colorNoturne.corTela}]: styles.viewBotoes}>
            <View  style={styles.viewBtn}>
            {clave===0 ? <>
              <Btn style={styles.botoes} nome={I18n.t('C')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(0)} ></Btn>
              <Btn style={styles.botoes} nome={I18n.t('D')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(1)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('E')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(2)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('F')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(3)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('G')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(4)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('A')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(5)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('B')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(6)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('C')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(7)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('D')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(8)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('E')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(9)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('F')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(10)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('G')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(11)}></Btn>
              </> 
              
              : 
              
              <>
              <Btn style={styles.botoes} nome={I18n.t('F')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(0)} ></Btn>
              <Btn style={styles.botoes} nome={I18n.t('G')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(1)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('A')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(2)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('B')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(3)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('C')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(4)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('D')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(5)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('E')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(6)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('F')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(7)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('G')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(8)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('A')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(9)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('B')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(10)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('C')} corBorda={noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={noturno ? commomStyles.colorNoturne.texto: null } btnCor={ noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(11)}></Btn>
             </>
             }
           
            </View>
          </View>  
        </AnimatedLinearGradient>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  viewPartitura:{
    // marginTop:10,
    flex: 2,
    backgroundColor: commomStyles.colors.corTela,
  },
  Imgcore:{
    margin: 2.5,
    flex: 1,
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
    backgroundColor:commomStyles.colors.btns,
  },
  image:{
    flex: 1,
    marginTop: 25,
    marginLeft:8.5,
    width: 375,
    height: 210,
    
    
  },
  viewInfo:{
    // backgroundColor:'#be0',
    flexDirection: 'row',
    flex: 1,
  },
  scoreTxt: {
    
    marginLeft: 5,
    padding: 10,
    fontWeight: 'bold',
    color:  commomStyles.colors.partScore ,
    fontSize: 20,
    alignSelf: 'center',
    // backgroundColor:'#b2a',
    
  },
  pontosTxt:{
    // backgroundColor:'#aed',
    // --------------
    // flex: 1,
    // color: commomStyles.colors.partScore,
    // fontSize: 20,
    // fontWeight: 'bold',
    // alignSelf: 'center',
    
      // --------------
      flex: 1,
      fontWeight: 'bold',
      color:  commomStyles.colors.partScore ,
      fontSize: 20,
      alignSelf: 'center',


  },
  core: {
    flex: 1,
    // padding: 10,
    marginLeft: 70,
    marginRight:10,
    flexDirection: 'row',
    // backgroundColor:'#aaffff',

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
    zIndex: 5,

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
    flex: 1,
    marginLeft: 15,
    fontSize: 20,
    color: commomStyles.colors.partScore,
    fontWeight: 'bold'
  }
});




