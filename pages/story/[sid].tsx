import Page from '../../components/page'
import Section from '../../components/section'
import { stories, StoryState } from '../stories'
import { GetStaticPaths, GetStaticProps } from 'next'

const Story = (story: StoryState) => {
	return (
		<Page>
			<Section key={story.id}>
				{story ? (
					<>
						{' '}
						<img src={story.image}  alt={story.title}/>
						<h2 className='text-xl font-semibold mt-5'>
							{story.title}
						</h2>
						<div className='mt-2'>
							<p className='text-zinc-600 dark:text-zinc-400'>
								{story.content}
							</p>
							<br />
							<p className='text-sm text-zinc-600 dark:text-zinc-400'>
								<a
									href='https://twosentencestories.com/vision'
									className='underline'
								>
									Vision
								</a>
								, a two sentence story
							</p>{' '}
						</div>
					</>
				) : (
					<></>
				)}
			</Section>
		</Page>
	)
}

export default Story

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = stories.map((story) => ({
		params: { sid: story.id.toString() },
	}))
	return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params || !params.sid) return { notFound: true }

	const sid = params.sid as string
	const story = stories.find((s) => s.id === sid)

	if (!story) return { notFound: true }

	return {
		props: { story },
	}
}
