import React from 'react'
import { useState, useEffect } from 'react';
import "./TodayClock.css"
import getCurrentTime from '../utils/getCurrenTime';

export default function TodayClock() {
  const getNow = () => new Date();
  const [currentTime, setCurrentTime] = useState(getNow());
  const [month_, date_, minutes_, hours_] = getCurrentTime(currentTime);

  useEffect(() => {
    const resetClock = setInterval(() => {
      setCurrentTime(getNow());
    }, 30000);
  }, [setCurrentTime])

  return (
    <div className='todayClock'>
      <div className='todayClock__day'>
        {currentTime.getFullYear()}년 {month_}월 {date_}일
      </div>
      <div className='todayClock__time'>
        {hours_}시 {minutes_}분
      </div>
    </div>
  )
}
