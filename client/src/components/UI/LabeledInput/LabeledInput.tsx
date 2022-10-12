import React, { FC } from 'react';
import classes from './LabeledInput.module.css';

interface IProps {
	name: string;
	value: string;
	label: string;
	onChange: (event: any) => void;
	required?: boolean;
}

const LabeledInput: FC<IProps> = ({ name, value, label, onChange, required = false }) => {
	return (
		<div className={classes.wrapper}>
			<label className={classes.label} htmlFor={name}>
				{label}
			</label>
			<input className={classes.input} name={name} type='text' value={value} required={required} onChange={onChange} />
		</div>
	);
};

export default LabeledInput;
