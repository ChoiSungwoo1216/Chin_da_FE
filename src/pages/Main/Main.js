import React from "react";
import './Main.css';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";



const Main = () => {
    return (
       <>
          <div className="mainContainer">
             <section className="section">
                <article className="article">
                   <h3>player1</h3>
                </article>
                <aside className="aside">
                   <h3>player2</h3>
                </aside>
                <div className="cardContainer">
                   <Card />
                   <Card />
                   <Card />
                   <Card />
                   <Card />
                </div>
             </section>
          </div>
       </>
    );
}

const Card = () => {
   return (
      <>
         <div class="scene">
            <div class="card">
               <div class="face front">front</div>
               <div class="face back">back</div>
            </div>
         </div>
      </>
   );
};
export default Main;

