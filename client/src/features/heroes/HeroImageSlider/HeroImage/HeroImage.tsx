import React, { FC } from 'react';
import classes from './HeroImage.module.css';

interface IProps {
	src: string;
	alt: string;
}

const HeroImage: FC<IProps> = ({ src, alt }) => {
	return <img className={classes.image} src={`http://localhost:3000/images/${src}`} alt={alt}></img>;
};

export default HeroImage;
