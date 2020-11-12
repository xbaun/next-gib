import { Card, CardContent, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing(2),
        justifyContent: 'center'
    }
}));

export function CenteredTextCard({ children }: { children: React.ReactNode }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <>{children}</>
            </CardContent>
        </Card>
    );
}
