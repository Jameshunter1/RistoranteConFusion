import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponents';
import Home from './HomeComponent'; 
import Contact from './ContactComponent';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
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
        <div>
      <Switch>
        <Route path="/home" component={HomePage} />
            <Route
              exact
              path="/menu"
              component={() => <Menu dishes={this.props.dishes} />}
            />
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route
              exact
              path="/contactus"
              component={() => (
                <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
              )}
            />
            <Route
              exact
              path="/aboutus"
              component={() => <About leaders={this.props.leaders} />}
            />
            <Redirect to="/home" />
</Switch> 
          </div>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));