import {useState} from 'react'

const Search = () => {
    const [search,setSearch]=useState('')
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e=>setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
    </div>
  );
};

export default Search;
