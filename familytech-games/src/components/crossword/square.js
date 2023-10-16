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
        {clueNumber !== 0 && (
          <p className={styles.number}>{clueNumber}</p>
        )}
        <input
          name={clueToFocus}
          ref={(element) =>
            (inputLocation.current[row * dimensions + col] = element)
          }
          className={styles.square}
          readOnly={key_character === "*" || key_character === "&"}
          style={
            key_character == "*"
              ? { backgroundColor: "midnightblue", borderColor: "midnightblue" }
              : key_character == "&"
              ? {
                  backgroundColor: "white",
                  height: 0,
                  width: 0,
                  border: 0,
                }
              : { backgroundColor: "white", borderColor: "black", color: "green" }
          }
          maxLength={1}
          type="text"
          onChange={handleChange}
          onKeyDown={handleDownKey}
          disabled={
            key_character === "*" || key_character === "&"
          }
          autoFocus={clueNumber === clueToFocus && clueToFocus !== 0}
        />
      </div>
    </>
  );
  
}

export default Square;
