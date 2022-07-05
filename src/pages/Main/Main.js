import React from "react";
import './Main.css';
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
// import { loadChannelAxios } from "../../redux/modules/channel"

const Main = () => {
   const dispatch = useDispatch();

   const channelList = useSelector((state) => state.channel.list)
   console.log(channelList)
   // 백이랑 이걸 숫자로 보낼지, 문자열로 보낼지 합의 (현재는 문자열)
   const { state } = useLocation()
   const language = state.language;
   const level = state.level;
   console.log(language, level)
   //    React.useEffect(() => {
   //       dispatch(loadChannelAxios(language, level));
   //   }, [])

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
                  {channelList.map((list, idx) => {
                     return (
                        <div className="scene" key={idx}>
                           <div className="card">
                              <div className="face front"><img src={list.userImg} alt="none"></img></div>
                              <div className="face back">
                                 <span>유저 이름 : {list.userName}</span>
                                 <span>유저 아이디: {list.userId}</span>
                              </div>
                           </div>
                        </div>
                     )
                  })}
                  {/* <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card /> */}
                  <img
                     className="reloadBtn"
                     src="/img/reloadBtn_black.png"
                     alt="none"
                  />
               </div>
            </section>
         </div>
      </>
   );
}

// const Card = () => {
//    return (
//       <>
//          <div class="scene">
//             <div class="card">
//                <div class="face front">front</div>
//                <div class="face back">back</div>
//             </div>
//          </div>
//       </>
//    );
// };
export default Main;

