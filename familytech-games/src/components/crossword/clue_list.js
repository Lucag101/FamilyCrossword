import Clue from "./clue";
import React, { useEffect, useState } from "react";
import styles from "@/styles/crossword.module.css";


function ClueList(props) {
  let { verticalClues, horizontalClues, result, childToParent } = props;
  const [clueList, setClueList] = useState({VERTICAL: verticalClues, HORIZONTAL:horizontalClues});
  const [isVerticalVisible, setIsVerticalVisible] = useState(false); 
  const [isHorizontalVisible, setIsHorizontalVisible] = useState(false);

  const toggleVertical = () => {
    setIsVerticalVisible(!isVerticalVisible);
  };

  const toggleHorizontal = () => {
    setIsHorizontalVisible(!isHorizontalVisible);
  };

  useEffect(() => {
    setClueList(makeClueList());
  }, []);
  function makeClueList() {
    for (let i = 0; i < verticalClues.length; i++) {
      verticalClues[i].CLUE = verticalClues[i].WORD;
    }
    for (let i = 0; i < horizontalClues.length; i++) {
      horizontalClues[i].CLUE = horizontalClues[i].WORD;
    }
    let clues = {VERTICAL: verticalClues, HORIZONTAL: horizontalClues}
    return clues;
  }
  clueList.VERTICAL.sort((a, b) => a.CLUE_NUMBER - b.CLUE_NUMBER);
  clueList.HORIZONTAL.sort((a, b) => a.CLUE_NUMBER - b.CLUE_NUMBER); 

  for (let i = 0; i < clueList.VERTICAL.length; i++) {
    let hint = result.find(item => item.answer === clueList.VERTICAL[i].WORD);
    if (hint != null) {
      clueList.VERTICAL[i].CLUE = hint.clue
    }
  }

  for (let i = 0; i < clueList.HORIZONTAL.length; i++) {
    let hint = result.find(item => item.answer === clueList.HORIZONTAL[i].WORD);
    if (hint != null) {
      clueList.HORIZONTAL[i].CLUE = hint.clue
    }
  }

  return (
    <>
      <div class={styles.set_margins} >
        <h1>Clues</h1>
        <h2 class={styles.clue_header} onClick={toggleVertical}>Down</h2>
        {/* Create   Slide down list for cluest */}
        <div class={`${styles.closed_drop_down} ${isVerticalVisible ? '' :styles.open_drop_down }`}>
          {clueList.VERTICAL.map((clues) => {
            return (
              <div key={clues.CLUE_NUMBER}>
                <Clue number={clues.CLUE_NUMBER} word={clues.WORD} clue={clues.CLUE} />
              </div>
            );
          })}
        </div>
        <h2 class={styles.clue_header} onClick={toggleHorizontal}>Across</h2>
        {/* Create Slide down list for cluest */}
        <div class={`${styles.closed_drop_down} ${isHorizontalVisible ? '' :styles.open_drop_down}`}>
          {clueList.HORIZONTAL.map((clues) => {
            return (
              <div key={clues.CLUE_NUMBER}>
                <Clue number={clues.CLUE_NUMBER} word={clues.WORD} clue={clues.CLUE} />
              </div>
            );
          })}
        </div>
        <h3>Answers can be seen by right-clicking the clue</h3>
      </div>
    </>
  );
}
export default ClueList;