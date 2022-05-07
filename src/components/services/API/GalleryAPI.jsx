const API = {
  HTTPS: 'https://pixabay.com/api/',
  KEY: '25784131-d2971e411192c7c57d85795af',
  PARAMS: 'image_type=photo&orientation=horizontal',
  PER_PAGE: 'per_page=12',
};
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export default async function fetchImages({ keyword, page }) {
  const { HTTPS, KEY, PARAMS, PER_PAGE } = API;
  return fetch(
    `${HTTPS}/?key=${KEY}&q=${keyword}&${PARAMS}&page=${page}&${PER_PAGE}`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`CLown`));
  });
}

// try {
//   await axios
//     .get(
//       `${HTTPS}/?key=${KEY}&q=${keyword}&${PARAMS}&page=${page}&${PER_PAGE}`
//     )
//     .then(({ data }) => {
//       console.log(data);
//       return data;
//     });
// } catch (error) {
//   console.log(error);
// }
