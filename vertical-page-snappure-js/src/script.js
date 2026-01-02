
function scrollToItem(event) {
  let scroller = document.querySelector('.gallery-scroller')
  let itemSize = document.querySelector('.gallery-item').clientHeight
  let pageItem = event.target.offsetTop / 25
  scroller.scrollTo({ top: pageItem * itemSize, left: 0, behavior: 'smooth' })

  let items = [...document.querySelectorAll('.pagination-item')]

  items.forEach(item => {
    if (item === event.target)
      event.target.classList.add('active')
    else
      item.classList.remove('active')
  })
}

function scrollPagination(event) {
  let itemSize = document.querySelector('.gallery-item').clientHeight
  let pageIndex = Math.floor(event.target.scrollTop / itemSize)
  let paginationItems = [...document.querySelectorAll('.pagination-item')]

  paginationItems.forEach(item => item.classList.remove('active'))
  
  document.querySelector(`.pagination-item:nth-child(${pageIndex + 1})`).classList.add('active')
}

document.querySelector('.pagination').addEventListener('click', scrollToItem)
document.querySelector('.gallery-scroller').addEventListener('scroll', _.debounce(scrollPagination, 100), { passive: true })
