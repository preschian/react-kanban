import React from 'react'

class BoardHeader extends React.Component {
  render() {
    return <div className="board-header">
      <p className="board-header-title">{this.props.children}</p>
    </div>
  }
}

class BoardCard extends React.Component {
  render() {
    return <div className="board-card">
      <p className="board-card-title">{this.props.children}</p>
    </div>
  }
}

class BoardColumn extends React.Component {
  render() {
    return <div className="board-column">
      <div className="board-content">
        <BoardHeader>To Do</BoardHeader>
        <BoardCard>Design for the landing page</BoardCard>
        <BoardCard>Design for the My Account section</BoardCard>
        <BoardCard>iOS Mobile app - Account Page</BoardCard>
        <BoardCard>Android Mobile app - Dashboard, Chart, Detail, and About page</BoardCard>
      </div>
    </div>
  }
}

class AddBoardColumn extends React.Component {
  render() {
    return <div className="board-column board-column-add">
      <div className="board-add">
        <input className="board-add-input" type="text" placeholder="Add a list..."/>
      </div>
    </div>
  }
}

export default class Board extends React.Component {
  render() {
    return <div className="board">
      <BoardColumn />
      <AddBoardColumn />
    </div>
  }
}