import React from 'react'
import { useState, useEffect } from 'react';

export default function TodayClock() {
  const getNow = () => new Date();
  const [currentTime, setCurrentTime] = useState(getNow())

  const todayClock = [
    { text: '년', value: currentTime.getFullYear() },
    { text: '월', value: currentTime.getMonth() + 1 },
    { text: '일', value: currentTime.getDate() },
    { text: '요일', value: currentTime.getDay() },
    { text: '시', value: currentTime.getHours() },
    { text: '분', value: currentTime.getMinutes() }
  ];

  useEffect(() => {
    const resetClock = setInterval(() => {
      setCurrentTime(getNow());
    }, 1000);
  }, [setCurrentTime])

  return (
    <>
      <div>
        {currentTime.getFullYear()}년 {currentTime.getMonth() + 1}월 {currentTime.getDate()}일
      </div>
      <div>
        {currentTime.getHours()} : {currentTime.getMinutes()}
      </div>
    </>
  )
}
