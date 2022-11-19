function renderStar(num) {
  switch (num) {
    case '1':
      return '★☆☆☆☆ 很差';
    case '2':
      return '★★☆☆☆ 较差';
    case '3':
      return '★★★☆☆ 还行';
    case '4':
      return '★★★★☆ 推荐';
    case '5':
      return '★★★★★ 力荐';
    default:
      return '';
  }
}

function siblings(ele) {
  let siblingElement = [];
  let sibs = ele.parentNode.children;
  for (let i = 0; i < sibs.length; i++) {
    if (sibs[i] !== ele) {
      siblingElement.push(sibs[i]);
    }
  }
  return siblingElement;
}

function fetchBook(id, action) {
  return fetch("https://mouban.mythsman.com/guest/user_book?action=" + action + "&id=" + id, {
    method: "GET",
  })
    .then(res => {
      return res.json()
    })
    .then(response => {
      let books = []

      let bookResult = response.result
      for (let i in bookResult.comment) {
        let comment = bookResult.comment[i]
        let pubs = []
        comment.item.author && pubs.push(comment.item.author)
        comment.item.translator && pubs.push(comment.item.translator)
        comment.item.press && pubs.push(comment.item.press)
        comment.item.producer && pubs.push(comment.item.producer)

        let meta = []
        comment.mark_date && meta.push(comment.mark_date)
        comment.label && meta.push(comment.label)
        comment.rate && meta.push(renderStar(comment.rate + ''))
        books.push({
          title: comment.item.title,
          alt: "https://book.douban.com/subject/" + comment.item.douban_id + "/",
          image: comment.item.thumbnail,
          pub: pubs.join(" / ").substr(0, 500),
          meta: meta.join(" / "),
          comment: comment.comment
        })
      }
      return books
    })
}

function fetchGame(id, action) {
  return fetch("https://mouban.mythsman.com/guest/user_game?action=" + action + "&id=" + id, {
    method: "GET",
  })
    .then(res => res.json())
    .then(response => {
      let games = []
      let gameResult = response.result
      for (let i in gameResult.comment) {
        let comment = gameResult.comment[i]
        let pubs = []
        comment.item.platform && pubs.push(comment.item.platform)
        comment.item.genre && pubs.push(comment.item.genre)
        comment.item.developer && pubs.push(comment.item.developer)
        comment.item.publisher && pubs.push(comment.item.publisher)

        let meta = []
        comment.mark_date && meta.push(comment.mark_date)
        comment.label && meta.push(comment.label)
        comment.rate && meta.push(renderStar(comment.rate + ''))

        games.push({
          title: comment.item.title,
          alt: "https://www.douban.com/game/" + comment.item.douban_id + "/",
          image: comment.item.thumbnail,
          pub: pubs.join(" / ").substr(0, 500),
          meta: meta.join(" / "),
          comment: comment.comment
        })
      }
      return games;
    })

}

function fetchMovie(id, action) {
  let movies = []
  return fetch("https://mouban.mythsman.com/guest/user_movie?action=" + action + "&id=" + id, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(response => {
      let movieResult = response.result
      for (let i in movieResult.comment) {
        let comment = movieResult.comment[i]
        let pubs = []
        comment.item.director && pubs.push(comment.item.director)
        comment.item.writer && pubs.push(comment.item.writer)
        comment.item.actor && pubs.push(comment.item.actor)
        comment.item.publish_date && pubs.push(comment.item.publish_date)
        let meta = []
        comment.mark_date && meta.push(comment.mark_date)
        comment.label && meta.push(comment.label)
        comment.rate && meta.push(renderStar(comment.rate + ''))

        movies.push({
          title: comment.item.title,
          alt: "https://movie.douban.com/subject/" + comment.item.douban_id + "/",
          image: comment.item.thumbnail,
          pub: pubs.join(" / ").substr(0, 500),
          meta: meta.join(" / "),
          comment: comment.comment
        })
      }
      return movies
    })

}

function fetchUser(id) {
  return fetch("https://mouban.mythsman.com/guest/check_user?id=" + id, {
    method: 'GET',
  })
    .then(res => {
      return res.json()
    })
    .then(response => {
      return response.result
    })

}


(() => {

  const douban_id = document.getElementById("douban-script").getAttribute("data-douban-id")
  const page_size = parseInt(document.getElementById("douban-script").getAttribute("data-douban-page-size"))

  let douban_storage = {}
  let page_index = 0
  let page_max = 1
  let page_id = "douban-book-collect"

  fetchUser(douban_id).then(data => {
    document.getElementById("douban-book-wish").innerText = "想读(" + data.book_wish + ")"
    document.getElementById("douban-book-collect").innerText = "读过(" + data.book_collect + ")"
    document.getElementById("douban-book-do").innerText = "在读(" + data.book_do + ")"

    document.getElementById("douban-movie-wish").innerText = "想看(" + data.movie_wish + ")"
    document.getElementById("douban-movie-collect").innerText = "看过(" + data.movie_collect + ")"
    document.getElementById("douban-movie-do").innerText = "在看(" + data.movie_do + ")"

    document.getElementById("douban-game-wish").innerText = "想玩(" + data.game_wish + ")"
    document.getElementById("douban-game-collect").innerText = "玩过(" + data.game_collect + ")"
    document.getElementById("douban-game-do").innerText = "在玩(" + data.game_do + ")"
  })

  let tabs = document.getElementsByClassName("douban-tab")
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].onclick = tab_click
  }

  document.getElementsByClassName("douban-firstpage")[0].onclick = function () {
    render_list(page_id, 1)
  };

  document.getElementsByClassName("douban-lastpage")[0].onclick = function () {
    render_list(page_id, page_max)
  }

  document.getElementsByClassName("douban-previouspage")[0].onclick = function () {
    render_list(page_id, page_index - 1)
  }

  document.getElementsByClassName("douban-nextpage")[0].onclick = function () {
    render_list(page_id, page_index + 1)
  }

  tabs[0].onclick.apply(tabs[0]);

  let template = "           <div class=\"douban-item\">\n" +
    "              <div class=\"douban-picture\"><img src=\"<%= item.image %>\" loading=\"lazy\" referrerPolicy=\"no-referrer\"/>\n" +
    "              </div>\n" +
    "              <div class=\"douban-info\">\n" +
    "                <div class=\"douban-title\"><a target=\"_blank\" href=\"<%= item.alt %>\"> <%= item.title %></a></div>\n" +
    "                <div class=\"douban-pub\"><%= item.pub %></div>\n" +
    "                <div class=\"douban-meta\"><%= item.meta %></div>\n" +
    "                <div class=\"douban-comments\"><%= item.comment %></div>\n" +
    "              </div>\n" +
    "            </div>"


  function render_list(id, page) {
    let list = douban_storage[id]
    let need_change = false

    if (page_id !== id) {
      need_change = true
    }

    page_id = id
    page_max = Math.floor((list.length - 1) / page_size) + 1
    if (page_max === 0) {
      page_max = 1
    }

    let new_page_index = page_index
    if (page >= 1 && page <= page_max) {
      new_page_index = page
    }
    need_change = need_change || new_page_index !== page_index
    page_index = new_page_index
    document.getElementsByClassName("douban-pagenum")[0].innerHTML = page_index + " / " + page_max

    if (!need_change) {
      return
    }

    let html = ""
    let start = (page_index - 1) * page_size;
    let end = start + page_size
    if (end >= list.length) {
      end = list.length - 1
    }

    for (let i = start; i <= end; i++) {
      let item = list[i]
      let data = template.replace("<%= item.image %>", item.image)
      data = data.replace("<%= item.alt %>", item.alt)
      data = data.replace("<%= item.title %>", item.title)
      data = data.replace("<%= item.pub %>", item.pub)
      data = data.replace("<%= item.meta %>", item.meta)
      data = data.replace("<%= item.comment %>", item.comment)

      html += data
    }

    document.getElementsByClassName("douban-list")[0].innerHTML = html
  }

  function tab_click() {
    //修改标签样式
    this.classList.add('douban-active');

    let sibs = siblings(this)
    let id = this.id
    for (let j = 0; j < sibs.length; j++) {
      sibs[j].classList.remove('douban-active');
    }


    if (!douban_storage[id]) {
      let action = id.substring(id.lastIndexOf('-') + 1)
      let promise;
      if (id.indexOf('book') > 0) {
        promise = fetchBook(douban_id, action)
      } else if (id.indexOf('movie') > 0) {
        promise = fetchMovie(douban_id, action)
      } else if (id.indexOf('game') > 0) {
        promise = fetchGame(douban_id, action)
      }
      promise.then(result => {
        douban_storage[id] = result
        render_list(id, 1)
      })
    } else {
      render_list(id, 1)
    }
  }
})();