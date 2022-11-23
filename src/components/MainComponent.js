import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponents';
import Home from './HomeComponent'; 
import Contact from './ContactComponent';
import { Routes, Route } from 'react-router-dom';
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders"
import DishDetail from "./DishdetailComponent"
import About from './AboutComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {

    const HomePage = () => {
      return (
        <Home
        dish={this.state.dishes.filter((dish) => dish.featured)[0]}
         promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]} 
         leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    return (
      <div>
        <Header />   
        <Routes>
          <Route path='/home' element={<HomePage />} exact />
          <Route path='/aboutus' element={<About leaders={this.state.leaders} />} exact/>
          <Route exact path='/menu' element={< Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" element={DishWithId}/>
          <Route path='/contactus' element={<Contact/>}/>
        </Routes> 
        <Footer/>
      </div>
    );
  }
}

export default Main;