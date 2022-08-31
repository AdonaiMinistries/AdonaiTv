import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Countdown(props) {
  console.log('Countdown - ', props);
  return (
    <View style={styles.background}>
      <View style={styles.holder}>
        <View style={{flexDirection: 'column'}}>
          <View style={styles.nextService}>
            <Text style={styles.textService}>NEXT SERVICE</Text>
          </View>
          <View style={{height: 8}} />
          <View style={styles.date}>
            <Text style={styles.textDate}>{formatDate(props.serviceTime)}</Text>
          </View>
        </View>

        <View style={{height: 8}} />

        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            width: '100%',
          }}>
          <View style={styles.countdownBox}>
            <Text style={styles.textCountdown}>{props.countdown.d}</Text>
            <Text style={styles.textCountdown}>DAYS</Text>
          </View>
          <View style={{width: 5}} />
          <View style={styles.countdownBox}>
            <Text style={styles.textCountdown}>{props.countdown.h}</Text>
            <Text style={styles.textCountdown}>HOURS</Text>
          </View>
          <View style={{width: 5}} />
          <View style={styles.countdownBox}>
            <Text style={styles.textCountdown}>{props.countdown.m}</Text>
            <Text style={styles.textCountdown}>MINUTES</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function formatDate(d) {
  const d_str = new Date(d);
  return d_str.toLocaleString();
}

const styles = StyleSheet.create({
  /* Containers */
  background: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  holder: {
    paddingTop: '22%',
  },
  nextService: {
    borderWidth: 2,
  },
  date: {
    borderWidth: 2,
  },
  countdownBox: {
    backgroundColor: '#373737',
    height: '20%',
    width: '12%',
    alignItems: 'center',
    paddingTop: '1.5%',
    borderRadius: 5,
  },

  /* Inner elements */
  textService: {
    fontSize: 16,
    color: '#A0A1A4',
    fontFamily: 'Gotham-Regular',
  },
  textDate: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Gotham-Regular',
  },

  textCountdown: {
    color: 'white',
  },
});

export default Countdown;
