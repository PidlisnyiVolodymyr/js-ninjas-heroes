import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { heroesApi } from '../features/heroes/heroesApi';

export const store = configureStore({
	reducer: {
		[heroesApi.reducerPath]: heroesApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(heroesApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
