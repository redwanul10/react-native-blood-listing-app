import React from 'react';
import { Picker } from '@react-native-community/picker';

const BloodGroupPicker = (props) => {
    return (
        <Picker
            selectedValue={props.selectedValue}
            style={props.style ? props.style : {}}
            onValueChange={props.onValueChange}>
            <Picker.Item label={props.initialItem ? "All" : "select"} value="" />
            <Picker.Item label="A-" value="A-" />
            <Picker.Item label="A+" value="A+" />
            <Picker.Item label="B+" value="B+" />
            <Picker.Item label="B-" value="B-" />
            <Picker.Item label="O+" value="O+" />
            <Picker.Item label="O-" value="O-" />
            <Picker.Item label="AB+" value="AB-" />
            <Picker.Item label="AB-" value="AB-" />
        </Picker>
    );
}

export default BloodGroupPicker;