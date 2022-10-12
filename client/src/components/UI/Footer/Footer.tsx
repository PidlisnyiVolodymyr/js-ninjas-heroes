import React, { FC } from 'react';
import Row from '../../layout/Row/Row';
import classes from './Footer.module.css';

const Footer: FC = () => (
	<footer className={classes.footer}>
		<Row>
			<h3>Created By: Volodymyr Pidlisnyi</h3>
		</Row>
	</footer>
);

export default Footer;
