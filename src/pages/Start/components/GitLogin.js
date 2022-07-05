import { useEffect } from 'react';
import axios from 'axios';
import React from 'react';
//import {useNavigate} from "react-router-dom";

const GitLogin = (props) => {
    console.log("hi")
    //const navigate = useNavigate();
    useEffect(()=> {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분
        console.log(code);
        let REDIRECT_URI = "http://localhost:3000/github";
        axios.post(`
            `
            , {
        headers: {
             //authorizationCode: authorizationCode, 
        }
      }).then((res) => {
        console.log(res)
        //navigate('/main')
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
      }).catch((err) => {
        console.log(err)
        //navigate('/')
      })
      }, [])


    return (
        <div>load</div>
    )
}

export default GitLogin;