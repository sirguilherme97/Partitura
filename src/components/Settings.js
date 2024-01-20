import React, { Component } from 'react'
import {Modal, View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput} from 'react-native'
import commomStyles from '../commomStyles'
const initialState = { desc: ''}

export default function Menu () {
        return(
            <Modal transparent={true} 
            animationType='slide'>
                <TouchableWithoutFeedback
                 >
                    <View style={styles.background}>
                       
                    </View>
                </TouchableWithoutFeedback>
                 <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} placeholder="informe a descrição" ></TextInput>
                         <View style={styles.botoes}>
                            <TouchableOpacity  >
                                <Text style={styles.button}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Text style={styles.button}>Salvar</Text>
                            </TouchableOpacity>
                         </View>
                  </View>
                <TouchableWithoutFeedback
                >
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    

}
const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor:'rgba(255,255,255, 0.5)',
    },
    container: {
      
        backgroundColor: 'rgba(255,255,255, 0.5)',
    },
    header:{
        fontFamily: commomStyles.fontFamily,
        backgroundColor: commomStyles.colors.today, 
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        
    },
    botoes:{   
        flexDirection: 'row',
        justifyContent: 'flex-end',

    },
    input:{
        fontFamily: commomStyles.fontFamily,
     
        height: 40,
        margin: 15,
        backgroundColor: '#ffff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
    },
    button:{
        margin: 20,
        marginRight: 30,
        color: commomStyles.colors.today,
    }
})