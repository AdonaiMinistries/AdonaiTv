import React, {useState, useEffect} from 'react';
import {useContext} from 'react';
import {AppConfigContext} from '../provider/AppConfigProvider';
import {SermonsContext} from '../provider/SermonsProvider';
import useFetch from './api/useFetch';

/*
 * Fetch sermon from vimeo.
 * Update the Sermons context.
 */

export default () => {
  const sermonsContext = useContext(SermonsContext);
  const [errorSermon, setError] = useState(null);
  const [sermonLoading, setSermonLoading] = useState(false);
  // const [_, FetchFromVimeo] = useFetch();
  const appConfig = useContext(AppConfigContext);

  const updateSermons = data => {
    if (sermonsContext.sermons.length === 0) {
      sermonsContext.setSermons(data);
    } else {
      sermonsContext.setSermons([...sermonsContext.sermons, ...data]);
    }
  };

  const FetchSermons = async => {
    if (sermonsContext.nextPage === null) {
      return;
    }
    setSermonLoading(true);
    // FetchFromVimeo(`${sermonsContext.nextPage}`, appConfig.token);

    // vimeo
    //   .get(`${sermonsContext.nextPage}`)
    //   .then(async resp => {
    //     // Set the response to the sermonsList.
    //     if (resp.data.data) {
    //       updateSermons(resp.data.data);
    //     }
    //     // Set next page.
    //     sermonsContext.setNextPage(resp.data.paging.next);
    //     setSermonLoading(false);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     setError(e);
    //   });
  };

  return [FetchSermons, sermonLoading, errorSermon];
};

// export default url => {
//   const [loading, setLoading] = useState(false);
//   const [allLoaded, setAllLoaded] = useState(false);
//   const [nextPage, setNextPage] = useState('');
//   const [sermonsList, setSermonsList] = useState([]);
//   const [error, setError] = useState('');

//   const FetchSermons = async url => {
//     if (url === null) {
//       setAllLoaded(true);
//       return;
//     }
//     // setLoading(true);
//     // console.log(`${vimeo(`${url}`)}`);
//     // const {data, error} = await vimeo(`${url}`);
//     // console.log(data);

//     // if (error) {
//     //   return error;
//     // }

//     // setNextPage(data.paging?.next);
//     // if (sermonsList.length > 0) {
//     //   setSermonsList([...sermonsList, ...data.data]);
//     // } else {
//     //   setSermonsList(data.data);
//     // }
//     // if (data.data.length === 0) {
//     //   // Setting this flag to avoid calling fetch again.
//     //   setAllLoaded(true);
//     // }

//     vimeo
//       .get(`${url}`)
//       .then(async resp => {
//         // Set the response to the sermonsList.
//         if (sermonsList.length > 0) {
//           setSermonsList([...sermonsList, ...resp.data?.data]);
//         } else {
//           setSermonsList(resp.data?.data);
//         }
//         // Set Next page, as it'll help to fetch next set of sermons.
//         setNextPage(resp.data?.paging.next);
//         if (resp.data.length === 0) {
//           // Setting this flag to avoid calling fetch again.
//           setAllLoaded(true);
//         }
//       })
//       .catch(e => {
//         console.error(e);
//         setError(e);
//       });

//     setLoading(false);
//   };

//   useEffect(() => {
//     FetchSermons(url);
//   }, [url]);

//   return [sermonsList, nextPage, FetchSermons, loading, allLoaded, error];
// };
