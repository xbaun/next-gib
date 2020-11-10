import {
    Chip,
    FormControl,
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
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { searchIssues } from '../store/actions';
import { IssueState, SearchIn } from '../store/reducers/search.reducer';
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

const options = [
    { value: SearchIn.Title, label: 'in:title' },
    { value: SearchIn.Body, label: 'in:body' },
    { value: IssueState.IsOpen, label: 'is:open' },
    { value: IssueState.IsClosed, label: 'is:closed' }
];

export function SearchBar() {
    const classes = useStyles();
    const dispatch = useDispatch();

    // const results = useSelector(selectSearchResultEntities);

    const theme = useTheme();
    const search = useSelector(selectSearch);

    const { register, handleSubmit, watch, errors, control } = useForm<SearchBarInput>();

    // const searchIn = watch('searchIn');
    // const issueState = watch('issueState');

    // useEffect(() => {
    //     console.log(searchIn);
    // }, [searchIn]);

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
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    defaultValue={[SearchIn.Title, SearchIn.Body]}
                    MenuProps={MenuProps}
                >
                    {[SearchIn.Body, SearchIn.Title].map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{ fontWeight: theme.typography.fontWeightRegular }}
                        >
                            {name}
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
                            {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    // renderValue={(selected: any) => (
                    //     <div className={classes.chips}>
                    //         <Chip key={selected} label={selected} className={classes.chip} />
                    //     </div>
                    // )}
                    defaultValue={[IssueState.IsOpen]}
                    MenuProps={MenuProps}
                >
                    {[IssueState.IsOpen, IssueState.IsClosed].map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={{ fontWeight: theme.typography.fontWeightRegular }}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Controller>
            </FormControl>

            <FormControl className={`${classes.formControl} ${classes.input}`}>
                <Controller
                    as={InputBase}
                    name='term'
                    control={control}
                    defaultValue=''
                    placeholder='Search For Issues'
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </FormControl>

            <IconButton type='submit' className={classes.iconButton} aria-label='search'>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
