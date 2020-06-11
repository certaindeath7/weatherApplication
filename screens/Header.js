import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import { View, Text } from 'react-native';

//functional component
export default Header = (props) => {

    return (
        <Appbar.Header
            theme={{
                color: {
                    primary: "#f99d12"
                }

            }}
            //add style to the header bar
            style={{ flexDirection: "row", justifyContent: "center", backgroundColor: "#f99d12" }}
        >
            <Title style={{ color: "white" }}>
                {props.name}
            </Title>

        </Appbar.Header>
    );

}