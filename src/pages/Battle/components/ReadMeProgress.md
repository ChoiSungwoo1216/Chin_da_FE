
//임의로 progressBar.css에 사이즈랑 색상을 적용해두었습니다.
//크기나 포지션 알아서 조정하시면 됩니다.
//근데 8bit 막대 만들어 보고 싶으니까 대충 건드려주세요..


세팅1
 ``` 
const [맘대로,set맘대로] = React.useState(false);
const 작명 = ()=>{
    return  작명 ? set맘대로(false) : set맘대로(true);
};
```
위 처럼, 함수 세팅 후 호출해서 동작시키시면 됩니다.

세팅2 props
```
    const 작명맘대로 = {
        "Time": level별 시간 ,
        "Active": 맘대로
    };
```
time -> level당 지정 시간 꽂아주시면 될 듯
active -> 앞에서 선언한 boolean 값 꽂아 주시면 될 듯
dictionary key값은 수정하시면 안됩니다


사용
<ProgressBar value={작명맘대로}/> 
-> 하위 component에 파라미터를 value로 이미 작성해놔서 value만 안바꾸시면 됩니다. 
-> ex) value={세팅2의 변수명} 해서 떨궈 주시면 됩니다
