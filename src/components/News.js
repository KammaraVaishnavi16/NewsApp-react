import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Loader from "./Loader";
import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const captilizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    props.setProgressBar(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8ee1e4e5f9f84d798377e63cc58b0946&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
    let data = await fetch(url);
    props.setProgressBar(50);
    let parsedData = await data.json();
    props.setProgressBar(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgressBar(100);
  };

  useEffect(() => {
    updateNews();
    document.title = `${captilizeFirstLetter(props.category)} - NewsApp`;
  }, []);

  const handlePrevClick = async () => {
    setPage(page - 1);
    updateNews();
  };
  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  // fetchMoreData = async () => {
  //   // a fake async api call like which sends
  //   // 20 more records in 1.5 secs
  //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8ee1e4e5f9f84d798377e63cc58b0946&page=${page+1}&pageSize=${props.pageSize}`;
  //   setPage(page+1)

  //   setLoading(true)
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);

  //setArticles(articles.concat(parsedData.articles))
  //setTotalResults(parsedData.totalResults)
  //setLoading(false)
  // };

  return (
    <div className="container my-3">
      <h2 className="text-center" style={{ marginTop: "90px" }}>
        NewsApp - Top {captilizeFirstLetter(props.category)} Headlines{" "}
      </h2>
      {loading && <Loader />}
      {/* <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loader />}
        > */}
      <div className="container">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4 " key={element.url}>
                <NewsItems
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://cdn.ndtv.com/common/images/ogndtv.png"
                  }
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* </InfiniteScroll> */}
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
