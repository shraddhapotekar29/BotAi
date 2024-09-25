import React,{useEffect, useState} from "react";
import SideBar from "./SideBar/SideBar";
import Grid from "@mui/material/Grid";
import Search from "./Search/Search";
import style from "./BotAi.module.css";
import History from "./History/History";


const BotAi=()=>{
    const[pastConversation,setPastConversation]=useState(false);
    const[pastData,setPastData]=useState(null);
    
    console.log("aa",pastData);
    useEffect(()=>{
      // const storageData=localStorage.getItem("pastConversation");
      // let localData=[];
      // if(storageData)
      // {
      //    localData=JSON.parse(storageData);
      // }
      if(pastData)
      {
      localStorage.setItem("pastConversation", JSON.stringify([...pastData]));
      }
    },[pastData])
    
   
    return(<>
    
    <div className={style.searchDiv}>
        <Grid container spacing={2}>
        <Grid item xs={12}  md={2}> 
            <div className={style.sidebar}><SideBar setPastConversation={setPastConversation}/></div></Grid>
        <Grid item xs={12} md={10}>
            {pastConversation?<div><History setPastConversation={setPastConversation}/></div>:
             <div>
            <div className={style.searchbar}><Search setPastData={setPastData} setPastConversation={setPastConversation}/></div>
            </div>}
            </Grid>
        </Grid>
    </div>
    </>)
}
export default BotAi;