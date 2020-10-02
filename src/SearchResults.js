import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

class SearchResults extends Component {
    render() {
        if (this.props.searchArray.length !== undefined) {
        return(
        <div className="search-books-results">
            <ol className="books-grid">
        {this.props.searchArray.map(x => {
            return(
                <li key={x.id}>
                    <div className="book" key={x.id}>
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${x.imageLinks.smallThumbnail}")` }}></div>
                        <div className="book-title">{x.title}</div>
                        <div className="book-authors">{x.authors}</div>             
                    </div>

                    <BookShelfChanger readStatus={this.props.readStatus} book={x} />

                </li>
                )
        })}
        </ol>
        </div>
        )} else {
            return(
                <div>Please enter a valid query.</div>
            )
        }
    }
}

export default SearchResults