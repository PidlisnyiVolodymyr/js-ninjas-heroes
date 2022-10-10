import React, { FC } from 'react';
import { IParent } from '../../components/layout/IParent';
import Wrapper from '../../components/layout/Wrapper/Wrapper';

const HeroPage: FC<IParent> = ({ children }) => {
	return <Wrapper>{children}</Wrapper>;
};

export default HeroPage;
