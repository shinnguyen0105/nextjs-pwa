import { useEffect, useState } from 'react'
import Page from '../../components/page'
import Section from '../../components/section'
import { useRouter } from 'next/router'

const Story = ({ story }) => {
	return (
		<Page>
			<Section>
				<img src={story.image} />
				<h2 className='text-xl font-semibold'>{story ? story.title : ''}</h2>
				<div className='mt-2'>
					<p className='text-zinc-600 dark:text-zinc-400'>
						{story ? story.content : ''}
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
			</Section>
		</Page>
	)
}

export default Story

export async function getStaticPaths() {
	const paths = stories.map((story) => ({
		params: { sid: story.id.toString() },
	}))
	return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
	if (!params) return null
	const sid = params.sid
	const story = stories.find((s) => {
		return s.id === sid
	})
	return {
		props: { story: story },
	}
}

const stories = [
	{
		id: "1",
		image: '/images/1.jpg',
		title: '[Tết Nguyên Đán - Tết cổ truyền của dân tộc Việt Nam]',
		content:
			'🧧Trải qua bao mùa quất nhưng chắc hẳn nhiều bạn vẫn chưa biết tại sao dân ta lại gọi là Tết Nguyên Đán hay là Tết Nhâm Dần phải không nào? Cùng GNews tìm hiểu nhé! \n#GNewsClub2022',
	},
	{
		id: "2",
		image: '/images/ios.png',
		title: '[Tết Nguyên Đán - Tết cổ truyền của dân tộc Việt Nam]',
		content:
			'🧧Trải qua bao mùa quất nhưng chắc hẳn nhiều bạn vẫn chưa biết tại sao dân ta lại gọi là Tết Nguyên Đán hay là Tết Nhâm Dần phải không nào? Cùng GNews tìm hiểu nhé! \n#GNewsClub2022',
	},
	{
		id: "3",
		image: '/images/macos.png',
		title: '[Tết Nguyên Đán - Tết cổ truyền của dân tộc Việt Nam]',
		content:
			'🧧Trải qua bao mùa quất nhưng chắc hẳn nhiều bạn vẫn chưa biết tại sao dân ta lại gọi là Tết Nguyên Đán hay là Tết Nhâm Dần phải không nào? Cùng GNews tìm hiểu nhé! \n#GNewsClub2022',
	},
]
