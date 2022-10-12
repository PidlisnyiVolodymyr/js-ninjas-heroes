import React, { FC, useState } from 'react';
import { useCreateSuperPowerMutation } from '../../../api/superPowersApi';
import Col from '../../../components/layout/Col/Col';
import Row from '../../../components/layout/Row/Row';
import LabeledInput from '../../../components/UI/LabeledInput/LabeledInput';
import { handleTextInputChange } from '../../heroes/Forms/handlers/handlers';

interface IForm {
	setter: () => void;
}

const SuperPowerCreationForm: FC<IForm> = ({ setter }) => {
	const [formState, setFormState] = useState<{ name: string; description: string }>({
		name: '',
		description: '',
	});
	const [createSuperpower] = useCreateSuperPowerMutation();

	return (
		<Col>
			<Row>
				<LabeledInput
					label='Name of Superpower'
					value={formState.name}
					name='name'
					onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
				/>
				<LabeledInput
					label='Description of Superpower'
					value={formState.description}
					name='description'
					onChange={(event) => handleTextInputChange(event.target, { state: formState, stateSetter: setFormState })}
				/>
			</Row>
			<Row>
				<button
					onClick={(event) => {
						event.preventDefault();
						createSuperpower(formState);
						setter();
					}}
				>
					Create
				</button>
				<button
					onClick={() => {
						setter();
					}}
				>
					Close
				</button>
			</Row>
		</Col>
	);
};

export default SuperPowerCreationForm;
