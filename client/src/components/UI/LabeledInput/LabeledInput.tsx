import React, { FC } from 'react';
import classes from './LabeledInput.module.css';

interface IProps {
	name: string;
	value: string;
	label: string;
	onChange: ({ name, value }: { name: string; value: string }) => void;
}

const LabeledInput: FC<IProps> = ({ name, value, label, onChange }) => {
	return (
		<div className={classes.wrapper}>
			<label className={classes.label} htmlFor={name}>
				{label}
			</label>
			<input
				className={classes.input}
				name={name}
				type='text'
				value={value}
				onChange={({ target }) => onChange({ name, value: target.value })}
			/>
		</div>
	);
};

export default LabeledInput;
