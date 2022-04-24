import React from "react";
import "../App.css";
import "./Meal.css";
// import {Link} from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home">
        <img src="https://www.r2n.dk/images/pageheaders/home-banner.r2nv.1543912400.jpg"></img>
        
        <h1>Private Meal share</h1>
        <p>
          Private Dining Room Vi er nu de stolte indehavere af et private dining
          room i ordets mest bogstavelige forstand. Skærmet fra verden udenfor i
          et tilstødende lokale bagerst i vores restaurant, lukkes døren efter
          dig og dit selskab, hvorefter I kan sætte jer ved langbordet og nyde
          hinanden og maden, der kommer ind løbende ligesom ude i restauranten.
        </p>
        <p>
          Rummet er indrettet i samarbejde med Anne Louise De Foss og har fået
          en anderledes, intim og moderne stemning. Lyse toner præger rummet på
          både væggene og ved bordet, mens blødt lys og friske blomster åbner
          for sanserne.{" "}
        </p>{" "}
        <p>
          {" "}
          Vi glæder os til at byde dig velkommen  også i vores private dining
          room.{" "}
        </p>{" "}
        <p className="lastP">
          Kontakt Sammy Shafi på sammy@kokkeriet.dk for reservation og
          spørgsmål.
        </p>
      </div>
    </>
  );
}

export default Home;
