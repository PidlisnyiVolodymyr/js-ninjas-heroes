import React, { FC } from 'react';
import Wrapper from '../../components/layout/Wrapper/Wrapper';
import Heroes from '../../features/heroes/Heroes';

const HeroesPage: FC = () => {
	return (
		<Wrapper>
			<Heroes></Heroes>
		</Wrapper>
	);
};

export default HeroesPage;
