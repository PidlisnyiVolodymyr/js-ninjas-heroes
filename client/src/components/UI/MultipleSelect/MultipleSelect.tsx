import React, { FC } from 'react';
import { useDeleteSuperPowerMutation } from '../../../api/superPowersApi';
import { ISuperPower } from '../../../models/ISuperPower';
import classes from './MultipleSelect.module.css';

interface IProps {
	list: ISuperPower[];
	required?: boolean;
	onChange: (arg: any) => void;
}

const MultipleSelect: FC<IProps> = ({ list, onChange, required = false }) => {
	return (
		<select required={required} className={classes.select} multiple onChange={onChange}>
			{list.map((option) => (
				<option key={option.id} value={option.id} className={classes.option}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default MultipleSelect;
