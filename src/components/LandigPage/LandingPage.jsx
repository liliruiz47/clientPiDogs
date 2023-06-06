import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.css"


export default function landingPage() {
  return (
    <div className='container'>
      <div className='content'>
        <div className='typewriter'>
         <h1 className='title'> APPI DOGGI </h1>
          <div className='subtitle'>¡WELCOME !</div>
          <Link className='textDe' to="/home">
            <button className='btn'>Start</button>{" "}
          </Link>
          </div>
      </div>
    </div>   
  )
}
/*
export default function landingPage(){
        return(
            <div>
                <h1> Welcome Api Dogs</h1>
                <Link to ='/home'>
                    <button>"Go"</button>
                </Link>
                
            </div>
        )
}*/