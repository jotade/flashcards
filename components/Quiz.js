import React, { Component } from 'react'
import { Modal, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { setLocalNotification, clearLocalNotification } from '../utils/notifications'

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentQuestion: 0,
      showAnswer: false,
      correctAnswers: 0
    }
    this.handleResponse = this.handleResponse.bind(this)
    this.toggleQA = this.toggleQA.bind(this)
    this.close = this.close.bind(this)
  }

  nextQuestion(score) {
    const { questions } = this.props
    if (this.state.currentQuestion < questions.length - 1) {
        this.setState({ currentQuestion: this.state.currentQuestion + 1, showAnswer: false })
    } else {
      Alert.alert(
          'Score: ' + Math.round((score/questions.length)*100) + '%',
          `${score} answers correct, out of ${questions.length} questions.`,
          [
              { text: 'Try Again', onPress: () => {this.reset()} },
              { text: 'Close', onPress: () => {this.close()}},
          ],
          { cancelable: false }
      )

      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  reset() {
    this.setState({ correctAnswers: 0, currentQuestion: 0, showAnswer: false })
  }

  handleResponse(answer) {
    const isAnswerCorrect = this.props.questions[this.state.currentQuestion].isAnswerCorrect
    const { correctAnswers } = this.state
    let score = correctAnswers
    if (answer === isAnswerCorrect) {
       score = correctAnswers + 1
      this.setState({ correctAnswers: score })
    }
    this.nextQuestion(score)
  }

  toggleQA() {
    const showAnswer = this.state.showAnswer === false ? true : false
    this.setState({ showAnswer })
  }

  close() {
    this.reset()
    this.props.close()
  }

  render() {
    const { visible, questions, title } = this.props
    const { currentQuestion, showAnswer } = this.state

    return(
        <Modal
          animationType = {"slide"}
          transparent = {false}
          visible = {visible}
          onRequestClose = {() => { console.log("Modal has been closed.") } }
        >
           <KeyboardAvoidingView behaviour='padding' style={styles.modal}>
             <Text style={{fontSize: 30, fontWeight: 'bold'}}>
             { showAnswer ?
               questions[currentQuestion] && questions[currentQuestion].answer :
               questions[currentQuestion] && questions[currentQuestion].question
             }</Text>
             <TouchableOpacity style={styles.toggleBtn} onPress={this.toggleQA}>
               <Text style={{color: 'red'}}>{ showAnswer ? 'Question' : 'Answer' }</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[styles.btn, {backgroundColor: '#008b00'}]} onPress={() => this.handleResponse(true)}>
               <Text style={styles.btnText}>Correct</Text>
             </TouchableOpacity>
             <TouchableOpacity style={[styles.btn, {backgroundColor: '#e53224'}]} onPress={() => this.handleResponse(false)}>
               <Text style={styles.btnText}>Incorrect</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.closeBtn} onPress={this.close}>
               <Text>Close</Text>
             </TouchableOpacity>
           </KeyboardAvoidingView>
        </Modal>
    )
  }
}

export default connect()(Quiz)

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
     margin: 50,
   },
   btn: {
     marginBottom: 20,
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
   toggleBtn: {
     justifyContent: 'center',
     alignItems: 'center',
     padding: 20
   },
   btnText: {
     color: '#fff'
   }
})
