import React, { FC } from 'react';
import { IParent } from '../IParent';
import classes from './Container.module.css';

const Container: FC<IParent> = ({ children }) => {
	return <div className={classes.container}>{children}</div>;
};

export default Container;
