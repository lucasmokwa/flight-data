import React from "react";
import axios from "axios";

class App extends React.Component {
  state = { paid: " ", price: " ", directPrice: " " };

  async getPriceData(origin, dest) {
    const response = await axios.get("http://localhost:4001/getPrice", {
      params: { origin, dest },
    });
    console.log(response);
    //this.setState({ price: 1 });
  }

  render() {
    this.getPriceData("lax", "ord");
    return <div>The result is {this.state.price} </div>;
  }
}

export default App;
