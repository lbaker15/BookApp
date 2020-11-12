import { array } from 'prop-types'
import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'


class BookComponent extends Component {
    state = {
        favourites: []
    }

    favourite = (x) => {
        localStorage.setItem(x.title, JSON.stringify(x.title))
        this.ls(x)
    }

    ls = (x) => {
        const favourite = localStorage.getItem(x.title)
        this.setState((prev) => ({favourites: prev.favourites.concat(JSON.parse(favourite))}))
    }
    
    componentDidMount = (c) => {
        const a = this.props.bookArray.map(x => localStorage.getItem(x.title))
        const b = a.filter(x => x !== null)
        const d = b.map(x => x.substring(1, x.length - 1))
       
        this.setState({
            favourites: d
        })
    }

    remove = (x) => {
        const a = this.state.favourites.filter(y => y !== x.title)
        localStorage.removeItem(x.title)
        this.setState({
            favourites: a
        })
    }

    render() {
        const book = this.props.bookArray
        const {favourites} = this.state
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
            
            <i 
            className={favourites.includes(x.title) ? "heart icon" : "heart outline icon"}
            value={x.title}
            ref={x.id}
            onClick={() => {
                this.favourite(x)
            }}
            ></i>
            {favourites.includes(x.title) === true &&
                <i 
                onClick={() => this.remove(x)}
                className="window close icon"></i>
            }
                    
            </div>
            </li>
        )})
        )
    }
}

export default BookComponent