import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

class BookComponent extends Component {
    state = {

    }
    render() {
        const book = this.props.bookArray
        return(
        book.map(x => {
        return(
            <li key={x.id}>
            <div className="book">
            <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${x.imageLinks.smallThumbnail}")` }}></div>
            
            <div className="book-shelf-changer">
            <BookShelfChanger readStatus={this.props.readStatus} book={x} />            
            </div>
            
            </div>
            <div className="book-title">{x.title}</div>
            <div className="book-authors">{x.authors}</div>
            </div>
            </li>
        )})
        )
    }
}

export default BookComponent