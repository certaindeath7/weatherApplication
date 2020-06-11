import React, { useState, useEffect } from 'react';
import { Appbar, Title, Card } from 'react-native-paper';
import {View, Text, Image} from 'react-native';
import Header from './Header'

const WeatherScreen = (props) =>{
    const [weather, setWeather] = useState({
        name: "loading",
        temp: "loading",
        humidity: "loading",
        desc: "loading",
        icon:"loading"
    })

    //call this for the first time the app renders
    useEffect(() =>{
        fetchWeather();
    }, [])
    const fetchWeather = ()=>{
        let Destinations;
        //get the place's name from search screen
        const {place} = props.route.params;

        //override the destionation with place's name from search screen
        Destinations = place;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Destinations}&appid=99e1bc7aaad40533208b6bcefa0926ce&units=metric`)
        .then(res=>res.json())
        .then(results=>{
            setWeather({
                name: results.name,
                temp: results.main.temp,
                humidity: results.main.humidity,
                desc: results.weather[0].description, // get the first element of the weather which is description
                icon: results.weather[0].icon,
            })
        })
    }
    //if the first place popped up is not melbourne, reload it
    if(props.route.params.place != "Paris")
    {
        fetchWeather();
    }

    return(
        <View style={{flex:1}}>
            <Header name="Weather App"></Header>
            {/*City name and pictures componet*/}
            <View style={{alignItems:"center"}}>
                <Title
                style={{
                    marginTop:20,
                    fontSize:25
                }}>
                    {weather.name}
                </Title>
                <Image 
                style={{
                    width: 100,
                    height: 100
                }}
                source={{uri:"https://openweathermap.org/img/w/"+weather.icon+".png"}}
                />
            </View>

            {/*Weather component*/}
            <Card
                style={{
                    margin: 10,
                    padding: 15
                }}>
                <Title>Temparuture = {weather.temp}</Title>
            </Card>

            {/*humidity component*/}    
            <Card
                style={{
                    margin: 10,
                    padding: 15
                }}>
                <Title>Humidity = {weather.humidity}%</Title>
            </Card>

            {/*description component*/}    
            <Card
                style={{
                    margin: 10,
                    padding: 15
                }}>
                <Title>Description = {weather.desc}</Title>
            </Card>
        </View>
        
    )
}
export default WeatherScreen