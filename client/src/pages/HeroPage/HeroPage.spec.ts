import { render } from '@testing-library/react';
import HeroPage from './HeroPage';

test('Renders Page', () => {
	render(<HeroPage />);
	const linkElement = screen.get();
});
