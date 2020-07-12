import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Home, About, HowToUse, Footer } from "./views";
import { ThemeContext } from "./ThemeContext";

const App = () => {
  // membuat state untuk tema
  const [theme, setTheme] = useState("light");

  // membuat fungsi untuk mengubah state tema
  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    // memberikan router untuk routing url dalam aplikasi
    <Router>
      {/* 
        memberikan provider untuk context tema dengan
        nilai tema dan fungsi sebagaimana yang didefinisikan di atas
      */}
      <ThemeContext.Provider value={{ theme, handleChangeTheme }}>
        <div
          className={
            // mengubah class (bg dan text) sesuai context tema
            theme === "light"
              ? "h-100 bg-light text-dark"
              : "h-100 bg-dark text-light"
          }
          style={{ minHeight: "100vh" }}
        >
          <Header />
          <Container>
            {/* memberikan switch untuk mengubah component yang ditampilkan */}
            <Switch>
              {/* memberikan route untuk menentukan url masing-masing component */}
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/how-to-use" component={HowToUse} />
            </Switch>
          </Container>
          <Footer />
        </div>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;
