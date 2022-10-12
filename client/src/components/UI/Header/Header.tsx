import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchHeroesQuery } from '../../../api/heroesApi';
import { IHero } from '../../../models/IHero';
import classes from './Header.module.css';
import HeroCreationForm from '../../../features/heroes/Forms/HeroCreationForm/HeroCreationForm';
const Header: FC = () => {
	const [searchInput, setSearchInput] = useState<string>('');
	const { data, isLoading, isSuccess } = useFetchHeroesQuery(null);
	const [filteredList, setFilteredList] = useState<IHero[]>([]);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const filterList = (name: string) => {
		if (data?.length) {
			setFilteredList(data.filter((hero) => hero.nickName === name));
		}
	};

	useEffect(() => {
		filterList(searchInput);
	}, [searchInput]);

	const handleSearchChange = (name: string) => {
		setSearchInput(name);
	};
	return (
		<header className={classes.header}>
			{isFormOpen && <HeroCreationForm stateSetter={() => setIsFormOpen(false)} />}
			<Link to='/'>
				<h1 className={classes.logo}>Heroes!</h1>
			</Link>
			<div className={classes.dropDown}>
				<input
					className={classes.search}
					type='text'
					value={searchInput}
					onChange={(event) => handleSearchChange(event.target.value)}
				/>
				{filteredList?.length ? (
					<div className={classes.list}>
						{filteredList.map((hero: IHero) => (
							<Link
								key={hero.id}
								to={'/' + hero.id}
								onClick={() => {
									setSearchInput('');
								}}
							>
								<h1>{hero.nickName}</h1>
							</Link>
						))}
					</div>
				) : (
					''
				)}
			</div>
			<button
				className={classes.button}
				onClick={() => {
					setIsFormOpen(true);
				}}
			>
				Create Hero!
			</button>
		</header>
	);
};

export default Header;
