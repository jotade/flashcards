import React, { Component } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Switch } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { updateDecks } from '../actions'

class AddCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
       question: '',
       answer: '',
       isAnswerCorrect: false
    }
    this.handlePress = this.handlePress.bind(this)
    this.isCorrectActive = this.isCorrectActive.bind(this)
    this.close = this.close.bind(this)
  }

  handleQuestionChange = (question) => {
    this.setState(() => ({
      question
    }))
  }

  handleAnswerChange = (answer) => {
    this.setState(() => ({
      answer
    }))
  }

  handlePress() {
    const { title, questions, close, dispatch } = this.props
    if (this.state.question !== "" && this.state.answer !== ""){
      addCardToDeck(title, this.state)
      dispatch(updateDecks({
        [title]: {
          title,
          questions: [...questions, this.state]
        }
      }))
      close(this.state)
    } else {
      alert('All fields are required')
    }
    this.setState({
      question: '',
      answer: '',
    })
  }

  isCorrectActive() {
    const isAnswerCorrect = this.state.isAnswerCorrect === false ? true : false
    this.setState({ isAnswerCorrect })
  }

  close() {
    this.props.close()
  }

  render() {

    const { visible } = this.props
    const { question, answer, isAnswerCorrect } = this.state
    return(
        <Modal
          animationType = {"slide"}
          transparent = {false}
          visible = {visible}
          onRequestClose = {() => { console.log("Modal has been closed.") } }
        >
           <KeyboardAvoidingView behaviour='padding' style={styles.modal}>
            <Text style={{margin: 20, fontSize: 30, fontWeight: 'bold'}}>New Card</Text>
             <Text>Add your question</Text>
             <TextInput
               value={question}
               style={styles.input}
               onChangeText={this.handleQuestionChange}
             />
             <Text>The answer is: </Text>
             <TextInput
               value={answer}
               style={styles.input}
               onChangeText={this.handleAnswerChange}
             />
             <View style={ styles.switch}>
              <Text>Mark Answer As Correct:   </Text>
               <Switch
                  value= { isAnswerCorrect }
                  onValueChange={this.isCorrectActive}
               />
             </View>
             <TouchableOpacity style={styles.btnCard} onPress={this.handlePress}>
               <Text style={styles.btnText}>Submit</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.closeBtn} onPress={this.close}>
               <Text>Close</Text>
             </TouchableOpacity>
           </KeyboardAvoidingView>
        </Modal>
    )
  }
}

export default connect()(AddCard)

const styles = StyleSheet.create({
  modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   input: {
     width: 200,
     height: 44,
     padding: 8,
     borderWidth: 1,
     borderColor: '#757575',
     margin: 10,
   },
   btnCard: {
     backgroundColor: '#e53224',
     padding: 10,
     paddingLeft: 50,
     paddingRight: 50,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 5,
   },
   closeBtn: {
     justifyContent: 'center',
     alignItems: 'center',
     padding: 20
   },
   btnText: {
     color: '#fff'
   },
   switch: {
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     alignItems: 'center',
     margin: 10
   }
})
