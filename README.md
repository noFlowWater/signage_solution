<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/noFlowWater/signage_solution">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/90eb71d4-8519-4dff-ad7f-22d3c60d18a1" alt="Logo">
  </a>

  <h3 align="center">Face Recognize Kiosk Using webOS</h3>

  <p align="center">
    It is a webOS-based signage solution kiosk example project that recognizes the face of registered users and makes custom recommendations.
    <br />
    <br />
    <a href="https://github.com/noFlowWater/signage_solution">View Demo</a>
    ·
    <a href="https://github.com/noFlowWater/signage_solution/issues">Report Bug</a>
    ·
    <a href="https://github.com/noFlowWater/signage_solution/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/92e7cb81-0ae1-4640-b070-065fe28a68ec" 
         alt="User Facial Registration" 
         style="width: 49%;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/2d5b2a51-5d45-4f89-b81d-2b106f5fe7af" 
         alt="User Menu Recommendation Algorithm" 
         style="width: 49%;">
</p>


### Background
Small-scale business owners often face financial constraints that make it challenging to afford expensive signage solutions. Therefore, there is a growing need for an affordable, open-source-based signage solution that can be easily implemented without the high costs associated with traditional signage products. This proposal aims to develop a user-customized kiosk that recognizes users to recommend menus and dynamically update menu lists.

### Project Objectives and Content
User Recognition:
- The kiosk will utilize a camera to identify users and check if they are returning visitors with payment records.
- Images captured by the kiosk camera will be sent to an image recognition server for user identification.
- The server will verify if the recognized user is a returning visitor.
- In cases where user recognition is unsuccessful, an alternative authentication method is provided.

Menu Recommendations and Reconfiguration through Web App:
- User data registration will be facilitated both at the kiosk and in the server's database.
- The web app will offer menu recommendations based on user information.
- Menus will be dynamically altered based on user data (considering factors like allergies, etc.).
- Menu recommendations will operate using a **user collaborative filtering algorithm** based on the order history of registered users.

> Note: Payment processing is not included in the scope of this project.

### System Architecture
<img src="https://github.com/noFlowWater/signage_solution/assets/112642604/248f7596-9c3f-4de7-a14a-638547a09816" alt="System Architecture" >


### Database ERD
<img src="https://github.com/noFlowWater/signage_solution/assets/112642604/db15a09a-faa7-4797-8f58-b865d7965681" alt="Database ERD">



### Built With
Frontend
<br/><br/>
[![React][React.js]][React-url][![npm][npm]][npm-url][![Bootstrap][Bootstrap.com]][Bootstrap-url][![JavaScript][JavaScript.js]][JavaScript-url][![Figma][Figma]][Figma-url]
<br/>

Face Identify Server 
<br/><br/>
[![Flask][Flask]][Flask-url][![OpenCV][OpenCV]][OpenCV-url][![Python][Python.org]][Python-url]
<br/>

Kiosk API Server
<br/><br/>
[![Nodejs][Nodejs]][Nodejs-url][![npm][npm]][npm-url][![Prisma][Prisma]][Prisma-url][![JavaScript][JavaScript.js]][JavaScript-url]
<br/>
  
Database
<br/><br/>
[![MySQL][MySQL]][MySQL-url][![Prisma][Prisma]][Prisma-url]
<br/>

Development Environment
<br/><br/>
[![macOS][macOS]][macOS-url]
<br/>

Client Environment
<br/><br/>
[![LG][LG]][LG-url][![Raspberry][Raspberry]][Raspberry-url]
<br/>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

This guide will help you set up and run the project in your local environment. Follow these steps to get started.

## Installation

The process for installing and setting up the project is as follows. This template does not rely on any external dependencies or services.

1. Clone the repository.
   ```sh
   git clone https://github.com/noFlowWater/signage_solution.git
   ```
2. Move into the cloned directory.
   ```sh
   cd signage_solution
   ```
After cloning and moving into the directory, you will find three folders in the project directory: `react`, `flask`, `nodejs`.

Proceed with the project in the following order:
- First, Get Start for [`nodejs`](<Link to nodejs README>)
- Then, Get Start for [`flask`](<Link to flask README>)
- Finally, Get Start for [`react`](<Link to react README>)

Each step is detailed in the `README.md` file of the respective folder, allowing you to sequentially progress and gather the necessary information.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage Screenshot 


<details>
  <summary>🖼️ Home</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="홈 화면" src="https://github.com/noFlowWater/signage_solution/assets/112642604/966af761-2f10-447f-90cb-241577823e90">
  </p>
</details>
<details>
<summary>🖼️ Admin</summary>
<br>

### Administrator Login

<details>
  <summary>🖼️ 1. Administrator Login</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="관리자 로그인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/e73aef73-ac9e-4c6e-b058-7fe5dcd4463c">
  </p>
</details>

<details>
  <summary>🖼️ 2. Administrator Login Failure</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="관리자 비밀번호 체크" src="https://github.com/noFlowWater/signage_solution/assets/112642604/83ae69bb-9e44-4482-bb19-297c15e288d5">
  </p>
</details>

### Administrator Menu Management

<details>
  <summary>🖼️ 1. Administrator Menu List</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="관리자 홈" src="https://github.com/noFlowWater/signage_solution/assets/112642604/6d8d6f01-440e-4b0c-96f8-2c8d2ba21fc9">
  </p>
</details>

<details>
  <summary>🖼️ 2. Administrator Menu Details</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="관리자 메뉴 상세보기" src="https://github.com/noFlowWater/signage_solution/assets/112642604/5bca34f5-1ab6-49a9-8e0b-bdf6257eb0b2">
  </p>
</details>


<details>
  <summary>🖼️ 3. Administrator Menu Registration and Deletion</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/bdb89e7e-4208-4aea-9f93-90c3daece562" 
           alt="관리자 메뉴 등록" 
           style="width: 49%;">
    <img src="https://github.com/noFlowWater/signage_solution/assets/112642604/4433ee82-b9fa-43dd-a325-8b84be381131"    
           alt="관리자 메뉴 수정"
           style="width: 49%;">
  </p>
</details>

### Administrator Password Change

<details>
  <summary>🖼️ 1. Changing Password (fail 1)</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="admin_change_password_1" src="https://github.com/noFlowWater/signage_solution/assets/112642604/3e66a0d8-ec91-4464-9f4a-6c32f2c897e7">
  </p>
</details>

<details>
  <summary>🖼️ 2. Changing Password (fail 2)</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="admin_change_password_2" src="https://github.com/noFlowWater/signage_solution/assets/112642604/435dae5a-4e51-480d-8a18-9c6921775a97">
  </p>
</details>

<details>
  <summary>🖼️ 3. Changing Password (success)</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="admin_change_password_3" src="https://github.com/noFlowWater/signage_solution/assets/112642604/73223ce7-e487-4bbc-80ba-ffc505fd58c3">
  </p>
</details>

</details>
<details>
<summary>🖼️ User</summary>
<br>

### Select User Mode
<details>
  <summary>🖼️ 1. Select User Mode</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 모드 선택" src="https://github.com/noFlowWater/signage_solution/assets/112642604/211d6ba5-61ba-488c-bff9-eb5d333f68a8">
  </p>
</details>

### User Registration

<details>
  <summary>🖼️ 1. Enter User Basic Information</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 기본정보 입력" src="https://github.com/noFlowWater/signage_solution/assets/112642604/142c1e9f-d351-465c-b968-f7da5d178d3a">
  </p>
</details>

<details>
  <summary>🖼️ 2. Register user's face</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 얼굴 등록" src="https://github.com/noFlowWater/signage_solution/assets/112642604/f4fa27ea-f77b-4dc8-8914-bfe9d90eddf7">
  </p>
</details>

<details>
  <summary>🖼️ 3. Select User Allergy</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 알러지 선택" src="https://github.com/noFlowWater/signage_solution/assets/112642604/c4d73443-6c36-4eb9-8caf-a15b70af8eae">
  </p>
</details>

### User Login

<details>
  <summary>🖼️ 1. User Authentication</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="사용자 인식" src="https://github.com/noFlowWater/signage_solution/assets/112642604/999e78e4-031e-4ee0-885a-2683735138b9">
    <img style="width: 49%;" alt="사용자 확인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/f8ba2823-7dd0-420a-8adc-106e66505853">
  </p>
</details>

<details>
  <summary>🖼️ 2. User Alternate Authentication</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="대체 인증" src="https://github.com/noFlowWater/signage_solution/assets/112642604/05f5b522-1237-4f15-a699-8b89271df2d8">
  </p>
</details>

### Menu 

<details>
  <summary>🖼️ 1. Menu recommendation</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="메뉴 추천" src="https://github.com/noFlowWater/signage_solution/assets/112642604/101989ca-4f2f-42ef-be41-31651c4bacf6">
  </p>
</details>

<details>
  <summary>🖼️ 2. Check Menu Allergy/Soldout, Detail</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="알러지:매진 확인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/40395041-7485-4749-878e-212477655be5">
    <img style="width: 49%;" alt="알러지 확인창" src="https://github.com/noFlowWater/signage_solution/assets/112642604/0bd82e2d-221d-4d94-ad35-da4a7d5be4f0">
  </p>
</details>

<details>
  <summary>🖼️ 3. Check Shopping Cart & Pay</summary>
  <p align="center" style="display: flex; justify-content: space-between;">
    <img style="width: 49%;" alt="장바구니 확인" src="https://github.com/noFlowWater/signage_solution/assets/112642604/58823132-e6b8-4b13-a667-04b4f535ec82">
    <img style="width: 49%;" alt="결제 완료" src="https://github.com/noFlowWater/signage_solution/assets/112642604/a0d01536-a62a-4bc7-aac4-8cc9555f21dd">
  </p>
</details>

</details>
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Apache2.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

### 💡 노유수 ([noFlowWater](https://github.com/noFlowWater)) : [noyusu98@gmail.com](mailto:noyusu98@gmail.com)

### 💡 주보경 ([jupyter1234](https://github.com/jupyter1234)) : [wntjdals0412@gmail.com](mailto:wntjdals0412@gmail.com)

### 💡 윤진노 ([jinno321](https://github.com/jinno321)) : [jinno5522@gmail.com](mailto:jinno5522@gmail.com)

### 💡 이민수 ([ohyatt](https://github.com/ohyatt)) : [minsoo030232@gmail.com](mailto:minsoo030232@gmail.com)

### 💡 김현수 ([beoldshoe](https://github.com/beoldshoe)) : [howeve18@gmail.com](mailto:howeve18@gmail.com)


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/noFlowWater/signage_solution.svg?style=for-the-badge
[contributors-url]: https://github.com/noFlowWater/signage_solution/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/noFlowWater/signage_solution.svg?style=for-the-badge
[forks-url]: https://github.com/noFlowWater/signage_solution/network/members
[stars-shield]: https://img.shields.io/github/stars/noFlowWater/signage_solution.svg?style=for-the-badge
[stars-url]: https://github.com/noFlowWater/signage_solution/stargazers
[issues-shield]: https://img.shields.io/github/issues/noFlowWater/signage_solution.svg?style=for-the-badge
[issues-url]: https://github.com/noFlowWater/signage_solution/issues
[license-shield]: https://img.shields.io/github/license/noFlowWater/signage_solution.svg?style=for-the-badge
[license-url]: https://github.com/noFlowWater/signage_solution/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png

[React.js]: https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000
[React-url]: https://reactjs.org/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com

[Figma]: https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=fff
[Figma-url]: https://www.figma.com/

[Flask]: https://img.shields.io/badge/Flask-000?style=for-the-badge&logo=flask&logoColor=fff
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/

[Nodejs]: https://img.shields.io/badge/Node.js-393?style=for-the-badge&logo=nodedotjs&logoColor=fff
[Nodejs-url]: https://nodejs.org/en

[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=fff
[Prisma-url]: https://www.prisma.io/

[OpenCV]: https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=fff
[OpenCV-url]: https://opencv.org/

[npm]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=fff
[npm-url]: https://www.npmjs.com/

[MySQL]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=fff
[MySQL-url]: https://www.mysql.com/

[Python.org]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/

[JavaScript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/ko/docs/Learn/JavaScript

[LG]: https://img.shields.io/badge/webOS-A50034?style=for-the-badge&logo=lg&logoColor=fff
[LG-url]: https://www.webosose.org/

[Raspberry]: https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=fff
[Raspberry-url]: https://www.raspberrypi.com/

[macOS]: https://img.shields.io/badge/macOS-000?style=for-the-badge&logo=macOS&logoColor=fff
[macOS-url]: https://support.apple.com/ko-kr/macOS
