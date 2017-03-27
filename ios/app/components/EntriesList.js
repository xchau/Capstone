import React, { Component } from 'react';
import {
  ActivityIndicator,
  AlertIOS,
  AsyncStorage,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Drawer from 'react-native-drawer';
import Entry from './Entry';
import { Actions } from 'react-native-router-flux';
import { NavBar } from './NavBar';
import { ToolBar } from './ToolBar';
import { Menu } from './Menu';

import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { styles } from '../styles/entrieslist';
import { menustyles } from '../styles/menustyles';
import { drawerstyles } from '../styles/drawerstyles';
import { loadentries } from '../styles/loadentries'

export default class EntriesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBackToTop: false,
      isOwner: this.props.isOwner
    };

    this.handleAddEntryRedirect = this.handleAddEntryRedirect.bind(this);
    this.handleBackToTop = this.handleBackToTop.bind(this);
    this.handleDeleteTrip = this.handleDeleteTrip.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleTogglePublish = this.handleTogglePublish.bind(this);
    this.openControlPanel = this.openControlPanel.bind(this);
  }

  componentDidMount() {
    const tripId = this.props.tripId;

    this.props.retrieveEntries(tripId)
      .then((res) => {
        this.setState({
          entries: res.value.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleAddEntryRedirect() {
    const token = this.props.user.token;
    const tripId = this.props.tripId;

    Actions.addentry({token, tripId});
  }

  async handleTogglePublish() {
    const token = await AsyncStorage.getItem('token');
    const tripId = this.props.tripId;
    const userId = this.props.user.id;

    this.props.togglePublish(tripId, userId, token);

    // Actions.tripslist();
  }

  async handleDeleteTrip() {
    const token = await AsyncStorage.getItem('token');
    const tripId = this.props.tripId;

    AlertIOS.alert('Delete your trip?', 'Unfortunately, no take backsies.', [
      {text: 'Cancel', onPress: () => null},
      {text: 'Confirm', onPress: () => {
        return this.props.deleteTrip(tripId, token)
          .then((res) => {
            Actions.tripslist();
          });
      }}
    ]);
  }

  closeControlPanel() {
    this._drawer.close();
  }

  openControlPanel() {
    this._drawer.open();
  }

  handleScroll(event) {
    if (event.nativeEvent.contentOffset.y > 120) {
      this.setState({
        showBackToTop: true
      });
    }
    else if (event.nativeEvent.contentOffset.y < 120) {
      this.setState({
        showBackToTop: false
      });
    }
  }

  handleBackToTop() {
    this.refs._scrollView.scrollTo(0);
  }

  handleBackPress() {
    Actions.tripslist();
  }

  render() {
    StatusBar.setBarStyle('light-content', true);

    const menu = <Menu userData={this.props.user}>
      {
        this.state.isOwner ?
          <View style={menustyles.optionRow}>
            <Text
              onPress={Actions.login}
              style={menustyles.optionText}
            >
              Add Entry
            </Text>
          </View>
          :
          null
      }
      <View style={menustyles.optionRow}>
        <Text
          onPress={Actions.login}
          style={menustyles.optionText}
        >
          Trip History
        </Text>
      </View>
      {
        this.state.isOwner ?
          <View style={menustyles.optionRow}>
            <Text
              onPress={this.handleTogglePublish}
              style={menustyles.optionText}
            >
              {this.props.user.isTraveling ? 'Publish' : 'Unpublish'}
            </Text>
          </View>
          :
          null
      }
      {
        this.state.isOwner ?
          <View style={menustyles.optionRow}>
            <Text
              onPress={this.handleDeleteTrip}
              style={menustyles.optionText}
            >
              Delete Trip
            </Text>
          </View>
          :
          null
      }
      {
        this.state.isOwner ?
          null
          :
          <View style={menustyles.optionRow}>
            <Text
              onPress={Actions.login}
              style={menustyles.optionText}
            >
              Add to Favorites
            </Text>
          </View>
      }
      <View style={menustyles.optionRow}>
        <Text
          onPress={Actions.login}
          style={menustyles.optionText}
        >
          Favorites
        </Text>
      </View>
    </Menu>

    return <Drawer
      acceptPan={true}
      closedDrawerOffset={-3}
      content={menu}
      openDrawerOffset={0.4}
      panOpenMask={0.2}
      panCloseMask={0.5}
      ref={(ref) => this._drawer = ref}
      side="right"
      styles={drawerstyles}
      tapToClose={true}
      type="overlay"
      tweenHandler={(ratio) => ({
        main: { opacity:(2-ratio)/2 }
      })}
    >
      <NavBar>
        <TouchableHighlight onPress={this.handleBackPress}>
          <Ionicon
            color="#fff"
            name="ios-arrow-back"
            size={33}
          />
        </TouchableHighlight>
      </NavBar>
      <SimpleLineIcon
        name="menu"
        color="#fff"
        onPress={this.openControlPanel}
        size={22}
        style={menustyles.menuIcon}
      />

      <View style={styles.listContainer}>
        <ScrollView
          onScroll={(e) => this.handleScroll(e)}
          ref='_scrollView'
          scrollEventThrottle={6}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {
              this.state.entries ?
                this.state.entries.map(elem => <Entry
                  entry={elem}
                  key={elem.id}
                />)
                :
                <View style={loadentries.spinnerBox}>
                  <ActivityIndicator
                    style={loadentries.spinner}
                    size="large"
                  />
                </View>
            }
          </View>
        </ScrollView>
        {
          this.state.showBackToTop ?
            <TouchableHighlight onPress={this.handleBackToTop}>
              <SimpleLineIcon
                name="arrow-up-circle"
                size={25}
                style={{backgroundColor: 'transparent', position: 'absolute', bottom: 5}}
              />
            </TouchableHighlight>
            :
            null
        }
      </View>
      <ToolBar
        backToTop={this.handleBackToTop}
        goBack={this.handleBackPress}
        showBackToTop={this.state.showBackToTop}
      >
        {
          this.state.isOwner ?
            <SimpleLineIcon
              color="#fff"
              name="plus"
              onPress={this.handleAddEntryRedirect}
              size={25}
            />
            :
            <SimpleLineIcon
              name="heart"
              size={25}
              color="#ff4a4a"
            />
        }
      </ToolBar>
    </Drawer>
  }
};
