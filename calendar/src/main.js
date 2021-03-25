import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  loadBucketFB,
  updateBucketFB,
  deleteBucketFB,
  filterBucketFB,
} from "./redux/modules/bucket";
import Modal from "react-modal";
import "./style.css";

Modal.setAppElement("#root");

const DemoApp = (props) => {
  // modal value
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date_all, setDate] = useState("");
  const [name, setName] = useState();
  const [id, setID] = useState();
  const bucket_list = useSelector((state) => state.bucket.list);
  const dispatch = useDispatch();
  // modal operation
  // Open modal
  const openModal = (e) => {
    console.log(e);
    setName(e.event._def.title);
    setDate(e.event.startStr);
    setID(e.event._def.publicId);
    setModalIsOpen(true);
  };
  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // load items from firebase
  React.useEffect(() => {
    dispatch(loadBucketFB());
  }, []);

  let schedule = bucket_list.map((bucket, idx) => {
    return {
      title: bucket.title,
      date: bucket.date,
      id: bucket.id,
      color: bucket.completed ? "#F45866" : "#F49390",
      start: bucket.date + "T" + bucket.time,
      allDay: false,
    };
  });

  console.log(schedule);

  return (
    <CalendarFrame>
      <FullCalendar
        height={"auto"}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        displayEventTime={true}
        weekends={false}
        events={schedule}
        eventClick={(info) => {
          openModal(info);
        }}
      />
      <ButtonFrame className="ButtonFrame">
        <ButtonStyle
          onClick={() => {
            props.history.push("/add_new");
          }}
        >
          <span>+</span>
        </ButtonStyle>

        <ButtonStyle
          onClick={() => {
            dispatch(filterBucketFB());
          }}
          style={{ background: "#F45866" }}
        >
          <span style={{ transform: "translateX(-7px)" }}>✔</span>
        </ButtonStyle>
        <ButtonStyle
          onClick={() => {
            dispatch(loadBucketFB());
          }}
          style={{ background: "#F49390" }}
        >
          <span style={{ transform: "translateX(-12px)" }}>All</span>
        </ButtonStyle>
      </ButtonFrame>
      <ModalFrame>
        <Modal isOpen={modalIsOpen} className="Modal">
          <ModalTitle>
            {name} <hr /> {date_all.split("T")[0]}
          </ModalTitle>
          <ModalBtn className="ModalBtn">
            <BtnInModal
              className="BtnInModal"
              onClick={() => {
                dispatch(updateBucketFB(id));
                closeModal();
              }}
            >
              일정 완료
            </BtnInModal>
            <BtnInModal
              className="BtnInModal"
              onClick={() => {
                dispatch(deleteBucketFB(id));
                closeModal();
              }}
            >
              일정 삭제하기
            </BtnInModal>
            <BtnInModal className="BtnInModal" onClick={closeModal}>
              닫기
            </BtnInModal>
          </ModalBtn>
        </Modal>
      </ModalFrame>
    </CalendarFrame>
  );
};

const ButtonStyle = styled.button`
  width: 30px;
  height: 30px;
  padding: 20px;
  background: red;
  border-radius: 50%;
  color: white;
  font-size: 24px;
  border: none;
  & > span {
    line-height: 5px;
    transform: translateX(-6px);
    display: block;
    text-align: center;
  }
  :hover {
    transform: scale(1.1);
    transition: transform 200ms ease-in-out;
    cursor: pointer;
  }

  :focus {
    outline: none;
    transform: scale(1.1);
    transition: transform 200ms ease-in-out;
  }
`;

const ModalFrame = styled.div`
  max-width: 400px;
  max-height: 400px;
`;

const CalendarFrame = styled.div`
  z-index: 0;
  position: relative;
`;

const BtnInModal = styled.button`
  padding: 15px 15px 15px 15px;
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

const ModalBtn = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonFrame = styled.div`
  width: 200px;
  height: 200px;
  background: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 5;
  border-radius: 10px;
`;

const ModalTitle = styled.h2`
  color: #f49390;
  background: white;
  text-align: center;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
`;

export default DemoApp;
