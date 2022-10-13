import React, { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Col from '../../components/layout/Col/Col';
import Container from '../../components/layout/Container/Container';
import Row from '../../components/layout/Row/Row';
import TitledParagraph from '../../components/UI/TitledParagraph/TitledParagraph';
import { useDeleteHeroMutation, useFetchHeroByIdQuery } from '../../api/heroesApi';
import HeroImageSlider from '../../features/heroes/HeroImageSlider/HeroImageSlider';
import classes from './HeroPage.module.css';
import HeroEditForm from '../../features/heroes/Forms/HeroEditForm/HeroEditForm';
import { ISuperPower } from '../../models/ISuperPower';

const HeroPage: FC = () => {
	const { id } = useParams();
	const { data, isSuccess, isLoading } = useFetchHeroByIdQuery(id as string);
	const [deleteHero] = useDeleteHeroMutation();
	const redirect = useNavigate();
	const [isEditFormOpen, setIsEditFormOpen] = useState(false);

	return (
		<div className={classes.hero}>
			<Container>
				{isSuccess && (
					<div className={classes.heroContent}>
						<Row>
							<button
								className={classes.button}
								onClick={() => {
									deleteHero(data.id);
									redirect('/');
								}}
							>
								Delete
							</button>
							<button className={classes.button} onClick={() => setIsEditFormOpen(true)}>
								Edit
							</button>
							{isEditFormOpen && <HeroEditForm hero={data} stateSetter={setIsEditFormOpen} />}
						</Row>
						<Row>
							<div className={classes.imageWrapper}>
								<HeroImageSlider images={data.images} heroId={data.id} />
							</div>
							<Col>
								<Row>
									<TitledParagraph title='Nick Name' paragrah={data.nickName} />
								</Row>
								<Row>
									<TitledParagraph title='Real Name' paragrah={data.realName} />
								</Row>
								<Row>
									<TitledParagraph title='Catch Phrase' paragrah={data.catchPhrase} />
								</Row>
							</Col>
						</Row>
						<Row>
							<div className={classes.divider}></div>
						</Row>
						<Col>
							<Row>
								{data.superPowers.map((superPower: ISuperPower) => (
									<Col key={superPower.id}>
										<TitledParagraph title={superPower.name} paragrah={superPower.description || ''} />
									</Col>
								))}
							</Row>
							<Row>
								<TitledParagraph title='Description' paragrah={data.originDescription} />
							</Row>
						</Col>
					</div>
				)}
				{isLoading && 'Loading...'}
			</Container>
		</div>
	);
};

export default HeroPage;
