import React, { Component } from 'react'
import BookComponent from './BookComponent'

class Read extends Component {
    render() {
        return (
            <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                   
                      {this.props.array.length !== 0 && (
                          <BookComponent readStatus={this.props.readStatusHandle} bookArray={this.props.array}/>
                        )}
                      
                    </ol>
                  </div>
            </div>
        )
    }
}

export default Read