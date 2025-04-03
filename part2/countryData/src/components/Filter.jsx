const Filter = ({filterInput, handleFilterChange}) => {
    return (
      <div>Search: <input
      value={filterInput} 
      onChange={handleFilterChange} />
      </div>
    )
  }

export default Filter