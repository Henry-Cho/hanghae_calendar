import React, { useRef } from "react";
import styled from "styled-components";

import { addBucketFB } from "./redux/modules/bucket";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";

const Detail = (props) => {
  //console.log(props);
  const dispatch = useDispatch();
  const inputText = useRef();
  const dateText = useRef();

  return (
    <ViewFrame>
      <Container>
        <Title>Insert Schedule Info</Title>
        <Line />
        {/* 컴포넌트를 넣어줍니다. */}
        {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
        <TextField
          color="secondary"
          id="datetime-local"
          label="Your schedule"
          type="datetime-local"
          defaultValue="yyyy-MM-ddThh:mm:ss"
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={dateText}
        />
        <hr></hr>
        <Textarea type="text" ref={inputText} />
        <Input>
          <ButtonStyle
            onClick={() => {
              let text = inputText.current.value;
              let date_info = dateText.current.value.split("T");
              let date = date_info[0];
              let time = date_info[1];

              if ((text === "") | (date === "")) {
                alert("날짜와 텍스트를 입력하세요!!!");
                return;
              }

              let schedule = {
                title: text,
                date: date,
                time: time,
                completed: false,
              };
              dispatch(
                addBucketFB(schedule),
                window.setTimeout(() => {
                  props.history.goBack();
                  alert("새로운 일정이 생성되었습니다.");
                }, 1000)
              );
            }}
          >
            추가하기
          </ButtonStyle>
          <ButtonStyle
            onClick={() => {
              props.history.goBack();
            }}
          >
            뒤로 가기
          </ButtonStyle>
        </Input>
      </Container>
    </ViewFrame>
  );
};

const ViewFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("data:image/jpeg;base64,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");
`;

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: none;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 70vh;
  background-color: #f9b3be;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: white;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted white;
`;

const Textarea = styled.input`
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
`;

const ButtonStyle = styled.button`
  padding: 0 10px 0 10px;
  border: none;
  border-radius: 10px;
  background: white;
  color: #f49390;
  font-weight: bolder;
  :hover {
    transform: scale(1.1);
    transition: transform 200ms ease-in-out;
    cursor: pointer;
  }

  :focus {
    outline: none;
  }
`;

export default Detail;
