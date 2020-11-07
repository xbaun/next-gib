import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../gql/client';
import { ISearchRepoQuery, ISearchRepoQueryVariables, SearchRepo } from '../gql/documents/viewer.graphql-gen';
import * as Types from '../gql/types.graphql-gen';
import { AppThunkAPI } from './index';

export type Repo = { __typename: 'Repository' } & Pick<Types.IRepository, 'id' | 'name' | 'url'>;

type InitialState = {
    term: string;
    result: Repo[];
};

const initialState: InitialState = {
    term: '',
    result: []
};


export const fetchReposBySearchTerm = createAsyncThunk<
    Repo[] | undefined,
    { term: string },
    AppThunkAPI
>(
    'search-repo/fetchReposBySearchTerm',
    async ({ term }, { getState }) => {

        // const token = getState().auth.token

        const { data } = await client.query<ISearchRepoQuery, ISearchRepoQueryVariables>({
            query: SearchRepo
        })

        return data.search.edges
            ?.map(edges => edges?.node)
            .filter((node): node is Repo => !!node && node.__typename === 'Repository');

    }
);


export const searchRepoSlice = createSlice({
    name: 'search-repo',
    initialState,
    reducers: {
        setSearchRepoTerm: (state, action: PayloadAction<{ term: string }>) => {
            state.term = action.payload.term;
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(fetchReposBySearchTerm.fulfilled, (state, action) => {
                state.result = action.payload ?? []
            })
    })
})


export const { setSearchRepoTerm } = searchRepoSlice.actions;

export type SetSearchRepoTerm      = ReturnType<typeof setSearchRepoTerm>;

export default searchRepoSlice.reducer;
