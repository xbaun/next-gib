import {
    Chip,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Theme,
    useTheme
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { searchIssues } from '../store/actions';
import { IssueState, SearchIn } from '../store/reducers/search/search.state';
import { selectSearch } from '../store/selectors/search.selectors';

interface SearchBarInput {
    term: string;
    searchIn: SearchIn[];
    issueState: IssueState[];
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(2)
    },
    iconButton: {
        padding: 10
    },
    divider: {
        height: 28,
        margin: 4
    },
    select: {
        minWidth: 200
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300
    },
    input: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(4),
        flex: 1,
        maxWidth: 'none'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 2
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const searchInLabels = {
    [SearchIn.Title]: 'in:title',
    [SearchIn.Body]: 'in:body'
};

const issueStateLabels = {
    [IssueState.IsOpen]: 'is:open',
    [IssueState.IsClosed]: 'is:closed'
};

const searchInOptions = [
    { value: SearchIn.Title, label: searchInLabels[SearchIn.Title] },
    { value: SearchIn.Body, label: searchInLabels[SearchIn.Body] }
];

const issueStateOptions = [
    { value: IssueState.IsOpen, label: issueStateLabels[IssueState.IsOpen] },
    { value: IssueState.IsClosed, label: issueStateLabels[IssueState.IsClosed] }
];

export function SearchBar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const results = useSelector(selectSearchResultEntities);

    const theme = useTheme();
    const search = useSelector(selectSearch);

    const { handleSubmit, control, setValue } = useForm<SearchBarInput>();

    useEffect(() => {
        setValue('term', search.term);
    }, [search.term]);

    const onSubmit = (data: SearchBarInput) =>
        dispatch(
            searchIssues({
                term: data.term,
                filters: {
                    issueState: data.issueState,
                    searchIn: data.searchIn
                }
            })
        );

    return (
        <>
            <Paper component='form' className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <FormControl className={classes.formControl}>
                    <InputLabel id='search-in-label'>Search in</InputLabel>
                    <Controller
                        name='searchIn'
                        control={control}
                        as={Select}
                        labelId='search-in-label'
                        multiple
                        input={<Input />}
                        renderValue={(selected: unknown) => (
                            <div className={classes.chips}>
                                {(selected as SearchIn[]).map((value) => (
                                    <Chip
                                        key={value}
                                        label={searchInLabels[value]}
                                        className={classes.chip}
                                    />
                                ))}
                            </div>
                        )}
                        defaultValue={search.filters.searchIn}
                        MenuProps={MenuProps}
                    >
                        {searchInOptions.map(({ value, label }) => (
                            <MenuItem
                                key={label}
                                value={value}
                                style={{ fontWeight: theme.typography.fontWeightRegular }}
                            >
                                {label}
                            </MenuItem>
                        ))}
                    </Controller>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id='issue-state-label'>Issue State</InputLabel>
                    <Controller
                        name='issueState'
                        control={control}
                        as={Select}
                        multiple
                        input={<Input />}
                        renderValue={(selected: unknown) => (
                            <div className={classes.chips}>
                                {(selected as IssueState[]).map((value) => (
                                    <Chip
                                        key={value}
                                        label={issueStateLabels[value]}
                                        className={classes.chip}
                                    />
                                ))}
                            </div>
                        )}
                        defaultValue={search.filters.issueState}
                        MenuProps={MenuProps}
                    >
                        {issueStateOptions.map(({ value, label }) => (
                            <MenuItem
                                key={label}
                                value={value}
                                style={{ fontWeight: theme.typography.fontWeightRegular }}
                            >
                                {label}
                            </MenuItem>
                        ))}
                    </Controller>
                </FormControl>

                <FormControl className={`${classes.formControl} ${classes.input}`}>
                    <Controller
                        as={InputBase}
                        name='term'
                        control={control}
                        placeholder='Search For Issues'
                        defaultValue={search.term}
                    />
                </FormControl>

                <IconButton type='submit' className={classes.iconButton} aria-label='search'>
                    <SearchIcon />
                </IconButton>
            </Paper>
            {search.fetching && (
                <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            )}
        </>
    );
}
