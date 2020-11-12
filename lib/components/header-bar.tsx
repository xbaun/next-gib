import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { KeyboardBackspace } from '@material-ui/icons';
import { useRouter } from 'next/router';
import PropTypes, { InferProps } from 'prop-types';
import { useSelector } from 'react-redux';
import styles from '../../styles/Home.module.css';
import { getAuth } from '../store/selectors/auth.selectors';

export default function HeaderBar(props: InferProps<typeof HeaderBar.propTypes>) {
    const router = useRouter();
    const auth = useSelector(getAuth);

    return (
        <AppBar position='static'>
            <Toolbar>
                {props.backRoute && (
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        onClick={() => router.push(props.backRoute!)}
                    >
                        <KeyboardBackspace />
                    </IconButton>
                )}
                <Typography variant='h6'>{props.title}</Typography>
                <div className={styles.grow} />
                {auth.profile?.photos?.[0]?.value && (
                    <>
                        <Typography variant='body1' className={styles.displayName}>
                            Hi {auth.profile.displayName}
                        </Typography>
                        <Avatar src={auth.profile.photos[0].value} />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

HeaderBar.propTypes = {
    backRoute: PropTypes.string,
    title: PropTypes.string.isRequired
};
