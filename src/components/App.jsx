import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const handleFormSubmit = keyword => {
    setKeyword(keyword);
  };

  const toggleModal = modalImage => {
    setModalOpen(!modalOpen);
    setModalImage(modalImage);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery openModal={toggleModal} keyword={keyword} />
      {modalOpen && <Modal modalImage={modalImage} closeModal={toggleModal} />}
    </div>
  );
}

// export default class App extends Component {
//   state = {
//     keyword: '',
//     isModalOpen: false,
//     modalImage: null,
//   };

//   handleFormSubmit = keyword => {
//     this.setState({ keyword });
//   };

//   toggleModal = (modalImage = null) => {
//     this.setState(prev => ({
//       isModalOpen: !prev.isModalOpen,
//       modalImage: modalImage,
//     }));
//   };

//   render() {
//     const { keyword, isModalOpen, modalImage } = this.state;
//     return (
//       <div className="app">
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery openModal={this.toggleModal} keyword={keyword} />
//         {isModalOpen && (
//           <Modal modalImage={modalImage} closeModal={this.toggleModal} />
//         )}
//       </div>
//     );
//   }
// }
