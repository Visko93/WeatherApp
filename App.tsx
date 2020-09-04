import React, {useState, useEffect} from 'react';
import { Text, View, Image, StatusBar, Alert } from 'react-native';
import { AppLoading } from 'expo';
import * as location from "expo-location";
import { getWeather } from "./src/utils/Api/apiWeather";
import Spinner from 'react-native-loading-spinner-overlay';

import { Feather as Icon } from "@expo/vector-icons";
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Chango_400Regular, useFonts } from '@expo-google-fonts/chango';
import { styles } from './style';
import { Weather } from "./src/utils/Type/Types";

export default function App() {

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
  const [payload, setPayload] = useState<Weather>()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const loadPosition = async () => {
      const { status } = await location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Erro', 'Para acessar os dados do tempo precisamos de sua localização.');
        return;
      }

      const Location = await location.getCurrentPositionAsync();
      const { latitude, longitude } = Location.coords;
     
      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);
  
  useEffect(()=> {
    const getData = async () => {
    setLoading(true)
    const data = await getWeather<Weather>(initialPosition)
    setPayload({
      wind: data.wind.speed,
      city: data.name,
      desc: data.weather[0].description,
      desc_id: data.weather[0].id,
      temp: Math.round(data.main.temp),
      temp_max: Math.round(data.main.temp_max),
      temp_min: Math.round(data.main.temp_min),
      time: data.dt
    })
    setLoading(false)
    }
    getData() 
  }, [])

  const imagesPool = (id: any) => {
    if(id < 699) {
      return require('./assets/rain.png')
    }
    else if ( id !== 800) {
      return require('./assets/cloud.png')
    } else {
      return require('./assets/sun.png')
    }
  }
  //fonts loading
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Chango_400Regular
  });
  
  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Text style={styles.title}>WeatherApp</Text>
      {loading
      ? <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
      />
      : <>
        <View style={styles.details}>
          <Text style={styles.temp}>
            {loading 
            ? '-'
            : `${payload?.temp} °C`
            }
          </Text>
          <View style={styles.minMax}>
            <Text style={styles.minMaxText}>
              <Icon name="arrow-down" color="#FFF" size={16} />
              {`Minima: ${payload?.temp_min} °C`}
            </Text>
            <Text style={styles.minMaxText}>
              {`Maxima: ${payload?.temp_max} °C`}
              <Icon name="arrow-up" color="#FFF" size={16} />
            </Text>
          </View>
          <View style={styles.infos}>
            <Text style={styles.InfosText}>
              <Icon name="map-pin" color="#FFF" size={16} />
              {` Cidade: ${payload?.city}`}
            </Text>
            <Text style={styles.InfosText}>
              <Icon name="info" color="#FFF" size={16} />
              {` Descrição: ${payload?.desc.toLocaleUpperCase()}`}
            </Text>
            <Text style={styles.InfosText}>
              <Icon name="wind" color="#FFF" size={16} />
              {` Vento: ${payload?.wind}`}
            </Text>
          </View>
        </View>
        <Image source={imagesPool(payload?.desc_id)} />
      </>       
      }
    </View>
  );
}

