import { useEffect, useState } from 'react';
import './App.css';
import Die from './Components/Die';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'





function App() {



  const allNewDice = () => {

    const diceArr = [1,2,3,4,5,6,7,8,9,10];

    const randomNumbersArr = diceArr.map((index) => ({
      value:  Math.floor(Math.random() *  (6 - 1 + 1) + 1),
      isHeld: false,
      id: {index}
    }))

  return randomNumbersArr


  }
 
  const [dice , setDice] = useState(allNewDice())


  const rollDice = (id) => {
        if(!tenzies) {
          setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
            die :
            {...die,
              value:  Math.floor(Math.random() *  (6 - 1 + 1) + 1)
  
            }
          }))
     
        } else {
          setTenzies(false)
          setDice(allNewDice())
        }
  }

  
 

const holdDice = (id) => {

  setDice(prevDice => {
    return prevDice.map(
      item => item.id === id ? 
      {
        ...item,
        isHeld: !item.isHeld

      } :

      item
    )
  })

}


const diceElement = dice.map((die, index) => <Die value={die.value} key={index} id={index} holdDice={() => holdDice(die.id)} isHeld={die.isHeld}/>)

const [tenzies, setTenzies] = useState(false)

useEffect( () => { 
    const heldDice = dice.filter(die => die.isHeld )
    const allSame = heldDice.filter(number => number.value === heldDice[0].value)

    if (allSame.length === 10 && heldDice.length === 10){
      setTenzies(true)
    }


} , [dice])

const [time, setTime] = useState()



const { width, height } = useWindowSize()

  return (
    <div className="App" >
      { tenzies && <Confetti
      width={width}
      height={height}
      gravity={0.05}
      
      />}
      <main>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
  
          <div className='dice-grid'>
          {diceElement}
            
          </div>

        <button 
        className='roll-dice'
        onClick={rollDice}

        >{tenzies? "New Game?" : "Roll" }</button>

      </main>
    </div>
  );
}

export default App;
