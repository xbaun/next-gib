import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SearchBar } from '../lib/components/search-bar';
import { SearchResults } from '../lib/components/search-results';
import { getAuth } from '../lib/store/selectors/auth.selectors';
import styles from '../styles/Home.module.css';

export default function Home() {
    const auth = useSelector(getAuth);

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6'>Git Hub Issue Browser</Typography>
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
            <SearchBar />
            <SearchResults />
        </>
    );
}
