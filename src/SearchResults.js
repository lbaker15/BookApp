import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

class SearchResults extends Component {
    render() {
        if (this.props.searchArray.length !== undefined) {
        return(
        <div className="search-books-results">
            <ol className="books-grid">
        {this.props.searchArray.map(x => {
            console.log("serch", x.imageLinks)
            return(
                <li key={x.id}>
                    <div className="bookSearch" key={x.id}>
                        {x.imageLinks !== undefined && 
                        <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${x.imageLinks.smallThumbnail}")` }}    ></div>
                        }
                        {x.imageLinks === undefined && 
                        <div className="book-cover" style={{ width: 128, height: 188, display: "flex", padding: 10, textAlign: "center", alignItems: "center"}}>Image not available</div>
                        }
                        <div className="book-title">{x.title}</div>
                        <div className="book-authors">{x.authors}</div>             
                    </div>
                    <div className="searchChange">
                    <BookShelfChanger readStatus={this.props.readStatus} book={x} />
                    </div>
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