import React, { Component } from 'react';
import { Alert, Button, FlatList, RefreshControl, ScrollView, StatusBar, Text, TouchableOpacity, View, WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { AppStyles, AppTextStyles } from './Styles';

export class BoxAlert extends Component {
  render() {
    return (<View style={AppStyles.announcement}>
      <Text style={AppTextStyles.bold}>{this.props.title}</Text>
      <Text>{this.props.description}</Text>
    </View>);
  }
}

export class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Loading Announcement",
      description: "Loading Announcement Description",
      tags: "Loading Tags"
    };

    this.retrieveContent();
  }

  componentWillReceiveProps() {
    this.retrieveContent();
  }

  _onClick() {
    Alert.alert("Hello!", "Rerouting does not work, but I can tell you that you wanted to read more about '"+this.state.name+"'.");
  }

  retrieveContent() {
    try {
      fetch('http://sctest.x10.mx/api/get_announcement_by_id.php?announcement_id='+this.props.id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        this.setState((state) => {
          return {
            name: responseJson.name,
            description: "<div>"+responseJson.description+"</div>",
            tags: "<div>"+responseJson.tagsString+"</div>"
          };
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.returnFunction(this.props.id)} >
        <View style={AppStyles.announcement} onPress={() => this.props.returnFunction(this.props.id)}>
          <Text style={AppTextStyles.heading}>{this.state.name}</Text>
          <HTMLView value={this.state.description}/>
          <HTMLView value2={this.state.tagsString}/>
        </View>
      </TouchableOpacity>
    );
  }
}
