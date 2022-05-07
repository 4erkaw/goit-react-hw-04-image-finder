import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images }) {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <li key={id} className={s.item}>
          <img src={webformatURL} alt="" />
        </li>
      ))}{' '}
    </>
  );
}
