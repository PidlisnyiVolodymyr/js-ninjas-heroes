import React, { FC } from 'react';
import classes from './Col.module.css';
import { IParent } from '../IParent';

const Col: FC<IParent> = ({ children }) => {
	return <div className={classes.col}>{children}</div>;
};

export default Col;
