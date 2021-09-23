import React from "react";
import axios from "axios";

import SearchBar from "./SearchBar";
import ResponseCard from "./ResponseCard";
import DataInfo from "./DataInfo";

class App extends React.Component {
  state = {
    paid: "",
    origin: "",
    dest: "",
    display: false,
    loading: false,
  };

  priceData = async (origin, dest, paid) => {
    this.setState({ loading: true });

    const response = await axios.get("http://localhost:4001/getPrice", {
      params: { origin, dest },
    });
    this.setState({
      price: response.data.price,
      paid: paid,
      display: true,
      origin: origin.toUpperCase(),
      dest: dest.toUpperCase(),
      loading: false,
    });
  };

  render() {
    return (
      <div className='ui segment'>
        <SearchBar
          onSearchSubmit={this.priceData}
          loading={this.state.loading}
        />
        <ResponseCard
          paid={this.state.paid}
          price={this.state.price}
          origin={this.state.origin}
          dest={this.state.dest}
          display={this.state.display}
        />
        <DataInfo />
      </div>
    );
  }
}

export default App;
