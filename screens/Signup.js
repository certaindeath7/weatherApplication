import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper'
import Header from './Header'

const UserSignUp = ({ navigation }) => {

    const [userName, setUserName] = useState("") //key value array
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")



    // save button clicked
    const saveBtnClicked = () => {
        //pass the data once the button clicked. 
        navigation.navigate("Search");
        Alert.alert(` updated successfuly`)
        createUsers();
    }

    const createUsers = () => {
        // local host: http://localhost:3000
        // if want to test on other device need to use ngrok to generate temporary uri
        fetch("http://localhost:3000/send", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //pass an object
                userName: userName,
                password: password,
                email: email
            })
        })
            .then(res => res.json())
            .then(data => {
                Alert.alert(`updated successfuly`)
            })
            .catch(err => {
                Alert.alert("saved unsuccessfully")
            })
    }
    return (
        <View style={StyleSheet.root}>
            <Header name="Sign Up" />
            <TextInput
                label="User Name"
                value={userName}
                onChangeText={text => setUserName(text)}
            />

            <TextInput
                label="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            />

            <TextInput
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Button
                icon="content-save"
                color="#f99d12" mode="contained"
                onPress={() => saveBtnClicked()}
            ></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    }
})

export default UserSignUp
