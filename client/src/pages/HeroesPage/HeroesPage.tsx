import React, { FC, useState } from 'react';
import { useFetchPartialHeroesQuery } from '../../api/heroesApi';
import Container from '../../components/layout/Container/Container';
import Row from '../../components/layout/Row/Row';
import HeroesList from '../../features/heroes/HeroesList/HeroesList';
import classes from './HeroesPage.module.css';

const HeroesPage: FC = () => {
	const [page, setPage] = useState(1);
	const { data, isLoading, isSuccess } = useFetchPartialHeroesQuery({ page, heroesPerPage: 5 });
	return (
		<div className={classes.heroesPage}>
			<Container>
				<div className={classes.heroes}>
					<Row>
						{page > 1 && (
							<button
								className={classes.button}
								onLoad={() => console.log(data)}
								onClick={() => {
									setPage(page - 1);
								}}
							>
								{'<'}
							</button>
						)}
						{isLoading && 'Loading...'}
						{isSuccess && <HeroesList heroes={data.heroes} />}
						{isSuccess && (
							<>
								{page < data.totalPages && (
									<button
										className={classes.button}
										onClick={() => {
											setPage(page + 1);
										}}
									>
										{'>'}
									</button>
								)}
							</>
						)}
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default HeroesPage;
