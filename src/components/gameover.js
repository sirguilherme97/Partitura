import React, { useState } from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Modal,Image} from 'react-native'
import '../commomStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faPlay, faUndo} from '@fortawesome/free-solid-svg-icons'
import commomStyles from '../commomStyles'
import SadFrog from '../../assets/sadfrog.png'
import I18n from "../utils/i18n";

export default function GameOver (props,{navigation}) {
    return (
    
        <Modal transparent={true} visible={props.isVisible} onRequestClose={props.onCancel}
        animationType='fade' >
           
                <View style={styles.background}>
              
                </View>
            
            <View style={{flex: 2, backgroundColor: 'rgba(0,0,0,0.6)'}}>
             <View style={styles.container}>
                <Text style={styles.header}>{I18n.t('gameover')}</Text>
                     <View style={styles.botoes}>
                        <View >
                            <Text style={styles.index}>{I18n.t('points')}</Text>
                            <Text style={styles.button}>{props.pontos}</Text>
                        </View>
                        <View >
                            <Text style={styles.index}>{I18n.t('best')}</Text>
                            <Text style={styles.button}>{props.best}</Text>
                        </View>
                     </View>

                    <View style={styles.ViewSadFrogg}>
                    <Image style={styles.imgSadFrog } source={SadFrog}/>
                    </View>

                     <View style={styles.botoesView}>
                     <TouchableOpacity  style={{ zIndex: 20, backgroundColor: '#9020'}} onPress={props.voltar} >
                        <FontAwesomeIcon color="#000" resizeMode='cover' icon={faUndo} size={40}style={styles.iconImg}/>
                    </TouchableOpacity>
                     <TouchableOpacity  style={{ zIndex: 20, backgroundColor: '#9300'}} onPress={props.play} >
                        <FontAwesomeIcon color="#000" resizeMode='cover' icon={faPlay} size={40}style={styles.iconImg}/>
                    </TouchableOpacity>
                    
                    </View>
              </View>
              </View>
            
                <View style={styles.background}>
               
                </View>
            
        </Modal>

    )
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.6)',
        margin:0,
        // justifyContent:'space-around',
    },
    container: {
        flex: 1,
        borderRadius: 10,
        marginLeft: 30,
        marginRight: 30,
    //    marginLeft: 30,
        backgroundColor: '#fffe'
    },
    header:{
        
        fontFamily: commomStyles.fontFamily,
        backgroundColor: commomStyles.colors.today, 
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        // padding: 15,
        fontSize: 18,
        
    },
    botoes:{   
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
       

    },

    index:{
        margin: 10,
        marginRight: 40,
        marginLeft:40,
        fontSize:15,
        color: commomStyles.colors.today,
    },
    button:{
        margin: 10,
        marginRight: 40,
        marginLeft:40,
        fontSize:20,
        fontWeight:'bold',
    },
    botoesView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        zIndex: 5,
    },
    iconImg:{
        margin:10,
    },
    ViewSadFrogg:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    imgSadFrog:{
        flex:1,
        resizeMode: 'contain',
        width:300,
        height:300,
    },
})