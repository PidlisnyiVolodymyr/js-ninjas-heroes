import React, { FC } from 'react';
import { IParent } from '../../../../components/layout/IParent';
import classes from './PopUp.module.css';
interface IProps extends IParent {
	onSubmit: () => Promise<void>;
	isOpenSetter: () => void;
}

const PopUp: FC<IProps> = ({ children, onSubmit, isOpenSetter }) => {
	return (
		<div className={classes.wrapper} onClick={() => isOpenSetter()}>
			<form
				className={classes.form}
				onSubmit={(event) => {
					event.preventDefault();
					onSubmit();
				}}
				onClick={(event) => {
					event.stopPropagation();
				}}
			>
				{children}
			</form>
		</div>
	);
};

export default PopUp;
