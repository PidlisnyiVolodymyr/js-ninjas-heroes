import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { IImage } from '../../../models/IImage';
import HeroImage from './HeroImage/HeroImage';
import classes from './HeroImageSlider.module.css';

interface IProps {
	images: IImage[];
	heroId?: string;
}

const HeroImageSlider: FC<IProps> = ({ images, heroId }) => {
	const [visibleIndex, setVisibleIndex] = useState(0);

	const decreaseVisibleIndex = () => {
		if (visibleIndex <= 0) {
			setVisibleIndex(images.length - 1);
		} else {
			setVisibleIndex(visibleIndex - 1);
		}
	};

	const increaseVisibleIndex = () => {
		if (visibleIndex >= images.length - 1) {
			setVisibleIndex(0);
		} else {
			setVisibleIndex(visibleIndex + 1);
		}
	};

	return (
		<div className={classes.slider}>
			<button className={`${classes.button} ${classes.button_left}`} onClick={decreaseVisibleIndex}></button>
			{images.length ? (
				<Link to={'/' + heroId}>
					<HeroImage
						src={`${heroId}/${images[visibleIndex].name}.${images[visibleIndex].path.split('.').pop()}`}
						alt={'No Image'}
					/>
				</Link>
			) : (
				<span>No Images</span>
			)}

			<button className={`${classes.button} ${classes.button_right}`} onClick={increaseVisibleIndex}></button>
		</div>
	);
};

export default HeroImageSlider;
