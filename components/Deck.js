import React, { Component } from 'react'
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { addCardToDeck } from '../utils/api'
import AddCard from './AddCard'
import Quiz from './Quiz'

export default class Deck extends Component {

  constructor(props) {
    super(props)
    this.state = {
       cardVisible: false,
       quizVisible: false,
       title: '',
       questions: [],
    }
    this.openAddCardModal = this.openAddCardModal.bind(this)
    this.closeCardModal = this.closeCardModal.bind(this)
    this.openQuizModal = this.openQuizModal.bind(this)
    this.closeQuizModal = this.closeQuizModal.bind(this)
  }

  componentDidMount() {
    const { title, questions } = this.props.navigation.state.params
    this.setState({
      title,
      questions
    })
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
    headerStyle:{
      backgroundColor:'white',
    }
  })

  openAddCardModal() {
    this.setState({ cardVisible: true })
  }

  closeCardModal(card) {
    if (card !== undefined) {
      this.setState({
        questions: [...this.state.questions, card],
        cardVisible: false,
      })
    } else {
      this.setState({cardVisible: false})
    }
  }

  openQuizModal() {
    this.setState({ quizVisible: true })
  }

  closeQuizModal() {
    this.setState({ quizVisible: false })
  }

  render() {
    const { title, questions } = this.state
    return(
      <View style={ styles.deck }>
        <Text style={{fontSize: 40, fontWeight: 'bold'}}>{ title }</Text>
        <Text style={{fontSize: 20, marginBottom: 20 }}>{(questions && questions.length+' cards') }</Text>
        <TouchableOpacity style={[styles.btn, { borderWidth: 1, borderColor: '#000'}]} onPress={this.openAddCardModal}>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, {backgroundColor: '#000'} ]} onPress={this.openQuizModal} disabled={ questions.length === 0 ? true : false}>
          <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>

      <AddCard visible={this.state.cardVisible} close={this.closeCardModal} title={ title } questions={ questions }/>
      <Quiz visible={this.state.quizVisible} close={this.closeQuizModal} title={ title } questions={ questions }/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  btn: {
    padding: 10,
    margin: 10,
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
