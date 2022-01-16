import React,{useState,useEffect} from 'react';
import data from '../../data.json';
import {makeStyles} from '@material-ui/core';
import { GameContainerStyle } from './GameContainerStyle';
import HiddenWord from '../Word/HiddenWord';
import WrongLetters from '../Word/WrongLetters';
import Figure from '../Figure/Figure';
import { showNotification as show} from '../../helpers/helpers';
import { checkWin } from '../../helpers/helpers';
import Notification from '../Notification/Notification';
import {useHistory} from 'react-router-dom';
import PopUp from '../PopUp/PopUp';


const useStyle = makeStyles((theme) => GameContainerStyle(theme))

const words = data["data"]
const selectedWord = words[Math.floor(Math.random()*words.length)];

console.log(selectedWord)

const GameContainer = () => {
    const [play,setPlay] = useState(true);
    const [correctLetters,setCorrectLetters] = useState([]);
    const [wrongLetters,setWrongLetters] = useState([]);
    const [showNotification,setShowNotification] = useState(false);


    const classes = useStyle();
    const history = useHistory();

    

    useEffect(() => {


        const handleKeyPress = (event) => {
            if(play && event.keyCode >= 65 && event.keyCode <= 90){
                const letter = event.key.toLowerCase();
                if(selectedWord.includes(letter)){
                    if(!correctLetters.includes(letter)){
                        setCorrectLetters(currentLetters => [...currentLetters,letter]);                    
                    }else{
                        show(setShowNotification);
                    }
                }else{
                    if(!wrongLetters.includes(letter)){
                        setWrongLetters(wrongLetters => [...wrongLetters,letter]);
                    }else{
                        show(setShowNotification);
                    }
                }
            }
           
        }
        if(checkWin(correctLetters,wrongLetters,selectedWord) === 'win'){
            setPlay(false);
            history.push('/dialog/winDialog');
        }else if (checkWin(correctLetters,wrongLetters,selectedWord) === 'lose') {
            setPlay(false);
            history.push('/dialog/loseDialog');
        }else {
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown',handleKeyPress);
        }


        
        
    }, [correctLetters,wrongLetters,play,history]);

    
    

    return (  
    <div className={classes.gameContainer}>
            <h2>Encontra la palabra - Ingresa una letra:</h2>

            <div className={classes.figureWrongContainer}>
                <Figure wrongLetters={wrongLetters} setPlay={setPlay}/>

                <WrongLetters wrongLetters={wrongLetters}/>    
            </div>
            <HiddenWord  selectedWord={selectedWord} correctLetters={correctLetters} setCorrectLetters={setCorrectLetters}/>

            {/* <PopUp selectedWord={selectedWord} correctLetters={correctLetters} wrongLetters={wrongLetters} setPlay={setPlay}/> */}

            <Notification showNotification={showNotification}/>
    </div>)
}


export default GameContainer;