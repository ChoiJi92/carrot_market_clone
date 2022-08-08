![header](https://capsule-render.vercel.app/api?type=slice&color=gradient&height=200&section=header&text=당근마켓클론코딩&fontSize=90&animation=fadeIn&fontAlignY=38&desc=%20&descAlignY=62&descAlign=62)

<br>

## 🥕 프로젝트명 : 당근마켓 클론 코딩

<img width="1667" alt="메인페이지" src="https://user-images.githubusercontent.com/96029064/175263925-ad9baf82-741f-4976-94a7-6e487a640115.png">

<br>

#### 이번 프로젝트에서는 사람들이 자주 사용하는 당근마켓의 웹페이지를 클론 코딩을 했습니다. <br><br> 실제 당근마켓 웹페이지에 없는 로그인, 회원가입 기능, 소셜로그인, 로그인 후 권한을 바탕으로 글 CRUD와 댓글 CRUD, 무한 스크롤, ~~채팅기능~~을 추가하여 구현하였습니다! 🤗<br><br>

[당근마켓 링크](https://www.daangn.com/)

<br>

# 🥕 당근마켓 클론코딩 - 8조 클론 코딩

## 🕒 제작기간

<br/>

### 2022년 6월 17일 ~ 2022년 6월 23일

<br/>
<br/>

## ✨ Developers

<br/>

- **Front-end**

  - 최지훈 [Github](https://github.com/Choiji92)
  - 임준수 [Github](https://github.com/junsu0121)
    <br/>
    <br/>

  - 기본 기능:
    - 게시글 CRUD, 로그인 회원가입
  - 추가 기능:
    - 모달 창 플로팅
    - 소셜로그인
    - 댓글 기능
    - 좋아요 기능
    - 검색 기능
    - 사진 업로드 기능(다중 선택, 슬라이드)
    - gps 기능
    - 무한스크롤 기능
    - ~~웹소켓 채팅 기능~~

<br/>

- **Back-end** : [Back-end repo](https://github.com/waryongc/clonecoding_8BE)

  - 고승유 / 김민지 / 박종인

  <br/>

- 팀 notion : https://www.notion.so/8-c42cc76deaab4ba2b19e9a43fac2f71b

<br/>
<br/>
<br/>

## 🎨 프로젝트 초안

1. 메인페이지

<img width="931" alt="스크린샷 2022-08-07 오후 10 27 09" src="https://user-images.githubusercontent.com/96029064/183293117-9631fbc5-b574-4a09-abe5-91f12964dbd6.png">


2. 로그인페이지 (모달창으로)

<img width="898" alt="스크린샷 2022-08-07 오후 10 30 32" src="https://user-images.githubusercontent.com/96029064/183293205-d3f4a205-4cb5-4577-9459-7b40af2f9517.png">



3. 회원가입페이지 (모달창으로)

<img width="931" alt="스크린샷 2022-08-07 오후 10 26 28" src="https://user-images.githubusercontent.com/96029064/183293136-ef7fd864-22d4-4b5d-be5d-dd6b6785808a.png">


4. 게시글 조회페이지

<img width="1440" alt="스크린샷 2022-08-08 오후 8 36 59" src="https://user-images.githubusercontent.com/96029064/183409524-b7fc57e5-64eb-44de-b261-3167ed600c28.png">


5. 게시글 상세페이지

<img width="1346" alt="스크린샷 2022-08-07 오후 10 28 21" src="https://user-images.githubusercontent.com/96029064/183293145-269ed675-8937-4678-b6c8-9a0d6139dce3.png">

<br/>
<br/>

## 🎬 시연영상

<br/>

[시연 영상 링크](https://www.youtube.com/watch?v=Ddw6nH2uEbU)
<br/>
<br/>
<br/>

## 🗒️ 페이지 & 기능

<br/>

### 1. 로그인, 회원가입

- JWT를 사용하여 로그인과 회원가입을 구현
- 회원정보 DB에 저장
- 로그인시 token 발급
- 토큰과 유저정보를 로컬스토리지에 저장해서 사용
- 아이디 및 닉네임 중복 확인과 2차 비밀번호 확인 가능 (벨리데이션 추가 완료)
- 로그인 회원가입 페이지 모달창으로 플로팅, 완료 후 모달창 사라지도록 구현
- 회원가입 시 유저의 위치정보를 얻을 수 있는 gps 기능 구현

### 2. 메인 페이지

- 당근 마켓 웹페이지와 동일한 구성
- 중고거래 인기매물 하단에서 확인 기능 구현
- 인기매물 버튼 클릭 시 컨텐츠 페이지로 이동하도록 구현
- 다른 부가적인 정보를 보여주는 버튼들은 당근마켓 웹페이지로 이동하도록 구현

- 헤더 부분에 로그인한 유저의 닉네임 확인 가능

### 3. 컨텐츠 페이지

- 모든 유저가 작성한 컨텐츠를 최신 순으로 확인 가능
- 해당 컨텐츠 클릭시 상세 페이지로 이동
- 모든 컨텐츠에 좋아요를 누를 수 있음(단, 하나의 컨텐츠에 같은 아이디로 좋아요 여러번 못함)
- 로그인을 한 상태시 글 작성 가능 기능 구현
- 좋아요 개수와 댓글 개수 확인 기능 구현
- 처음에 컨텐츠를 8개만 볼 수 있고 스크롤을 내릴 때마다 8개씩 추가로 더 볼 수 있음(무한 스크롤)

### 4. 컨텐츠 작성 페이지

- 타이틀,내용,이미지 모두 작성해야 작성버튼이 활성화 됨
- 이미지 업로드시 미리보기 구현
- 다중 이미지 첨부 기능 구현
- 로그인을 안한 상태로 글 작성 페이지에 들어오면 로그인을 하라는 메시지가 보이는 페이지로 이동

### 5. 컨텐츠 상세 페이지

- 해당 컨텐츠를 개시한 작성자만 컨텐츠를 수정, 삭제할 수 있는 버튼이 활성화 됨
- 모든 유저가 작성한 댓글을 최신순으로 확인 가능
- 해당 댓글 작성자만 댓글 수정, 삭제할 수 있는 버튼이 활성화 됨
- 상세 페이지에서도 해당 컨텐츠 좋아요 가능

### 6. 컨텐츠 수정 페이지

- 기존 컨텐츠의 정보들(타이틀,내용,이미지)이 그대로 유지되서 보여짐

### 7. 헤더 컴포넌트

- 모든 페이지에서 전역으로 보여짐
- 로그인 여부 확인 후 로그인, 회원가입, 당근채팅 버튼 활성화 기능 구현
- 검색창과 검색기능 구현
- 로그인 시 유저네임과 기본 프로필 이미지 보여짐

### 8. footer 컴포넌트

- 모든 페이지에서 전역으로 보여짐
- 프로젝트 조원 정보 게시

<br/>
<br/>

## 🚀 Tech Stack

- **Front-end Tech Stack**
  <br/>
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Create React App-09D3AC?style=for-the-badge&logo=Create React App&logoColor=white">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src="https://img.shields.io/badge/axios-2C5BB4?style=for-the-badge&logo=axios&logoColor=white">
  <br/>
  <img src="https://img.shields.io/badge/React Router Dom-CA4245?style=for-the-badge&logo=React Router Dom&logoColor=white">
  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <br/>

- **Front-end Library**

| 라이브러리명                | 내용                 | 참고 |
| :-------------------------- | :------------------- | :--- |
| axios                       | 서버통신             |      |
| react-router-dom            | 렌더링               |      |
| react-redux                 | 상태관리             |      |
| @reduxjs/toolkit            | Redux를 더 쉽게 사용 |      |
| react-slick                 | 이미지 슬라이드      |      |
| slick-carousel              | 이미지 슬라이드      |      |
| json-server                 | 목업 데이터 관리     |      |
| react-intersection-observer | 무한스크롤           |      |
| react-hook-geolocation      | gps기능              |      |
| intersection-observer       | 옵저버               |      |
| fortawesome                 | 아이콘 툴킷          |      |
| styled-components           | css                  |      |

<br>

## 💬 Front-end

> 이번 프로젝트는 지난주 미니프로젝트를 마치고 두번째로 프론트엔드와 백엔드가 함께 협업하여 진행한 프로젝트입니다.
> 우선적으로 주특기 주차와 지난주 사용하였던 로그인, 회원가입 및 CRUD 기능을 우선적으로 구현했으며,
> 기본적인 기능 구현을 끝낸 후 구현해보고 싶은 새로운 기술스택 및 디자인패턴을 도입하려 노력했습니다.
>
> ![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=footer)
