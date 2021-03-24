import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { loadBucketFB } from "./redux/modules/bucket";
import Modal from "react-modal";

Modal.setAppElement("#root");

const DemoApp = (props) => {
  // modal value
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date_all, setDate] = useState("");
  const [name, setName] = useState();
  const bucket_list = useSelector((state) => state.bucket.list);
  const dispatch = useDispatch();
  const openModal = (e) => {
    console.log(e);
    setName(e.event._def.title);
    setDate(e.event.startStr);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  React.useEffect(() => {
    dispatch(loadBucketFB());
  }, []);

  let schedule = bucket_list.map((bucket, idx) => {
    return { title: bucket.title, date: bucket.date, id: bucket.id };
  });

  return (
    <CalendarFrame>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={schedule}
        eventClick={(info) => {
          openModal(info);
        }}
      ></FullCalendar>
      <ButtonStyle
        onClick={() => {
          props.history.push("/add_new");
        }}
      >
        +
      </ButtonStyle>
      <ModalFrame>
        <Modal isOpen={modalIsOpen}>
          <h2>
            {name} {date_all}
          </h2>
          <ModalBtn>
            <button> 일정 완료 </button>
            <button> 일정 삭제하기 </button>
            <button onClick={closeModal}> 닫기 </button>
          </ModalBtn>
        </Modal>
      </ModalFrame>
    </CalendarFrame>
  );
};

const ButtonStyle = styled.button`
  width: 80px;
  height: 80px;
  padding: 20px;
  background: red;
  border-radius: 50%;
  position: relative;
  top: -100px;
  left: 650px;
  color: white;
  z-index: 5;
`;

const ModalFrame = styled.div`
  max-width: 400px;
  max-height: 400px;
  left: 50%;
`;

const CalendarFrame = styled.div`
  z-index: 0;
  width: 800px;
  height: 800px;
  position: relative;
`;

const ModalBtn = styled.div`
  width: 400px;
  height: 400px;
  background: yellow;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
export default DemoApp;
