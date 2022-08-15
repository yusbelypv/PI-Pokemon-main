import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import Home from "./components/containers/Home.js";
import DetailContainer from "./components/containers/DetailContainer.js";
import Create from "./components/Create.js";


function App() {
  return (
  <BrowserRouter>
    <div className="App">
    <Switch>
    <Route exact path="/">
            <LandingPage/>
    </Route> 
    <Route exact path="/home">
            <Home/>
    </Route> 
    <Route exact path="/detail/:id">
            <DetailContainer/>
    </Route> 
    <Route exact path="/create">
            <Create/>
    </Route> 
     </Switch>
    </div> 
    </BrowserRouter>
  );
}

export default App;