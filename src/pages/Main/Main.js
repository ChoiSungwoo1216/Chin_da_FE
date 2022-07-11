import React,{useState} from "react";
import './Main.css';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

// import { loadChannelAxios } from "../../redux/modules/channel"


export function Main () {
   const user = {userName: "player1", userWin:"1", userLose:"2"};
   const selected = useSelector((state)=>state.user.selected)
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
      navigate(`/battle/${userInfo.channelId}`);
   };
   return (
      <>
         <div className="mainContainer">
            <main>
               <section>
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
                              <p className="content">이름 : {user.userName}</p>
                              <p className="content">
                                 {user.userWin}승/{user.userLose}패
                              </p>
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
                           <p className="content2">이름: {userInfo.userName}</p>
                           <p className="content2">
                              {userInfo.userWin}승/{userInfo.userLose}패
                           </p>
                        </div>
                     </div>

                     {/* <div className="TitlePlayer">
                        <h1 className="TitlePlayer txt1">Player1</h1>
                        <h1 className="TitlePlayer txt2">Player2</h1>
                     </div> */}
                  </aside>
               </section>
            </main>

            <section className="section2">
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

                  {/* <img
                     className="reloadBtn"
                     src="/img/reloadBtn_black.png"
                     alt="none"
                  /> */}
               </div>
               <div className="btnCard">
                  <tr>Find More</tr>
                  <tr>
                     <img
                        className="btnClick"
                        src="/img/btnClick.svg"
                        alt="none"
                     />
                  </tr>
                  <tr>Game Start</tr>
                  <tr>
                     <img
                        onClick={EnterBattle}
                        className="btnEnter"
                        src="/img/btnEnter.svg"
                        alt="none"
                     />
                  </tr>
               </div>
            </section>
         </div>
         <img className="txtVS" src="/img/txt_vs.svg" alt="none" />
         {/* <img className="txtV" src="/img/txt_v.svg" alt="none" />
         <img className="txtS" src="/img/txt_s.svg" alt="none" /> */}
      </>
   );
}

export default Main;

