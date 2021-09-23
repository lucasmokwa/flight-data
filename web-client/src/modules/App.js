import React from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import ResponseCard from "./ResponseCard";

class App extends React.Component {
  state = {
    paid: " ",
    price: " ",
    paid: "",
    origin: "",
    dest: "",
    display: false,
  };

  priceData = async (origin, dest, paid) => {
    const response = await axios.get("http://localhost:4001/getPrice", {
      params: { origin, dest },
    });
    this.setState({
      price: response.data.price,
      paid: paid,
      origin: origin.toUpperCase(),
      dest: dest.toUpperCase(),
      display: true,
    });
  };

  render() {
    return (
      <div className='ui segment'>
        <SearchBar onSearchSubmit={this.priceData} />
        <ResponseCard
          paid={this.state.paid}
          price={this.state.price}
          origin={this.state.origin}
          dest={this.state.dest}
          display={this.state.display}
        />
      </div>
    );
  }
}

export default App;
