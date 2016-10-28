import React from 'react';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  render() {
        // <Footer/>
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
