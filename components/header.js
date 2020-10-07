import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Animated } from 'react-native'
import { AppContext } from './app-wrapper'
import BloodGroupPicker from './blood-group-picker';

const Header = ({ headerHeight, searchWidth }) => {

    const { search, setSearch, setBloodGroup, selectedBloodGroup } = useContext(AppContext)


    return (
        <Animated.View style={style.header}>
            <Text style={style.headerText}> Search Blood Group</Text>
            <View style={{ width: 250 }}>
                <TextInput value={search} onChangeText={setSearch} placeholder="Search" style={[style.serachBar]} />
                <View style={style.pickerWrapper}>
                    <BloodGroupPicker
                        initialItem="All"
                        selectedValue={selectedBloodGroup}
                        style={style.picker}
                        onValueChange={itemValue => setBloodGroup(itemValue)}
                    />

                </View>
            </View>
        </Animated.View>
    );
}

export default Header;

const style = StyleSheet.create({
    header: {
        backgroundColor: "#E63946",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        // height: 150
    },
    headerText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold"
    },
    serachBar: {
        backgroundColor: "white",
        width: "100%",
        paddingVertical: 2,
        paddingHorizontal: 20,
        marginTop: 10,
        borderRadius: 20
    },
    picker: {
        height: 30,
        color: "white",
        width: 100,

    },
    pickerWrapper: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "white",
        alignSelf: "center",
        marginTop: 20,

    }
})