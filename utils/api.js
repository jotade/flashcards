import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'flashcards:decks'

export function clear() {
  return AsyncStorage.clear()
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function getDeck (deck) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
  .then((res) => {
      const data = JSON.parse(res)
      return data[deck]
  })
}

export function saveDeckTitle ( title ) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck (deck, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((res) => {
      const data = JSON.parse(res)
      data[deck]['questions'] = [...data[deck]['questions'], card]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

export function addDefaultData(initialData) {
  return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData))
}

export const initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
        isAnswerCorrect: true
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
        isAnswerCorrect: true
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        isAnswerCorrect: true
      }
    ]
  }
}
