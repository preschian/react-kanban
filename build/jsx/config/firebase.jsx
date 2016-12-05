import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDi5S3LoMoKmqhL8NaFI59jMWyjmRfD1fs',
  authDomain: 'react-kanban-b9c67.firebaseapp.com',
  databaseURL: 'https://react-kanban-b9c67.firebaseio.com',
  storageBucket: 'react-kanban-b9c67.appspot.com',
  messagingSenderId: '568140155537'
}
firebase.initializeApp(config)

export default firebase.database()