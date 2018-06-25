import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class NewDeck extends Component {

  state = {
    input: ''
  }

  static navigationOptions = ({ navigation }) => {
    return {
        title: 'New Deck'
    }
  }

  handleTextChange = (input) => {
    this.setState(() => ({
      input
    }))
  }

  handlePress = () => {
    if (this.state.input !== ''){
      saveDeckTitle(this.state.input)
      this.props.dispatch(addDeck({
        [this.state.input]: {
          title: this.state.input,
          questions: []
        }
      }))
      this.setState({input: ''})
      this.props.navigation.navigate('Decks')
    } else {
      alert('You missed the deck name field, try again!')
    }
  }

  render() {
    const { input } = this.state
    return (
      <KeyboardAvoidingView behaviour='padding' style={styles.container}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>New Deck Title</Text>
        <TextInput
          value={input}
          style={styles.input}
          onChangeText={this.handleTextChange}
        />
        <TouchableOpacity style={styles.btn} onPress={this.handlePress}>
          <Text style={styles.btnText}>Create Deck</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 30,
  },
  btn: {
    backgroundColor: '#e53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff'
  }
})
