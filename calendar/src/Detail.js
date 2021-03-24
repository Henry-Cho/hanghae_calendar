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
import { firestore } from "./firebase";
import TextField from "@material-ui/core/TextField";
//import DateAndTimePickers from "./datetimePicker";
//import { useRef } from "react-redux";

//const bucket = firestore.collection("buckets");
/**
  bucket
    .doc("bucket_item1")
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        console.log(doc.id);
      }
    });
   */
// 여러 개의 아이디가 있을 때..
/** 
  bucket.get().then((docs) => {
    let bucket_data = [];
    docs.forEach((doc) => {
      if (doc.exists) {
        bucket_data = [...bucket_data, { id: doc.id, ...doc.data() }];
      }
    });
    console.log(bucket_data);
  });

  bucket.doc("bucket_item").set({ text: "수영배우기" });
  /** 
  bucket
    .doc("bucket_item2")
    .delete()
    .then((docRef) => {
      console.log("지웠어요!");
    });
  */
//bucket.doc("bucket_item2").update({ text: "자수 배우기" });
/** 
  bucket.add({ text: "캘리그라피 배우기" }).then((docRef) => {
    console.log(docRef.data);
    console.log(docRef);
  });
  */

const Detail = (props) => {
  //console.log(props);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(loadBucketFB());
  }, []);
  console.log(props);
  const date = props.match.params.date;
  const inputText = useRef();
  const dateText = useRef();

  return (
    <div>
      <Container>
        <Title>
          {date} <br />
          오늘 나의 할 일!
        </Title>
        <Line />
        {/* 컴포넌트를 넣어줍니다. */}
        {/* <컴포넌트 명 [props 명]={넘겨줄 것(리스트, 문자열, 숫자, ...)}/> */}
        <TextField
          id="datetime-local"
          label="Your schedule"
          type="datetime-local"
          defaultValue="yyyy-MM-ddThh:mm"
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
            let date_info = dateText.current.value.split("T");
            let date = date_info[0];
            let time = date_info[1];
            dispatch(
              addBucketFB(inputText.current.value, date, time),
              props.history.goBack(),
              alert("새로운 일정이 생성되었습니다.")
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
