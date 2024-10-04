import Page from '../components/page'
import Section from '../components/section'
import Link from 'next/link'

const Story = () => (
	<Page>
		<Section>
			<h2 className='text-xl font-semibold'>Stories</h2>

			<div className='mt-2'>
				<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
					{stories.map((story) => (
						<Link passHref key={story.id} href='/story/[sid]' as={`story/${story.id}`}>
							<div key={story.id} className='rounded overflow-hidden shadow-lg'>
								<img className='w-full' src={story.image} alt='Mountain' />
								<div className='px-6 py-4'>
									<div className='font-bold text-xl mb-2'>{story.title}</div>
									<p className='text-gray-700 text-base'>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Voluptatibus quia, Nonea! Maiores et perferendis eaque,
										exercitationem praesentium nihil.
									</p>
								</div>
								<div className='px-6 pt-4 pb-2'>
									<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
										#photography
									</span>
									<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
										#travel
									</span>
									<span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
										#winter
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</Section>
	</Page>
)

export default Story

export type StoryState = {
	id: string,
	image: string,
	title: string,
	content: string
}

export const stories: StoryState[] = [
	{
		id: '1',
		image: '/images/1.jpg',
		title: '[Tết Nguyên Đán - Tết cổ truyền của dân tộc Việt Nam]',
		content:
			'🧧Trải qua bao mùa quất nhưng chắc hẳn nhiều bạn vẫn chưa biết tại sao dân ta lại gọi là Tết Nguyên Đán hay là Tết Nhâm Dần phải không nào? Cùng GNews tìm hiểu nhé! \n#GNewsClub2022',
	},
	{
		id: '2',
		image: '/images/ios.png',
		title: '[Tết Nguyên Đán - Tết cổ truyền của dân tộc Việt Nam]',
		content:
			'🧧Trải qua bao mùa quất nhưng chắc hẳn nhiều bạn vẫn chưa biết tại sao dân ta lại gọi là Tết Nguyên Đán hay là Tết Nhâm Dần phải không nào? Cùng GNews tìm hiểu nhé! \n#GNewsClub2022',
	},
	{
		id: '3',
		image: '/images/1.jpg',
		title: '[Tết Nguyên Đán - Tết cổ truyền của dân tộc Việt Nam]',
		content:
			'🧧Trải qua bao mùa quất nhưng chắc hẳn nhiều bạn vẫn chưa biết tại sao dân ta lại gọi là Tết Nguyên Đán hay là Tết Nhâm Dần phải không nào? Cùng GNews tìm hiểu nhé! \n#GNewsClub2022',
	},
]
