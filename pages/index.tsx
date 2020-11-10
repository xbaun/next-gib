import { AppBar, Avatar, Toolbar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SearchBar } from '../lib/components/search-bar';
import { SearchResults } from '../lib/components/search-results';
import { getAuth } from '../lib/store/selectors/auth.selectors';
import styles from '../styles/Home.module.css';

export default function Home() {
    const auth = useSelector(getAuth);
    console.log(auth);
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

    // return (
    //     <div className={styles.container}>
    //         <Head>
    //             <title>GitHub Issue Browser</title>
    //             <link rel='icon' href='/favicon.ico' />
    //         </Head>
    //
    //         <main className={styles.main}>{/*<Search*/}</main>
    //
    //         <footer className={styles.footer}>
    //             <a
    //                 href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
    //                 target='_blank'
    //                 rel='noopener noreferrer'
    //             >
    //                 Powered by <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
    //             </a>
    //         </footer>
    //     </div>
    // );
}
