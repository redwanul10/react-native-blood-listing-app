import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'
// import CreateProfile from './intro';
import Header from './header';
import PeopleList from './poepleList';

const BloodApp = (props) => {
    const [intro, setIntro] = useState(false)
    console.log(props)
    return (
        <>
            <View style={{ flex: 1 }}>
                {/* <Header /> */}
                <PeopleList />
                {/* <CreateProfile /> */}
            </View>
        </>
    );
}

export default BloodApp;

const style = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10
    }
})