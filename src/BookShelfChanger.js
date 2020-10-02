import React, { Component } from 'react'

class BookShelfChanger extends Component {
    state = {

    }
    render(){  
        return (
            <div>
                <select 
                value={this.state.value} 
                onChange={(e) => {
                    this.props.readStatus(e.target.value, this.props.book)
                }}
                >
                    <option value="move">Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookShelfChanger