
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom"


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

function RenderComments({ comments }) {
    const comment = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            --{comment.author},{comment.date}
          </p>
        </li>
      );
    });

    if (comments != null) {
      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">{comment}</ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  const DishDetail = (props) => {
    if (props.dish !=null) {
      return (
        <div className="row">
          <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to ="/home">Home</Link>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Menu</h3>
                    </div>
                </div>
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish}/>
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}/>
          </div>
        </div>
      );
    } 
    }
  

export default DishDetail;