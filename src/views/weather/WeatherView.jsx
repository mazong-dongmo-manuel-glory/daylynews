import { useEffect, useState } from "react";
import WeatherService from "../../models/WeatherService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../../Loader";

export default function WeatherView({ searchQuery }) {
    const [weathers, setWeathers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        WeatherService.getWeathers().then((result) => {
            result = result.filter((weather) => weather.location);
            setWeathers(result);
            window.setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }).catch(()=>{
            console.clear()
        });
    }, []);
    const filteredWeathers = weathers.filter((weather) =>
        weather.location.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div id="weather">
            <h1 style={{ textAlign: "center", color: "white" }}>World Weather</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <motion.div className="weathers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    {filteredWeathers.map((weather) => (
                        <Link
                            to={`/weather/${weather.location.name}`}
                            className="weather"
                            key={`${weather.location.lat}${weather.location.lon}`}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="weather-info"
                            >
                                <motion.img
                                    src={`http:${weather.current.condition.icon}`}
                                    initial={{ y: -50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    alt="Weather icon"
                                />
                                <motion.span
                                    className="city"
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {weather.location.name}
                                </motion.span>
                                <motion.span
                                    className="temp"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {weather.current.temp_c} °C
                                </motion.span>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
