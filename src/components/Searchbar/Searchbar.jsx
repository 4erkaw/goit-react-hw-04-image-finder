import { Component } from 'react';
import s from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';
import { Notify } from 'notiflix';

export default class Searchbar extends Component {
  state = {
    keyword: '',
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ keyword: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { keyword } = this.state;
    const { onSubmit } = this.props;
    if (keyword.trim() === '') {
      return Notify.info('Enter keyword!');
    }
    onSubmit(keyword);
    this.setState({ keyword: '' });
  };

  render() {
    const { keyword } = this.state;
    return (
      <header className={s.container}>
        <form onSubmit={this.handleSubmit} className={s.form}>
          <button type="submit" className={s.button}>
            <FiSearch size={24} />
            <span className={s.label}></span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={keyword}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
