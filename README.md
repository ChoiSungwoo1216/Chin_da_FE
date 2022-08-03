![썸네일2](https://user-images.githubusercontent.com/105087260/182070652-d0fd7d0e-5e6b-428a-8447-de94e6957891.png)



 ##   <img src="https://user-images.githubusercontent.com/105087260/181887948-75a5a55b-7270-4154-a10e-72b09af0bc3f.png" width="35px"> "같이의 가치를 <친다 />"
 온라인 1:1 코딩 배틀 게임 <친다 />입니다.
 </br>
 즐겁고 재미있게 같이 알고리즘을 풀자라는 취지로 기획하게 되었고 
 </br>
 실시간 1:1 배틀 게임 컨셉이기에 화상과 채팅 기능을 포함하여 제작하였습니다.
<br />
<br />

## 📅 프로젝트 기간

> 2022.6.24 ~ 2022.8.5

<br />


## 🎮 주요기능
-  알고리즘 문제를 난이도와 언어별로 나누어 게임을 즐길 수 있습니다.
-  상대방과 실시간으로 화상 및 채팅으로 소통할 수 있습니다.

<br />

## 🔗 바로가기
- [<친다 /> 이용하러 가기](chinda.live)
- [프론트엔드 GitHub](https://github.com/ChoiSungwoo1216/Chin_da_FE)
- [백엔드 GitHub](https://github.com/biolkj28/AlgorithmGameProject-BE)

<br />

## 📺 시연 영상

[https://user-images.githubusercontent.com/105087260/182409587-1fade543-d643-4d21-8335-78023f5b0305.mp4](https://user-images.githubusercontent.com/105087260/182410621-8749c0db-6d9f-457d-807b-33f70baac85b.mp4)


<br />




##  👥팀원

| 이름     | GitHub                             | 포지션  |
| -------- | ---------------------------------- | --------- |
| 최성우   | https://github.com/ChoiSungwoo1216    | FE🔰 |
| 이민석   | https://github.com/leeminseok22     | FE |
| 이윤영   | https://github.com/yunyeongyee     | FE |
| 이정찬   | https://github.com/biolkj28       | BE🔰     |
| 문수찬   | https://github.com/MrEnum  | BE     |
| 이동재   | https://github.com/Epikoding  | BE     |
| 허화영  | https://www.instagram.com/workoon__21   | 디자이너  |


<br />

## 🔧 기술스택
 <br>
<div align=center>

  <img src="https://img.shields.io/badge/React-60d3f3?style=for-the-badge&logo=react&logoColor=black">
 <img src="https://img.shields.io/badge/styled-c260af?style=for-the-badge&logo=styledcomponents&logoColor=black">
  <img src="https://img.shields.io/badge/Redux-7247b5?style=for-the-badge&logo=redux&logoColor=white"> 
  <img src="https://img.shields.io/badge/Axios-5B0BB5?style=for-the-badge&logo=Axios&logoColor=white">
  
  <br>

  <img src="https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white">
<img src="https://img.shields.io/badge/SockJs-02B78F?style=for-the-badge&logo=SockJs&logoColor=white">
<img src="https://img.shields.io/badge/Stomp-4A86CF?style=for-the-badge&logo=Stomp&logoColor=white">
   <img src="https://img.shields.io/badge/PeerJS-569A31?style=for-the-badge&logo=Peer S3s3&logoColor=white">
  <br>

 
  <img src="https://img.shields.io/badge/AWS%20S3-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=FF9A00"/>
  <img src="https://img.shields.io/badge/AWS%20CloudFront-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=FF9A00"/>
  <img src="https://img.shields.io/badge/AWS%20Route%2053-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=FF9A00"/>
 
  <br>
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
</div>
  

## 🕹 서비스 아키텍쳐  
![Untitled (2)](https://user-images.githubusercontent.com/105087260/182111620-31933be1-5cd6-4cc5-a9cf-2438c2fabc6c.png)
<br />
<br>

## 📚 라이브러리
|Name|Appliance|
|:---:|:---:|
|React|리액트|
|React-redux|상태관리|
|React-router-dom|브라우저 리액트 라우터|
|Axios|서버와 통신을 위한 라이브러리|
|Styled-components|CSS-in-JS 라이브러리|
|History|페이지 이동|
|SocketJS|양방향 메시지 송수신|
|StompJS|텍스트 지향 메시징 프로토콜|
|PeerJs|WebRTC 화상|
|Ace Editor|코드 에디터|
|howlerJs|배경음 및 효과음|
|SwiperJs|캐러셀|
|react-toastify|알림 팝업창|
|react-modal|모달창|
|js-confetti|폭죽 라이브러리|
|react-confetti-canvas|폭죽 라이브러리|

<br />
<br />

## ⚠️ Trouble Shooting

<details>
<summary> S3와 CloudFront 업로드 즉각 반영 안됨</summary>
<div markdown="1">
<br>
  * 문제
  <pre> S3 버킷의 내용을 변경했다고 하였지만 사이트에 반영이 되지 않는 이슈</pre>
 * 가설
    - 1. build과정에서 내용 누락 (압축하는 과정에서 정보 누락 가능성).
    - 2. S3 자체적으로 반영이 안되는 경우.
    - 3. CloudFront의 작동 방식의 문제.
 
   * 과정
    - 1. build과정에서 변하지 않는 `index.html`에 내용을 추가해보고 안의 내용물을 변경하고 배포해보았으나, build된 파일을 확인하니 문제가 없었지만, 반영이 되지 않았음.
    - 2. S3에 CloudFront를 연결하지 않고, 내용물은 변경하고 확인해 본 결과, 변경된 내용이 즉각 반응 됨.
 
   *  해결 
  CloudFront의 작동 방식에 대해서 찾아보니 S3에서 파일을 받아올 때 저장된 캐시가 24시간 유지되는 것을 확인하고 이를 무효화( Invalidations) 작업을 실행해 캐시를 삭제.
</div>
</details>

<details>
<summary> Websocket 다중 핸드쉐이크 발생 </summary>
<div markdown="1">
<br>
  * 문제
  <pre> Websocket 다중 핸드쉐이크 발생 </pre>
 * 가설
    - 1. build과정에서 내용 누락 (압축하는 과정에서 정보 누락 가능성).
    - 2. S3 자체적으로 반영이 안되는 경우.
    - 3. CloudFront의 작동 방식의 문제.
 
   * 과정
    - 1. build과정에서 변하지 않는 `index.html`에 내용을 추가해보고 안의 내용물을 변경하고 배포해보았으나, build된 파일을 확인하니 문제가 없었지만, 반영이 되지 않았음.
    - 2. S3에 CloudFront를 연결하지 않고, 내용물은 변경하고 확인해 본 결과, 변경된 내용이 즉각 반응 됨.
 
   *  해결 
  CloudFront의 작동 방식에 대해서 찾아보니 S3에서 파일을 받아올 때 저장된 캐시가 24시간 유지되는 것을 확인하고 이를 무효화( Invalidations) 작업을 실행해 캐시를 삭제.
</div>
</details>

<br />
<br />

## 🙆‍ 유저피드백 개선사항

<details>
  <summary>음향 볼륨 조절</summary>
  
  * 피드백
  <pre> 볼륨 조절이 필요할 것 같다.<br>
 볼륨이 너무 크다.</pre>
  * 기능 개선
    - 배경음 및 효과음 볼륨을 on/off가 아닌 5단계로 볼륨 단계를 나누어 조절 가능하게 변경

</details>

<details>
  <summary>게임 시작 방식 변경</summary>
  
  * 피드백
  <pre>  게임 시작을 명확하게 알 수 없어 시작버튼이 조금 더 분명하게 나타났으면 좋겠다.<br> 
  .<br> 
   상대가 시작을 했는지 모르겠다는 다수의 의견</pre>
 
  * 기능 개선
    - 양쪽 사용자가 ready메세지를 받으면 바로 게임을 시작하는 기존의 방식에서 양쪽이 ready를 누르면 상대의 ready가 보여 가시성을 높였고 방장에게 게임을 시작할 수 있는 버튼을 추가
</details>

<details>
  <summary>튜토리얼이 자동으로 보여지는 기능 추가</summary>
  
  * 피드백
  <pre>  뒤로 가기 버튼이나 따로 설명이 없어서 뒤로 갈 때 사용하기가 어렵다.<br> 
 이것저것 눌러보다가 언어 누르니까 뒤로 가게 되었다며 서비스에 대한 이해 부족으로 이탈율을 줄이기 위한 개선 필요</pre>
 
  * 기능 개선
    - 최초 사용자에게 튜토리얼이 자동으로 보여지는 기능 추가
</details>

<details>
  <summary>정원초과 알림</summary>
  
  * 피드백
  <pre>  인원이 찬 방에 입장이 가능하다며 개선 요청</pre>
 
  * 기능 개선
    - 정원초과 알림 기능 추가
 
 
</details>


