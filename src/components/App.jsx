import Searchbar from './Searchbar';
import { Component } from 'react';
import ImageGallery from './ImageGallery';

export default class App extends Component {
  state = {
    keyword: '',
  };

  handleFormSubmit = keyword => {
    this.setState({ keyword });
  };

  render() {
    const { keyword } = this.state;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery keyword={keyword} />
      </div>
    );
  }
}
