import styles from "@/styles/crossword.module.css";

function Square(props) {
  let {
    character,
    key_character,
    handleSquareInput,
    handleKeyDown,
    row,
    col,
    clueNumber,
    dimensions,
    inputLocation,
    clueToFocus,
  } = props;

  function handleChange(event) {
    handleSquareInput(event.target.value, row, col, inputLocation);
  }

  function handleDownKey(event) {
    handleKeyDown(event, row, col, inputLocation);
  }

  return (
    <>
      <div className={styles.div}>
        {clueNumber != 0 ? <p className={styles.number}>{clueNumber}</p> : null}
        <input
          ref={(element) =>
            (inputLocation.current[row * dimensions + col] = element)
          }
          name={clueToFocus}
          className={styles.square}
          readOnly={key_character === "*" || key_character === "&"}
          style={
            key_character == "*"
              ? { backgroundColor: "black", borderColor: "black" }
              : key_character == "&"
              ? {
                  backgroundColor: "white",
                  height: 0,
                  width: 0,
                  border: 0,
                }
              : { backgroundColor: "white", borderColor: "black" }
          }
          maxLength={1}
          type="text"
          onChange={handleChange}
          onKeyDown={handleDownKey}
          disabled={
            key_character === "*" || key_character === "&"
          }
          autoFocus={clueNumber !== 0 && clueNumber === clueToFocus}
        ></input>
      </div>
    </>
  );
}

export default Square;
