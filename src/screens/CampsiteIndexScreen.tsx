import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { View, Text } from 'react-native'
import CampsiteIndex from '../components/CampsiteIndex'
import { Event, Navigator } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import {
  Campsite,
  CampsiteWithStarred,
  Position
} from '../libs/types'
import { State } from '../ducks'
import shortenName from '../libs/shortenName'
import convertToCampsiteWithStarred from '../libs/convertToCampsiteWithStarred'

interface Props {
  navigator?: Navigator;
  campsites: {[index: number]: CampsiteWithStarred};
  position: Position | null;
}

export class CampsiteIndexScreen extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    // The navigator prop isn't necessarily set when we run tests
    if (this.props.navigator) {
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
  }

  static navigatorStyle = {
    navBarBackgroundColor: '#97b13d',
    navBarTextColor: '#fff',
    navBarButtonColor: '#fff',
    statusBarTextColorScheme: 'light',
    navBarTextFontSize: 22,
    navBarButtonFontSize: 22
  }

  componentDidMount() {
    // HACK HACK Temporary workaround for not figuring out how to mock out Icon for testing
    // Just set it to undefined for the time being during testing
    if (Icon) {
      Icon.getImageSource('ios-help-circle-outline', 22).then((about: any) => {
        if (this.props.navigator) {
          this.props.navigator.setButtons({
            rightButtons: [
              { id: 'about', icon: about }
            ]
          })
        }
      })
    }
  }

  onNavigatorEvent(event: Event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'about') {
        if (this.props.navigator) {
          this.props.navigator.push({
            screen: 'thatscamping.AboutScreen',
            title: 'About',
            backButtonTitle: 'Back'
          });
        }
      }
    }
  }

  onPress(id: number) {
    if (this.props.navigator) {
      var campsite: CampsiteWithStarred = this.props.campsites[id]
      this.props.navigator.push({
        screen: 'thatscamping.CampsiteDetailScreen',
        title: shortenName(campsite.name),
        backButtonTitle: 'Back',
        passProps: { id: id }
      })
    }
  }

  render() {
    // We could use Object.values to do this but typescript complains. So...
    let campsites = []
    for (let id in this.props.campsites) {
      campsites.push(this.props.campsites[id])
    }
    return (
      <View style={{flex: 1}}>
        <CampsiteIndex campsites={campsites} position={this.props.position} onPress={(id) => {this.onPress(id)}}/>
      </View>
    );
  }
}

function mapStateToProps(state: State, ownProps: {}) {
  // Put the star state directly into each campsite object to make things easier
  // elsewhere
  let campsitesWithStarred : {[index:number]: CampsiteWithStarred} = {}
  for (var id in state.campsites) {
    campsitesWithStarred[id] = convertToCampsiteWithStarred(state.campsites[id],
      state.starred)
  }

  return {
    campsites: campsitesWithStarred,
    position: state.position
  };
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteIndexScreen)
