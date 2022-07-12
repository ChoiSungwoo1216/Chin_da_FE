import React,{useState} from "react";
import './Main.css';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import effectSound from '../../shared/effectSound';
import selectSound from '../../audios/btnselect.mp3';
import enterSound from '../..//audios/SelectionRoomClickSE1.mp3';
import hoverSound from '../../audios/BtnHoverSE1.mp3';
// import { loadChannelAxios } from "../../redux/modules/channel"

export function Main () {
   const user = {userName: "player1", userWin:"1", userLose:"2"};
   const languageImg = [
      '/img/miniPython3.svg',
      '/img/miniJava.svg',
      '/img/miniJs.svg',
   ];
   const levelImg = [
      '/img/miniStar1.svg',
      '/img/miniStar2.svg',
      '/img/miniStar3.svg',
   ];
   const userSound = useSelector((state) => state.user.sound);
   const es = effectSound(selectSound, userSound.es);
   const hoverEs = effectSound(hoverSound, userSound.es);
   const enterEs = effectSound(enterSound, userSound.es);
   const selected = useSelector((state)=>state.user.selected);
   const [userInfo, setUserInfo] = useState({});
   const navigate = useNavigate();
   // const dispatch = useDispatch();
   const channelList = useSelector((state) => state.channel.list);
   // console.log(channelList);
   // 백이랑 이걸 숫자로 보낼지, 문자열로 보낼지 합의 (현재는 문자열)

   const language = selected.language;
   const level = selected.level;
   console.log(language, level);
   //    React.useEffect(() => {
   //       dispatch(loadChannelAxios(language, level));
   //   }, [])
   const EnterBattle = () => {
      enterEs.play();
      navigate(`/battle/${userInfo.channelId}`);
   };

   const goSelection = () => {
       hoverEs.play();
       navigate('/selection');
   };

   return (
      <>
         <div className="mainContainer">
            <main>
               <div
                  className="mainNavBar"
                  style={{
                     background: 'url(/img/mainNavBar.svg)',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center',
                     objectFit: 'cover',
                  }}
               >
                  <div>
                     <img
                        className="languageImg"
                        src={languageImg[language]}
                        onClick={goSelection}
                        alt="none"
                     />
                     <img
                        className="levelImg"
                        src={levelImg[level]}
                        onClick={goSelection}
                        alt="none"
                     />
                  </div>
               </div>
               <article className="article">
                  <div className="profileContainer">
                     <div
                        className="profile"
                        style={{
                           background: 'url(/img/mainCardPlayer.svg)',
                        }}
                     >
                        <div className="thumbnail circle"></div>
                        <div className="description">
                           <tr className="content">이름: {user.userName}</tr>
                           <tr className="content">WIN: {user.userWin}</tr>
                           <tr className="content">LOSE: {user.userLose}</tr>
                        </div>
                     </div>
                  </div>
               </article>

               <aside className="aside">
                  <div
                     className="profile2"
                     style={{
                        background: 'url(/img/mainCardPlayer.svg)',
                     }}
                  >
                     <div
                        className="thumbnail circle"
                        style={{ backgroundImage: `${userInfo.userImg}` }}
                     ></div>
                     <div className="description">
                        <tr className="content2">이름: {userInfo.userName}</tr>
                        <tr className="content2">WIN: {userInfo.userWin}</tr>
                        <tr className="content2">LOSE: {userInfo.userLose}</tr>
                     </div>
                  </div>
               </aside>
            </main>

            <section>
               <div className="cardContainer">
                  {channelList &&
                     channelList.map((list, idx) => {
                        return (
                           <div
                              className="scene"
                              key={idx}
                              onClick={() => {
                                 setUserInfo(channelList[idx]);
                              }}
                           >
                              <div className="card">
                                 <div
                                    className="face front"
                                    style={{
                                       backgroundImage:
                                          'url(/img/mainCard_F.svg)',
                                       backgroundRepeat: 'no-repeat',
                                       backgroundPosition: 'center',
                                       objectFit: 'cover',
                                    }}
                                 >
                                    <img
                                       className="thumbnailImg"
                                       src={list.userImg}
                                       alt="none"
                                    />
                                 </div>
                                 <div
                                    className="face back"
                                    style={{
                                       backgroundImage:
                                          'url(/img/mainCard_B.svg)',
                                       backgroundRepeat: 'no-repeat',
                                       backgroundPosition: 'center',
                                       objectFit: 'cover',
                                    }}
                                    onClick={()=> {
                                       es.play();
                                    }}
                                 >
                                    <p>{list.userName}</p>
                                    <p>
                                       {list.userWin}승 {list.userLose}패
                                    </p>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
               </div>

               <div
                  className="btnCard"
                  style={{
                     backgroundImage: 'url(/img/mainBtnCard.svg)',
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'center',
                     objectFit: 'cover',
                  }}
               >
                  <h3>Find More</h3>

                  <img
                     className="btnClick"
                     src="/img/btnClick.svg"
                     alt="none"
                  />

                  <h3>Game Start</h3>

                  <img
                     id="btnEnter"
                     onClick={EnterBattle}
                     src="/img/btnEnter.svg"
                     alt="none"
                  />
                  <img
                     className="reloadBtn"
                     src="/img/reloadBtn_black.svg"
                     alt="none"
                  />
               </div>
            </section>
         </div>
         <img className="txtVS" src="/img/txt_vs.svg" alt="none" />
      </>
   );
}

export default Main;

