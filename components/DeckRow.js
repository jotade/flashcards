import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class DeckRow extends Component {

  handlePress(deck) {
    this.props.nav.navigate('Deck',{...deck})
  }

  render() {
    const { title, questions } = this.props
    return(
      <TouchableOpacity style={styles.row} onPress={ () => this.handlePress(this.props) }>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{ title }</Text>
        <Text>{(questions && questions.length+' cards') }</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  }
})
