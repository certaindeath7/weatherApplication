//using state hook
import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import Header from './Header';

//functional component
export default Search = () => {
  const [airport, setAirport] = useState('')
  const [airports, setAirports] = useState([]) //empty array

  const fetchAirports = (text)=>{
    setAirport(text)
    fetch("https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=qkb42s7CvVA_2KuXnVtt6nJvETlBIboN3mB4U1uLHTw&query="+text)
    //pass the item into json file
    .then(item=>item.json())
    .then(cityData=>{
      setAirports(cityData.suggestions.slice(0,9))
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <Header name="Search Screen" style={{color: '#f99d12'}}/>
      <TextInput
        label="airport name"
        theme={{ colors: { primary: "#f99d12" } }}
        value={airport}
        //every time type something will occur the function
        onChangeText={(text) => fetchAirports(text)}>
      </TextInput>
      <Button icon="content-save" color="#f99d12" mode="contained" onPress={() => console.log('Pressed')}>
        <Text>Save</Text>
      </Button>
      <FlatList 
      data={airports}
      renderItem={({item})=>{
        return(
          //render card component
          <Card
          style={{margin:2, padding:2}}>
            <Text>{item.label}</Text>
          </Card> 

        )
      }}

      keyExtractor={item=>item.label}
      />
    </View>
  );

}