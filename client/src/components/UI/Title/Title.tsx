import React, { FC } from 'react';
import classes from './Title.module.css';

interface IProps {
	text: string;
}

const Title: FC<IProps> = ({ text }) => {
	return <h2 className={classes.title}>{text}</h2>;
};

export default Title;
