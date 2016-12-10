import { observable } from 'mobx'

import database from '../../config/firebase'

class Board {
  constructor() {
    this.getColumn()
  }

  @observable column = []
  @observable latestOrder = 1

  getColumn() {
    database.ref('column').orderByChild('order').on('value', (snapshot) => {
      this.column = []

      snapshot.forEach((value) => {
        console.log(value.val())
        this.column.push(value.val())
        this.latestOrder = value.val().order + 1
      })
    })
  }

  newColumn(text) {
    database.ref('column').push().set({
      id: this.generateID(),
      order: this.latestOrder,
      text: text
    }).then(() => {
      this.latestOrder
    })
  }

  newTask(text, id) {
    database.ref('column').orderByChild('id').equalTo(id).once('value').then((snapshot) => {
      snapshot.forEach((value) => {
        value.ref.child('task').push().set({
          id: this.generateID(),
          text: text
        })
      })
    })
  }

  generateID() {
    return Math.random().toString(36).substr(2, 32)
  }
}

export default new Board