import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    createStyles,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Theme,
    Typography,
    useTheme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { formatDistance } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CenteredButton } from '../../lib/components/centered-button';
import { CenteredTextCard } from '../../lib/components/centered-text-card';
import HeaderBar from '../../lib/components/header-bar';
import { IssueState } from '../../lib/components/issue-state';
import { fetchIssue, fetchIssueComments } from '../../lib/store/actions';
import {
    selectComments,
    selectHasMoreComments
} from '../../lib/store/selectors/comments.selectors';
import { selectIssueById } from '../../lib/store/selectors/issues.selectors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: theme.spacing(2),
            padding: theme.spacing(2)
        },
        paper: {
            height: 140,
            width: 100
        },
        control: {
            padding: theme.spacing(2)
        }
    })
);

const Issue = () => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();

    const number = (typeof router.query.number === 'string' && +router.query.number) || undefined;

    if (number && isNaN(number)) {
        router.push('/');
    }

    const issue = useSelector(selectIssueById(number));
    const comments = useSelector(selectComments(number));
    const haseMoreComments = useSelector(selectHasMoreComments(number));

    useEffect(() => {
        if (number) {
            dispatch(fetchIssue({ number }));
            dispatch(fetchIssueComments({ number, more: false }));
        }
    }, [number]);

    let component: React.ReactElement | undefined = undefined;

    if (issue?.exists === false) {
        component = (
            <CenteredTextCard>
                <Typography component='span'>No Issue #{number} found!</Typography>
            </CenteredTextCard>
        );
    } else if (issue?.data === undefined) {
        component = (
            <Grid container direction='row' justify='center' alignItems='center'>
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        );
    } else {
        component = (
            <>
                <Grid container className={classes.root} spacing={4}>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader
                                avatar={<IssueState issue={issue} />}
                                title={issue.data.title}
                                titleTypographyProps={{ variant: 'h5' }}
                            />
                            <CardContent>
                                <Divider />
                                <div
                                    dangerouslySetInnerHTML={{ __html: issue.data.bodyHTML }}
                                ></div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title='Author' />
                            <CardContent>
                                <Grid container justify='center' alignItems='center' spacing={2}>
                                    <Grid item>
                                        <Avatar
                                            alt={issue.data.author?.login}
                                            src={issue.data.author?.avatarUrl}
                                        />
                                    </Grid>
                                    <Grid>
                                        <Typography>{issue.data.author?.login}</Typography>
                                        <Typography variant='caption' display='block' gutterBottom>
                                            {formatDistance(
                                                new Date(issue.data.publishedAt),
                                                new Date(),
                                                {
                                                    addSuffix: true
                                                }
                                            )}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <br />
                        {issue.data.labels?.nodes?.length && (
                            <Card>
                                <CardHeader title='Labels' />
                                <CardContent>
                                    {issue.data.labels?.nodes?.map(
                                        (label) =>
                                            label && (
                                                <Chip
                                                    key={label.id}
                                                    style={{
                                                        marginBottom: theme.spacing(1),
                                                        marginRight: theme.spacing(1)
                                                    }}
                                                    label={label.name}
                                                />
                                            )
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
                <Card style={{ margin: theme.spacing(2) }}>
                    <CardHeader title='Comments' />
                    <CardContent>
                        <List className={classes.root}>
                            {comments.map((comment) => (
                                <ListItem
                                    divider
                                    key={`${comment.data?.id}`}
                                    alignItems='flex-start'
                                >
                                    <ListItemAvatar>
                                        <Avatar src={comment.data?.author?.avatarUrl}></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Typography variant='body2'>
                                                {comment.data?.author?.login},{' '}
                                                {comment.data?.publishedAt &&
                                                    formatDistance(
                                                        new Date(comment.data?.publishedAt),
                                                        new Date(),
                                                        {
                                                            addSuffix: true
                                                        }
                                                    )}{' '}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography
                                                component='div'
                                                dangerouslySetInnerHTML={{
                                                    __html: comment.data?.bodyHTML
                                                }}
                                            ></Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                        {haseMoreComments && (
                            <CenteredButton
                                onClick={() => {
                                    if (number) {
                                        dispatch(fetchIssueComments({ number, more: true }));
                                    }
                                }}
                            >
                                Load more
                            </CenteredButton>
                        )}
                    </CardContent>
                </Card>
            </>
        );
    }

    return (
        <>
            <HeaderBar backRoute={'/'} title={`Issue: #${number}`} />
            {component}
        </>
    );
};

export default Issue;
