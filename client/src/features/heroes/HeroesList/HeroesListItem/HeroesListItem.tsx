import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IHero } from '../../../../models/IHero';
import HeroImageSlider from '../../HeroImageSlider/HeroImageSlider';
import classes from './HeroesListItem.module.css';

interface IProps {
	hero: IHero;
}

const HeroesListItem: FC<IProps> = ({ hero }) => {
	return (
		<li>
			<div className={classes.listItem}>
				<Link to={'/' + hero.id}>
					<h2>{hero.nickName}</h2>
				</Link>
				<div className={classes.heroImageSlider}>
					{hero.images?.length ? (
						<HeroImageSlider images={hero.images} heroId={hero.id as string} />
					) : (
						<span>No Images</span>
					)}
				</div>
			</div>
		</li>
	);
};

export default HeroesListItem;
