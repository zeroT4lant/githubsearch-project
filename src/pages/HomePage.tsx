import React, { useEffect} from 'react'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import RepoCard from '../components/RepoCard';

const HomePage : React.FC = () => {
  const searchRef = React.useRef<HTMLInputElement>(null);
  const [dropdown,setDropdown]=React.useState(false);
  const [search,setSearch]=React.useState('');
  const debounced = useDebounce(search)

  const {isLoading, isError, data} = useSearchUsersQuery(debounced,{
    skip: debounced.length < 3,
    refetchOnFocus: true
  });

  const [fetchRepos, {isLoading : areReposLoading, data : repos}] = useLazyGetUserReposQuery()

  const onClickSearch = () => {
    setDropdown(!dropdown)
  }

  const clickHandler = (username : string) => {
    fetchRepos(username);
    setDropdown(false)
  }

  React.useEffect(() => {//закрывает сортировку, если кликнул вне неё
    const handleClickOutside: EventListenerOrEventListenerObject = (event) => {
      let path;
      if (searchRef.current) {
        path = event.composedPath().includes(searchRef.current)
      }
      if (!path) {
        console.log("click")
        setDropdown(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
  },[debounced,data])

  console.log(data)
  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      {isError && <p className='text-center text-red-600'>Something went wrong</p>}
    <div className='relative w-[560px]'>
      <input
        ref={searchRef}
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
          onClick={() => clickHandler(user.login)}
          key={user.id}
          className='cursor-pointer py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors'
          >{user.login}</li>
        ))}
      </ul>}

      <div className='container'>
          {areReposLoading && <p className='text-center'>Repos are loading...</p>}
          {repos?.map(repo => <RepoCard key={repo.id} repo={repo}/>)}
      </div>

      </div>
    </div>
  )
}

export default HomePage