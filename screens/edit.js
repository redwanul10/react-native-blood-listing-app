import React, { useState, useContext, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput,
    Image, TouchableOpacity, PermissionsAndroid,
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import BloodGroupPicker from '../components/blood-group-picker';
import { AppContext } from '../components/app-wrapper'

const Edit = (props) => {

    const { donor } = props.route.params

    // const [photoUrl, setPhotoUrl] = useState("")
    const { editDonor } = useContext(AppContext)
    const [formData, setFormData] = useState(donor)

    useEffect(() => {
        // requestCameraPermission()
    }, [])

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Camera Permission",
                    message:
                        "This Apps Needs Access to Your Camera to Take Photos From Camera",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "ok"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // alert("You can use the camera");
                return "Granted"
            } else {
                // alert("Camera permission denied");
                return "denied"
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const selectPhoto = async () => {
        const permission = await requestCameraPermission()
        if (permission !== "Granted") return alert("Permission Denied")


        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                alert('User tapped custom button: ', response.customButton);
            } else {

                setFormData({
                    ...formData,
                    photoUrl: response.uri
                })
            }
        });
    }


    const handleChange = (value, name) => {
        // alert(JSON.stringify({ value, name }))
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const updateDonor = () => {
        editDonor(formData)
        props.navigation.goBack()
    }
    return (
        <View style={style.container}>
            <View style={style.donorForm}>
                <TouchableOpacity style={style.donorPhoto} onPress={selectPhoto}>
                    {!formData.photoUrl ? (
                        <>
                            <Image style={{ borderRadius: 50, width: 60, height: 60 }} source={require('../images/user.png')} />
                            <Text style={{ textAlign: "center", marginTop: 5 }}>Photo</Text>
                        </>
                    ) : (
                            <Image style={{ borderRadius: 10, width: 60, height: 60 }} source={{ uri: formData.photoUrl }} />
                            // <Text>{photoUrl}</Text>
                        )
                    }
                </TouchableOpacity>
                <TextInput onChangeText={value => handleChange(value, "name")} style={style.inputText} value={formData.name} placeholder="Donor name" />
                <TextInput onChangeText={value => handleChange(value, "email")} style={style.inputText} value={formData.email} keyboardType="email-address" placeholder="Donor Email" />
                {/* <TextInput onChangeText={value => handleChange(value, "bloodGroup")} style={style.inputText} value={formData.bloodGroup} name="bloodGroup" placeholder="Donor Blood Group" /> */}
                <View style={{ elevation: 1, overflow: "hidden", width: "97%", justifyContent: "center", alignSelf: "center" }}>
                    <BloodGroupPicker
                        selectedValue={formData.bloodGroup}
                        onValueChange={itemValue => handleChange(itemValue, "bloodGroup")}
                    />
                </View>
                <TextInput onChangeText={value => handleChange(value, "phone")} style={style.inputText} value={formData.phone} keyboardType="numeric" placeholder="Donor Phone Number" />
                <View style={style.dualInput}>
                    <TextInput onChangeText={value => handleChange(value, "age")} style={[style.inputText, style.halfWidth]} value={formData.age} keyboardType="numeric" placeholder="Donor Age" />
                    <TextInput onChangeText={value => handleChange(value, "city")} style={[style.inputText, style.halfWidth]} value={formData.city} placeholder="Donor City" />
                </View>
                <TouchableOpacity onPress={updateDonor}>
                    <Text style={style.button}>Submit</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

export default Edit;

const style = StyleSheet.create({
    container: {
        backgroundColor: "#E63946",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    donorForm: {
        width: "90%",
        height: 500,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: "center"
    },
    donorPhoto: {
        // width: 60,
        // height: 60,
        alignSelf: "center",
        justifyContent: "center",
        // marginTop: 30,
        marginBottom: 15
    },
    inputText: {
        width: "100%",
        // borderBottomColor: "#ccc",
        // elevation: 1,
        // marginBottom: 15,
        // paddingHorizontal: 15,
        // paddingVertical: 10
        padding: 15
    },
    button: {
        backgroundColor: "#E63946",
        color: "white",
        paddingVertical: 10,
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: 5
    },
    dualInput: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15
    },
    halfWidth: {
        width: "50%"
    }

})