/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ThemedLink from 'components/ThemedLink'
import GithubIcon from 'components/GithubIcon'

const Popchat = () => {
    const theme = useTheme()

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
                Popchat
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
                Inception and development of PopChat for Yahoo - a fun chatbot designed to provide personal assistance through a chat platform (Kik/Facebook). Ranked 2nd overall on Kik's bot shop, handling over 25 Million messages, peaking at ~500 requests per minute. Proxied over 200k messages between users before being discontinued November 30, 2017.
                <br/><br/>
                Development with Scala, Play framework, and Akka clustering with focus on scalable functional programming.
                <br/><br/>
                Developed separate backend in python to utilize dlib and tensorflow to perform on-the-fly transformations on images given by users. Trained a facial recognition model containing 13 points around the forehead, totaling 81 facial landmarks which enabled more accurate transformations around the head. Used Protobuf for communication between the two backends. Created a QA tool for contractors to evaluate bot's image operation results on thousands of images.
                <br/><br/>
                <ThemedLink secondary href={'https://yahoo.tumblr.com/post/153480238449/yahoo-brings-on-the-fun-bots-trivia-with-friends'} target={'_blank'}>See bot's promotional post</ThemedLink><br/>
                <ThemedLink secondary href={'https://github.com/codeniko/shape_predictor_81_face_landmarks'} target={'_blank'}><GithubIcon/> See facial recognition model I trained</ThemedLink><br/>
            </Typography>
        </Box>
    )
}

export default Popchat
