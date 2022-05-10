import { useState, useEffect } from 'react';
import s from './ImageGallery.module.css';
import fetchImages from '../services/API';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from './../Button';
import Loader from 'components/Loader';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ openModal, keyword }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);
  const [total, setTotal] = useState(0);

  const getImages = ({ keyword, page }) => {
    setStatus(Status.PENDING);
    setError(false);

    fetchImages({ keyword, page })
      .then(images => {
        if (!images.total) {
          throw new Error('Sorry! we couldn`t find any images by your request');
        }
        if (images.hits.length === 0) {
          Notify.info('No more images by your request');
          return;
        }
        setImages(prev => [...prev, ...images.hits]);
        setTotal(images.totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [keyword]);

  useEffect(() => {
    if (!keyword) {
      return;
    }
    getImages({ keyword, page });
  }, [keyword, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.keyword !== keyword) {
  //     this.setState({ images: [], page: 1 });
  //   }
  //   if (
  //     page !== prevState.page ||
  //     (prevProps.keyword !== keyword && page === 1)
  //   ) {
  //     this.setState({ status: Status.PENDING });
  //     this.getImages();
  //   }
  // }

  const loadMore = () => {
    setPage(page => page + 1);
  };
  if (status === 'idle') {
    return <h2 className={s.title}>Enter keyword to browse</h2>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={s.gallery}>
          <ImageGalleryItem openModal={openModal} images={images} />
        </ul>
        {total > images.length && <Button onClick={loadMore} />}
      </>
    );
  }
  if (status === 'rejected') {
    return (
      <>
        <h2 className={s.title}>{error.message}</h2>
      </>
    );
  }
}

ImageGallery.propTypes = {
  keyword: PropTypes.string.isRequired,
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
