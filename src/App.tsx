import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./shared/components/header/header";
import { Banner } from "./shared/components/banner/banner";
import { Footer } from "./shared/components/footer/footer";
import { NotFound } from "./shared/components/not-found/not-found";
import { Converter } from "./pages/converter/converter";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <Banner></Banner>
        <Switch>
          <Route path="/converter" component={Converter}></Route>
          <Route component={NotFound}></Route>
        </Switch>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
