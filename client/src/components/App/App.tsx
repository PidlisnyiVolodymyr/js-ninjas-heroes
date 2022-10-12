import { Route, Routes } from 'react-router-dom';
import HeroesPage from '../../pages/HeroesPage/HeroesPage';
import HeroPage from '../../pages/HeroPage/HeroPage';
import Wrapper from '../layout/Wrapper/Wrapper';
import Footer from '../UI/Footer/Footer';
import Header from '../UI/Header/Header';
import classes from './App.module.css';

function App() {
	return (
		<Wrapper>
			<Header />
			<main className={classes.main}>
				<Routes>
					<Route path='/' element={<HeroesPage />} />
					<Route path='/:id' element={<HeroPage />} />
				</Routes>
			</main>
			<Footer />
		</Wrapper>
	);
}

export default App;
