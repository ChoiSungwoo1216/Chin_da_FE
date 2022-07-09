import React from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import "./SoundSetting.css"
import { editsound } from "../redux/modules/user";

const SoundSetting = (props) => {
    const { setSetting } = props;
    const dispatch = useDispatch();
    const userSound = useSelector((state)=>state.user.sound);
    console.log(userSound)

    const SoundOnOff = (e) => {
        if (e.target.checked) {
            if (e.target.id === "switch") {
                dispatch(editsound({bgm:1}))
            } else if (e.target.id === "switch1") {
                dispatch(editsound({es:1}))
            }
        } else {
            if (e.target.id === "switch") {
                dispatch(editsound({bgm:0}))
            } else if (e.target.id === "switch1") {
                dispatch(editsound({es:0}))
            }
        }
    }

    return (
        <>
            <SoundSettingBackground />
            <SettingDiv>
                <ExitSetting src={"img/X_btn_black_30.png"} alt="" onClick={() => setSetting(false)} />
                <WordDiv>
                    <SettingWord>S E T T I N G</SettingWord>
                    <WhiteDiv>
                        <SetLine>
                            <SetName>배경음악</SetName>
                            <input type="checkbox" id="switch" checked={(userSound.bgm===1)?(true):(false)} onClick={(e) => SoundOnOff(e)} />
                            <label for="switch" class="switch_label">
                                {(userSound.bgm === 1) ?
                                    (<img src={"img/BtnOn.png"} alt="" class="onf_btn" />) :
                                    (<img src={"img/BtnOff.png"} alt="" class="onf_btn" />)
                                }
                            </label>
                        </SetLine>
                        <SetLine>
                            <SetName>효과음</SetName>
                            <input type="checkbox" id="switch1" checked={(userSound.es===1)?(true):(false)} onClick={(e) => SoundOnOff(e)} />
                            <label for="switch1" class="switch_label1">
                                {(userSound.es === 1) ?
                                    (<img src={"img/BtnOn.png"} alt="" class="onf_btn1" />) :
                                    (<img src={"img/BtnOff.png"} alt="" class="onf_btn1" />)
                                }
                            </label>
                        </SetLine>
                    </WhiteDiv>
                </WordDiv>
            </SettingDiv>
        </>
    )
}
export default SoundSetting

const SoundSettingBackground = styled.div`
width: 100%;
height: 100%;
background-color: black;
opacity: 0.5;
position : absolute;
top:0;
left:0;
margin:0;
z-index: 12;
`;
const SettingWord = styled.div`
font-size: calc((2vw + 2vh)/2);
z-index: 12;
color: white;
font-weight: 600;
width: calc(100% - 5px);
height: 15%;
text-align: center;
padding-top: 5%;
background-color: #5777CE;
border-top : 3px solid #C0CFFF;
border-left : 3px solid #C0CFFF;
border-right : 2px solid #C0CFFF;
border-bottom: 5px solid black;
`;

const SettingDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position : absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
    margin:0;
    padding:0;
    background: #fff;
    height: 36vh;
    width: 30vw;
    border: 5px solid black;
`;

const WhiteDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15%;
    width: calc(100% - 5px);
    height: 74%;
    border-left : 2px solid #FFFAE3;
    border-right : 2px solid #C1B78E;
    border-bottom: 2px solid #A0935C;
`;

const SetLine = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
gap: calc((5vw + 5vh)/2);;
`;

const SetName = styled.div`
position: relative;
color: black;
width: 8vw;
height: 7vh;
line-height: 7vh;
font-size: calc((2vw + 2vh)/2);
font-weight: 600;
`;

const ExitSetting = styled.img`
position: absolute;
top: calc((2vw + 2vh)/4 * -1);
right: calc((2vw + 2vh)/4 * -1);
width: calc((2vw + 2vh)/2);
height: calc((2vw + 2vh)/2);
z-index: 12;
:hover{
    content: url(img/X_btn_white_30.png);
}
`;

const WordDiv = styled.div`
position: absolute;
top: 0;
left: 0;
width:100%;
height: 100%;
`;