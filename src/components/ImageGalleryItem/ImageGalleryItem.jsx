import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ images, openModal }) {
  function handleClick(largeImage) {
    openModal(largeImage);
  }
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL, tags }, idx) => (
        <li
          onClick={() => handleClick(largeImageURL)}
          key={id}
          className={s.item}
        >
          <img src={webformatURL} alt={tags} />
          {idx === images.length - 12 && <div id="scroll"></div>}
        </li>
      ))}
    </>
  );
}

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  openModal: PropTypes.func.isRequired,
};

/* {images.map(({ hits }) =>
        hits.map(({ id, webformatURL, largeImageURL }) => (
          <li key={id} className={s.item}>
            <img src={webformatURL} alt="" />
          </li>
        ))
      )} */
