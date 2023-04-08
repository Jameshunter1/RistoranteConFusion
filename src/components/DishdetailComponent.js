import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

class CommentFormModal extends Component {
 constructor(props) {
  super(props);
  this.state = {
   isModalOpen: false,
   rating: 5,
   name: '',
   comment: '',
   ratingError: null,
   nameError: null,
   commentError: null,
  };

  this.toggleModal = this.toggleModal.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.validateRating = this.validateRating.bind(this);
  this.validateName = this.validateName.bind(this);
  this.validateComment = this.validateComment.bind(this);
  this.handleRatingChange = this.handleRatingChange.bind(this);
  this.handleNameChange = this.handleNameChange.bind(this);
  this.handleCommentChange = this.handleCommentChange.bind(this);
 }

 toggleModal() {
  this.setState({
   isModalOpen: !this.state.isModalOpen,
   rating: 5,
   name: '',
   comment: '',
   ratingError: null,
   nameError: null,
   commentError: null,
  });
 }

 validateRating() {
  if (this.state.rating < 1 || this.state.rating > 5) {
   this.setState({ ratingError: 'Rating must be between 1 and 5' });
  } else {
   this.setState({ ratingError: null });
  }
 }

 validateName() {
  if (this.state.name.length < 3) {
   this.setState({ nameError: 'Name must be at least 3 characters long' });
  } else {
   this.setState({ nameError: null });
  }
 }

 validateComment() {
  if (this.state.comment.length < 10) {
   this.setState({
    commentError: 'Comment must be at least 10 characters long',
   });
  } else {
   this.setState({ commentError: null });
  }
 }

 handleRatingChange(event) {
  this.setState({ rating: event.target.value }, this.validateRating);
 }

 handleNameChange(event) {
  this.setState({ name: event.target.value }, this.validateName);
 }

 handleCommentChange(event) {
  this.setState({ comment: event.target.value }, this.validateComment);
 }

 handleSubmit(event) {
  event.preventDefault();
  this.props.addComment(
   this.props.dishId,
   this.state.rating,
   this.state.name,
   this.state.comment,
  );
  this.validateRating();
  this.validateName();
  this.validateComment();
 }

 render() {
  return (
   <>
    <Button outline onClick={this.toggleModal}>
     <span className="fa fa-pencil fa-lg"></span> Submit Comment
    </Button>
    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
     <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
     <ModalBody>
      <form onSubmit={this.handleSubmit}>
       <Row className="form-group">
        <Label htmlFor="rating" md={2}>
         Rating
        </Label>
        <Col md={10}>
         <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          defaultValue="5"
          ref={(input) => (this.rating = input)}
         />
        </Col>
       </Row>
       <Row className="form-group">
        <Label htmlFor="name" md={2}>
         Your Name
        </Label>
        <Col md={10}>
         <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={this.state.name}
          onChange={this.handleNameChange}
         />
         {this.state.nameError && (
          <p className="text-danger">{this.state.nameError}</p>
         )}
        </Col>
       </Row>
       <Row className="form-group">
        <Label htmlFor="comment" md={2}>
         Comment
        </Label>
        <Col md={10}>
         <textarea
          id="comment"
          name="comment"
          rows="6"
          value={this.state.comment}
          onChange={this.handleCommentChange}
         ></textarea>
         {this.state.commentError && (
          <p className="text-danger">{this.state.commentError}</p>
         )}
        </Col>
       </Row>
       <Row className="form-group">
        <Col md={{ size: 10, offset: 2 }}>
         <Button type="submit" color="primary">
          Submit
         </Button>
        </Col>
       </Row>
      </form>
     </ModalBody>
    </Modal>
   </>
  );
 }
}

function RenderDish({ dish }) {
 if (dish != null)
  return (
   <Card>
    <CardImg top src={dish.image} alt={dish.name} />
    <CardBody>
     <CardTitle>{dish.name}</CardTitle>
     <CardText>{dish.description}</CardText>
    </CardBody>
   </Card>
  );
 else {
  return <div></div>;
 }
}

function RenderComments({ comments, addComment, dishId }) {
 const comment = comments.map((comment) => {
  return (
   <li key={comment.id}>
    <p>{comment.comment}</p>
    <p>
     --{comment.author},{' '}
     {new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
     }).format(new Date(Date.parse(comment.date)))}
    </p>
   </li>
  );
 });

 return (
  <div>
   <h4>Comments</h4>
   <ul className="list-unstyled">{comment}</ul>
   <CommentFormModal addComment={addComment} dishId={dishId} />
  </div>
 );
}

const DishDetail = (props) => {
 if (props.dish == null) {
  return (
   <div className="container">
    <div className="row">
     <Loading />
    </div>
   </div>
  );
 } else if (props.errMess) {
  return (
   <div className="container">
    <div className="row">
     <h4>{props.errMess}</h4>
    </div>
   </div>
  );
 } else if (props.dish != null)
  return (
   <div className="container">
    <div className="row">
     <Breadcrumb>
      <BreadcrumbItem>
       <Link to="/menu">Menu</Link>
      </BreadcrumbItem>
      <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
     </Breadcrumb>
     <div className="col-12">
      <h3>{props.dish.name}</h3>
      <hr />
     </div>
    </div>
    <div className="row">
     <div className="col-12 col-md-5 m-1">
      <RenderDish dish={props.dish} />
     </div>
     <div className="col-12 col-md-5 m-1">
      <RenderComments
       comments={props.comments}
       addComment={props.addComment}
       dishId={props.dish.id}
      />
     </div>
    </div>
   </div>
  );
};

export default DishDetail;