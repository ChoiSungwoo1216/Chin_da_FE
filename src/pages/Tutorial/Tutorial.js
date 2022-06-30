import React from "react";
import 'swiper/css/bundle';
import './components/SubTutorial.css';
import SubTutorial from './components/SubTutorial';
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

const Tutorial = (props) => {
    const {setTutoOpen} = props
    return(
        <>
        <SubTutorial setTutoOpen={setTutoOpen}/>
        </>
    )
}

export default Tutorial;