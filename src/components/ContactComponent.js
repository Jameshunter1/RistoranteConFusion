import React, {Component} from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from "reactstrap"
import {Link} from "react-router-dom"
import { faListCheck } from '@fortawesome/free-solid-svg-icons';


class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telnum: false,
                email:false
            }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this)
        
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }
//Tracks which input box has been modified 
    
    handleBlur = (field) => (e) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        })
    }

    
   //Creates an error object that handles validation errors for each input field
    validate(firstname, lastname, telnum, email) {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
        }
      
        if (this.state.touched.firstname && firstname.length < 3) 
            errors.firstname = "First name should be more than 3 characters"
            
        else if
            (this.state.touched.firstname && firstname.length > 10)
            errors.firstname = "First name should less than 10 characters"
       
        if (this.state.touched.lastname && lastname.length < 3) 
            errors.firstname = "Last name should be more than 3 characters"
         else if
            (this.state.touched.lastname && lastname.length > 20)
            errors.lastname = "Last name should less than 20 characters"
        
        const reg = /^\d+$/; 
        if (this.state.touched.telnum && !reg.test(telnum))
            errors.telnum = "Tel. Number should contain only numbers"
        
        
        if (this.state.touched.email && email.split("").filter(x => x === "@").length !== 1)
            errors.email = "Email should contain @"
        return errors
    }
    
    render() {
        const errors= this.validate(this.state.firstname, this.state.lastname, this.state.telnum, this.state.email)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                    <div className="row row-content">
                        <div className="col-12">
                            <h3>Send us your Feedback</h3>
                        </div>

                        {/* Full Contact Form */}
                        <div className="col-12 col-md-9">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="firstname" md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="firstname" name="firstname"
                                            placeholder="First Name"
                                            value={this.state.firstname}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur('firstname')}
                                            valid={this.state.firstname && errors.firstname === ""}
                                            invalid={this.state.firstname && errors.firstname !== ""}/>
                                        <FormFeedback>
                                        {errors.firstname}
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="lastname" md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="lastname" name="lastname"
                                            placeholder="Last Name"
                                            value={this.state.lastname}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur('lastname')}
                                            valid={this.state.lastname && errors.lastname === ""}
                                            invalid={this.state.lastname && errors.lastname !== ""}/>
                                            <FormFeedback>
                                            {errors.lastname}
                                            </FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                    <Col md={10}>
                                        <Input type="tel" id="telnum" name="telnum"
                                            placeholder="Tel. number"
                                            value={this.state.telnum}
                                            onChange={this.handleInputChange}
                                            onBlur={this.handleBlur('telnum')}
                                         valid={this.state.telnum&&errors.telnum === " "}
                                            invalid={this.state.telnum && errors.telnum !== ""}/>
                                            <FormFeedback>
                                            {errors.telnum}
                                            </FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Input type="email" id="email" name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.handleInputChange} 
                                            onBlur={this.handleBlur('email')}
                                            valid={this.state.touched.email && errors.email === ""}
                                            invalid={this.state.touched.email &&errors.email !== ""}/>
                                        <FormFeedback>
                                            {errors.email}
                                        </FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 6, offset: 2 }}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox"
                                                    name="agree"
                                                    checked={this.state.agree}
                                                    onChange={this.handleInputChange} /> {' '}
                                                <strong>May we contact you?</strong>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={{ size: 3, offset: 1 }}>
                                        <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                            <option>Tel.</option>
                                            <option>Email</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="message" md={2}>Your Feedback</Label>
                                    <Col md={10}>
                                        <Input type="textarea" id="message" name="message"
                                            rows="12"
                                            value={this.state.message}
                                            onChange={this.handleInputChange}></Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button type="submit" color="primary">
                                            Send Feedback
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default Contact;