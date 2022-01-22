import React from "react";
import { Collapse, Button, Card } from 'reactstrap';


export default class ToggleSection extends React.Component {
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this)
        this.state = {
          open: true,
        }
    }

    toggle() {
      this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div>
                <Button color="dark" onClick={this.toggle} style={{ marginTop: '1rem',  marginRight: '1rem' }}>
                    {this.props.section}
                </Button>
                <Collapse isOpen={this.state.open}>
                    <Card className="card-comp">
                        {this.props.contents}
                    </Card>
                </Collapse>
            </div>
        )
    }

}
