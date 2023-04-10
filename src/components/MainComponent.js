import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponents';
import Home from './HomeComponent'; 
import Contact from './ContactComponent';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import DishDetail from "./DishdetailComponent"
import About from './AboutComponent';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

// The mapStateToProps function is used to map the state to props. The dishes, comments, promotions, and leaders properties of the state are mapped to the dishes, comments, promotions, and leaders props. The dishes, comments, promotions, and leaders props are used to pass the dishes, comments, promotions, and leaders data to the components.
const mapStateToProps = (state) => {
 return {
  dishes: state.dishes,
  comments: state.comments,
  leaders: state.leaders,
  promotions: state.promotions,
 };
};
// The mapDispatchToProps function is used to map action creators to props. The addComment action creator is mapped to the addComment prop. The fetchDishes action creator is mapped to the fetchDishes prop. The fetchComments action creator is mapped to the fetchComments prop. The fetchPromos action creator is mapped to the fetchPromos prop. The fetchLeaders action creator is mapped to the fetchLeaders prop.
const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  // Reset the feedback form after the feedback is submitted
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'))
  }    ,
  fetchComments: () => dispatch(fetchComments()),
      fetchPromos: () => dispatch(fetchPromos()),

})

// Main Component 
class Main extends Component {

  // The componentDidMount method is called after the component is rendered. The componentDidMount method is used to load the dishes, comments, promotions, and leaders data from the server. The fetchDishes method is called to load the dishes data from the server. The fetchComments method is called to load the comments data from the server. The fetchPromos method is called to load the promotions data from the server. The fetchLeaders method is called to load the leaders data from the server.

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
 }

  render() {
   // The HomePage function returns the Home component with the dish, dishesLoading, dishesErrMess, promotion, and leader props set to the dish, dishesLoading, dishesErrMess, promotion, and leader data. The dish data is set to the first dish in the dishes array that has the featured property set to true. The dishesLoading and dishesErrMess props are set to the dishesLoading and dishesErrMess properties of the dishes state. The promotion data is set to the first promotion in the promotions array that has the featured property set to true. The leader data is set to the first leader in the leaders array that has the featured property set to true.
  const HomePage = () => {
   return (
     <Home
       dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
       dishesLoading={this.props.dishes.isLoading}
       dishErrMess={this.props.dishes.errMess}
       promotion={
         this.props.promotions.promotions.filter(promo => promo.featured)[0]
       }
       promoLoading={this.props.promotions.isLoading}
       promoErrMess={this.props.promotions.errMess}
       leader={this.props.leaders.filter(leader => leader.featured)[0]}
     />
   );
  };
// DishWithId is a function that returns a DishDetail component with the dish and comments props set to the dish and comments that match the dishId in the URL. The dishId is parsed from the URL using the match.params.dishId property. The  match.params.dishId property is a string, so it is converted to an integer using the parseInt function. The dishId is used to filter the dishes and comments arrays to find the dish and comments that match the dishId. The dish and comments are passed to the DishDetail component as props. The isLoading and errMess props are also passed to the DishDetail component. The isLoading and errMess props are used to display a loading message or an error message if the dishes or comments cannot be loaded. The addComment prop is also passed to the DishDetail component. The addComment prop is used to add a new comment to the comments array.
  const DishWithId = ({ match }) => {
    return (
      // The DishDetail component is passed the dish, isLoading, errMess, comments, and addComment props. The dish prop is set to the dish that matches the dishId in the URL. The isLoading prop is set to the isLoading property of the dishes state. The errMess prop is set to the errMess property of the dishes state. The comments prop is set to the comments that match the dishId in the URL. The addComment prop is set to the addComment action creator.
      <DishDetail
        dish={
          this.props.dishes.dishes.filter(
            dish => dish.id === parseInt(match.params.dishId, 10),
          )[0]
        }
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter(
          comment => comment.dishId === parseInt(match.params.dishId, 10),
        )}
        commentsErrMess={this.props.comments.errMess}
        addComment={this.props.addComment}
      />
    );
   };
   
  return (
   <div>
    <Header />
    <div>
        <Switch>
        
          <Route path="/home" component={HomePage} />
          {/* The Menu component is passed the dishes prop. The dishes prop is set to the dishes array from the dishes state. */}
          <Route
       exact
       path="/menu"
       component={() => <Menu dishes={this.props.dishes} />}
      />
      <Route path="/menu/:dishId" component={DishWithId} />
      <Route
       exact
            path="/contactus"
            // The Contact component is passed the resetFeedbackForm prop. The resetFeedbackForm prop is set to the resetFeedbackForm action creator.
       component={() => (
        <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
       )}
      />
      <Route
       exact
            path="/aboutus"
            // The About component is passed the leaders prop. The leaders prop is set to the leaders array from the leaders state.
       component={() => <About leaders={this.props.leaders} />}
      />
      <Redirect to="/home" />
     </Switch>
    </div>
    <Footer />
   </div>
  );
 }
}
// The Main component is exported using the connect function. The connect function is used to connect the Main component to the Redux store. The connect function takes two parameters. The first parameter is the mapStateToProps function. The second parameter is the mapDispatchToProps function.
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));