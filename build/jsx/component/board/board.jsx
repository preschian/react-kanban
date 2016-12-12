import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import boardStores from './boardStores'

@observer
class BoardHeader extends React.Component {
  render = () => (
    <div className="board-header">
      <p className="board-header-title">{this.props.children}</p>
    </div>
  )
}

@observer
class BoardCard extends React.Component {
  render = () => (
    <div className="board-card">
      <p className="board-card-title">{this.props.children}</p>
    </div>
  )
}

@observer
class BoardColumn extends React.Component {
  @observable dataId = this.props.dataId
  @observable task = []
  @observable taskOrder = 1
  @observable taskValue = ''

  constructor(props) {
    super(props)
    
    this.getTask(this.props.dataId)
  }

  render = () => (
    <div className="board-column" id={this.dataId}>
      <div className="board-content">
        <BoardHeader>{this.props.children}</BoardHeader>
        <div className="board-card-wrap" ref={this.dragulaTaskDecorator}>
          {this.task.map((value) => <BoardCard key={value.id}>{value.text}</BoardCard>)}
        </div>

        <div className="board-content-input">
          <input className="board-content-task" type="text" placeholder="Add a task..." value={this.taskValue} onChange={this.changeTaskValue} onKeyPress={this.addNewTask} />
        </div>
      </div>
    </div>
  )

  changeTaskValue = (event) => {
    this.taskValue = event.target.value
  }

  addNewTask = (event) => {
    if (event.key === 'Enter') {
      boardStores.newTask(event.target.value, this.dataId, this.taskOrder)
      document.activeElement.blur()
      this.taskValue = ''
    }
  }

  getTask(id) {
    boardStores.getTask(id).on('value', (snapshot) => {
      this.task = []

      snapshot.forEach((value) => {
        this.task.push(value.val())
        this.taskOrder = value.val().order + 1
      })
    })
  }

  dragulaTaskDecorator = (component) => {
    boardStores.dragTask(component)
  }
}

// generate column based on firebase
@observer
class GenerateBoardColumn extends React.Component {
  render = () => (
    <div className="board-wrap" ref={this.dragulaDecorator}>
      {boardStores.column.map((value) => <BoardColumn key={value.id} dataId={value.id}>{value.text}</BoardColumn>)}
    </div>
  )

  dragulaDecorator = (component) => {
    boardStores.dragColumn(component)
  }
}

// add new column
@observer
class AddBoardColumn extends React.Component {
  @observable columnValue = ''

  render = () => (
    <div className="board-add">
      <div className="board-add">
        <input className="board-add-input" type="text" placeholder="Add a list..." value={this.columnValue} onChange={this.changeColumnValue} onKeyPress={this.addNewColumn} />
      </div>
    </div>
  )

  changeColumnValue = (event) => {
    this.columnValue = event.target.value
  }

  addNewColumn = (event) => {
    if (event.key === 'Enter') {
      boardStores.newColumn(event.target.value)
      document.activeElement.blur()
      this.columnValue = ''
    }
  }
}

@observer
export default class Board extends React.Component {
  render = () => (
    <div className="board">
      <GenerateBoardColumn />
      <AddBoardColumn />
    </div>
  )
}