import React, {useState, useEffect} from 'react'
import {Text, View,SafeAreaView,StyleSheet,TouchableOpacity, FlatList} from 'react-native'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { faAssistiveListeningSystems} from '@fortawesome/free-solid-svg-icons'
import SoundPlayer from 'react-native-sound-player'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import admob, { MaxAdContentRating, InterstitialAd, RewardedAd, AdEventType, BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob'
import commomStyles from '../commomStyles'
import Btn from '../components/Button'
import GameOver from '../components/gameover'
import Sons from '../sons'
import Notas from '../notas'
import Ads from '../components/rewardAds'
import I18n from "../utils/i18n";

export default function Listen ({navigation}){
    const [sons,setSons] = useState(Sons)
    const [score, setScore] = useState(0)
    const [scoreListen,SetScoreListen] = useState(0)
    const [best,setBest]= useState(0)
    const [core1, setCore1] = useState (true)
    const [core2, setCore2] = useState (true)
    const [core3, setCore3] = useState (true)
    const [combo, setCombo] = useState (1)
    const [multi, setMulti] = useState (1)
    const [aleatorio1, setAleatorio1] = useState (0)
    const [contador, setContador] = useState (0)
    const [arvore, setArvore] = useState (0)
    const [opcoes, setOpcoes] = useState(0)
    const [numeros, setNumeros] = useState (2)
    const [gameover, setGameover] = useState(false)
    const [primeiroR, setPrimeiroR] = useState(false)
    const [intrumento, setIntrumento] = useState (0)
    const [language, setLanguage] = useState (0)
    const [ad, setAD] = useState (5)
    // const [selectedIndex,setSelectedIndex]=useState(0)
    const adUnitId = __DEV__ ? TestIds.INTERSTITIAL  : 'ca-app-pub-1007113334518871/1389855090';
    const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['music', 'song',],
    });
    
    useEffect(() => {
         VerificarListen()
         Load()
        
      },[core1 ]);


      const CarregarIdioma = async () =>{
       
        const json = await AsyncStorage.getItem("index3")
       
      
       const opcaoJson = JSON.parse(json)
       setLanguage(opcaoJson)
        
       
       
   } 
     
      const Load = ()=>{
        VerificarListen()
        CarregarIdioma()
        pegarNota()
        
        tocarMusica()
        chamarTela()
       
       resetarVariaveis()
      }

      const pegarNota = () =>{
        
        setOpcoes (Notas.slice (0, numeros))

      }

    const notaAleatoria  = async() =>  {
      
     
      const value =  Math.floor((Math.random() * opcoes.length) + 0)
      setAleatorio1 (value)  
      //aqui ele toca a nota do botão clicado  
      if(intrumento===0){
        SoundPlayer.playSoundFile(sons[value].som, 'mp3')
      }
      if(intrumento===1){
        SoundPlayer.playSoundFile(sons[value].som_sax, 'mp3')
      }
      if(intrumento===2){
        SoundPlayer.playSoundFile(sons[value].som_guitar, 'mp3')
      }
        
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
      

    const resetGame = ()=>{
      
        resetarVariaveis()
        setGameover (false)
        notaAleatoria()
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
      }, );
    
      // Load a new advert
      interstitialAd.load();
    }


    const resetarVariaveis=()=>{
        NovoMelhor()
        setCore1(true)
        setCore2(true)
        setCore3(true)
        setScore(0)
        setNumeros(2)
        setContador(0)
      } 
    const NovoMelhor = async()=>{
    
      if (score >  best){
        setBest(score)
        await AsyncStorage.setItem("bestListen", JSON.stringify(score))
      }
    }
    const tocarMusica = async() =>{

      const teste = await AsyncStorage.getItem('index1')
      const final = parseInt(teste) 
      setIntrumento(final)
        if(final===0){
            SoundPlayer.playSoundFile(sons[aleatorio1].som, 'mp3')
          }
          if(final===1){
            SoundPlayer.playSoundFile(sons[aleatorio1].som_sax, 'mp3')
          }
          if(final===2){
            SoundPlayer.playSoundFile(sons[aleatorio1].som_guitar, 'mp3')
          }
        // notaAleatoria();
    }
    const Score = (id) => {
       
      if (id === aleatorio1){
       const  valor = 10
       const resultado =  valor * multi + score
        setScore(resultado)
        SetScoreListen(resultado)
        setMulti(multi+ 0.2)
        setCombo (combo+1)
        
        setContador(contador+1)
        // console.log (contador)
        if(contador%8===0){
            const valorBt = numeros;
            setNumeros(valorBt+1)
            if(numeros>=12){
                setNumeros(12)
            }
           
        }
        
    
      }else {
        
        setCore3(false)
        core3 ? null : setCore2(false)
        core2 ? null : setCore1(false)
        core1 ? null : resetarVariaveis()
        setMulti(1)
        setCombo(1)
     
      }
      pegarNota()
      notaAleatoria()
    
    
    }
 
  const VerificarListen =async()=>{
      const value = await  AsyncStorage.getItem("bestListen");
      setBest(value)
      if(value===null){
          await AsyncStorage.setItem("bestListen", JSON.stringify(0))   
      }
  }
    return(
        <SafeAreaView style={styles.background}>
            <AnimatedLinearGradient customColors={presetColors.instagram} useNativeDriver="true"  speed={4000}>
            
            <GameOver isVisible={gameover} pontos={scoreListen} best={best} play={()=>resetGame()} voltar={()=>navigation.navigate('Menu')}>
            </GameOver>

            <View style={styles.viewPartitura }>
                <View style={styles.viewInfo}>
                        <Text style={ styles.combo}>{I18n.t('points')}: {score.toFixed(0)}</Text>
                    <View style={styles.core}>
                        <FontAwesomeIcon style={styles.Imgcore} size={30} icon={core1 ? faHeart : faHeartBroken } color={core1 ? '#fa0000':'#fa000099'}/>
                        <FontAwesomeIcon style={styles.Imgcore} size={30} icon={core2 ? faHeart : faHeartBroken}  color={core2 ? '#fa0000':'#fa000099'}/> 
                        <FontAwesomeIcon style={styles.Imgcore} size={30} icon={core3 ? faHeart : faHeartBroken}  color={core3 ? '#fa0000':'#fa000099'} />
                    </View>
                </View>
                <Text style={styles.combo}>Combo: {combo }x</Text>
            </View>
              
              
            <View style={styles.imgView}>
                <TouchableOpacity onPress={()=>tocarMusica()}>           
                    <FontAwesomeIcon icon={faAssistiveListeningSystems} size={150}></FontAwesomeIcon>
                </TouchableOpacity>
            </View>

               <View style={styles.btnView}>
                            <FlatList 
                                   contentContainerStyle={{flex:1,flexDirection : "column",alignItems:'center'}} 
                                   numColumns={2}
                                    data={opcoes}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({item}) => 
                                        <Btn style={[styles.botoes]}  rand={()=>Score(item.id)}  nome ={language===0 ? item.display : item.display_EN} corBorda={ commomStyles.colorNoturne.bordabtn} corTxt={ commomStyles.colorNoturne.texto} btnCor={ '#fff9' }  ></Btn>
                                    }
                                />     
                
               </View>
              <View style={styles.ViewAd}>
                <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER}/>
              </View>

            </AnimatedLinearGradient>
        </SafeAreaView>

    )

    
}
const styles = StyleSheet.create({
    background:{
        flex:1,
    },

    viewPartitura:{
        // backgroundColor:'#be0',
        flex:1,
        flexDirection:'column',
        // margin:10,
    },

    viewInfo:{
        flex:1,
        flexDirection:'row',
    },

    scoreTxt:{
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
    core:{
        flex:1,
        marginTop:15,
        marginLeft:70,
        padding:10,
        flexDirection: 'row',
        // backgroundColor:'#044',
    },
    
    Imgcore:{
        flex:1,
        margin: 2.5,
    },

    imgView:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        marginTop:20,
        marginBottom:50,
    },

    btnView:{
        // backgroundColor:'#be0',
        flex:6.1,
        justifyContent:'center',
        flexDirection:'row',
        // flexWrap:'wrap',
    },  

    botoes:{
        width:160,
        height:60,
        margin:5,
        backgroundColor:'#ffffff22',
        padding:11.5,
        borderRadius:30,
    },item: {
        // backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
      combo:{
        paddingLeft:15,
        fontSize: 20,
        // backgroundColor:'#be0000',
        width:200,
        fontWeight: 'bold',
        color: commomStyles.colors.partScore
      },
      ViewAd:{
        // backgroundColor:'#be0',
        height:45,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
      },

})