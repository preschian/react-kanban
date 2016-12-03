import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

export class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <h1 className="menu-title">react-kanban</h1>
        <a href="#!" className="btn menu-btn">ADD COLUMN</a>
      </div>
    )
  }
}

export class Board extends React.Component {
  render() {
    return (
      <div className="board">
        <div className="board-column">
          
          <div className="board-content">
            <div className="board-header">
              <p className="board-header-title">To Do</p>
            </div>

            <div className="board-card">
              <p className="board-card-title">Design for the landing page</p>
            </div>

            <div className="board-card">
              <p className="board-card-title">Design for the My Account section</p>
            </div>

            <div className="board-card">
              <p className="board-card-title">iOS Mobile app - Account Page</p>
            </div>

            <div className="board-card">
              <p className="board-card-title">Android Mobile app - Dashboard, Chart, Detail, and About page</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export class Container extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <div className="container">
          <Board />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Container} />
  </Router>,
  document.getElementById('app')
)
