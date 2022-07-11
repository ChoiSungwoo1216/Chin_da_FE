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
   const EnterBattle = () =>{
      navigate(`/battle/${userInfo.channelId}`)
   }
   return (
      <>
         <div className="mainContainer">
            <main>
               <section>
                  <article>
                     <div className="profile">
                        <div className="thumbnail circle"></div>
                        <div className="description">
                           <p className="content">이름 : {user.userName}</p>
                           <p className="content">{user.userWin}승/{user.userLose}패</p>
                        </div>
                     </div>
                     <button onClick={EnterBattle}>START</button>
                  </article>
                  <aside className="aside">
                     <div className="profile2">
                        <div
                           className="thumbnail circle"
                           style={{backgroundImage:`${userInfo.userImg}`}}
                        ></div>
                        <div className="description">
                           <p className="content2">이름: {userInfo.userName}</p>
                           <p className="content2">
                              {userInfo.userWin}승/{userInfo.userLose}패
                           </p>
                        </div>
                     </div>
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
                              onClick={() => {setUserInfo(channelList[idx])}}
                           >
                              <div className="card">
                                 <div className="face front">
                                    <img
                                       className="thumbnailImg"
                                       src={list.userImg}
                                       alt="none"
                                    />
                                 </div>
                                 <div className="face back">
                                    <p>{list.userName}</p>
                                    <p>
                                       {list.userWin}승 {list.userLose}패
                                    </p>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
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

export default Main;

