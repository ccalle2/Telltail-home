import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Footer from "./components/Footer";
import CareerDetails from "./components/CareerDetails";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Route component={Home} exact path="/" />
        <Route component={Careers} exact path="/careers" />
        <Route component={CareerDetails} exact path="/careers/:id" />
      </Router>
      <Footer />
    </div>
  );
};

export default App;
