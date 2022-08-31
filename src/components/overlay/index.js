import React from 'react';
import {BackHandler, Modal, Text, View} from 'react-native';
import VideoComponent from '../VideoComponent';
import {StateContext} from '../../provider/StateProvider';
import moment from 'moment';
import Countdown from '../countdown';

const Overlay = props => {
  const [live, setLive] = React.useState(false);
  const [countdown, setCountdown] = React.useState({});

  const ctx = React.useContext(StateContext);

  React.useEffect(() => {
    var [isLive, d, h, m, s] = getTimeDiff(
      `${ctx.state.appconfig.config.stream.nextStream}`,
    );

    setLive(isLive);
    setCountdown({d, h, m, s});

    console.log('Live set - ', live);
    console.log('use effect - countdown - ', countdown);
    console.log('use effect - received - ', d, h, m, s);

    return () => {};
  }, []);

  function onExit() {
    props.setOverlay(false);
  }

  function videoComp() {
    return (
      <VideoComponent
        live={true}
        // uri={
        //   'https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8'
        // }
        uri={`${ctx.state.appconfig.config.stream.link}`}
        onExit={onExit}
      />
    );
  }

  function countdownComp() {
    return (
      <Countdown
        serviceTime={`${ctx.state.appconfig.config.stream.nextStream}`}
        countdown={countdown}
      />
    );
  }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        onRequestClose={() => {
          onExit();
        }}>
        {live ? videoComp() : countdownComp()}
      </Modal>
    </View>
  );
};

function getTimeDiff(dateTime) {
  const recv = new Date(dateTime);
  const now = new Date();

  console.log('Time date received - ', recv.toString());

  const diff_d = diffInDays(recv, now);
  const diff_h = diffInHours(recv, now);
  const diff_m = diffInMinutes(recv, now);
  const diff_s = diffInSeconds(recv, now);

  if (diff_d < 0 || diff_h < 0 || diff_m < 0 || diff_s < 0) {
    /* Live stream date and time already passed. */
    console.log('Returning from getTimeDiff.');
    return [true, diff_d, diff_h, diff_m, diff_s];
  }

  return [
    false,
    diff_d,
    diff_h - diff_d * 24 /* Total diff hours - (No of Days remaing * 24) */,
    diff_m - diff_h * 60 /* Total diff mins - (No of hours remaing * 60) */,
    diff_s - diff_m * 60 /* Total diff seconds - (No of mins remaing * 60) */,
  ];
}

function diffInDays(start, end) {
  return Math.floor((start.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));
}

function diffInHours(start, end) {
  return Math.floor((start.getTime() - end.getTime()) / (1000 * 60 * 60));
}

function diffInMinutes(start, end) {
  return Math.floor((start.getTime() - end.getTime()) / (1000 * 60));
}

function diffInSeconds(start, end) {
  return Math.floor((start.getTime() - end.getTime()) / 1000);
}

export default Overlay;
