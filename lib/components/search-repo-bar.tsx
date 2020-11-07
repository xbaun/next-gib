import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthToken } from '../store/auth.selectors';
import { getSearchReopState } from '../store/search-repo.selectors';
import { setSearchRepoTerm } from '../store/search-repo.slice';

interface SearchBarInput {
    term: string
}

export function SearchRepoBar() {

    const dispatch = useDispatch();
    const state = useSelector(getSearchReopState);

    const { register, handleSubmit, watch, errors } = useForm<SearchBarInput>();
    const onSubmit = (data: SearchBarInput) => dispatch(setSearchRepoTerm({ term: data.term }));

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="term" defaultValue={state.term} ref={register} />
            <input type="submit" />
        </form>
    );
}
