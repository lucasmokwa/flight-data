import React from "react";

class SearchBar extends React.Component {
  state = { originInput: "", destInput: "", paid: "" };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearchSubmit(
      this.state.originInput,
      this.state.destInput,
      this.state.paid
    );
  };

  render() {
    return (
      <div className='ui segment'>
        <div className='ui segment'>
          <form
            id='airportCodes'
            className='ui large form'
            onSubmit={this.onFormSubmit}>
            <h4 className='ui dividing header'>
              Did you get a good ticket price? (Data available between US
              Airports)
            </h4>
            <div className='field'>
              <label>Enter the Airport Codes</label>
              <div className='two fields'>
                <div className='field'>
                  <input
                    type='text'
                    name='origin'
                    placeholder='Origin'
                    value={this.state.originInput}
                    onChange={(e) => {
                      this.setState({ originInput: e.target.value });
                    }}
                  />
                </div>
                <div className='field'>
                  <input
                    type='text'
                    name='dest'
                    placeholder='Destination'
                    value={this.state.destInput}
                    onChange={(e) => {
                      this.setState({ destInput: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className='field'>
                <label>How much did you pay for it?</label>
                <div className='field'>
                  <div className='field'>
                    <input
                      type='text'
                      name='paid'
                      placeholder='Usd'
                      value={this.state.paid}
                      onChange={(e) => {
                        this.setState({ paid: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <button form='airportCodes' className='ui submit button'>
          Submit
        </button>
      </div>
    );
  }
}
export default SearchBar;
