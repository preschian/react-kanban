import { observable } from 'mobx'
import Dragula from 'react-dragula'

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

  updateColumnOrder(id, order) {
    database.ref('column').orderByChild('id').equalTo(id).once('value').then((snapshot) => {
      snapshot.forEach((value) => {
        value.ref.update({ order })
      })
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

  dragColumn(component) {
    const updateOrder = this.updateColumnOrder

    Dragula([component], {
      direction: 'horizontal',
      ignoreInputTextSelection: false
    }).on('drop', function(el, target) {
      const getId = Array.from(target.childNodes)
      getId.map((value, index) => {
        updateOrder(value.id, index + 1)
      })
    })
  }
}

export default new Board