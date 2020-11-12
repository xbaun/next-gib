import { Link, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchIssues } from '../store/actions';
import { IssueState, SearchIn } from '../store/reducers/search/search.state';
import { selectIssuesBySearch } from '../store/selectors/issues.selectors';
import { CenteredTextCard } from './centered-text-card';
import { SearchResultList } from './search-results-list';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(2),
        justifyContent: 'center'
    }
}));

export function SearchResults() {
    const dispatch = useDispatch();
    const issues = useSelector(selectIssuesBySearch);
    const classes = useStyles();

    if (issues.length) {
        return <SearchResultList issues={issues} />;
    } else {
        return (
            <CenteredTextCard>
                <Typography component='span'>No results ... try something like</Typography>
                <Link
                    href='#'
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        dispatch(
                            searchIssues({
                                term: 'react',
                                filters: {
                                    issueState: [IssueState.IsOpen, IssueState.IsClosed],
                                    searchIn: [SearchIn.Title, SearchIn.Body]
                                }
                            })
                        );
                    }}
                >
                    "react"
                </Link>
            </CenteredTextCard>
        );
    }
}
