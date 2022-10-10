import React, { FC, useState } from 'react';
import { IImage } from '../../../models/IImage';
import HeroImage from '../HeroImage/HeroImage';
import classes from './HeroImageSlider.module.css';

interface IProps {
	images: IImage[];
	heroId?: string;
}

const HeroImageSlider: FC<IProps> = ({ images, heroId }) => {
	const [visibleIndex, setVisibleIndex] = useState(0);

	return (
		<div className={classes.slider}>
			<button
				className={`${classes.button} ${classes.button_left}`}
				onClick={() => {
					if (visibleIndex <= 0) {
						setVisibleIndex(images.length - 1);
					} else {
						setVisibleIndex(visibleIndex - 1);
					}
				}}
			></button>
			<HeroImage
				src={`${heroId}/${images[visibleIndex].name}.${images[visibleIndex].path.split('.').pop()}`}
				alt={images[visibleIndex].name}
			/>
			<button
				className={`${classes.button} ${classes.button_right}`}
				onClick={() => {
					if (visibleIndex >= images.length - 1) {
						setVisibleIndex(0);
					} else {
						setVisibleIndex(visibleIndex + 1);
					}
				}}
			></button>
		</div>
	);
};

export default HeroImageSlider;
