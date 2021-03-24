import React, { useRef } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import {
  loadBucket,
  createBucket,
  addBucketFB,
  loadBucketFB,
} from "./redux/modules/bucket";
import { useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";

const Detail = (props) => {
  //console.log(props);
  const dispatch = useDispatch();
  const inputText = useRef();
  const dateText = useRef();

  return (
    <div>
      <Container>
        <Title>오늘 나의 할 일!</Title>
        <Line />
        {/* 컴포넌트를 넣어줍니다. */}
        {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
        <TextField
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
      </Container>
      {/* 인풋박스와 추가하기 버튼을 넣어줬어요. */}
      <Input>
        <button
          onClick={() => {
            let text = inputText.current.value;
            let date_info = dateText.current.value.split("T");
            let date = date_info[0];
            let time = date_info[1];

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
        </button>
        <button
          onClick={() => {
            props.history.goBack();
          }}
        >
          뒤로 가기
        </button>
      </Input>
    </div>
  );
};

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 80vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
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

export default Detail;
