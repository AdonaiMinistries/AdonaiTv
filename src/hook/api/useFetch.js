import React from 'react';
import {useState, useEffect} from 'react';
import {http_constants} from '../../constants/httpConst';

export default () => {
  const [fetchError, setFetchError] = useState(null);
  const [response, setResponse] = useState(null);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const FetchFromBackend = async () => {
    console.log('Fetching from backend ...');
    fetch(http_constants.appConfigUrl)
      .then(r => r.json())
      .then(r => {
        setResponse(r);
        setFetched(true);
      })
      .catch(e => {
        console.error(e);
        setFetchError(e);
        setFetched(false);
        setResponse(null);
      });
  };
  return [FetchFromBackend, response, fetched, fetchError];
};

// export default url => {
//   const baseUrl = `https://api.vimeo.com`;
//   fetch(`${baseUrl}${url}`, {
//     headers: {
//       Authorization: 'Bearer f146ca9760ce7e79c962f5acff471b19',
//     },
//   })
//     .then(response => response.json())
//     .then(json => {
//       return [json, null];
//     })
//     .catch(e => {
//       console.error(e);
//       return [null, e];
//     });
// };

// const FetchFromVimeo = async (url, token) => {
//   console.log(`Fetching from vimeo - ${token}`);
//   console.log(`${http_constants.vimeoBaseUrl}${url}`);
//   fetch(`${http_constants.vimeoBaseUrl}${url}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(r => r.json())
//     .then(r => {
//       console.log(r);
//     })
//     .catch(e => console.error(e));
// };
