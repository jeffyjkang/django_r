export default function Pagination(props) {
  const { pageIndex, total, perPage, onNext, onPrev } = props;
  const lastPage = Math.ceil(total / perPage);
  return (
    <div className='pagination'>
      <div className='pagination-actions'>
        { pageIndex > 1 && <button onClick={onPrev} />}
        { pageIndex < lastPage && <button onClick={onNext} />}
      </div>
      <div className='pagination-stats'>
        Page {pageIndex} of {lastPage} &nbsp;
        (displaying {perPage} items per page)
      </div>
    </div>
  )
}
