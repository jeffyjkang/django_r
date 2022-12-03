import { useState } from "react"
import './list.css'

export default function Filters(props) {

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [search, setSearch] = useState('')

  const applyFilter = () => {
    props.updateFilter({minPrice,maxPrice,search})
  }

  return (
    <section className='filters'>
      <label>Price</label>
      <input
        placeholder='Minimum'
        type='text'
        size='7'
        name='price_min'
        value={minPrice}
        onChange={(e)=>setMinPrice(e.target.value)}
      />
      <input
        placeholder='Maximum'
        type='tet'
        size='7'
        name='price_max'
        value={maxPrice}
        onChange={(e)=>setMaxPrice(e.target.value)}
      />
      <label>Search</label>
      <input
        placeholder='Try typing in "hiking"'
        type='text'
        size='20'
        name='search'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button onClick={applyFilter}>Apply</button>
    </section>
  )
}