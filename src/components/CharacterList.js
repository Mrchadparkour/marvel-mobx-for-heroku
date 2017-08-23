import React, { Component } from 'react'
import { observer } from 'mobx-react'
import AnimatedInput from './AnimatedInput'
import { comicShift } from './Greensock'

const CharacterList = observer( class CharacterList extends Component{
  render(){
    return(
      <div>
            <AnimatedInput store={this.props.store} />
            <div className="CharacterNames">
              {
                this.props.store.characterList.map(character =>
                  <div onClick={ () => comicShift(character.name, character.id) } key={character.id}>{ character.name }</div>
                )
              }
          </div>
      </div>
    )
  }
})

export default CharacterList;
