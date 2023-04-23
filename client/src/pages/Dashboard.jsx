import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getMostPopularPodcast } from '../api/index';
import { getPodcastByCategory } from '../api';
import { PodcastCard } from '../components/PodcastCard.jsx'

const DashboardMain = styled.div`
padding: 30px 0px;
`;
const FilterContainer = styled.div`
margin:20px 20px ;
padding: 24px;
// background-color: ${({ theme }) => theme.bg};
display: flex;
flex-direction: column;
justify-content: flex-start;

`;
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
`;
const Podcasts = styled.div`
display: flex;
flex-direction: row;
overflow-y: hidden;
gap: 12px;


`;

const Dashboard = () => {
  const [mostPopular, setMostPopular] = useState([]);
  const [comedy, setComedy] = useState([1]);
  const numberOfPicture=[1,2,3,4];

  useEffect(() => {
    getMostPopularPodcast()
      .then((res) => {
        setMostPopular(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, [])

  useEffect(() => {
    getPodcastByCategory("comedy")
      .then((res) => {
        setMostPopular(res.data)
        console.log(res.data)
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <DashboardMain>
      <FilterContainer>
        <Topic>Most Popular</Topic>
        <Podcasts>
        {mostPopular.map((podcast) => (
              <PodcastCard podcast={podcast}/>
            ))}
        </Podcasts>
      </FilterContainer>
      <FilterContainer>
        <Topic>Comedy</Topic>
        {/* <Podcasts>
          {comedy.map((podcast) => (
            <PodcastCard />
          ))}
        </Podcasts> */}
      </FilterContainer>
    </DashboardMain>
  )
}

export default Dashboard