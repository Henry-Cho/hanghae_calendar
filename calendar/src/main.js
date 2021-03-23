import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";

class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendarFrame>
        <ButtonStyle
          onClick={() => {
            this.props.history.push("/add_new");
          }}
        >
          +
        </ButtonStyle>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={this.handleDateClick}
          weekends={false}
          events={[
            { title: "event 1", date: "2021-03-10" },
            { title: "event 2", date: "2021-03-12" },
          ]}
        ></FullCalendar>
      </FullCalendarFrame>
    );
  }

  handleDateClick = (props) => {
    // bind with an arrow function
    // alert(props.dateStr);
    console.log(props);
  };
}

const ButtonStyle = styled.button`
  width: 80px;
  height: 80px;
  padding: 20px;
  background: red;
  border-radius: 50%;
  position: sticky;
  top: 200px;
  z-index: 5;
`;

const FullCalendarFrame = styled.div`
  position: relative;
`;
export default DemoApp;
