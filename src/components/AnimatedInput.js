import React, { Component } from 'react';
import { openAnimation} from './Greensock';
import { observer } from 'mobx-react';


const AnimatedInput = observer( class AnimatedInput extends Component {
  componentDidMount() {
    openAnimation(this.textInput);
  }

  render() {
    return(
      <div className="AnimatedInput">
        <input className="Search" type="text"
          value={this.props.store.searchInput}
          onChange={(e) => this.props.store.changeSearch(e.target.value)}
          ref={(input) => {this.textInput = input; }} />

              <div className="Centerpiece">
                <h1 className="intialText">MARVEL COMIC SEARCH</h1>
                <h1 className="nextText">SEARCH FOR A CHARACTER</h1>
              </div>
      </div>
    )
  }
})

export default AnimatedInput;
