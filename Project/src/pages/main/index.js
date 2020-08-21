import React, { Component } from 'react'
import api from '../../services/api'
import './style.css';
import {Link} from 'react-router-dom'

class Main extends Component {

    state = {
        products: [],
        productsInfo:[],
        page: 1
    }

    componentDidMount() { //after it was mounted on screen
        this.loadProducts()
    }
    loadProducts = async (page=1) => {
        const response = await api.get(`/products?page=${page}`)
        const { docs, ...productsInfo} = response.data
        this.setState({ products: docs, productsInfo, page  })
    }

    prevPage = ()=>{
        const {page }= this.state
        if (page === 1){  //it's in the beginning, so stop
        return
        }
        const pageNumber = page-1
        this.loadProducts(pageNumber)
    }
    nextPage = ()=>{
        const {page, productsInfo}= this.state
        if (page === productsInfo.pages){  //it's in the last, so stop
            return
        }
        const pageNumber = page+1
       this.loadProducts(pageNumber)

    }

    render() {

        const {products, page, productsInfo } = this.state

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title} </strong>
                        <p>{product.description} </p>
                        <Link to={`/products/${ product._id }`}>Access</Link>
                    </article>
                ))}
                <div className='actions'>
                    <button disabled={page==1} onClick={this.prevPage}>Previous</button>
                    <button disabled={page == productsInfo.pages} onClick={this.nextPage}>Next</button>
                </div >

            </div>

        );
    }
}

export default Main;