import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Deck from './components/Deck'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { setLocalNotification } from './utils/notifications'

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Tabs />
      </Provider>
    )
  }
}

const DeckStack = createStackNavigator({
  Decks: Decks,
  Deck: Deck,
});

const NewDeckStack = createStackNavigator({
  NewDeck: NewDeck,
});

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckStack,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={ 30 } color={ tintColor } />
    }
  },
  NewDeck: {
    screen: NewDeckStack,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={ 30 } color={ tintColor } />
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    style: {
      height: 56,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
