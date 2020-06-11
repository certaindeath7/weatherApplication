//using state hook
import React, { useState } from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import Header from './Header';

//functional component
export default Search = ({navigation}) => { //extract the place and setPlace from the state using destructre
  const [place, setPlace] = useState('')
  const [places, setPlaces] = useState([]) //empty array

  const fetchPlaces = (text)=>{
    setPlace(text)
    fetch("https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=qkb42s7CvVA_2KuXnVtt6nJvETlBIboN3mB4U1uLHTw&query="+text)
    //pass the item into json file
    .then(item=>item.json())
    .then(cityData=>{
        setPlaces(cityData.suggestions.slice(1,4))
    });
  }

  // search button clicked
  const searchBtnClicked = () =>
  {
      //pass the data once the button clicked. 
      navigation.navigate("Home", {place:place});
  }

  // an item of the list clicked
  const itemClicked = (placeName)=>{
      setPlace(placeName);
      navigation.navigate("Home", {place:placeName});
  }

  return (
    <View style={{ flex: 1 }}>
      <Header name="Search Screen"/>
      <TextInput
        label="place name"
        theme={{ colors: { primary: "#f99d12" } }}
        value={place}   
        //every time type something will occur the function
        onChangeText={(text) => fetchPlaces(text)}>
      </TextInput>
      <Button 
        icon="content-save" 
        color="#f99d12" mode="contained" 
        onPress={() => searchBtnClicked()}
      >
        <Text>Save</Text>
      </Button>
      <FlatList 
      data={places}
      renderItem={({item})=>{
        return(
          //render card component
          <Card
          style={{margin:2, padding:2}}
          onPress={()=>itemClicked(item.label)}
          >
            <Text>{item.label}</Text>
          </Card> 

        )
      }}

      keyExtractor={item=>item.label}
      />
    </View>
  );

}