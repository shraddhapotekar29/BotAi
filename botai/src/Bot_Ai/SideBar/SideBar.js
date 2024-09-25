import React,{useState} from "react";
import square from "../../assets/square.png";
import style from "./SideBar.module.css";
import { TfiPencilAlt } from "react-icons/tfi";
import toggle from "../../assets/toggle.png";


const SideBar=({setPastConversation,toggleBtn,setTogglebtn,togglebtn})=>{
   
    return(<>
     

    <div className={style.sidebarHeader} onClick={()=>setPastConversation(false)}>
    {toggleBtn?<div onClick={()=>setTogglebtn(!togglebtn)}><img src={toggle} alt="toggle" /></div>:null}
   <img src={square} alt="square"/>
   <h3>New Chat</h3>
   <div> <TfiPencilAlt style={{height:"30px",width:"100px"}}/></div>
    </div>
    <div className={style.past} onClick={()=>setPastConversation(true)}> <h3>Past Conversations</h3></div>
   
    </>)
}
export default SideBar;