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

  onChangeOrigin = (e) => {
    const str = e.target.value;
    if (str.length > 3) {
      return;
    }
    this.setState({ originInput: str.toUpperCase() });
  };

  onChangeDest = (e) => {
    const str = e.target.value;
    if (str.length > 3) {
      return;
    }
    this.setState({ destInput: str.toUpperCase() });
  };

  onPaidChange = (e) => {
    this.setState({ paid: e.target.value });
  };

  render() {
    let loading = "submit";
    if (this.props.loading) {
      loading = "loading";
    }

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
                    onChange={this.onChangeOrigin}
                    required
                  />
                </div>
                <div className='field'>
                  <input
                    type='text'
                    name='dest'
                    placeholder='Destination'
                    value={this.state.destInput}
                    onChange={this.onChangeDest}
                    required
                  />
                </div>
              </div>
              <div className='field'>
                <label>How much did you pay for it?</label>
                <div className='field'>
                  <div className='field'>
                    <input
                      type='number'
                      name='paid'
                      placeholder='Usd'
                      value={this.state.paid}
                      onChange={this.onPaidChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <button form='airportCodes' className={`ui ${loading}  button`}>
          Submit
        </button>
      </div>
    );
  }
}
export default SearchBar;
