import Page from '../components/page'
import Section from '../components/section'
import Query from "../components/query";
import ARTICLES_QUERY from "../apollo/queries/article/articles";
import Articles from "../components/articles";
import Categories from "../components/categories";
import Labels from "../components/labels";
import FeaturedPosts from "../components/featuredposts";

const Story = () => {
	return (
		<Page>
			<Section>
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
					<div className='lg:col-span-12 col-span-1'>
						<FeaturedPosts />
					</div>
					<div className="lg:col-span-9 col-span-1">
						<Query query={ARTICLES_QUERY}>
							{({ data: { articles } }) => {
								return <Articles articles={articles} />;
							}}
						</Query>
					</div>
					<div className="lg:col-span-3 col-span-1">
						<div className="lg:sticky top-20">
							<Categories />
							<Labels />
						</div>
					</div>
				</div>
			</Section>
		</Page>
	)
}

export default Story
