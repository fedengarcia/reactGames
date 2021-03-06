import React from 'react';
import MemoTestItem from '../MemoTestItem/MemoTestItem';
import { MemoTestListStyle } from './MemoTestListStyle';
import { makeStyles } from '@material-ui/core';
import MemoTestHeader from '../Header/MemoTestHeader';


const useStyles = makeStyles((theme) => MemoTestListStyle(theme));


const MemoTestList = (props) => {
    const classes = useStyles();
    return(
    <div className={classes.gameContainer}>
        <MemoTestHeader/>

        <div className={classes.memoBoard}>

            {props.items.map((item,i) => <MemoTestItem key={i} item={item} handleClickMemoItem={props.handleClickMemoItem}/>)}

        </div>
    </div>
    )
}

export default MemoTestList;