import React from 'react'
import ReactDOM from 'react-dom'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

import Board from './component/board/board'
import Menu from './component/menu'

export class Container extends React.Component {
  render = () => (
    <div>
      <Menu />
      <div className="container">
        <Board />
      </div>
    </div>
  )
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Container} />
  </Router>,
  document.getElementById('app')
)
