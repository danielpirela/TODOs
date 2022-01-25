import React from 'react';
import './styles/TodoSearch.css';

function TodoSearch({searchValue, setSearchValue}) {
  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value)
    return searchValue
  };

  return (
    <div className={`container-search ${searchValue && 'container-search--active'}`}>
    <input
      className={`TodoSearch ${searchValue && 'TodoSearch--active'}`}
      placeholder="Search..."
      value={searchValue}
      onChange={onSearchValueChange}
    />
    <div className={`${searchValue && 'container-search-value'}`}>
    <p className={`${searchValue && 'search-value'}`}>{searchValue}</p>
    </div>
  </div>
  );
}

export { TodoSearch };
