import { Component } from 'react';
import s from './Searchbar.module.css';
import search from '../img/search.svg';

export default class Searchbar extends Component {
  state = {};
  render() {
    return (
      <header className={s.container}>
        <form className={s.form}>
          <button type="submit" className={s.button}>
            <span className={s.label}>{search}</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
