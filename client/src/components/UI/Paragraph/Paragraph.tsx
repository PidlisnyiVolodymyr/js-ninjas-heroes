import React, { FC } from 'react';
import classes from './Paragraph.module.css';

interface IProps {
	text: string;
}

const Paragraph: FC<IProps> = ({ text }) => {
	return <p className={classes.paragraph}>{text}</p>;
};

export default Paragraph;
