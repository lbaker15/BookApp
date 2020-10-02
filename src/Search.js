import React, { Component } from 'react'
import SearchResults from './SearchResults'
import { Link } from 'react-router-dom'

class Search extends Component {
    render() {   
            return (
        
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/'>
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
        
                    <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.props.val}
                    onChange={(e) => {
                    this.props.update(e.target.value)
                    this.props.send()
                    }}
                    />

                </div>
                </div>

                    {this.props.searchArray !== undefined &&
                    <SearchResults readStatus={this.props.readStatus} searchArray={this.props.searchArray} />
                    }
            </div>
        )
    }
}

export default Search