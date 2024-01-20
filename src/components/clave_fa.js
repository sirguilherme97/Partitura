import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar, ImageBackground, Button, TouchableWithoutFeedback,  Image, } from 'react-native'
import { faHeart,faHeartBroken, faMoon, faSun, } from '@fortawesome/free-solid-svg-icons'
import commomStyles from '../commomStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import partituraNoturno from '../../assets/partitura_noturno.png'
import partitura from '../../assets/pautaFa.png'
import NotaNoturna from '../../assets/nota_noturna.png'
import Posicoes from '../notas'
import Posicoes_fa from '../notas_fa'
import Nota from '../../assets/nota.png'
import LinhaAux from '../../assets/linhaaux.png'
import LinhaAuxNoturna from '../../assets/linhaaux_noturna.png'
import I18n from "../utils/i18n";

export default function Clave(props) {

    const [notas, setNotas] = useState (Posicoes_fa)

    return (
        <View>
        
        <View style={props.noturno ? [styles.viewPartitura, { backgroundColor: commomStyles.colorNoturne.corTela } ] : styles.viewPartitura }>
      
      
      <View style={styles.viewInfo}>
              <Text style={props.noturno ? [styles.scoreTxt, {color:  commomStyles.colorNoturne.partScore}] : styles.scoreTxt}>{I18n.t('points')}:</Text>
              <Text style={props.noturno ? [styles.pontosTxt, {color:  commomStyles.colorNoturne.partScore}] : styles.pontosTxt}>{props.score.toFixed(0)}</Text>
          <View style={styles.core}>
            <FontAwesomeIcon style={styles.Imgcore} size={30} icon={props.core1 ? faHeart : faHeartBroken } color={props.core1 ? '#fa0000':'#fa000099'}/>
            <FontAwesomeIcon style={styles.Imgcore} size={30} icon={props.core2 ? faHeart : faHeartBroken}  color={props.core2 ? '#fa0000':'#fa000099'}/> 
            <FontAwesomeIcon style={styles.Imgcore} size={30} icon={props.core3 ? faHeart : faHeartBroken}  color={props.core3 ? '#fa0000':'#fa000099'} />
          </View>
          
      </View>
    
      <Text style={props.noturno ? [styles.combo, {color:commomStyles.colorNoturne.partScore }]: styles.combo}>Combo: {props.combo} </Text>
    </View>
    
  
    <View style={props.noturno ? [styles.viewImagens, {backgroundColor: commomStyles.colorNoturne.corTela}] : styles.viewImagens}>
      <View style={styles.imgChild}>
          <ImageBackground style={styles.image }  tintColor={props.noturno ? '#eee' : '#000'} source={partitura}/>    
          
          <Image  style={[styles.imgNota, { marginTop: notas[props.aleatorio].posicao }, {marginLeft: props.posicao }  ] } tintColor={props.noturno ? '#eee' : '#000'} source={Nota}/>
          {props.aleatorio===11 ? <ImageBackground style={styles.linhaaux} tintColor={props.noturno ? '#eee' : '#000'}  source={LinhaAux}/> : null }
        </View>
      </View>   
        </View>
      
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
        flex: 1,
        flexDirection: 'row',
      // backgroundColor:'#be0',
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
      marginTop: 50,
     
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
      marginTop: 20,
      marginLeft: 15,
      
      fontSize: 20,
      color: commomStyles.colors.partScore,
      fontWeight: 'bold'
    }
  });
  


