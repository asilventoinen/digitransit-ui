import React from 'react';
import Relay from 'react-relay';

import { getStartTime } from '../../util/time-utils';
import TripListHeader from './TripListHeader';
import TripStopListContainer from './TripStopListContainer';
import RouteMapContainer from '../route/RouteMapContainer';


class TripStopsContainer extends React.Component {
  static propTypes = {
    trip: React.PropTypes.shape({
      pattern: React.PropTypes.object.isRequired,
      stoptimesForDate: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          scheduledDeparture: React.PropTypes.number.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired,
    route: React.PropTypes.shape({
      fullscreenMap: React.PropTypes.bool,
    }).isRequired,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
    }).isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  toggleFullscreenMap = () => {
    if (this.props.route.fullscreenMap) {
      this.context.router.goBack();
      return;
    }
    this.context.router.push(`${this.props.location.pathname}/kartta`);
  }

  render() {
    const tripStartTime = getStartTime(this.props.trip.stoptimesForDate[0].scheduledDeparture);

    return (
      <div className="route-page-content">
        <RouteMapContainer
          key="map"
          pattern={this.props.trip.pattern}
          toggleFullscreenMap={this.toggleFullscreenMap}
          className="routeMap full"
          tripStart={tripStartTime}
        >
          {!this.props.route.fullscreenMap ?
            <div className="map-click-prevent-overlay" onClick={this.toggleFullscreenMap} /> :
            null
          }
        </RouteMapContainer>
        <TripListHeader key="header" />
        <TripStopListContainer
          key="list"
          trip={this.props.trip}
          tripStart={tripStartTime}
          fullscreenMap={this.props.route.fullscreenMap}
        />
      </div>
    );
  }
}

export default Relay.createContainer(TripStopsContainer, {
  fragments: {
    trip: () =>
      Relay.QL`
      fragment on Trip {
        stoptimesForDate {
          scheduledDeparture
        }
        pattern {
          ${RouteMapContainer.getFragment('pattern')}
        }
        ${TripStopListContainer.getFragment('trip')}
      }
    `,
  },
});
