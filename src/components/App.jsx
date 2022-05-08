import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

export default class App extends Component {
  state = {
    keyword: '',
    isModalOpen: false,
    modalImage: null,
  };

  handleFormSubmit = keyword => {
    this.setState({ keyword });
  };

  toggleModal = (modalImage = null) => {
    this.setState(prev => ({
      isModalOpen: !prev.isModalOpen,
      modalImage: modalImage,
    }));
  };

  render() {
    const { keyword, isModalOpen, modalImage } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery openModal={this.toggleModal} keyword={keyword} />
        {isModalOpen && (
          <Modal modalImage={modalImage} closeModal={this.toggleModal} />
        )}
      </div>
    );
  }
}
