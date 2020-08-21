import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class SampleComponent extends Component
{
    render(){
        return (
            <View>
                <Button title='Press me' onPress={()=>{this.props.onIncrement(1) /*day la ham goi props de kich hoat action}*/}}> 
                    
                </Button>
                <Text>
                    {this.props.time /*day la ham goi prop de hien thi state*/}
                </Text>
            </View>
        );
    }
}