import React from 'react';
import commomStyles from '../commomStyles'
import Btn from '../components/Button'
import {Style, StyleSheet, View} from 'react-native'
import I18n from "../utils/i18n";

export default function BtnSol( props ){
    const Score = (id) =>{

        return id;
    }
 
    return (
        <>
              <Btn style={styles.botoes} nome={I18n.t('C')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(0)} ></Btn>
              <Btn style={styles.botoes} nome={I18n.t('D')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(1)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('E')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(2)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('F')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(3)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('G')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(4)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('A')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(5)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('B')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(6)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('C')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(7)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('D')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(8)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('E')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(9)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('F')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(10)}></Btn>
              <Btn style={styles.botoes} nome={I18n.t('G')} corBorda={props.noturno ? commomStyles.colorNoturne.bordabtn : null} corTxt={props.noturno ? commomStyles.colorNoturne.texto: null } btnCor={ props.noturno ? commomStyles.colorNoturne.btns : null}   rand={()=>Score(11)}></Btn>
        </>

    )
}
const styles = StyleSheet.create({
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
})