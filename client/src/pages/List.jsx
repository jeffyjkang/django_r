import { useContext, useState } from "react"
import { AppContext } from "../App"
import api from '../api/service_api'
import Filters from "../components/list/Filters"
import Item from "../components/list/Item"
import Pagination from "../components/list/Pagination"

export default function List() {

  const appContext = useContext(AppContext);
  const [listState, setListState] = useState({
    list: [],
    pageIndex: 1,
    totalItems: 0,
    filters: {
      minPrice: null,
      maxPrice: null,
      search: null
    }
  })

  const updateList = () => {
    const { pageIndex, filters } = listState;
    const queryParams = {};
    if (filters.minPrice) {
      queryParams.price_min = filters.minPrice;
    }
    if (filters.maxPrice) {
      queryParams.price_max = filters.maxPrice;
    }
    if (filters.search && filters.search.length > 0) {
      queryParams.search = filters.search
    }
    (async () => {
      const res = await api.retrieveList(pageIndex, queryParams)
      const { results, count } = res;
      setListState({...listState, list: results, totalItems: count})
    })()
  }

  const prevPage = () => {
    setListState({...listState, pageIndex: listState.pageIndex++})
    updateList()
  }

  const nextPage = () => {
    setListState({...listState, pageIndex: listState.pageIndex--})
    updateList()
  }

  const updateFilter = (filters) => {
    setListState({...listState, filters})
    updateList()
  }

  return (
    <>
      <section>
        <header>
          <Filters updateFilter={updateFilter}/>
        </header>
      </section>
      <section>
        {
          listState.list.map((item) => (
            <Item
              key={item.id}
              route={`/details/${item.id}`}
              item={item}
              wishlist={appContext.wishlist}
              toggleWishlist={appContext.toggleWishlist}
            />
          ))
        }
      </section>
      <section>
        <footer>
          <Pagination
            pageIndex={listState.pageIndex}
            total={listState.totalItems}
            perPage={9}
            onPrev={prevPage}
            onNext={nextPage}
          />
        </footer>
      </section>
    </>
  )
}
