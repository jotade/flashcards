export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_DECKS = 'UPDATE_DECKS'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function updateDecks (deck) {
  return {
    type: UPDATE_DECKS,
    deck,
  }
}
