import React, { FC } from 'react';
import Col from '../../../components/layout/Col/Col';
import Row from '../../../components/layout/Row/Row';
import TitledParagraph from '../../../components/UI/TitledParagraph/TitledParagraph';
import { IHero } from '../../../models/IHero';
import { IHeroCreationForm } from '../HeroCreationForm/HeroCreationForm';
import { useDeleteHeroMutation } from '../heroesApi';
import HeroImageSlider from '../HeroImageSlider/HeroImageSlider';
import classes from './heroesListItem.module.css';

interface IProps {
	hero: IHero;
}

const HeroesListItem: FC<IProps> = ({ hero }) => {
	const [deleleItem] = useDeleteHeroMutation();

	const checkType = (hero: IHero | IHeroCreationForm) => {
		if ('id' in hero) {
		}
	};

	return (
		<li>
			<Row>
				<Col>{<Row>{hero.images && <HeroImageSlider images={hero.images} heroId={hero.id as string} />}</Row>}</Col>
				<Col>
					<Row>
						<Col>
							<TitledParagraph title='Nickname' paragrah={hero.nickName} />
						</Col>
					</Row>
					<Row>
						<Col>
							<TitledParagraph title='Real name' paragrah={hero.realName} />
						</Col>
					</Row>
					<Row>
						<Col>
							<TitledParagraph title='Catch Phrase' paragrah={hero.catchPhrase} />
						</Col>
					</Row>
					<Row>
						<Col>
							<TitledParagraph title='Origin Description' paragrah={hero.originDescription} />
						</Col>
					</Row>
					<Col>
						<button onClick={() => deleleItem(hero.id)}>Delete</button>;
					</Col>
				</Col>
			</Row>
		</li>
	);
};

export default HeroesListItem;
