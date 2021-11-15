import axios from 'axios';

export default axios.create({
  baseURL: `https://api.vimeo.com`,
  headers: {
    Authorization: 'Bearer f146ca9760ce7e79c962f5acff471b19',
  },
});

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
