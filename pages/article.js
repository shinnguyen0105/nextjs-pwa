import { useRouter } from "next/router";
import Image from "next/image";
import Query from "../components/query";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import ARTICLE_QUERY from "../apollo/queries/article/article";
import Page from '../components/page'
import Section from '../components/section'

const Article = () => {
  const router = useRouter();
  return (
    <Page>
      <Section>
        <Query query={ARTICLE_QUERY} id={router.query.id}>
          {({ data: { article } }) => {
            return (
              <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 m-auto">
                  <div className="col-start-3 col-span-8 ...">
                    <h1 className="font-bold text-2xl  text-center ">{article.title}</h1>
                    <img className='w-full rounded-t-lg lg:rounded-lg mt-2' src={process.env.NEXT_PUBLIC_API_URL  + article.image.url} alt='Mountain' />
                    <div className="uk-section mt-3">
                      <div className="uk-container uk-container-small">
                        <ReactMarkdown>{article.content}</ReactMarkdown>
                        <p>
                          <Moment format="MMM Do YYYY">{article.published_at}</Moment>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      </Section>
    </Page>
  );
};

export default Article;
