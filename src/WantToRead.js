import React, { Component } from 'react'
import BookComponent from './BookComponent'

class WantToRead extends Component {
    render() {
        return (
            <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      
                        {this.props.array.length !== 0 && (
                          <BookComponent readStatus={this.props.readStatusHandle} bookArray={this.props.array}/>
                        )}
                      
                    </ol>
                  </div>
                </div>
            </div>
        )
    }
}

export default WantToRead