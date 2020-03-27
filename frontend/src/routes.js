import React from "react";
import Logon from "./pages/Logon";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import NewIncident from "./pages/NewIncident";
import { BrowserRouter, Route } from "react-router-dom";
import { AnimatedSwitch, spring } from "react-router-transition";

function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`
  };
}

function bounce(val) {
  return spring(val, {
    stiffness: 700,
    damping: 70
  });
}

const bounceTransition = {
  atEnter: {
    opacity: 0,
    scale: 1.1
  },
  atLeave: {
    opacity: bounce(0),
    scale: bounce(0.9)
  },
  atActive: {
    opacity: bounce(1),
    scale: bounce(1)
  }
};

export default function Routes() {
  return (
    <BrowserRouter>
      <AnimatedSwitch
        atEnter={bounceTransition.atEnter}
        atLeave={bounceTransition.atLeave}
        atActive={bounceTransition.atActive}
        mapStyles={mapStyles}
        className="route-wrapper"
      >
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/incidents/new" component={NewIncident} />
      </AnimatedSwitch>
    </BrowserRouter>
  );
}
