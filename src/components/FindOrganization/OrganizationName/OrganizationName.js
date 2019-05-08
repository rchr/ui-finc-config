import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';

class OrganizationName extends React.Component {
  static propTypes = {
    organizationId: PropTypes.string.isRequired,
    stripes: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.okapiUrl = props.stripes.okapi.url;
    this.httpHeaders = Object.assign({}, {
      'X-Okapi-Tenant': props.stripes.okapi.tenant,
      'X-Okapi-Token': props.stripes.store.getState().okapi.token,
      'Content-Type': 'application/json',
    });

    this.state = {
      organizationName: '-',
    };
  }

  componentDidMount() {
    this.fechOrganizationName(this.props.organizationId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.organizationId !== prevProps.organizationId) {
      this.fechOrganizationName(this.props.organizationId);
    }
  }

  fechOrganizationName = (organizationId) => {
    this.setState({ organizationName: '-' });
    return fetch(`${this.okapiUrl}/organizations/${organizationId}`, { headers: this.httpHeaders })
      .then((response) => {
        if (response.status >= 400) {
          throw new SubmissionError({ identifier: `Error ${response.status} retrieving organization name by id`, _error: 'Fetch organization name failed' });
        } else {
          return response.json();
        }
      })
      .then((json) => {
        this.setState({
          organizationName: json.name
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.organizationName}
      </div>
    );
  }
}

export default OrganizationName;
