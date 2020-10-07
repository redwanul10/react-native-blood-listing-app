import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView, Animated, SafeAreaView } from 'react-native'
import Zocial from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import Header from './header';
import { AppContext } from './app-wrapper'


const PeopleList = (props) => {

    const { donors, search, selectedBloodGroup } = useContext(AppContext)
    const navigation = useNavigation()


    let filteredList = donors.filter(donor => {
        const isMatched = donor.name.toUpperCase().indexOf(search.toUpperCase()) !== -1
        return isMatched ? true : false
    })

    if (selectedBloodGroup) {
        filteredList = filteredList.filter(donor => donor.bloodGroup === selectedBloodGroup)
    }



    return (
        <>
            <Header />

            {/* <View style={{ backgroundColor: "transparent" }}> */}
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                style={[style.wrapper]}
            >
                <Text style={style.sectionText}>Donors</Text>

                {filteredList.map(donor => (
                    <View style={style.people}>
                        <TouchableOpacity
                            style={[style.col, { flex: 2 }]}
                            onPress={e => navigation.navigate("Intro", { donor })}
                        >
                            {
                                donor.photoUrl
                                    ? <Image style={style.photo} source={{ uri: donor.photoUrl }} />
                                    : <Image style={style.photo} source={require('../images/user.png')} />
                            }

                            <View style={style.bio}>
                                <Text style={[style.font, style.bold]}>
                                    {donor.name.toUpperCase()}
                                </Text>

                                {donor.city ? <Text style={style.font} >{donor.city}</Text> : null}
                            </View >
                        </TouchableOpacity >
                        <View style={[style.col, style.icons]}>
                            <Text style={[style.font, style.bloodGroup]}>{donor.bloodGroup}</Text>
                            <TouchableOpacity onPress={e => Linking.openURL(`tel:${donor.phone}`)}>
                                <Zocial name="call" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View >
                ))}

            </ScrollView >
            {/* </View > */}
        </>
    );
}

export default PeopleList;

const style = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 10,
        // height: 442
    },
    sectionText: {
        fontWeight: "bold",
        fontSize: 15,
        marginVertical: 10
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    bio: {

    },
    people: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    bloodGroup: {
        backgroundColor: "black",
        color: "white",
        fontWeight: "bold",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 3,
    },
    font: {
        fontSize: 12
    },
    bold: {
        fontWeight: "bold"
    },
    icons: {
        justifyContent: "space-around",
        flex: 1,
    },
    col: {
        flexDirection: "row",
        alignItems: "center",
    }
})