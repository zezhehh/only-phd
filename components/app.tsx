import React from "react";
import Landing from "./landing";
import Panel from "./panel";

const App = () => {
  return (
    <div className="h-screen overflow-y-scroll overflow-x-hidden snap-y scroll-smooth snap-proximity">
      <Landing />
      <Panel />
    </div>
  );
};

export default App;
