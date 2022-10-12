import React, { FC, useState } from 'react';
import LabeledInput from '../../../../components/UI/LabeledInput/LabeledInput';
import MultipleSelect from '../../../../components/UI/MultipleSelect/MultipleSelect';
import { useCreateHeroMutation, useUploadHeroImagesMutation } from '../../../../api/heroesApi';
import classes from './HeroCreationForm.module.css';
import { useFetchSuperPowersQuery } from '../../../../api/superPowersApi';
import SuperPowerCreationForm from '../../../superpowers/SuperPowerCreationForm/SuperPowerCreationForm';
import { handleFileInputChange, handleMultiSelectInputChange, handleTextInputChange } from '../handlers/handlers';
import PopUp from '../PopUp/PopUp';

export interface IHeroCreationForm {
	nickName: string;
	realName: string;
	originDescription: string;
	catchPhrase: string;
	superPowersIds: string[];
	images?: FileList | null;
}

interface IForm {
	stateSetter: () => void;
}

const HeroCreationForm: FC<IForm> = ({ stateSetter }) => {
	const [formState, setFormState] = useState<IHeroCreationForm>({
		nickName: '',
		realName: '',
		originDescription: '',
		catchPhrase: '',
		superPowersIds: [],
		images: null,
	});
	const [createHero] = useCreateHeroMutation();
	const [uploadFiles] = useUploadHeroImagesMutation();
	const { data, isLoading, isSuccess } = useFetchSuperPowersQuery(null);
	const [isSuperPowerCreationFormOpen, setIsSuperPowerCreationFormOpen] = useState(false);

	const onSubmit = async () => {
		const { images, ...formData } = formState;
		const data1 = await createHero(formData)
			.unwrap()
			.then(async (data) => images?.length && (await uploadFiles({ heroId: data.id, images })));
		console.log('DATA: ', data1);
	};

	return (
		<PopUp onSubmit={onSubmit} isOpenSetter={() => stateSetter()}>
			<LabeledInput
				required={true}
				name='nickName'
				label='Nick Name'
				value={formState.nickName}
				onChange={(event) => {
					handleTextInputChange(event.target, { state: formState, stateSetter: setFormState });
				}}
			/>
			<LabeledInput
				required={true}
				name='realName'
				label='Real Name'
				value={formState.realName}
				onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
			/>
			<LabeledInput
				name='originDescription'
				label='Origin Description'
				value={formState.originDescription}
				onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
			/>
			<LabeledInput
				name='catchPhrase'
				label='Catch Phrase'
				value={formState.catchPhrase}
				onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
			/>
			{isLoading && 'Loading SuperPowers'}
			{isSuccess && (
				<MultipleSelect
					list={data}
					onChange={(event) =>
						handleMultiSelectInputChange(
							{ state: formState, stateSetter: setFormState },
							Array.from(event.target.options).map((option: any) => option.value)
						)
					}
				/>
			)}
			<label htmlFor='images'>Images</label>
			<input
				name='images'
				type='file'
				accept='image/*'
				multiple
				onChange={(event) => {
					handleFileInputChange({ state: formState, stateSetter: setFormState }, event.target.files);
				}}
			/>
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
			<button>CreateHero</button>
		</PopUp>
	);
};

export default HeroCreationForm;
