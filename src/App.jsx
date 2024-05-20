import { Routes, Route, Link, useLocation } from "react-router-dom";
import NewsView from "./views/news/NewsView.jsx";
import NewsDetailView from "./views/news/NewsDetailView.jsx"
import FinancialView from "./views/financial/FinancialView.jsx";
import FinancialDetailView from "./views/financial/FinancialDetailView.jsx";
import WeatherView from "./views/weather/WeatherView.jsx";
import WeatherDetailView from "./views/weather/WeatherDetailView.jsx";
import HomeView from "./views/Home/HomeView.jsx";
import "./assets/css/main.css"
import "./assets/css/weather.css"
import "./assets/css/weatherdetail.css"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function App() {
  const location = useLocation();
  const [searchable, setSearchAble] = useState("")
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!(location.pathname === "/weather" || location.pathname === "/news")) {
      setSearchAble("none")
    } else {
      setSearchAble("block")
    }

  }, [location])
  return (
    <div>
      <header>

        <span className="logo">Dayly  News</span>
        <nav className="menu">
          <Link className="link" to={"/"}>Acceuil</Link>
          <Link className="link" to={"/news"}>Actualités</Link>
          <Link className="link" to={"/weather"}>Météo</Link>
          <div style={{width:"300px",padding:"10px"}}>
          <AnimatePresence>
            {
              searchable === "block" && (
                <motion.div
                  className="form"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.5 }}>
                  <div className="searchZone" >
                    <div className={`form`}>

                      <input type="text" placeholder="search"   value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}/>
                    </div>
                    <span className="material-symbols-outlined icon">search</span>
                  </div>
                </motion.div>

              )
            }
          </AnimatePresence>
          </div>


        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomeView></HomeView>}></Route>
        <Route path="/news" element={<NewsView searchQuery={searchQuery} />}></Route>
        <Route path="/news/:title" element={<NewsDetailView />}></Route>
        <Route path="/financial" element={<FinancialView />}></Route>
        <Route path="/financialdetail" element={<FinancialDetailView />}></Route>
        <Route path="/weather" element={<WeatherView searchQuery={searchQuery} />}></Route>
        <Route path="/weather/:city" element={<WeatherDetailView />}></Route>
      </Routes>
    </div>
  )
}

