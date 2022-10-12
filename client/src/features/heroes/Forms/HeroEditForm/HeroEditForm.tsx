import React, { FC, useState } from 'react';
import {
	useDeleteHeroImageMutation,
	useEditHeroMutation,
	useUploadHeroImagesMutation,
} from '../../../../api/heroesApi';
import { useFetchSuperPowersQuery } from '../../../../api/superPowersApi';
import LabeledInput from '../../../../components/UI/LabeledInput/LabeledInput';
import MultipleSelect from '../../../../components/UI/MultipleSelect/MultipleSelect';
import { IHero } from '../../../../models/IHero';
import SuperPowerCreationForm from '../../../superpowers/SuperPowerCreationForm/SuperPowerCreationForm';
import HeroImage from '../../HeroImageSlider/HeroImage/HeroImage';
import { handleTextInputChange, handleMultiSelectInputChange, handleFileInputChange } from '../handlers/handlers';
import { IHeroCreationForm } from '../HeroCreationForm/HeroCreationForm';
import PopUp from '../PopUp/PopUp';
import classes from './HeroEditForm.module.css';

interface IProps {
	hero: IHero;
	stateSetter: (arg: any) => void;
}

const HeroEditForm: FC<IProps> = ({ hero, stateSetter }) => {
	const [formState, setFormState] = useState<IHeroCreationForm>({
		nickName: hero.nickName,
		realName: hero.realName,
		originDescription: hero.originDescription,
		catchPhrase: hero.catchPhrase,
		superPowersIds: hero.superPowersIds,
		images: null,
	});
	const { data, isLoading, isSuccess } = useFetchSuperPowersQuery(null);
	const [editHero, {}] = useEditHeroMutation();
	const [deleteImage] = useDeleteHeroImageMutation();
	const [uploadImages] = useUploadHeroImagesMutation();
	const [isSuperPowerCreationFormOpen, setIsSuperPowerCreationFormOpen] = useState(false);

	const onSubmit = async () => {
		const { images, ...form } = formState;
		await editHero({ heroId: hero.id, data: form })
			.unwrap()
			.then(() => {
				if (images?.length) {
					uploadImages({ heroId: hero.id as string, images });
				}
			});
		stateSetter(false);
	};

	return (
		<PopUp onSubmit={onSubmit} isOpenSetter={() => stateSetter(false)}>
			<LabeledInput
				required={true}
				name={'nickName'}
				label='Nick Name'
				value={formState.nickName}
				onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
			/>
			<LabeledInput
				required={true}
				name={'realName'}
				label='Real Name'
				value={formState.realName}
				onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
			/>
			<LabeledInput
				name={'originDescription'}
				label='Origin Description'
				value={formState.originDescription}
				onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
			/>
			<LabeledInput
				name={'catchPhrase'}
				label='Catch Phrase'
				value={formState.catchPhrase}
				onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
			/>
			{isLoading && 'Loading SuperPowers'}
			{isSuccess && (
				<MultipleSelect
					list={data}
					onChange={(event) =>
						handleMultiSelectInputChange({ state: formState, stateSetter: setFormState }, event.target.options.selected)
					}
				/>
			)}
			{!isSuperPowerCreationFormOpen ? (
				<button
					onClick={(event) => {
						event.preventDefault();
						setIsSuperPowerCreationFormOpen(true);
					}}
				>
					Create New Superpower
				</button>
			) : (
				<SuperPowerCreationForm setter={() => setIsSuperPowerCreationFormOpen(false)} />
			)}
			<label htmlFor='images'>images</label>
			<input
				name='images'
				type='file'
				accept='image/*'
				multiple
				onChange={(event) => {
					handleFileInputChange({ state: formState, stateSetter: setFormState }, event.target.files);
				}}
			/>
			<div className={classes.images}>
				{hero.images
					? hero.images.map((image) => (
							<div className={classes.imageWrapper}>
								<button
									className={classes.imageDeleteButton}
									onClick={(event) => {
										event.preventDefault();
										deleteImage(image.name);
									}}
								>
									X
								</button>
								<HeroImage src={`${hero.id}/${image.name}.${image.path.split('.').pop()}`} alt={image.name} />
							</div>
					  ))
					: ''}
			</div>
			<button>Update Hero Information</button>
		</PopUp>
	);
};

export default HeroEditForm;
function setIsSuperPowerCreationFormOpen(arg0: boolean) {
	throw new Error('Function not implemented.');
}
