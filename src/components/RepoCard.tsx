import React from 'react'
import { IRepo } from '../models/models'

const RepoCard = ({repo}: {repo : IRepo}) => {
  return (
    <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
        <a href={repo.html_url} target='_blank'>
        <h2 className='text-lg font-bold mr-2'>{repo.full_name}</h2>
        <p>
            Forks: <span className='font-bold'>{repo.forks}</span>
        </p>
        <p className='text-sm font-thin'>
            {repo?.description}
        </p>
        </a>
    </div>
  )
}

export default RepoCard