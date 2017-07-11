import React, { Component } from 'react';
import { Alert, Button, FlatList, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, View, WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { AppStyles, AppTextStyles } from './Styles';
import { BoxAlert, Announcement } from './UI';


export class IndexScreen extends Component {
  static navigationOptions = {
    title: 'Spartan Connect',
    headerRight: <Text>Weather: Impossible 72&deg;  </Text>
  };

  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      refreshing: true
    };
    new Promise(this.retrieveCurrentAnnouncements.bind(this)).then(() => {
      this.setState({refreshing: false});
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    new Promise(this.retrieveCurrentAnnouncements.bind(this)).then(() => {
      this.setState({refreshing: false});
      this.forceUpdate();
    });
  }

  _onRedirect(announcementId) {
    const { navigate } = this.props.navigation;
    navigate('Announcement', {id: announcementId});
  }

  retrieveCurrentAnnouncements(resolve, reject) {
    //http://sctest.x10.mx/api/get_current_announcements.php?returnType=ids
    try {
      fetch('http://sctest.x10.mx/api/get_current_announcements.php?returnType=ids', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        var index = 0;
        var keyArray = responseJson.map((result) => {
          index = index + 1;
          return {key: index, value: result};
        });
        this.setState((state) => {
          return {
            announcements: keyArray
          };
        });
      }).then(() => {
        resolve(true);
      });
    } catch (error) {
      resolve(false);
      console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)}/>} style={AppStyles.announcementsView}>
        <StatusBar hidden />
        <Button onPress={() => navigate('Announcement', {id: 1})} title="Open Sample Announcement" />
        <BoxAlert title="DEVELOPER'S NOTICE" description="This an alpha version."/>
        <FlatList data={this.state.announcements} renderItem={({item}) => <Announcement id={item.value} returnFunction={this._onRedirect.bind(this)} />}/>
      </ScrollView>
    );
  }
}
