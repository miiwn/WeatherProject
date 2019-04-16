import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import OpenWeatherMap from  './open_weather_map' ;

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: '', forecast: null };
  }

  _handleTextChange = event => {
      let zip = event.nativeEvent.text ;
      OpenWeatherMap.fetchForecast(zip).then(forecast => {
        this.setState({zip: zip,forecast: forecast }) ;
      }).catch( error => { console.log(error)}) ;      
  }

  render() {
    return (
      <View>
        <View style={styles.row}>
          <Text style={styles.mainText}>You input</Text>
          <View style={styles.zipContainer}>
            <TextInput
              style={styles.zipCode}
              onSubmitEditing={this._handleTextChange}
              />
          </View>
          </View>
        <Text style={styles.mainText}>
          {this.state.forecast?
           this.state.forecast.main+':'+this.state.forecast.description+'('+this.state.forecast.temp+'°F)'
           :'No information'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    welcome: { fontSize: 20, textAlign: "center", margin: 10 },
    zipContainer: {
      borderBottomColor: '#DDDDDD',
      borderBottomWidth: 1,
      marginLeft: 5,
    },
    overlay: {
      flex: 0.5,
      backgroundColor: '#000000',
      opacity: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
      padding: 39,
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
    },
    zipCode: { 
      width: 100,
      height: 16,
      color: '#000000'
    },
    mainText: {
      fontSize: 16,
      color: '#000000',
    }
});

export default Weather;


