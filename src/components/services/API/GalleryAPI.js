import PropTypes from 'prop-types';
import axios from 'axios';

const API = {
  HTTPS: 'https://pixabay.com/api/',
  KEY: '25784131-d2971e411192c7c57d85795af',
  PARAMS: 'image_type=photo&orientation=horizontal',
  PER_PAGE: 'per_page=12',
};
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export default async function fetchImages({ keyword, page }) {
  const { HTTPS, KEY, PARAMS, PER_PAGE } = API;
  return await axios
    .get(`${HTTPS}/?key=${KEY}&q=${keyword}&${PARAMS}&page=${page}&${PER_PAGE}`)
    .then(({ data }) => {
      return data;
    })
    .catch(error => console.log(error));
}

fetchImages.propTypes = {
  keyword: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};
