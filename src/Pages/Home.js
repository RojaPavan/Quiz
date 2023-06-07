import { useState } from "react";
import Categories from "../Data";
import "./Home.css";
import { Button, MenuItem, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = ({ name, setName, fetchQuestions }) => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handelSubmit = () => {
    if (!category || !difficulty || !name) {
      setError(true);
      return;
    } else {
      setError(false);
      fetchQuestions(category, difficulty);
      navigate("/quiz");
    }
  };

  return (
    <div className="content">
      <div className="settings">
        <span style={{ fontSize: 30 }}>Quiz Settings</span>
        <div className="settings_select">
          {error && <Alert className="alert">Please fill all the Feilds</Alert>}

          <TextField
            style={{ marginBottom: 25 }}
            label="Enter Your Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            select
            label="Select Category"
            style={{ marginBottom: 30 }}
            variant="outlined"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            variant="outlined"
            style={{ marginBottom: 30 }}
            onChange={(e) => setDifficulty(e.target.value)}
            value={difficulty}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handelSubmit}
          >
            Start Quiz
          </Button>
        </div>
      </div>

      <img src="./quiz.png" className="banner" alt="quiz img" />
    </div>
  );
};
export default Home;
