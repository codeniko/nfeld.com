/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ThemedLink from 'components/ThemedLink'
import PlayStoreSvg from 'assets/icons/playstore.svg'

const YahooMail = () => {
    const theme = useTheme()

    const Bullet = props => (
        <Typography
            variant="h6"
            color="text.primary"
            // align={'center'}
            sx={{
                color: theme.palette.common.white,
            }}
        >
            {props.children}
        </Typography>
    )

    return (
        <Box>
            <Typography
                variant="h2"
                align={'center'}
                gutterBottom
                sx={{
                    fontWeight: 900,
                    color: theme.palette.common.white,
                    textTransform: 'uppercase',
                }}
            >
                Yahoo Mail
            </Typography>
            <Typography
                variant="h6"
                component="p"
                color="text.primary"
                align={'center'}
                sx={{
                    color: theme.palette.common.white,
                }}
            >
            {/*    Working on new experiences for the 20+ million daily active users of the Android Yahoo Mail app.*/}
                Implemented various amounts of new features and design changes for the 20+ million daily active users of the Yahoo Mail android app.
                Primary focus on notifications which have the biggest impact on DAUs, engagement, and ultimately revenue.
                {/*Implemented an Augmented Reality advertisement experiment for trying out furniture products in your home.*/}
                <br/><br/>
                Close collaboration with various product/engineering managers, designers, and engineers across multiple teams.
                Gave Dev Talks and Demos to Org members and leadership on new features and interests such as reverse engineering APKs.
                On rotation for build watching, release management and monitoring.
                Mentored junior teammates and interns.
                Actively interview potential candidates.
                Always reviewing code to ensure highest quality of code is merged.
                Submitted a patent request.

                <br/><br/>
                <ThemedLink secondary bold href={'https://play.google.com/store/apps/details?id=com.yahoo.mobile.client.android.mail'} target={'_blank'}>Find app on the <PlayStoreSvg width={16}/> Play Store</ThemedLink>

            </Typography>

            {/*<ul>*/}
            {/*    /!*<li>Worked on two major app releases (v6 and v7) and rewrite of the app using an in-house built flux architecture.</li>*!/*/}
            {/*    /!*<li><Bullet>Implemented various amounts of new features and design changes for the 20+ million daily active users of the Android Yahoo Mail app.</Bullet></li>*!/*/}
            {/*    /!*<li>Redesigned the highly visible collapsable toolbar and its navigation pills to other screens.</li>*!/*/}
            {/*    /!*<li>Introduced first lines of kotlin into the repository which led to an effort to go 100% kotlin.</li>*!/*/}
            {/*    <li><Bullet>Primary focus on notifications which have the biggest impact on DAUs, engagement, and ultimately revenue.</Bullet></li>*/}
            {/*    */}
            {/*    /!*<li>Resolved user complaints/feedbacks regarding notifications and issues caused by evolving android battery optimizations.</li>*!/*/}
            {/*    /!*<li>Pitched to PMs and built a notification troubleshooting screen in app settings that checks for and resolves common issues around notification related subscriptions, in-app settings, channels, and lack of push tokens for phones without Play Store.</li>*!/*/}
            {/*    /!*<li>Standardized the push notification payload allowing us to show new notification types with minimum or no client work.</li>*!/*/}
            {/*    /!*<li>Launched Coronavirus and Election 2020 news notifications.</li>*!/*/}
            {/*    */}
            {/*    <li><Bullet>Implemented an Augmented Reality advertisement experiment for trying out furniture products in your home.</Bullet></li>*/}
            {/*    <li><Bullet>Close collaboration with various product/engineering managers, designers, and engineers across many teams.</Bullet></li>*/}
            {/*    */}
            {/*    <li><Bullet>Mentored junior teammates and interns.</Bullet></li>*/}
            {/*    /!*<li>Mentored junior team members and interns in our coding practices, kotlin, and functional programming.</li>*!/*/}
            {/*    */}
            {/*    <li><Bullet>Gave Dev Talks and Demos to Org members and leadership on new features and interests such as reverse engineering APKs.</Bullet></li>*/}
            {/*    /!*<li><Bullet>Gave Dev Talks around discoveries and interests such reverse engineering APKs.</Bullet></li>*!/*/}
            {/*    /!*<li>Gave Dev Talks regarding everything notifications, battery optimizations such as Doze Mode and AppStandby buckets, AnimatedVectorDrawables, string.xml annotations, and reverse engineering APKs</li>*!/*/}
            {/*    */}
            {/*    <li><Bullet>Thorough code reviews to ensure highest quality of code is merged.</Bullet></li>*/}
            {/*    <li><Bullet>On rotation for build watching, release management and monitoring.</Bullet></li>*/}
            {/*    <li><Bullet>Interview potential candidates.</Bullet></li>*/}
            {/*    */}
            {/*    <li><Bullet>Submitted a patent request</Bullet></li>*/}
            {/*    /!*<li><Bullet>Submitted a patent request for a system to validate email addresses for users prior to them being sent out to avoid a negative impact to users' sender score.</Bullet></li>*!/*/}
            {/*</ul>*/}
        </Box>
    )
}

export default YahooMail
