import React, { FC, useState } from 'react';
import LabeledInput from '../../../components/UI/LabeledInput/LabeledInput';
import MultipleSelect from '../../../components/UI/MultipleSelect/MultipleSelect';
import { useCreateHeroMutation, useUploadHeroImagesMutation } from '../heroesApi';
import HeroesListItem from '../HeroesListItem/HeroesListItem';
import classes from './HeroCreationForm.module.css';

export interface IHeroCreationForm {
	nickName: string;
	realName: string;
	originDescription: string;
	catchPhrase: string;
	superPowersIds: string[];
	images: FileList | null;
}

const HeroCreationForm: FC = () => {
	const [formState, setFormState] = useState<IHeroCreationForm>({
		nickName: 'asd',
		realName: 'asd',
		originDescription: 'asd',
		catchPhrase: 'asd',
		superPowersIds: ['ca08aade-a40c-4a96-ba35-f808928199ae'],
		images: null,
	});

	const handleTextInputChange = ({ name, value }: { name: string; value: string }) => {
		setFormState({ ...formState, [name]: value });
	};
	const handleFileInputChange = (target: HTMLInputElement) => {
		setFormState({ ...formState, images: target.files });
	};
	const handleMultiSelectInputChange = (superPowersIds: string[]) => {
		setFormState({ ...formState, superPowersIds });
	};

	const [createHero] = useCreateHeroMutation();
	const [uploadFiles] = useUploadHeroImagesMutation();

	const onSubmit = async (event: any) => {
		event.preventDefault();
		const { images, ...formData } = formState;
		const data1 = await createHero(formData)
			.unwrap()
			.then(async (data) => await uploadFiles({ heroId: data.id, images }));
		console.log('DATA: ', data1);
	};

	return (
		<div className={classes.wrapper}>
			<form className={classes.form} onSubmit={onSubmit}>
				<LabeledInput name={'nickName'} label='Nick Name' value={formState.nickName} onChange={handleTextInputChange} />
				<LabeledInput name={'realName'} label='Real Name' value={formState.realName} onChange={handleTextInputChange} />
				<LabeledInput
					name={'originDescription'}
					label='Origin Description'
					value={formState.originDescription}
					onChange={handleTextInputChange}
				/>
				<LabeledInput
					name={'catchPhrase'}
					label='Catch Phrase'
					value={formState.catchPhrase}
					onChange={handleTextInputChange}
				/>
				<MultipleSelect list={['Option']} onChange={handleMultiSelectInputChange} />
				<label htmlFor='images'>images</label>
				<input
					name='images'
					type='file'
					accept='image/*'
					multiple
					onChange={(event) => {
						handleFileInputChange(event.target);
					}}
				/>
				<button>CreateHero</button>
			</form>
		</div>
	);
};

export default HeroCreationForm;
