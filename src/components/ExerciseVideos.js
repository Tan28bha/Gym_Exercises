import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import Loader from './Loader';

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!Array.isArray(exerciseVideos) || !exerciseVideos.length) {
    return (
      <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
        <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} fontWeight={700} color="#000" mb="33px">
          Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name || 'Exercise'}</span> exercise videos
        </Typography>
        <Loader />
      </Box>
    );
  }

  // Filter and map valid videos
  const validVideos = exerciseVideos
    .filter(item => {
      // Handle different possible API response structures
      const video = item?.video || item;
      return video && (video.videoId || video.id);
    })
    .slice(0, 3);

  if (!validVideos.length) {
    return (
      <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
        <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} fontWeight={700} color="#000" mb="33px">
          Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name || 'Exercise'}</span> exercise videos
        </Typography>
        <Typography>No videos available at the moment.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: { lg: '203px', xs: '20px' } }} p="20px">
      <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } }} fontWeight={700} color="#000" mb="33px">
        Watch <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>{name || 'Exercise'}</span> exercise videos
      </Typography>
      <Stack sx={{ flexDirection: { lg: 'row' }, gap: { lg: '110px', xs: '0px' } }} justifyContent="flex-start" flexWrap="wrap" alignItems="center">
        {validVideos.map((item, index) => {
          // Handle different possible API response structures
          const video = item?.video || item;
          const videoId = video?.videoId || video?.id;
          const thumbnail = video?.thumbnails?.[0]?.url || video?.thumbnail || video?.thumbnails?.[0];
          const title = video?.title || 'Exercise Video';
          const channelName = video?.channelName || video?.channel?.name || '';

          if (!videoId) return null;

          return (
            <a
              key={videoId || index}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              {thumbnail ? (
                <img style={{ borderTopLeftRadius: '20px', width: '100%', maxWidth: '350px' }} src={thumbnail} alt={title} />
              ) : (
                <div style={{ width: '350px', height: '200px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '20px' }}>
                  <Typography color="#999">No Thumbnail</Typography>
                </div>
              )}
              <Box>
                <Typography sx={{ fontSize: { lg: '28px', xs: '18px' } }} fontWeight={600} color="#000">
                  {title}
                </Typography>
                {channelName && (
                  <Typography fontSize="14px" color="#000">
                    {channelName}
                  </Typography>
                )}
              </Box>
            </a>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;