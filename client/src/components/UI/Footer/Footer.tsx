import React, { FC } from 'react';
import Container from '../../layout/Container/Container';
import classes from './Footer.module.css';

const Footer: FC = () => (
	<footer className={classes.footer}>
		<Container>
			<div className={classes.wrapper}>
				<h3>Created By: Volodymyr Pidlisnyi</h3>
			</div>
		</Container>
	</footer>
);

export default Footer;
