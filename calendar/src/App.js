import React from "react";
import CalendarBody from "./main";
import styled from "styled-components";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import Detail from "./Detail";
// NotFound commp

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <AppFrame className="AppFrame">
        <Route exact path="/" component={CalendarBody} />
        <Route path="/add_new" component={Detail} />
      </AppFrame>
    );
  }
}

const AppFrame = styled.div``;

export default withRouter(App);
