import {
    Avatar,
    Badge,
    createStyles,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Theme,
    useTheme,
    withStyles
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { HelpOutline, HighlightOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { formatDistance } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import * as Types from '../gql/types.graphql-gen';
import { selectIssuesBySearch } from '../store/selectors/issues.selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        },
        inline: {
            display: 'inline'
        }
    })
);

const SmallAvatar = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 22,
            height: 22,
            border: `2px solid ${theme.palette.background.paper}`
        }
    })
)(Avatar);

export function SearchResults() {
    const theme = useTheme();
    const classes = useStyles();
    const issues = useSelector(selectIssuesBySearch);

    return (
        <List className={classes.root}>
            {issues?.map((issue) => (
                <>
                    <ListItem
                        button
                        divider
                        component='li'
                        onClick={() => {}}
                        key={`item-${issue.number}`}
                    >
                        <ListItemAvatar>
                            {issue.state === Types.IssueState.Open ? (
                                <Avatar
                                    style={{
                                        color: theme.palette.getContrastText(deepOrange[500]),
                                        backgroundColor: deepOrange[500]
                                    }}
                                >
                                    <HighlightOff />
                                </Avatar>
                            ) : (
                                <Avatar>
                                    <HelpOutline />
                                </Avatar>
                            )}
                        </ListItemAvatar>
                        <ListItemText<'span', 'div'>
                            primary={issue.title}
                            secondaryTypographyProps={{ component: 'div' }}
                            secondary={
                                <>
                                    published{' '}
                                    {formatDistance(new Date(issue?.publishedAt), new Date(), {
                                        addSuffix: true
                                    })}{' '}
                                    by {issue?.author?.login}{' '}
                                    <Badge>
                                        <SmallAvatar
                                            alt={issue?.author?.login}
                                            src={issue?.author?.avatarUrl}
                                        />
                                    </Badge>
                                </>
                            }
                        />
                    </ListItem>
                </>
            ))}
        </List>
    );
}
