import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookComponent from './BookComponent'

class BooksApp extends React.Component {
  state = {
    bookArray: [],
    wantToReadArray: [],
    readArray: [],
    currentlyReadingArray: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  componentDidMount () {
    BooksAPI.getAll()
    .then(res => this.setState({
      bookArray: res
    }))
  }

  readStatusHandle = (value, image, title, authors) => {
    const singleBookInfo = []
    const a = {"image": image, "title": title, "authors": authors} 
    singleBookInfo.push(a)

    if (value === 'wantToRead') {
      const map = this.state.wantToReadArray.map(x => x.title)
      const filter = map.filter(x => x === singleBookInfo[0].title)
        if(filter.length === 0){
          this.setState((prev) => ({
            wantToReadArray: prev.wantToReadArray.concat(singleBookInfo)
          }))
        }
    }
    if (value === 'read') {
      const map = this.state.readArray.map(x => x.title)
      const filter = map.filter(x => x === singleBookInfo[0].title)
        if(filter.length === 0){
          this.setState((prev) => ({
            readArray: prev.readArray.concat(singleBookInfo)
          }))
        }
    }
    if (value === 'currentlyReading') {
      const map = this.state.currentlyReadingArray.map(x => x.title)
      const filter = map.filter(x => x === singleBookInfo[0].title)
        if(filter.length === 0) {
          this.setState((prev) => ({
            currentlyReadingArray: prev.currentlyReadingArray.concat(singleBookInfo)
          }))
        }
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {

                /*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>
                        {this.state.bookArray.length !== 0 && (
                          <BookComponent readStatus={this.readStatusHandle} bookArray={this.state.bookArray}/>
                        )}
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>

                      </li>
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <li>

                      </li>
                    </ol>
                  </div>
                </div>

              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
