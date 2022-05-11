import { useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import fetchImages from '../../services/API';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from './../Button';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';
import Searchbar from './../Searchbar';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ openModal }) {
  const [keyword, setKeyword] = useState('ukraine');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [total, setTotal] = useState(0);

  const saveSearch = keyword => {
    setImages([]);
    setKeyword(keyword);
    setPage(1);
    setStatus(Status.PENDING);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const getImages = (keyword, page) => {
    setError(false);

    fetchImages({ keyword, page })
      .then(({ hits, totalHits }) => {
        if (!totalHits) {
          throw new Error(`Sorry! there is no results by: ${keyword}`);
        }
        setImages(prev => [...prev, ...hits]);
        setTotal(totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
        setTimeout(() => {
          setStatus(Status.IDLE);
        }, 2000);
      });
  };

  useEffect(() => {
    if (!keyword) {
      return;
    }
    getImages(keyword, page);
  }, [keyword, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  });

  const loadMore = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      <Searchbar saveSubmit={saveSearch} />
      {status === Status.IDLE && (
        <h2 className={s.title}>Enter keyword to browse</h2>
      )}
      {status === Status.RESOLVED && (
        <>
          <ul className={s.gallery}>
            <ImageGalleryItem openModal={openModal} images={images} />
            {status === Status.PENDING && <Loader />}
          </ul>
          {total > images.length && <Button onClick={loadMore} />}
        </>
      )}
      {status === Status.REJECTED && (
        <>
          <h2 className={s.title}>{error.message}</h2>
        </>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  openModal: PropTypes.func.isRequired,
};

// export default class ImageGallery extends Component {
//   state = {
//     images: [],
//     page: 0,
//     error: false,
//     status: 'idle',
//     total: 0,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { keyword } = this.props;
//     const { page } = this.state;
//     if (prevProps.keyword !== keyword) {
//       this.setState({ images: [], page: 1 });
//     }
//     if (
//       page !== prevState.page ||
//       (prevProps.keyword !== keyword && page === 1)
//     ) {
//       this.setState({ status: Status.PENDING });
//       this.getImages();
//     }
//   }

//   getImages = () => {
//     const { keyword } = this.props;
//     const { page } = this.state;
//     fetchImages({ keyword, page })
//       .then(images => {
//         if (!images.total) {
//           throw new Error('Sorry! we couldn`t find any images by your request');
//         }
//         if (images.hits.length === 0) {
//           Notify.info('No more images by your request');
//           return;
//         }
//         this.setState(prev => ({
//           images: [...prev.images, ...images.hits],
//           total: images.totalHits,
//           status: Status.RESOLVED,
//         }));
//       })
//       .catch(error => this.setState({ error, status: Status.REJECTED }));
//   };

//   loadMore = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   render() {
//     const { images, status, error, total } = this.state;
//     const { openModal } = this.props;
//     if (status === 'idle') {
//       return <h2 className={s.title}>Enter keyword to browse</h2>;
//     }

//     if (status === 'pending') {
//       return <Loader />;
//     }

//     if (status === 'resolved') {
//       return (
//         <>
//           <ul className={s.gallery}>
//             <ImageGalleryItem openModal={openModal} images={images} />
//           </ul>
//           {total > images.length && <Button onClick={this.loadMore} />}
//         </>
//       );
//     }
//     if (status === 'rejected') {
//       return (
//         <>
//           <h2 className={s.title}>{error.message}</h2>
//         </>
//       );
//     }
//   }
// }
