import s from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button onClick={onClick} className={s.button}>
      Load More
    </button>
  );
}
