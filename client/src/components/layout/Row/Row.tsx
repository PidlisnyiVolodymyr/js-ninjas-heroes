import React, { FC } from 'react';
import classes from './Row.module.css';
import { IParent } from '../IParent';

const Row: FC<IParent> = ({ children }) => {
	return <div className={classes.row}>{children}</div>;
};

export default Row;
