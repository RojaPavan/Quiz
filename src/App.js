import "./App.css";
import Header from "./Component/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Component/Footer";
import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [questions, setquestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    setquestions(data.results);
  };

  return (
    <Router>
      <div className="app" style={{ backgroundImage: "url(./ques.png)" }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                name={name}
                setName={setName}
                fetchQuestions={fetchQuestions}
              />
            }
          />
          <Route
            path="/quiz"
            element={
              <Quiz
                name={name}
                questions={questions}
                setScore={setScore}
                score={score}
                setquestions={setquestions}
              />
            }
          />
          <Route
            path="/result"
            element={<Result name={name} score={score} />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
