import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const BucketList = (props) => {
  // 버킷리스트를 리덕스 훅으로 가져오기
  const bucket_list = useSelector((state) => state.bucket.list); // props.bucket_list;

  return (
    <ListStyle>
      {bucket_list.map((list, index) => {
        return (
          <ItemStyle className="list_item" key={index}>
            {list.text}
          </ItemStyle>
        );
      })}
    </ListStyle>
  );
};

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 50vh;
`;

const ItemStyle = styled.div`
  padding: 16px;
  margin: 8px;
  font-weight: 600;
  color: #212121;
  background-color: #eee;
  box-sizing: border-box;
`;

export default BucketList;
