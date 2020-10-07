import React, { useState, useEffect, createContext } from 'react';
import { ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

export const AppContext = createContext("AppContext")
const AppWrapper = (props) => {

    const [donors, setDonors] = useState([])
    const [search, setSearch] = useState("")
    const [selectedBloodGroup, setBloodGroup] = useState("")

    useEffect(() => {
        getDonorList()
    }, [])

    const getDonorList = async () => {
        const donorList = await AsyncStorage.getItem("donorList")
        if (donorList) setDonors(JSON.parse(donorList))
    }

    const saveDonor = async (donor) => {
        const value = [donor, ...donors]
        setDonors(value)
        await storeData(value)
        showToaster("Donor Added")
    }

    const deleteDonor = async (id) => {
        const value = donors.filter(donor => donor.id !== id)
        setDonors(value)
        await storeData(value)
        showToaster("Donor Deleted")
    }

    const editDonor = async (updatedDonor) => {

        const list = donors.map(donor => donor.id === updatedDonor.id ? updatedDonor : donor)
        setDonors(list)
        await storeData(list)
        showToaster("Donor Updated")
    }

    const storeData = async (value) => {
        await AsyncStorage.setItem("donorList", JSON.stringify(value))
    }

    const importList = async (value) => {

        setDonors(value)
        await storeData(value)
    }

    const showToaster = (msg) => {
        ToastAndroid.showWithGravity(
            msg,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        )
    }

    const value = {
        donors,
        saveDonor,
        deleteDonor,
        editDonor,
        search,
        setSearch,
        setBloodGroup,
        selectedBloodGroup,
        showToaster,
        importList
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppWrapper;