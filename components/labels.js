import React from "react";
import Link from "next/link";
import Query from "./query";
import LABELS_QUERY from "../apollo/queries/label/labels";

const Labels = () => {
  return (
    <div>
      <Query query={LABELS_QUERY} id={null}>
        {({ data: { labels } }) => {
          return (
            <div>
              <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                <h3 className="text-xl mb-4 font-semibold">Tags</h3>
                {labels.map((label,index) => {
                  return (
                    <span key={index} className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                      {label.name}
                  </span>
                  );
                })}
              </div>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Labels;