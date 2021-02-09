import React, { Component } from 'react';
import { connect } from 'react-redux';
import {} from "../actions";
import {Button} from "react-bootstrap";
import "./MyNavbar.css";

class MyNavbar extends Component {
    render() {
        return (
            <div class="MyNavbar navbar">
                {/* <Button>Google Sign In</Button> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar)
