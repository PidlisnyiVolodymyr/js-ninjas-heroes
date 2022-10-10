import React, { FC } from 'react';
import { IHero } from '../../../models/IHero';
import HeroesListItem from '../HeroesListItem/HeroesListItem';
import classes from './HeroesList.module.css';

interface IProps {
	heroes: IHero[];
}

const HeroesList: FC<IProps> = ({ heroes }) => {
	return (
		<ul className={classes.list}>
			{heroes.length ? heroes.map((hero) => <HeroesListItem key={hero.id} hero={hero} />) : 'There is no heroes'}
		</ul>
	);
};

export default HeroesList;
