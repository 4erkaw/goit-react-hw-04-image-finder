import { Component } from 'react';
import s from './ImageGallery.module.css';
import fetchImages from '../services/API';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from './../Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 0,
    error: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyword } = this.props;
    const { page } = this.state;
    if (prevProps.keyword !== keyword) {
      this.setState({ images: [], page: 1 });
    }
    if (page > prevState.page) {
      this.getImages();
    }
  }

  getImages = () => {
    fetchImages({ keyword: this.props.keyword, page: this.state.page })
      .then(images => {
        this.setState(prev => ({
          images: [...prev.images, images],
          status: Status.RESOLVED,
        }));
      })

      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  loadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, status } = this.state;
    if (status === 'idle') {
      return <h2 className={s.title}>Enter keyword to browse</h2>;
    }
    if (status === 'resolved') {
      return (
        <>
          <ul className={s.gallery}>
            <ImageGalleryItem images={images.hits}></ImageGalleryItem>
          </ul>
          <Button onClick={this.loadMore} />
        </>
      );
    }
  }
}

//   getImages = () => {
//     const { page } = this.state;
//     fetchImages({ keyword, page })
//       .then(images => this.setState({ images }))
//       .catch(error => console.log(error));
//   };
