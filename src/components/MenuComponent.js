import {
 Card,
 CardImg,
 CardImgOverlay,
 CardTitle,
 Breadcrumb,
 BreadcrumbItem,
} from 'reactstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import { Loading } from './LoadingComponent';

import {baseUrl} from '../shared/baseUrl';
// RenderMenuItem Component - This component is used to render the menu items
function RenderMenuItem({ dish }) {
 return (
  <Card>
   <Link to={`/menu/${dish.id}`}>
    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
    <CardImgOverlay>
     <CardTitle>{dish.name}</CardTitle>
    </CardImgOverlay>
   </Link>
  </Card>
 );
}
// Menu Component - This component is used to render the menu items and the dish details component
let Menu = (props) => {
 const menu = props.dishes.dishes.map((dish) => {
  return (
   <div key={dish.id} className="col-12 col-md-5 m-1">
    <RenderMenuItem dish={dish} />
   </div>
  );
 });

 if (props.dishes.isLoading) {
  return <Loading />;
 } else if (props.dishes.errMess) {
  return <h4>{props.dishes.errMess}</h4>;
 } else {
  return (
   <div className="container">
    <div className="row">
     <Breadcrumb>
      <BreadcrumbItem>
       <Link to="/home">Home</Link>
      </BreadcrumbItem>
     </Breadcrumb>
     <div className="col-12">
      <h3>Menu</h3>
     </div>
    </div>
    <div className="row">{menu}</div>
   </div>
  );
 }
};

export default Menu;
