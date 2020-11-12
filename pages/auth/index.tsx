import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@material-ui/core';
import React from 'react';

export default function Index() {
    return (
        <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3} alignContent={'center'}>
                <Button
                    size='large'
                    color='primary'
                    variant='contained'
                    startIcon={<FontAwesomeIcon icon={faGithub} />}
                    onClick={() => {
                        location.href = '/api/auth/github';
                    }}
                >
                    Login
                </Button>
            </Grid>
        </Grid>
    );
}
