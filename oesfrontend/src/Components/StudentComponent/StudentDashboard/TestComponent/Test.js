

import axios from "axios";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import style from "../StudentDashboard.module.css";

import baseUrl from "../../../baseUrl";
import QuizTimer from "../../../QuizTimer";
import {  Button } from "@mui/material";
import { makeStyles } from "@mui/styles";



const useStyles = makeStyles({
  questionBox: {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
    height:'100%',
    width:'100%'
  },
  question: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  radio: {
    marginRight: '10px',
  },
  label: {
    marginLeft: '10px',
  },
});
function Test() {

    // ---------------------------------------------------------
    let { id } = useParams();
    let { category } = useParams();

    const [allQuestions , setAllQuestions] = useState([]);
    const [examDetails ,setExamDetails] =useState([]);
    const [timeUp, setTimeUp] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        async function getAllQuestions(){
            let value = await axios.get(`${baseUrl}/exam/${id}/question`);
            setAllQuestions(value.data);
            //console.log(value.data);
        }
        getAllQuestions();
    },[id]);
    let passMarks=examDetails.passMarks;
    let totalMarks=examDetails.marks;
    let totalQuestion=examDetails.totalQuestion;
    let totalTime=examDetails.time;
    totalTime=totalTime*60000;
    useEffect(() => {
        async function getExamDetails(){
          let detail =await axios.get(`${baseUrl}/exam/${id}`);
          setExamDetails(detail.data);

      }
      getExamDetails();
  },[id]);

    useEffect(() => {
        const timer = setTimeout(() => {
          setTimeUp(true);
        }, 60000); // 60 seconds in milliseconds
    
        return () => clearTimeout(timer);
      }, []);
    
      useEffect(() => {
        if (timeUp) {
          submitTest();
        }
      }, [timeUp]);
    // ---------------------------------------------------------
    
    // const [userAnswer , setUserAnswer] = useState({
    //     answer1:"",
    //     answer2:"",
    //     answer3:"",
    // });

    const [answer , setAnswer] = useState({
        // answer1:"",
        // answer2:"",
        // answer3:"",
        // answer4:"",
        // answer5:"",
    });


    let  correctAnswer  = [] ;
    
    function onRadioButtonChange(e){
       setAnswer({
            ...answer, 
            [e.target.name] : e.target.value
    });
      
       
    }

    let count = 0;

    


    async function submitTest() {
        let correctAnswers = allQuestions.map((question) => question.answer);
        let score = 0;
      
        for (let i = 0; i < allQuestions.length; i++) {
          if (answer[`answer${i + 1}`] === correctAnswers[i]) {
            score++;
          }
        }
      console.log(passMarks);
       var status;
         if(score >= passMarks) status="Pass";
         else status = "Fail";

        


        var date = new Date();
        var d =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
        var t =  date.getHours() + ":" + date.getMinutes() +  ":" + date.getSeconds() ;
   

       let data={
         "status": status,
         "score": score,
         "email":{"email":sessionStorage.getItem("user")},    // email
         "edate": d+" "+t,
         "sname": {"name":category},   // --  subject name
         "totalMarks": totalMarks,
         "examId": {"id":id},         // exam id
         "totalQuestion": totalQuestion
       };

       //console.log(data);
 
       await axios.post(`${baseUrl}/result` , data);
        history.push("/StudentDashboard/Result");
    }

     let history = useHistory();

    return (
        <div >
        <h1>All questions are mandatory</h1>
        <QuizTimer setTimeUp={setTimeUp}/>
            {
                 
                allQuestions.map((data , i) => {
                        count++;
                        return (
                            <div className={classes.questionBox} key={i}>

                              <div  className={classes.question}>
                                <h4>Question No.{i+1}</h4>
                                 <span>{data.qname}</span> 
                            </div>
                        
                              <div className={classes.option}>
                                <input
                                 className={classes.radio}
                                  onChange={(e) => onRadioButtonChange(e)}
                                  value={data.optionOne}
                                  id={style.option1}
                                  name={'answer' + count}
                                  type='radio'
                                />
                                <label htmlFor='option1'>{data.optionOne}</label>
                              </div>
                        
                              <div className={classes.option}>
                                <input
                                 className={classes.radio}
                                  onChange={(e) => onRadioButtonChange(e)}
                                  value={data.optionTwo}
                                  id={style.option2}
                                  name={'answer' + count}
                                  type='radio'
                                />
                                <label htmlFor='option2'>{data.optionTwo}</label>
                              </div>
                        
                              <div className={classes.option}>
                                <input
                                 className={classes.radio}
                                  onChange={(e) => onRadioButtonChange(e)}
                                  value={data.optionThree}
                                  id={style.option3}
                                  name={'answer' + count}
                                  type='radio'
                                />
                                <label htmlFor='option3'>{data.optionThree}</label>
                              </div>
                        
                              <div className={classes.option}>
                                <input
                                 className={classes.radio}
                                  onChange={(e) => onRadioButtonChange(e)}
                                  value={data.optionFour}
                                  id={style.option4}
                                  name={'answer' + count}
                                  type='radio'
                                />
                                <label htmlFor='option4'>{data.optionFour}</label>
                              </div>
                            </div>
                          );
                  
                })
            }
            <Button style={{backgroundColor:'gray',marginBottom:'5%',color:'white',borderRadius:'20px'}} onClick={submitTest}>Submit Exam </Button>
        </div>
    );
}

export default Test