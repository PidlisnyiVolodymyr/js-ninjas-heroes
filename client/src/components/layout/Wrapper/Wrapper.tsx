import React, { FC } from 'react';
import { IParent } from '../IParent';
import classes from './Wrapper.module.css';

const Wrapper: FC<IParent> = ({ children }) => {
	return <div className={classes.wrapper}>{children}</div>;
};

export default Wrapper;
