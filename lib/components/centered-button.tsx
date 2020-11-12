import { Box, Button } from '@material-ui/core';
import React, { MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';

export function CenteredButton({
    onClick,
    children
}: {
    onClick?: MouseEventHandler;
    children: React.ReactNode;
}) {
    const dispatch = useDispatch();

    return (
        <Box textAlign='center'>
            <Button variant='contained' color='primary' onClick={(e) => onClick?.(e)}>
                <>{children}</>
            </Button>
        </Box>
    );
}
