import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { getDecks, addDefaultData, clear, initialData } from '../utils/api'
import DeckRow from './DeckRow'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'

class Decks extends Component {

  state = {
    decks: {}
  }

  static navigationOptions = ({ navigation }) => {
    return {
        title: 'Flashcards'
    }
  }

  componentDidMount() {
    //clear()
    getDecks()
    .then((res) => {
      if (res === null) {
        addDefaultData(initialData)
        this.props.dispatch(receiveDecks(initialData))
      } else {
        this.props.dispatch(receiveDecks(JSON.parse(res)))
      }
    })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      decks: newProps.decks
    })
  }

  renderItem = ({ item }) => {
    return <DeckRow { ...item } nav={this.props.navigation} />
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render() {

    const { decks } = this.state
    const decksArray =  Object.keys(decks).map((item) => decks[item])

    return (
      <View style={ styles.container }>
        <FlatList
          data = { decksArray }
          renderItem={this.renderItem}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
