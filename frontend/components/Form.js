import React from 'react'

export default class Form extends React.Component {
  render() {

    return (<>
    <form onSubmit={this.props.onSubmit}>
      <input
      onChange={this.props.onChange}
      value = {this.props.Form}
      type = 'text'
      placeholder = 'type todo'
      />
      <input
      type = 'submit'
      />
    </form>
      <button onClick={this.props.toggleDisplay}>
        {this.props.displayCompleted?'Hide ':'Show '}Completed
        </button>
      </>
      )
  }
}
