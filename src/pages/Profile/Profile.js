import React from "react";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import './Profile.css';
const Profile = () => {

    return (
       <>
          <div className="round1"></div>
          <div className="round2"></div>
          <div className="wrapper">
             <div className="box">
                <div className="profileImg1">
                      <img src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg" />
                </div>
                <h2>Python</h2>
             </div>

             <div className="box">
                <div className="profileImg2">
                      <img src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg" />
                </div>
                <h2>JavaScript</h2>
             </div>

             <div className="box">
                <div className="profileImg3">
                      <img src="https://image.shutterstock.com/image-vector/pixel-art-black-bodyguard-character-260nw-1056562499.jpg" />
                </div>
                <h2>Java</h2>
             </div>
          </div>
       </>
    );
}

export default Profile;