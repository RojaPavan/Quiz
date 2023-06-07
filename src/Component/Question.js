import { useState } from "react";
import { Alert, Button } from "@mui/material";
import "./Question.css";
import { useNavigate } from "react-router-dom";
const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  score,
  setScore,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handelSelect = (i) => {
    if (selected === i && selected === correct) {
      return "select";
    } else if (selected === i && selected !== correct) {
      return "wrong";
    } else if (i === correct) {
      return "select";
    }
  };

  const handelCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
    setError(false);
  };
  const navigate = useNavigate();

  const handelNext = () => {
    if (currQues > 8) {
      navigate("/result");
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else {
      setError("Please select an option first");
    }
  };
  const handelQuit = () => {};
  return (
    <div className="question">
      <h1>Question{currQues + 1}</h1>
      <div className="singleQuestion">
        <h2>{questions[currQues].question}</h2>
        <div className="options">
          {error && <Alert className="alert">Please select options</Alert>}
          {options &&
            options.map((i) => (
              <button
                onClick={() => handelCheck(i)}
                className={`singleOption ${selected && handelSelect(i)}`}
                key={i}
                disabled={selected}
              >
                {i}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"
            onClick={handelQuit}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handelNext}
          >
            Next Question
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Question;
