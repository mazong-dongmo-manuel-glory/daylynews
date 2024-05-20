import React, { useState, useEffect } from "react";
import NewsService from "../../models/NewsService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../../Loader.jsx";

export default function NewsView({searchQuery}) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        NewsService.getHeadline().then((value) => {
            if (value?.articles) {
                value.articles.sort((a, b) => {
                    return a?.urlToImage?.localeCompare(b?.urlToImage);
                });
                value.articles = value.articles.filter(
                    (val) => val.title !== "[Removed]"
                );
            }
            setArticles(value.articles || []);
            window.setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }).catch(()=>{
            console.clear()
        });
    }, []);
    const filteredArticles = articles.filter((article) =>
        article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||article.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div id="news">
            <div className="news-section">
                {isLoading && <Loader />}
                {!isLoading &&
                    filteredArticles.map((news, index) => (
                        <motion.div
                            className={`news ${index}`}
                            key={news.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {news.urlToImage && (
                                <motion.img
                                    src={news.urlToImage}
                                    alt={news.source?.name}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                />
                            )}
                            <div className="news-content">
                                <motion.span
                                    className="news-title"
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <Link to={`/news/${news.title}`} title={news.title}>
                                        {news.title}
                                    </Link>
                                </motion.span>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.3 }}
                                >
                                    {news.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </div>
    );
}
