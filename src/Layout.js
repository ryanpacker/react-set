import React from 'react';
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from 'reactstrap';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
    }
  }

  toggleSettingsMenu(){
    this.setState({
      showSettings: !this.state.showSettings,
    });
  }

  render() {
    console.log('Layout::render()');
    let mainContentClassName = this.state.showSettings ? "main-content show-settings" : "main-content";

    return(
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Ready Set Go</NavbarBrand>
          <Nav className="mr-auto" navbar>
          </Nav>
          <Button color="ghost-primary" onClick={() => this.toggleSettingsMenu()}>
            <i className="cui-settings icons font-xl"></i>
          </Button>
        </Navbar>
        <Container fluid>
          <Row className="content-and-settings-row">
            <Col className={mainContentClassName} xs="auto">
              <Container fluid>
                <Row>
                  <Col className="content-column column1 p-3" xs="8">
                    {this.props.children[0]}
                  </Col>
                  <Col className="content-column column2" xs="4">
                    {this.props.children[1]}
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col className="content-column settings" xs="4">
              {this.props.children[2]}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default Layout;
