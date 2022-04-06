import React from "react";
import PropTypes from "prop-types";
import Card from "./card";

const Articles = ({ articles }) => {

  return (
    <div className='mt-2'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5'>
        {articles.map((article, i) => {
          return <Card article={article} key={`article__${article.id}`} />;
        })}
      </div>
    </div>
  );
};

export default Articles;
