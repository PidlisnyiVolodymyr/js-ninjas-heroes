import { BASE_DEV_API_URL } from './constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISuperPower } from '../models/ISuperPower';

export const superPowersApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: BASE_DEV_API_URL, mode: 'cors' }),
	tagTypes: ['SuperPower'],
	reducerPath: 'superPowersApi',
	endpoints: (builder) => ({
		createSuperPower: builder.mutation({
			invalidatesTags: ['SuperPower'],
			query: (data: ISuperPower) => {
				return {
					url: '',
					method: 'Post',
					body: data,
				};
			},
		}),
		fetchSuperPowers: builder.query({
			providesTags: ['SuperPower'],
			query: () => {
				return {
					url: '',
					method: 'Get',
				};
			},
		}),
		deleteSuperPower: builder.mutation({
			invalidatesTags: ['SuperPower'],
			query: (id: string) => {
				return {
					url: id,
					method: 'Delete',
				};
			},
		}),
	}),
});

export const { useCreateSuperPowerMutation, useFetchSuperPowersQuery, useDeleteSuperPowerMutation } = superPowersApi;
