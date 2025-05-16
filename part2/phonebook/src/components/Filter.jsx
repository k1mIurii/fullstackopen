const Filter = ({ handleSearch, search }) => {
  return (
    <div>
      filter show with: <input onChange={handleSearch} value={search}/>
    </div>
  )
}

export default Filter