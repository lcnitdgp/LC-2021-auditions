import React, { Component } from 'react'

export default class RenderAdminForm extends Component {
    render() {
        return (
          <div>
            RenderAdminForm
            <Button variant="secondary" size="lg" block>
              Radio
            </Button>
            <Button variant="secondary" size="lg" block>
              Checkbox
            </Button>
            <Button variant="secondary" size="lg" block>
              Subquestions
            </Button>
            <Button variant="secondary" size="lg" block>
              Text
            </Button>
            <Button variant="secondary" size="lg" block>
              Text
            </Button>
          </div>
        );
    }
}
