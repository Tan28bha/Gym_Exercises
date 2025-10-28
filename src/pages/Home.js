import React,{useState} from 'react'
import { Box } from '@mui/material'

const home = () => {
  return (
    <Box>
        <HeroBanner/>
        <SearchExercises/>
        <Exercises/>
    </Box>
  )
}

export default home