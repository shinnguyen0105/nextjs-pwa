import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const Card = ({ article }) => {
  return (
    <Link key={article.id} href={{ pathname: "article", query: { id: article.id } }} passHref>
      <div key={article.id} className='rounded overflow-hidden shadow-lg rounded-lg'>
        <img
          src={process.env['NEXT_PUBLIC_API_URL'] + article.image.url}
          className='w-full rounded-lg'
          alt={article.title}
          layout="raw"
        />
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{article.title}</div>
          <p className='text-gray-700 text-base'>
            <ReactMarkdown >{article.content}</ReactMarkdown>
          </p>
        </div>
        <div className='px-6 pt-4 pb-2'>
          {article.labels.map((label,i) => {
            return (
              <span key={i} className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>{label.name}</span>
            )
          })}
        </div>
      </div>
    </Link>
  );
};

export default Card;
