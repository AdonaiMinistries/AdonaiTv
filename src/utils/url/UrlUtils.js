import React from 'react';

const getVideoIdFromUrl = url => {
  // "/videos/643139576"
  //         |<---id--->|
  const str = url.split('/');
  return str[str.length - 1];
};

export default UrlUtils;
