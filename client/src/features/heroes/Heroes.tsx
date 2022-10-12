import React, { FC } from 'react';
import Container from '../../components/layout/Container/Container';
import Row from '../../components/layout/Row/Row';
import { useFetchHeroesQuery } from '../../api/heroesApi';
import HeroesCreationForm from './Forms/HeroCreationForm/HeroCreationForm';
import HeroesList from './HeroesList/HeroesList';

const Heroes: FC = () => {
	const { data: heroes, isLoading, isSuccess } = useFetchHeroesQuery(null);
	return (
		<Container>
			<Row>
				{isLoading && 'Loading...'}
				{isSuccess && <HeroesList heroes={heroes} />}
			</Row>
		</Container>
	);
};

export default Heroes;
