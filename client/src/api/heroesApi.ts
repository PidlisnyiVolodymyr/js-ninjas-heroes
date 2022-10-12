import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { IHero } from '../models/IHero';

const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: '' }
	): BaseQueryFn<{
		url?: string;
		method?: AxiosRequestConfig['method'];
		data?: AxiosRequestConfig['data'];
		params?: AxiosRequestConfig['params'];
	}> =>
	async ({ url, method, data, params }) => {
		try {
			const result = await axios({ url: baseUrl + url, method, data, params });
			return { data: result.data };
		} catch (axiosError) {
			let err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};

export const heroesApi = createApi({
	baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	tagTypes: ['Hero'],
	reducerPath: 'heroesAPI',
	endpoints: (builder) => ({
		createHero: builder.mutation({
			invalidatesTags: ['Hero'],
			query: (formData: IHero) => {
				return {
					url: 'hero',
					method: 'Post',
					data: formData,
				};
			},
		}),
		uploadHeroImages: builder.mutation({
			invalidatesTags: ['Hero'],
			query: ({ heroId, images }: { heroId: string; images: FileList | null }) => {
				const formData = new FormData();
				if (images) {
					Array.from(images).forEach((img) => {
						formData.append('files', img, img.name);
					});
				}
				return {
					url: 'hero/' + heroId + '/images',
					method: 'Post',
					data: formData,
				};
			},
		}),
		editHero: builder.mutation({
			invalidatesTags: ['Hero'],
			query: ({ heroId, data }) => {
				return {
					url: 'hero/' + heroId,
					method: 'Patch',
					data,
				};
			},
		}),
		fetchHeroes: builder.query<IHero[], null>({
			providesTags: ['Hero'],
			query: () => {
				return {
					url: 'hero',
					method: 'Get',
				};
			},
		}),
		deleteHero: builder.mutation({
			invalidatesTags: ['Hero'],
			query: (id) => {
				console.log('DELETE_ID: ', id);

				return {
					url: 'hero/' + id,
					method: 'Delete',
				};
			},
		}),
		fetchImages: builder.query({
			providesTags: ['Hero'],
			query: (path) => {
				return {
					url: 'images/' + path,
					method: 'Get',
				};
			},
		}),
		fetchHeroById: builder.query({
			providesTags: ['Hero'],
			query: (id: string) => {
				return {
					url: 'hero/' + id,
					method: 'Get',
				};
			},
		}),
		fetchHeroByName: builder.query({
			providesTags: ['Hero'],
			query: (name: string) => {
				return {
					url: 'hero/' + name,
					method: 'Get',
				};
			},
		}),
		deleteHeroImage: builder.mutation({
			invalidatesTags: ['Hero'],
			query: (id: string) => {
				return {
					url: 'hero/image/' + id,
					method: 'Delete',
				};
			},
		}),
	}),
});

export const {
	useCreateHeroMutation,
	useUploadHeroImagesMutation,
	useFetchHeroesQuery,
	useDeleteHeroMutation,
	useFetchImagesQuery,
	useFetchHeroByIdQuery,
	useFetchHeroByNameQuery,
	useEditHeroMutation,
	useDeleteHeroImageMutation,
} = heroesApi;
