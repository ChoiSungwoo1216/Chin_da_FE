import React,{useState,useEffect} from "react";
import "./ProgressBar.css";
import Timer from "./Timer";

//사용할 페이지에서 import하셔서 컴포넌트로 사용하시면 됩니다. 
//페이지에 변수명 Time으로 난이도에 따른 시간값 할당해주시면 됩니다.
//컴포넌트에 value={Time}으로 ref 적용해주시면 됩니다.
//임의로 progressBar.css에 사이즈랑 색상을 적용해두었습니다.
//크기나 포지션 알아서 조정하시면 됩니다.

const ProgressBar = (p) => {
    const time = p.value.Time;
    const active = p.value.Active;
    
    const [Start,setStart] = useState(false);

    const Filler = React.useRef(null);
    
    const onStart = ()=> {
        Filler.current.style.transition = `${time*1000}ms linear`;
        
        return active ? setStart(true) : setStart(false);
    }

    

    useEffect(()=>{
        onStart();
    },[active])

    return (
        <>
            <div className="Bar">
                <div className={Start ? 'Filler decrease' : 'Filler'} ref={Filler}/> 
                <Timer value={p.value} id="count"/>
            </div>
            <button>go</button>
        </>
    )
}

export default ProgressBar;