import s from './Loader.module.css';
import { Triangle } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className={s.loader}>
      <Triangle width="150" height="150" color="#3f51b5" />
    </div>
  );
}
