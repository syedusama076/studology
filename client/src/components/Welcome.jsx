import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import { BrowserCookie } from "../helpers/BrowserCookies";
import Axios from "axios";


export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {

    const welCome_Func = async () => {

      try {
        const UserToken = BrowserCookie()
        const token = UserToken.UserToken;
        Axios.get("http://localhost:3001/my-profile",
          {
            headers: {
              'authorization': `${token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        ).then((response) => {
          const data = response.data
          setUserName(data.Name);
        }).catch((err) => {
          console.log(err)
        })
      } catch (err) {
        console.log(err);
      }





    }
    welCome_Func()
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
