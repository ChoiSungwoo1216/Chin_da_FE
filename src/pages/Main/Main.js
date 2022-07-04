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
                   <div className="profile">
                      <div className="thumbnail circle"></div>
                      <div className="description">
                         <h5 className="content">player1</h5>
                         <p className="content p">전적:</p>
                      </div>
                   </div>
                </article>
                <aside className="aside">
                   <div className="profile">
                      <div className="thumbnail circle"></div>
                      <div className="description">
                         <h5 className="content">player1</h5>
                         <p className="content p">전적:</p>
                      </div>
                   </div>
                   <img className="reloadBtn" src="/img/reloadBtn_black.png" />
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

