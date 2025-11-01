import React, { useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';

import BodyPartImage from '../assets/assets/icons/body-part.png';
import TargetImage from '../assets/assets/icons/target.png';
import EquipmentImage from '../assets/assets/icons/equipment.png';

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail || {};
  const [imageError, setImageError] = useState(false);

  if (!name) return null;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ].filter(item => item.name); // Filter out items without names

  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      {(gifUrl || exerciseDetail?.gif) && !imageError ? (
        <img 
          src={gifUrl || exerciseDetail?.gif} 
          alt={name} 
          loading="lazy" 
          className="detail-image"
          onError={() => setImageError(true)}
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <div 
          style={{ 
            width: '100%', 
            maxWidth: '500px', 
            height: '400px', 
            background: '#f0f0f0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: '20px' 
          }}
        >
          <Typography color="#999">No Image Available</Typography>
        </div>
      )}
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography sx={{ fontSize: { lg: '64px', xs: '30px' } }} fontWeight={700} textTransform="capitalize">
          {name}
        </Typography>
        <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C">
          Exercises keep you strong.{' '}
          <span style={{ textTransform: 'capitalize' }}>{name}</span> is one
          of the best <br /> exercises to target your {target}. It will help you improve your{' '}
          <br /> mood and gain energy.
        </Typography>
        {extraDetail?.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            <Button sx={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={item.name} style={{ width: '50px', height: '50px' }} />
            </Button>
            <Typography textTransform="capitalize" sx={{ fontSize: { lg: '30px', xs: '20px' } }}>
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;