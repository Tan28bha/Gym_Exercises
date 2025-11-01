import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

const ExerciseCard = ({ exercise }) => {
  const [imageError, setImageError] = useState(false);
  
  if (!exercise || !exercise.id) return null;

  const imageUrl = exercise.gifUrl || exercise.gif;

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      {imageUrl && !imageError ? (
        <img 
          src={imageUrl} 
          alt={exercise.name || 'Exercise'} 
          loading="lazy"
          onError={() => setImageError(true)}
        />
      ) : (
        <div 
          style={{ 
            width: '100%', 
            height: '200px', 
            background: '#f0f0f0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Typography color="#999">No Image Available</Typography>
        </div>
      )}
      <Stack direction="row">
        {exercise.bodyPart && (
          <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
            {exercise.bodyPart}
          </Button>
        )}
        {exercise.target && (
          <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
            {exercise.target}
          </Button>
        )}
      </Stack>
      <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
        {exercise.name || 'Unnamed Exercise'}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;