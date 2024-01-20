import React  from 'react'
import {View, Modal, StyleSheet, TouchableWithoutFeedback} from 'react-native'

export default function endGame(props){
    return(
        <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={()=>{}}
            >
                <TouchableWithoutFeedback onPress={props.OnCancel}>
                    <View style={styles.background}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:"#0007",
    }
})