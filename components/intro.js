import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from './app-wrapper'

const Intro = (props) => {

    const { donors, deleteDonor } = useContext(AppContext)
    const donor = donors.find(singleDonor => singleDonor.id === props.route.params.donor.id) || {}

    const DeleteDonor = () => {
        deleteDonor(donor.id)
        props.navigation.navigate("Home")
    }
    return (
        <>
            <View style={[style.header]}>
                {/* <Text style={style.headerText}> Search Blood Group</Text> */}
                <View style={style.userIdentity}>
                    {
                        donor.photoUrl
                            ? <Image style={style.photo} source={{ uri: donor.photoUrl }} />
                            : <Image style={style.photo} source={require('../images/user.png')} />
                    }
                    <Text style={style.name}>{donor.name}</Text>
                </View>
            </View>
            <ScrollView>
                <View style={style.center}>
                    <View style={style.blood_age}>
                        <View style={style.center}>
                            <Text style={style.bigText}>{donor.bloodGroup}</Text>
                            <Text style={style.grey}>Group</Text>
                        </View>
                        <View style={style.center}>
                            <Text style={style.bigText}>{donor.age}</Text>
                            <Text style={style.grey}>Age</Text>
                        </View>
                    </View>
                    <View style={style.contactInfoWrapper}>
                        <TouchableOpacity
                            style={style.contactWidget}
                            onPress={e => Linking.openURL(`tel:${donor.phone}`)}
                        >
                            <Ionicons name="call" size={20} color="" />
                            <Text style={style.smallText}>Call Now</Text>
                        </TouchableOpacity>
                        <View style={style.contactWidget}>
                            <Ionicons name="ios-location-outline" size={20} color="" />
                            <Text style={style.smallText}>Mirpur 13 Shenpara porbot</Text>
                        </View>
                        <TouchableOpacity
                            onPress={e => Linking.openURL(`mailto:${donor.email}`)}
                            style={style.contactWidget}
                        >
                            <Entypo name="email" size={20} color="" />
                            <Text style={style.smallText}>Send Mail</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={e => Linking.openURL(`sms:${donor.phone}?body=Hi ${donor.name} we Need Emergency ${donor.bloodGroup} Blood`)}
                            style={style.contactWidget}
                        >
                            <Entypo name="mail-with-circle" size={20} color="" />
                            <Text style={style.smallText}>Text Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={DeleteDonor}
                            style={style.contactWidget}
                        >
                            <MaterialIcons name="delete" size={22} color="" />
                            <Text style={style.smallText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={e => props.navigation.navigate("Edit", { donor })}
                            style={style.contactWidget}
                        >
                            <Entypo name="edit" size={20} color="" />
                            <Text style={style.smallText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default Intro;

const style = StyleSheet.create({
    header: {
        backgroundColor: "#E63946",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
    },
    headerText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    serachBar: {
        backgroundColor: "white",
        width: "60%",
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginTop: 10
    },
    photo: {
        width: 80,
        height: 80,
        borderRadius: 10,

    },
    userIdentity: {
        position: "absolute",
        bottom: "-30%",
        shadowColor: "black",
        alignItems: "center",
        zIndex: 99999
    },
    name: {
        fontWeight: "bold",
        textTransform: "capitalize",
        marginTop: 5,

    },
    center: {
        // display: "flex",
        alignItems: "center",
        // flex: 1,
    },
    blood_age: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 80,
        width: "50%",
        // backgroundColor: "red",
        // margin: "auto"
    },
    bigText: {
        fontSize: 30,
        fontWeight: "bold"
    },
    smallText: {
        fontSize: 12,
        // fontWeight: "bold"
        textAlign: "center",
        marginTop: 8
    },
    grey: {
        color: "grey",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 12
    },
    contactInfoWrapper: {
        justifyContent: "space-between",
        // alignItems:"fle",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 5,
        marginTop: 50,
        flexWrap: "wrap"
    },
    contactWidget: {
        width: "33%",
        alignItems: "center",
        marginBottom: 15,
        textAlign: "center",
    }

})