import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercise';

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      try {
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

        const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
        setExerciseDetail(exerciseDetailData || {});

        if (exerciseDetailData?.name) {
          try {
            const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
            // Handle different possible response structures from YouTube API
            if (Array.isArray(exerciseVideosData?.contents)) {
              setExerciseVideos(exerciseVideosData.contents);
            } else if (Array.isArray(exerciseVideosData)) {
              setExerciseVideos(exerciseVideosData);
            } else if (exerciseVideosData?.data?.contents) {
              setExerciseVideos(Array.isArray(exerciseVideosData.data.contents) ? exerciseVideosData.data.contents : []);
            } else {
              setExerciseVideos([]);
            }
          } catch (videoError) {
            console.error('Error fetching videos:', videoError);
            setExerciseVideos([]);
          }
        }

        if (exerciseDetailData?.target) {
          const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
          setTargetMuscleExercises(Array.isArray(targetMuscleExercisesData) ? targetMuscleExercisesData : []);
        }

        if (exerciseDetailData?.equipment) {
          const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
          setEquipmentExercises(Array.isArray(equimentExercisesData) ? equimentExercisesData : []);
        }
      } catch (error) {
        console.error('Error fetching exercise details:', error);
        setExerciseDetail({});
        setExerciseVideos([]);
        setTargetMuscleExercises([]);
        setEquipmentExercises([]);
      }
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;