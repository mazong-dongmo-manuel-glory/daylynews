import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import NewsService from "../../models/NewsService"
import Loader from "../../Loader.jsx";

export default function NewsDetailView() {

    const [article, setArticle] = useState()
    const [isLoading,setIsLoading] = useState(true)
    const title = decodeURI(useLocation().pathname.split("/")[2])
    useEffect(() => {
        NewsService.getHeadline().then((value) => {
            let result = value?.articles.filter((val) => val.title === title)
            if (result && result.length > 0) {
                setArticle(result[0])
                window.setTimeout(()=>{
                    setIsLoading(false)
                },1000)
            }
        }).catch(()=>{
            console.clear()
        })
    }, [])
    return (
        <div id="newsdetail">
            <span className="return-btn"><Link to="/news">
                <span className="material-symbols-outlined">
                    arrow_back_ios
                </span>
            </Link></span>
            { isLoading ? (
                <Loader></Loader>
            ) :  article?.title && (
                <div className="content">
                                <div className="infos"> 
                    {
                        article.author && <span className="info">{article.author}</span>
                    }
                                        {
                        article?.source.name && <span className="info">{article.source.name}</span>

                    }
                       {
                        article.publishedAt && <span className="info">{new Date(article.publishedAt).toLocaleDateString()}</span>

                    }
                 </div>
                     <h1>{article.title}</h1>
                     {
                            article.urlToImage && <img src={article.urlToImage} alt={article.source?.name}></img>

                        }
                    <p>
                        {article.description}
                    </p>
                    {
                            article.url && <a className="btn-detail" href={article.url} target="_blank">detail</a>

                        }
     

                        
                </div>)
               
            
            }
        </div>

    )
}