import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Fontisto } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY = "4c576654fda15a0e3959382544c462ba";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([])
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const { coords: { latitude, longitude }, } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}&unit=metric`);
    const json = await response.json();
    setDays(json.daily);
  }
  useEffect(() => {
    ask();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal contentContainerStyle={styles.weather}>
        {days.length === 0 ? (<View style={styles.day}>
          <ActivityIndicator color="white" size="large" />
        </View>) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto name="cloudy" size={24} color="black" />
              </View>
              <Text style={styles.temp}>{day.weather[0].main}</Text>
              <Text style={styles.description}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  city: {
    flex: 1.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: 500,
    color: "#80cbc4"
  },
  weather: {
    backgroundColor: "black",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    fontSize: 150,
    marginTop: 50,
    color: "#80cbc4"
  },
  description: {
    fontSize: 50,
    marginTop: -30,
    color: "#80cbc4"
  },

}) 