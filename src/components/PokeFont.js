import React from 'react'
import { letters } from '../constants';

const PokeFont = ({text}) => {
  return (
    <div className="pokeFont first-letter:uppercase leading-none">
          {text.split("").map((letter, index) => {
            if (letters.includes(letter.toLowerCase())) {
              return (
                <span key={index} className="z-10 text-xl relative leading-none">
                  {letter}
                </span>
              );
            } else {
              return (
                <span key={index} className="text-xl leading-none">
                  {letter}
                </span>
              );
            }
          })}
        </div>
  )
}

export default PokeFont