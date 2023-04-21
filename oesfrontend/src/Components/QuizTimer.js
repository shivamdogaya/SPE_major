import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  timer: {
    color: (timeLeft) => (timeLeft < 10 ? "red" : "inherit"),
  },
  box: {
    marginLeft: "auto",
    border: "1px solid black",
    padding: "0px",
    borderRadius: "5px",
    backgroundColor:'gray',
    width:'20%',
    position:'absolute',
    top:'0',
    right:'0'
  },
}));

function QuizTimer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizEnded, setQuizEnded] = useState(false);
  const classes = useStyles(timeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setQuizEnded(true);
    }
  }, [timeLeft]);

  if (quizEnded) {
    return <div>Quiz ended!</div>;
  }

  return (
  
      <Typography style={{position:'absolute',top:'0',right:'0'}} variant="h4" component="h2" className={classes.timer}>
       <h5>Time left: {timeLeft}s</h5> 
      </Typography>
   
  );
}

export default QuizTimer;
