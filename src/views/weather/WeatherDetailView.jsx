import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import WeatherService from "../../models/WeatherService";
import Loader from "../../Loader";

export default function WeatherDetailView() {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const city = decodeURI(useLocation().pathname.split("/")[2]);

    useEffect(() => {
        WeatherService.getWather(city)
            .then((json) => {
                if (json.location) {
                    setWeather(json);
                    window.setTimeout(() => {
                        setIsLoading(false);
                    }, 1000);
                }
            })
            .catch((err) => {
                console.error("Error fetching weather data:", err);
                setIsLoading(false);
            }).catch(()=>{
                console.clear()
            });
    }, [city]);

    return (
        <div id="weatherdetails">
            <motion.span className="return-btn" whileHover={{ scale: 1.1 }}>
                <Link to="/weather">
                    <motion.span
                        style={{ color: "white" }}
                        className="material-symbols-outlined"
                        whileHover={{ scale: 1.1 }}
                    >
                        arrow_back_ios
                    </motion.span>
                </Link>
            </motion.span>

            {isLoading ? (
                <Loader />
            ) : (
                weather?.location && (
                    <motion.div
                        className="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div className="location">
                            <span className="icon"></span>
                            <span>{weather.location.name}</span>
                            <span>{weather.location.region}</span>
                            <span>{weather.location.country}</span>
                        </motion.div>

                        <motion.div className="current" whileHover={{ scale: 1.05 }}>
                            <img src={"http:" + weather.current.condition.icon} alt="condition icon" />
                            <span>{weather.current.condition.text}</span>
                            <span>{weather.current.temp_c} °C</span>
                            <span>{weather.current.temp_f} °F</span>
                        </motion.div>

                        <motion.div className="other">
                            <span>
                                <span className="material-symbols-outlined">air</span>
                                <span>{weather.current.wind_kph} KPH</span>
                            </span>
                            <span>{weather.current.last_updated}</span>
                        </motion.div>
                    </motion.div>
                )
            )}
        </div>
    );
}
