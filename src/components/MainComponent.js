import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponents';
import Home from './HomeComponent'; 
import Contact from './ContactComponent';
import {Switch, Route, withRouter} from 'react-router-dom';
import DishDetail from "./DishdetailComponent"
import About from './AboutComponent';
import {connect}from "react-redux"

const mapStateToProps = state => {
   return {
     dishes: state.dishes,
     comments: state.comments,
     leaders: state.leaders,
     promotions: state.promotions,
    }
}
  
class Main extends Component {

  render() {
    const HomePage = () => {
      return (
        <Home
        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
         promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]} 
         leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
      <div>
        <Header />   
        <Switch>
          <Route path='/home' element={HomePage} />
          <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
          <Route exact path='/menu' element={< Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" element={DishWithId}/>
          <Route path='/contactus' element={<Contact />} />
          
        </Switch> 
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));