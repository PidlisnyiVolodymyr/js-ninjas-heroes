import React, { FC } from 'react';
import classes from './MultipleSelect.module.css';

interface IProps {
	list: string[];
	onChange: (options: string[]) => void;
}

const MultipleSelect: FC<IProps> = ({ list, onChange }) => {
	return (
		<select
			className={classes.select}
			multiple
			onChange={(event) => onChange(Array.from(event.target.options).map((option) => option.value))}
		>
			{list.map((option) => (
				<option className={classes.option}>{option}</option>
			))}
		</select>
	);
};

export default MultipleSelect;
