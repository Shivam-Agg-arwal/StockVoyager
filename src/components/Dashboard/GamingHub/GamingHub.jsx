import React from 'react'
import { Link } from 'react-router-dom'
import WordSearch from './Games/WordSearch/WordSearch'

const GamingHub = () => {
  return (
    <div>
        <Link to='/dashboard/gamingHub/speedyMath'>Speedy Math</Link>
        <Link to='/dashboard/gamingHub/financialQuiz'>Financial Quiz</Link>
        <Link to='/dashboard/gamingHub/whoGetsMore'>Who Gets More</Link>
        <Link to='/dashboard/gamingHub/wordSearch'>Word Search</Link>
    </div>
  )
}

export default GamingHub