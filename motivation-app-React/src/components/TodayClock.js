import React from 'react'
import { useState, useEffect } from 'react';
import { getCurrentTime } from '../utils/functions'
import styled from 'styled-components';

export default function TodayClock() {
  const getNow = () => new Date();
  const [currentTime, setCurrentTime] = useState(getNow());
  const [month, date, minutes, hours] = getCurrentTime(currentTime);

  useEffect(() => {
    const resetClock = setInterval(() => {
      setCurrentTime(getNow());
    }, 30000);
  }, [setCurrentTime])

  return (
    <ClockSection>
      <div>
        {currentTime.getFullYear()}년 {month}월 {date}일
      </div>
      <div>
        {hours}시 {minutes}분
      </div>
    </ClockSection>
  )
}

const ClockSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  text-align: center;
`
