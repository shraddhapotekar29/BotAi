import React, { useState } from "react";
import style from "./Search.module.css";
import round from "../../assets/round.png";
import SampleData from "../../../src/sampleData.json";
import you from "../../assets/you.png";
import { MdOutlineThumbUpOffAlt } from "react-icons/md";
import { MdOutlineThumbDownOffAlt } from "react-icons/md";
import Modal from "../Modal/Modal";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import SideBar from "../SideBar/SideBar";
import toggle from "../../assets/toggle.png";
import Box from "@mui/material/Box";

const Search = ({setPastData,setPastConversation}) => {
    const [inputStr, setInputStr] = useState("");
    const [responses, setResponses] = useState([]); 
    const [showQue, setShowQue] = useState(false);
    const [showModal, setShowModal] = useState(false);
    //const [feedback, setFeedback] = useState("");
    const [showRating, setShowRating] = useState(Array(20).fill(false));
    const[feedbackIndex,setFeedbackIndex]=useState(-1);
    const [showFeedback, setShowFeedback] = useState(Array(20).fill(false));
    const[togglebtn,setTogglebtn]=useState(false);

    
    const sendData=(responses)=>{
        setPastData(responses);
// console.log("res",responses);
    }
    const getTime = () => {
        let currentDate = new Date();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let AmPm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${AmPm}`; 
    };

    const checkAns = (inputStr, e) => {
        e.preventDefault();
        if (inputStr) {
            setShowQue(true);
            const ans = SampleData.find((data) => data.question.toLowerCase() === inputStr.toLowerCase());
            const response = ans ? ans.response : "Sorry, I don't have an answer for that.";
            const newResponse = { question: inputStr,    
                                  answer: response, 
                                  time: getTime(),
                                  ratings:null,
                                  feedback:"" };
            setResponses([...responses, newResponse]);
        }
        setInputStr("");
    };
    const handleRating = (index, value) => {
        if (responses[index]) {
            const ratingResponse = [...responses];
            ratingResponse[index].ratings = value; 
            setResponses(ratingResponse);
            
            const newRating = [...showRating];
            newRating[index] = true; 
            setShowRating(newRating);
        }
    };
    
const handleFeedBack=(index)=>{
    const newFeedback=[...showFeedback];
    newFeedback[index]=true;
    setShowFeedback(newFeedback);
    setFeedbackIndex(index);
    setShowModal(true);  
}

    return (
        <>
            <div className={style.searchSection}>
            {togglebtn && (
        <Box
          sx={{
            height: "100%",
            position: "fixed",
            backgroundColor: "#ffffff",
            zIndex: 2,
            width:"60%",
            display: { xs: "block", md: "none" }, // hidden when md and above
          }}
        >
          <SideBar setPastConversation={setPastConversation} toggleBtn={true} setTogglebtn={setTogglebtn} togglebtn={togglebtn}/>
        </Box>
      )}  
            <div className={style.BotAi}>
              <div className={style.toggle} onClick={()=>{setTogglebtn(!togglebtn)}}>
                <img src={toggle} alt="toggle" style={{width:"40px",height:"30px",marginRight:"1rem"}}/>
                </div>
              <h1 style={{ color: "#9785BA", textAlign: "left" }}>Bot AI</h1>
              </div>

                {!showQue && (
                    <div className={style.headline}>
                        <h1>How Can I Help You Today?</h1>
                        <div><img src={round} alt="round" height={100} /></div>
                    </div>
                )}

                {!showQue ? (
                    <div className={style.boxContainer}>
                        <div className={style.box}><h3>Hi, what is the weather</h3><p>Get immediate AI generated response</p></div>
                        <div className={style.box}><h3>Hi, what is my location</h3><p>Get immediate AI generated response</p></div>
                        <div className={style.box}><h3>Hi, what is the temperature</h3><p>Get immediate AI generated response</p></div>
                        <div className={style.box}><h3>Hi, how are you</h3><p>Get immediate AI generated response</p></div>
                    </div>
                ) : (
                    <div>
                        {responses.map((response, index) => (
                            <div key={index}>
                                <div className={style.question}>
                                    <div>
                                        <img src={you} alt="you" />
                                    </div>
                                    <div style={{ marginLeft: "1rem", textAlign: "left" }}>
                                        <h3>You</h3>
                                        <p>{response.question}</p>
                                        <p>{response.time}</p>
                                    </div>
                                </div>
                                <div className={style.ansDiv}>
                                    <div className={style.question}>
                                        <div>
                                            <img src={round} alt="round" className={style.roundImg} />
                                        </div>
                                        <div style={{ marginLeft: "1rem", textAlign: "left" }}>
                                            <h3>Bot</h3>
                                            <p>{response.answer}</p>
                                            <div>
                                                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                                    <p style={{ marginRight: "1rem" }}>{response.time}</p>
                                                    {showRating[index] && (
                                                        <Stack spacing={1}>
                                                            <Rating style={{ color: "black" }} name="half-rating" defaultValue={0} precision={1} 
                                                              onChange={(event, newValue) => handleRating(index, newValue)}/>
                                                        </Stack>
                                                    )}
                                                    <div className={style.like}>
                                                        <MdOutlineThumbUpOffAlt style={{ width: "50" }} onClick={() => {handleRating(index)}} />
                                                        <MdOutlineThumbDownOffAlt style={{ width: "50" }} onClick={() => { handleFeedBack(index) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            {showFeedback[index] && <p><span style={{ fontWeight: "600", fontSize: "30" }}>Feedback:</span> {responses.feedback}</p>}
                                        </div>
                                    </div>
                                </div>
                             </div>
                        ))}
                    </div>
                )}

                <form onSubmit={(e) => checkAns(inputStr, e)}>
                    <div className={style.searchBox}>
                        <input
                            className={style.inputBox}
                            value={inputStr}
                            placeholder="Chat with AI model powered by SoulAI..."
                            onChange={(e) => { setInputStr(e.target.value); }}
                        />
                        <button className={style.btn} type="submit">Ask</button>
                        <button className={style.btn} onClick={()=>{sendData(responses)}}>Save</button>
                    </div>
                </form>
            </div>
            {showModal && <Modal setShowModal={setShowModal}  responses={responses} setResponses={setResponses} feedbackIndex={feedbackIndex}/>}
        </>
    );
}

export default Search;
