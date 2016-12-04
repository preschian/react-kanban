import React from 'react'

export default class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <h1 className="menu-title">react-kanban</h1>
        <a href="#!" className="btn menu-btn">ADD COLUMN</a>
      </div>
    )
  }
}