import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from 'reactstrap';
import { CardView } from './GameComponents.js';

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
                    <Card className="card-accent-primary h-100 w-100">
                      <CardHeader>
                        Find Sets
                      </CardHeader>
                      <CardBody>
                        <CardView id="0101" />
                        <CardView id="1112" />
                        <CardView id="2120" />
                        <CardView id="2021" />
                        <CardView id="1001" />
                        <CardView id="0020" />
                        <CardView id="1001" />
                        <CardView id="0112" />
                        <CardView id="1211" />
                        <CardView id="2210" />
                        <CardView id="0021" />
                        <CardView id="2122" />

                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="content-column column2 p-3" xs="4">
                    <Card className="card-accent-warning flex-grow-1">
                      <CardHeader>
                        Card with accent
                      </CardHeader>
                      <CardBody>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                        laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                      </CardBody>
                    </Card>
                    <Card className="card-accent-success flex-grow-1">
                      <CardHeader>
                        Card with accent
                      </CardHeader>
                      <CardBody>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                        laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                        laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                        laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                      </CardBody>
                    </Card>
                    <Card className="card-accent-info flex-grow-1">
                      <CardHeader>
                        Card with accent
                      </CardHeader>
                      <CardBody>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                        laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col className="content-column settings p-3" xs="4">

            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}

export default Layout;
