import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import CurrentlyReading from './CurrentlyReading'
import WantToRead from './WantToRead'
import Read from './Read'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
      bookArray: [],
      wantToReadArray: [],
      readArray: [],
      currentlyReadingArray: [],
      query: '',
      activeShelf: 'currentlyReading'
  }

  componentDidMount () {
    const apiCall = () => {
      BooksAPI.getAll()
      .then(res => this.setState({
        bookArray: res
      }))
      .then(res => {
        const currentlyReading = this.state.bookArray.filter(x => x.shelf === 'currentlyReading')
        this.setState({
          currentlyReadingArray: currentlyReading
        })
        const wantToRead = this.state.bookArray.filter(x => x.shelf === 'wantToRead')
        this.setState({
          wantToReadArray: wantToRead
        })
        const read = this.state.bookArray.filter(x => x.shelf === 'read')
        this.setState({
          readArray: read
        })
      })
      }
      apiCall()
  }

  updateQuery = (query) => {
    this.setState(() => ({
        query: query.trim()
    }))
  }

  readStatusHandle = (value, book) => {
    console.log(value, book)
    BooksAPI.update(book, value)
    .then(res => {
      const newBookArray = this.state.bookArray.filter(x => x.title !== book.title)
      book.shelf = value
      this.setState({
        bookArray: newBookArray.concat(book)
      })
    })
    .then(res => {
      const currentlyReading = this.state.bookArray.filter(x => x.shelf === 'currentlyReading')
      this.setState({
        currentlyReadingArray: currentlyReading
      })
      const wantToRead = this.state.bookArray.filter(x => x.shelf === 'wantToRead')
      this.setState({
        wantToReadArray: wantToRead
      })
      const read = this.state.bookArray.filter(x => x.shelf === 'read')
      this.setState({
        readArray: read
      })
    })
  }

  readStatusHandleSearch = (value, book) => {
    console.log(value, book)
    BooksAPI.update(book, value)
    BooksAPI.getAll()
    .then(res => this.setState({
      bookArray: res
    }))
    .then(res => {
      const currentlyReading = this.state.bookArray.filter(x => x.shelf === 'currentlyReading')
      this.setState({
        currentlyReadingArray: currentlyReading
      })
      const wantToRead = this.state.bookArray.filter(x => x.shelf === 'wantToRead')
      this.setState({
        wantToReadArray: wantToRead
      })
      const read = this.state.bookArray.filter(x => x.shelf === 'read')
      this.setState({
        readArray: read
      })
    })
  }

  sendQuery = () => {
    BooksAPI.search(this.state.query)
    .then(res => {
      this.setState({
        searchResultsArray: res
      })     
    })
  }

  changeShelf = (value) => {
    this.setState((prev) => ({
      activeShelf: value
    }))
  }

  render() {

    return (
      <div className="app">
        
        <Link to='/search'>                   
          <div className="open-search">
              <button>Add a book</button>
          </div>
         </Link>

         <Route path='/search' render={() => (
           <Search val={this.state.query} update={this.updateQuery} send={this.sendQuery} readStatus={this.readStatusHandleSearch} searchArray={this.state.searchResultsArray} />
         )} />
         
        
         <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="selector">
              <select
              type="text"
              className="shelfSelector"
              value={this.state.shelfValue} 
              onChange={(e) => {
              this.changeShelf(e.target.value)
              }}>
                <option>Choose a Shelf</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
              </select>
            </div>

            <div className="list-books-content">
              <div>

              {this.state.activeShelf === 'currentlyReading' | this.state.activeShelf === '' &&
                <CurrentlyReading readStatusHandle={this.readStatusHandle} array={this.state.currentlyReadingArray}/>
              }
              {this.state.activeShelf === 'wantToRead' &&
                <WantToRead readStatusHandle={this.readStatusHandle} array={this.state.wantToReadArray} />
              }
              {this.state.activeShelf === 'read' &&
                <Read readStatusHandle={this.readStatusHandle} array={this.state.readArray} />           
              }

              </div>
            </div>
          </div>
          )} />
        


      </div>
    )
  }
}

export default BooksApp
