import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import Main from './pages/main'
import product from './pages/product'


const Routes = ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/products/:id" component={product} />
        </Switch>
    </BrowserRouter>
)


export default Routes