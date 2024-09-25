import React, { useState } from "react";
import improvement from "../../assets/improvement.png";
import { RxCross1 } from "react-icons/rx";
import style from "./Modal.module.css";
const Modal=({setShowModal,responses,setResponses,feedbackIndex})=>{
    const[message,setMessage]=useState("");
    const handleFeedback=(e,message)=>{
     e.preventDefault();
     setShowModal(false);
     if(responses[feedbackIndex])
        {
            const feedbackResponse=[...responses];
            feedbackResponse[feedbackIndex].feedback=message;
            setResponses(feedbackResponse);
        }
    }
    return(<>
    <div className={style.wrapper}></div>
    <form onSubmit={(e)=>{handleFeedback(e,message)}}>
    <div className={style.modalDiv}>
        <div className={style.headline}>
            <div className={style.headline}>
            <img src={improvement} alt="improvement" style={{height:"40px",width:"30px",marginRight:"1rem"}}/>
            <h3>Provide Additional Feedback</h3></div>
            <div><RxCross1 style={{width:"30px",height:"30px"}} onClick={()=>{setShowModal(false)}} /></div>
            </div>
            <textarea className={style.textfield} value={message} onChange={(e)=>{setMessage(e.target.value)}}/>
            <br/>
            <button className={style.btn} type="submit">Submit</button>
            </div>
            </form>
    </>)
}
export default Modal;