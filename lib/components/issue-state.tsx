import { Avatar, useTheme } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Check } from '@material-ui/icons';
import React from 'react';
import * as Types from '../gql/types.graphql-gen';
import { IssueEntity } from '../store/reducers/issues/issues.state';

export function IssueState({ issue }: { issue: IssueEntity }) {
    const theme = useTheme();

    switch (issue?.data?.state) {
        case Types.IssueState.Open:
            return (
                <Avatar
                    style={{
                        color: theme.palette.getContrastText(deepOrange[500]),
                        backgroundColor: deepOrange[500]
                    }}
                >
                    !
                </Avatar>
            );
        case Types.IssueState.Closed:
            return (
                <Avatar>
                    <Check />
                </Avatar>
            );
    }

    return null;
}
