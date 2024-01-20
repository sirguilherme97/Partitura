import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds, InterstitialAd } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL  : 'ca-app-pub-1007113334518871/1389855090';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['music', 'song',],
});

export default function Ad() {
  useEffect(() => {

    const eventListener = interstitial.onAdEvent(type => {
      
      if (type === AdEventType.LOADED) {
        console.log('InterstitialAd adLoaded');
       
      } else if (type === AdEventType.ERROR) {
       
      } else if (type === AdEventType.OPENED) {
     
      } else if (type === AdEventType.CLICKED) {
        
      } else if (type === AdEventType.LEFT_APPLICATION) {
       
      } else if (type === AdEventType.CLOSED) {
        
        interstitial.load();
      }
       setLoaded(true);
     
       
  });

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      eventListener();
    };
  }, []);

  // // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  return (
    <Button
      title="Show Rewarded Ad"
      onPress={() => {
        rewarded.show();
      }}
    />
  );
}