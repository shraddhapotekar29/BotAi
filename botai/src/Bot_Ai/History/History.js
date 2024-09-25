import React, { useEffect, useState } from "react";
import you from "../../assets/you.png";
import round from "../../assets/round.png";
import style from "./History.module.css";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import toggle from "../../assets/toggle.png";
import SideBar from "../SideBar/SideBar";
import Box from "@mui/material/Box";
const History=({setPastConversation})=>{
    const[dataArr,setDataArr]=useState([]);
    const[togglebtn,setTogglebtn]=useState(false);
    const[filterStarsData,setFilteredStarsData]=useState([]);
    console.log("filterStarsData",filterStarsData);
    useEffect(()=>{
    const pastData1=localStorage.getItem("pastConversation");
    if(pastData1)
    {
        setDataArr(JSON.parse(pastData1));
        setFilteredStarsData(JSON.parse(pastData1))
    }
    },[]);
    console.log("past",dataArr);

    const filterStars=(value)=>{
        let num=Number(value);
        if(num===0)
        {
          setFilteredStarsData(dataArr);
        }
        else
        {
        const filteredData=dataArr.filter((data)=>data.ratings===num)
        setFilteredStarsData(filteredData);
       }
    //   console.log("fil",filteredData);
    }
    return(<>
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
      )} <div className={style.BotAi}>
              <div className={style.toggle} onClick={()=>{setTogglebtn(!togglebtn)}}>
                <img src={toggle} alt="toggle" style={{width:"40px",height:"30px",marginRight:"1rem"}}/>
                </div>
              <h1 style={{ color: "#9785BA", textAlign: "left" }}>Bot AI</h1>
              </div>
              <div>
                <select style={{padding:"0.5rem",borderRadius:"25px"}} onChange={(e)=>{filterStars(e.target.value)}}>
                    <option value={0}>All Ratings</option>
                    <option value={1}>1 star</option>
                    <option value={2}>2 star</option>
                    <option value={3}>3 star</option>
                    <option value={4}>4 star</option>
                    <option value={5}>5 star</option>
                </select>
              </div>
    <h2>Conversation History</h2>
    <h4 style={{textAlign:"left"}}>Today’s Chats</h4>

    {filterStarsData.map((data)=>(
        <div key={data.name}>
            <div className={style.question}>
                <div className={style.que}>
                <img src={you} alt="you"/>
                <div className={style.info}><h3>You</h3>
                      <p>{data.question}</p>
                      <p>{data.time}</p>
                      </div>
                      </div>

                      <div className={style.que}>
                <img src={round} alt="round"/>
                <div className={style.info}><h3>Bot</h3>
                      <p>{data.answer}</p>
                      <p>{data.time}</p> 
                      {data.ratings && data.ratings>0 ? (<Stack spacing={1}>
                            <Rating style={{ color: "black" }} name="half-rating" defaultValue={data.ratings} readOnly />
                        </Stack>):null}
                        {data.feedback && data.feedback.length>0?<p>Feedback:{data.feedback}</p>:null}
                      </div>
            </div>
            </div>
        </div>
    ))}
    </>)
}
export default History;