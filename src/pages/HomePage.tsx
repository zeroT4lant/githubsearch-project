import React, { useEffect, useState } from 'react'
import { useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';

const HomePage : React.FC = () => {
  const [dropdown,setDropdown]=useState(false);
  const [search,setSearch]=useState('');
  const debounced = useDebounce(search)

  useEffect(() => {
    console.log(debounced)
  },[search])

  const onClickSearch = () => {
    setDropdown(!dropdown)
  }

  const {isLoading, isError, data} = useSearchUsersQuery(debounced,{skip: debounced.length < 3});
  console.log(data)
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && <p className='text-center text-red-600'>Something went wrong</p>}
    <div className='relative w-[560px]'>
      <input
        onClick={onClickSearch}
        type="text"
        className='border py-2 px-4 w-full h-[42px] mb-2'
        placeholder='search for github username'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      
      {dropdown && <ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white'>
        {isLoading && <p className='text-center'>Loading...</p>}
        {data?.map(user => (
          <li 
          key={user.id}
          className='cursor-pointer py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors'
          >{user.login}</li>
        ))}
      </ul>}
    </div>
    </div>
  )
}

export default HomePage