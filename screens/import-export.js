import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../components/app-wrapper'
import Clipboard from "@react-native-community/clipboard";

const AddDonor = () => {

    const { donors, showToaster, importList } = useContext(AppContext)

    const copyList = (event) => {
        const upDatedList = donors
        upDatedList.forEach(donor => donor.photoUrl = "")
        const copyText = JSON.stringify(upDatedList)
        Clipboard.setString(copyText)
        showToaster("list copied")
    }

    const paste = async () => {
        const pasteData = await Clipboard.getString()

        // return alert(pasteData)

        const list = Object.prototype.toString.call(JSON.parse(pasteData))


        if (!pasteData || list !== "[object Array]") {
            alert(pasteData)
            return showToaster("invalid donor List")
        }

        const value = removeDublicateValue(JSON.parse(pasteData))
        importList(value)
        showToaster("list imported")
    }

    const removeDublicateValue = (value) => {
        let ids = []
        const allDonors = [...donors, ...value]

        allDonors.forEach(d => {
            ids.indexOf(d.id) === -1 ? ids.push(d.id) : ""
        })

        const uniqueDonors = ids.map(id => allDonors.find(donor => donor.id === id))

        return uniqueDonors
    }

    return (
        <View style={style.container}>
            <View style={style.donorForm}>
                <TouchableOpacity onPress={copyList}>
                    <Text style={style.button}>Copy Donor List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={paste}>
                    <Text style={style.button}>Paste Donor List</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default AddDonor;

const style = StyleSheet.create({
    container: {
        backgroundColor: "#E63946",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    donorForm: {
        width: "90%",
        height: 200,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: "center"
    },
    button: {
        backgroundColor: "#E63946",
        color: "white",
        paddingVertical: 10,
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: 5,
        marginBottom: 15
    },

})