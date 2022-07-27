import React from "react";
import 'swiper/css/bundle';
import './components/SubTutorial.css';
import SubTutorial from './components/SubTutorial.js';

const Tutorial = (props) => {
    const {setTutoOpen} = props
    return(
        <>
        <SubTutorial setTutoOpen={setTutoOpen}/>
        </>
    )
}

export default Tutorial;