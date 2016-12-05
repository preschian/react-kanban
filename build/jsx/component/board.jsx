import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import database from '../config/firebase'

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
        <BoardHeader>{this.props.children}</BoardHeader>
        {/*<BoardCard>Design for the landing page</BoardCard>*/}
      </div>
    </div>
  }
}

// generate column based on firebase
@observer
class GenerateBoardColumn extends React.Component {
  @observable column = []

  constructor() {
    super()

    database.ref('column').orderByChild('order').on('value', (snapshot) => {
      this.column = []

      snapshot.forEach((value) => {
        this.column.push(value.val())
      })
    })
  }

  render = () => (
    <div className="board-wrap">
      {this.column.map((value) => <BoardColumn key={value.text}>{value.text}</BoardColumn>)}
    </div>
  )
}

// add new column
@observer
class AddBoardColumn extends React.Component {
  @observable inputValue = ''
  @observable order = 1

  constructor() {
    super()

    database.ref('column').orderByChild('order').limitToLast(1).once('value').then((snapshot) => {
      snapshot.forEach((value) => {
        this.order = value.val().order + 1
      })
    }).catch(() => {
      this.order = 1
    })
  }

  render = () => (
    <div className="board-column board-column-add">
      <div className="board-add">
        <input className="board-add-input" type="text" placeholder="Add a list..." onKeyPress={this.addValue} onChange={this.changeValue} value={this.inputValue} />
      </div>
    </div>
  )

  changeValue = (event) => (this.inputValue = event.target.value)

  addValue = (event) => {
    const newData = {
      text: event.target.value,
      order: this.order
    }

    if (event.key === 'Enter') {
      database.ref('column').push().set(newData).then(() => {
        document.activeElement.blur()
        this.inputValue = ''
        this.order += 1
      })
    }
  }
}

export default class Board extends React.Component {
  render() {
    return <div className="board">
      <GenerateBoardColumn />
      <AddBoardColumn />
    </div>
  }
}