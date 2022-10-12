import React, { FC } from 'react';
import Col from '../../layout/Col/Col';
import Paragraph from '../Paragraph/Paragraph';
import Title from '../Title/Title';

interface IProps {
	title: string;
	paragrah: string;
}

const TitledParagraph: FC<IProps> = ({ title, paragrah }) => {
	return (
		<Col>
			<Title text={title} />
			<Paragraph text={paragrah} />
		</Col>
	);
};

export default TitledParagraph;
