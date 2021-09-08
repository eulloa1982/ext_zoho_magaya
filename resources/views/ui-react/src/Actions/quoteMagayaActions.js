export const REQUEST_QUOTES = 'REQUEST_QUOTES'
export const RECEIVE_QUOTES = 'RECEIVE_QUOTES'


export const requestQuotes = quotes => ({
  type: REQUEST_QUOTES,
  quotes
})

export const receiveQuotes = (quotes, json) => ({
  type: RECEIVE_QUOTES,
  quotes,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

const fetchQuotes = quotes => dispatch => {
  dispatch(requestQuotes(quotes))
  return fetch(``)
    .then(response => response.json())
    .then(json => dispatch(receiveQuotes(quotes, json)))
}

const shouldFetchQuotes = (state, quotes) => {
  const posts = state.postsByQuotes[quotes]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchQuotesIfNeeded = quotes => (dispatch, getState) => {
  if (shouldFetchQuotes(getState(), quotes)) {
    return dispatch(fetchQuotes(quotes))
  }
}
