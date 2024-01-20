import React, {useEffect} from 'react' 
import {Text, View,SafeAreaView,StyleSheet,TouchableOpacity,ImageBackground, StatusBar, Image, ScrollView} from 'react-native'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import admob, { MaxAdContentRating, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob'
import I18n from "../utils/i18n";
export default function Help ( {navigation}) {
    useEffect(() => {
        
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

    return (
        
       <View style={{flex: 1}}>
           <AnimatedLinearGradient>
            <ScrollView style={styles.ScrollPrincipal}>
                 {/* ----------------------------------------------- */}
                <View style={styles.ViewPrincipal1}>
                    <Text style={styles.Titulo}>{I18n.t('reading')}</Text>
                </View>
                <View style={styles.ViewConteudo}>
                    <Text style={styles.Contexto}>{I18n.t('help_read')}</Text>
                </View>
                {/* ----------------------------------------------- */}
                <View style={styles.ViewPrincipal}>
                    <Text style={styles.Titulo}>{I18n.t('listen')}</Text>
                </View>
                <View style={styles.ViewConteudo}>
                    <Text style={styles.Contexto}>{I18n.t('help_listen')}</Text>
                </View>
                {/* ----------------------------------------------- */}
                <View style={styles.ViewPrincipal}>
                    <Text style={styles.Titulo}>{I18n.t('practice')}</Text>
                </View>
                <View style={styles.ViewConteudo}>
                    <Text style={styles.Contexto}>{I18n.t('help_practice')}</Text>
                </View>
                 {/* ----------------------------------------------- */}
                 {/* <View style={styles.ViewPrincipal}>
                    <Text style={styles.Titulo}>GM Tech</Text>
                </View>
                <View style={styles.ViewConteudo}>
                    <Text style={styles.Contexto}>S I N C R O N I A</Text>
                </View> */}
                 {/* ----------------------------------------------- */}
            </ScrollView>
            <View style={styles.ViewAd}>
            <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER}/>
            </View>
           </AnimatedLinearGradient>
       </View>
    )
}

const styles = StyleSheet.create({
    ScrollPrincipal:{
        flex:1,
        backgroundColor:'#0003',
    },
    ViewPrincipal1:{
        flex:1,
        margin:5,
        marginTop:10,
        padding:10,
        backgroundColor:'#fff6',
    },
    ViewPrincipal:{
        flex:1,
        margin:5,
        padding:10,
        backgroundColor:'#fff6',
    },
    ViewConteudo:{
        flex:1,
        marginTop:-5,
        marginLeft:5,
        marginRight:5,
        padding:10,
        backgroundColor:'#fff3',
    },
    Titulo:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
    },
    Contexto:{
        fontSize:16,
        fontWeight:'bold',
        color:'#fff',
    },
    ViewAd:{
        backgroundColor:'#0003',
        height:45,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
    },
})