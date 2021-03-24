import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadBucketFB } from "./redux/modules/bucket";

const DemoApp = (props) => {
  const bucket_list = useSelector((state) => state.bucket.list); // props.bucket_list;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadBucketFB());
  }, []);

  console.log(bucket_list);
  let schedule = bucket_list.map((bucket, idx) => {
    return { title: bucket.title, date: bucket.date };
  });

  return (
    <FullCalendarFrame>
      <ButtonStyle
        onClick={() => {
          props.history.push("/add_new");
        }}
      >
        +
      </ButtonStyle>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={schedule}
      ></FullCalendar>
    </FullCalendarFrame>
  );
};

const ButtonStyle = styled.button`
  width: 80px;
  height: 80px;
  padding: 20px;
  background: red;
  border-radius: 50%;
  position: sticky;
  top: 200px;
  z-index: 5;
  color: white;
`;

const FullCalendarFrame = styled.div`
  position: relative;
`;
export default DemoApp;
