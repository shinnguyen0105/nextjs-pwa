import React from "react";
import Link from "next/link";
import Query from "../components/query";
import CATEGORIES_QUERY from "../apollo/queries/category/categories";

const Categories = () => {
  return (
    <div>
      <Query query={CATEGORIES_QUERY} id={null}>
        {({ data: { categories } }) => {
          return (
            <div>
              <div className="bg-white shadow-lg rounded-lg p-8 pb-6 mb-8">
                <h3 className="text-xl mb-4 font-semibold border-b pb-5">Danh Mục</h3>
                {categories.map((category, index) => {
                  return (
                    <Link key={index} href={`/category/${category.id}`} passHref>
                      <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }}
      </Query>
    </div>
  );
  // <div>
  //   <Query query={CATEGORIES_QUERY} id={null}>
  //     <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
  //       <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
  //       {({ data: { categories } }) => {
  //         return (
  //           < div >
  //             {categories.map((category, index) => {
  //               return (
  //                 <Link key={index} >
  //                   <span className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.name}</span>
  //                 </Link>
  //                 )
  //             })}
  //           </div>
  //         )
  //       }}
  //     </div>
  //   </Query >
  // </div >
};

export default Categories;