import React, { FC } from 'react';
import Paragraph from '../Paragraph/Paragraph';
import Title from '../Title/Title';

interface IProps {
	title: string;
	paragrah: string;
}

const TitledParagraph: FC<IProps> = ({ title, paragrah }) => {
	return (
		<>
			<Title text={title} />
			<Paragraph text={paragrah} />
		</>
	);
};

export default TitledParagraph;
