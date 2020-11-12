import {
    Avatar,
    Badge,
    createStyles,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Theme,
    withStyles
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { formatDistance } from 'date-fns';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMoreIssues } from '../store/actions';
import { IssueEntity } from '../store/reducers/issues/issues.state';
import { selectHasMoreSearchResults } from '../store/selectors/search.selectors';
import { CenteredButton } from './centered-button';
import { IssueState } from './issue-state';

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

export function SearchResultList({ issues }: { issues: IssueEntity[] }) {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const hasMoreSearchResults = useSelector(selectHasMoreSearchResults);

    return (
        <>
            <List className={classes.root}>
                {issues
                    ?.filter(
                        (
                            issue
                        ): issue is typeof issue & { data: NonNullable<typeof issue['data']> } =>
                            issue?.data !== undefined
                    )
                    .map((issue) => (
                        <ListItem
                            button
                            divider
                            component='li'
                            onClick={() => {
                                router.push(`/issue/${issue.data.number}`);
                            }}
                            key={`issue-${issue.data.number}`}
                        >
                            <ListItemAvatar>
                                <IssueState issue={issue} />
                            </ListItemAvatar>
                            <ListItemText<'span', 'div'>
                                primary={issue.data.title}
                                secondaryTypographyProps={{ component: 'div' }}
                                secondary={
                                    <>
                                        #{issue.data.number} published{' '}
                                        {formatDistance(
                                            new Date(issue.data.publishedAt),
                                            new Date(),
                                            {
                                                addSuffix: true
                                            }
                                        )}{' '}
                                        by {issue.data.author?.login}{' '}
                                        <Badge>
                                            <SmallAvatar
                                                alt={issue.data.author?.login}
                                                src={issue.data.author?.avatarUrl}
                                            />
                                        </Badge>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
            </List>
            {hasMoreSearchResults && (
                <CenteredButton
                    onClick={() => {
                        dispatch(searchMoreIssues());
                    }}
                >
                    Load more
                </CenteredButton>
            )}
        </>
    );
}

SearchResultList.propTypes = {
    issues: PropTypes.any.isRequired
};
