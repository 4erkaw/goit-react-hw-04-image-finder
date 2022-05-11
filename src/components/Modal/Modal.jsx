import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modal = document.getElementById('modal');

export default function Modal({ modalImage, closeModal }) {
  const handleEsc = ({ code }) => {
    if (code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  return createPortal(
    <div onClick={() => closeModal()} className={s.overlay}>
      <div className={s.modal}>
        <img src={modalImage} alt="" />
      </div>
    </div>,
    modal
  );
}

Modal.propTypes = {
  modalImage: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEsc);
//   }

//   handleEsc = ({ code }) => {
//     const { closeModal } = this.props;
//     if (code === 'Escape') {
//       closeModal();
//     }
//   };

//   render() {
//     const { modalImage, closeModal } = this.props;
//     return createPortal(
//       <div onClick={() => closeModal()} className={s.overlay}>
//         <div className={s.modal}>
//           <img src={modalImage} alt="" />
//         </div>
//       </div>,
//       modal
//     );
//   }
// }
