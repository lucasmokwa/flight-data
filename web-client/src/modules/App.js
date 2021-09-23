import React from "react";
import axios from "axios";

import SearchBar from "./SearchBar";

class App extends React.Component {
  state = { paid: " ", price: " ", paid: "" };

  priceData = async (origin, dest, paid) => {
    const response = await axios.get("http://localhost:4001/getPrice", {
      params: { origin, dest },
    });
    this.setState({ price: response.data.price, paid: paid });
  };

  render() {
    return (
      <div className='ui segment'>
        <SearchBar onSearchSubmit={this.priceData} />
        <div>{this.state.price}</div>
      </div>
    );
  }
}

export default App;
