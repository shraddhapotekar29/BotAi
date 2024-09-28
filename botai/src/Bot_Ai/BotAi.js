import React,{useState} from "react";
import SideBar from "./SideBar/SideBar";
import Grid from "@mui/material/Grid";
import Search from "./Search/Search";
import style from "./BotAi.module.css";
import History from "./History/History";


const BotAi=()=>{
    const[pastConversation,setPastConversation]=useState(false);
    
    return(<>
    <div className={style.searchDiv} >
        <Grid container spacing={2}>
        <Grid item xs={12}  md={2}> 
            <div className={style.sidebar}><SideBar setPastConversation={setPastConversation}/></div></Grid>
        <Grid item xs={12} md={10}> 
                {pastConversation?<div><History setPastConversation={setPastConversation}/></div>:
             <div>
            <div className={style.searchbar}><Search  setPastConversation={setPastConversation}/></div>
            </div>}
            </Grid>
        </Grid>
    </div>
    </>)
}
export default BotAi;