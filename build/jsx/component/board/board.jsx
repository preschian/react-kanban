import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { map } from 'lodash'

import boardStores from './boardStores'

class BoardHeader extends React.Component {
  render = () => (
    <div className="board-header">
      <p className="board-header-title">{this.props.children}</p>
    </div>
  )
}

class BoardCard extends React.Component {
  render = () => (
    <div className="board-card">
      <p className="board-card-title">{this.props.children}</p>
    </div>
  )
}

@observer
class BoardColumn extends React.Component {
  @observable inputValue = ''
  @observable dataId = this.props.dataId
  @observable dataTask = this.props.dataTask

  render = () => (
    <div className="board-column" id={this.dataId}>
      <div className="board-content">
        <BoardHeader>{this.props.children}</BoardHeader>
        {map(this.dataTask, (value) => <BoardCard key={value.id}>{value.text}</BoardCard>)}

        <div className="board-content-input">
          <input className="board-content-task" type="text" placeholder="Add a task..." value={this.inputValue} onChange={this.changeValue} onKeyPress={this.addValue} />
        </div>
      </div>
    </div>
  )

  changeValue = (event) => {
    this.inputValue = event.target.value
  }

  addValue = (event) => {
    if (event.key === 'Enter') {
      boardStores.newTask(event.target.value, this.dataId)
      document.activeElement.blur()
      this.inputValue = ''
    }
  }
}

// generate column based on firebase
@observer
class GenerateBoardColumn extends React.Component {
  render = () => (
    <div className="board-wrap" ref={this.dragulaDecorator}>
      {boardStores.column.map((value) => <BoardColumn key={value.id} dataId={value.id} dataTask={value.task}>{value.text}</BoardColumn>)}
    </div>
  )

  dragulaDecorator = (component) => {
    boardStores.dragColumn(component)
  }
}

// add new column
@observer
class AddBoardColumn extends React.Component {
  @observable inputValue = ''

  render = () => (
    <div className="board-add">
      <div className="board-add">
        <input className="board-add-input" type="text" placeholder="Add a list..." onKeyPress={this.addValue} onChange={this.changeValue} value={this.inputValue} />
      </div>
    </div>
  )

  changeValue = (event) => {
    this.inputValue = event.target.value
  }

  addValue = (event) => {
    if (event.key === 'Enter') {
      boardStores.newColumn(event.target.value)
      document.activeElement.blur()
      this.inputValue = ''
    }
  }
}

export default class Board extends React.Component {
  render = () => (
    <div className="board">
      <GenerateBoardColumn />
      <AddBoardColumn />
    </div>
  )
}