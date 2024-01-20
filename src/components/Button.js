import React, { useState } from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import '../commomStyles'
import commomStyles from '../commomStyles'
export default function Btn (props) {
    return (
            <TouchableOpacity style={[props.style,{backgroundColor: props.btnCor || commomStyles.colors.btns, borderColor: props.corBorda || commomStyles.colors.bordabtn }]} onPress={props.rand} pegarid={props.id}  >
              <Text style={[styles.txtBtn, {color:props.corTxt || commomStyles.colors.texto}]}>{props.nome}</Text>
            </TouchableOpacity>     
          
    )
}
const styles = StyleSheet.create({
    cliqueBtn:{
        borderWidth: 3,
        width: 60,
        height: 60,
        padding:10,
        marginTop: 10,
        marginRight: 15,
        alignContent: 'space-between',
        borderRadius: 20,
        
      },
      txtBtn: {
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 2.5,
        fontSize: 20,
    
      },

})
        