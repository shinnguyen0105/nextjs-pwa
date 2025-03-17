import { ReactNode } from 'react'

type WrapperProps = {
	children: ReactNode;
};

const Section = ({ children }: WrapperProps) => (
	<section className='mt-10'>{children}</section>
)

export default Section
