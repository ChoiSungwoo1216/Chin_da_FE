import React from "react";
import './Main.css';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";



const Main = () => {
    return (
       <>
          <div className="mainContainer">
             <section className="section">
                <div style={{ display: 'flex', width: '100%' }}>
                   <article className="article">
                      <div className="profile">
                         <div className="thumbnail circle"></div>
                         <div className="description">
                            <h3 className="content">player1</h3>
                            <p className="content p">전적:</p>
                         </div>
                      </div>
                   </article>
                   <aside className="aside">
                      <div className="profile2">
                         <div className="thumbnail circle"></div>
                         <div className="description">
                            <h3 className="content">player2</h3>
                            <p className="content p">전적:</p>
                         </div>
                      </div>
                   </aside>
                </div>
             </section>
             <section className="section2">
                <div className="cardContainer">
                      <Card />
                      <Card />
                      <Card />
                      <Card />
                      <Card />
                      <Card />
                      <Card />
                      <img
                         className="reloadBtn"
                         src="/img/reloadBtn_black.png"
                      />
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

