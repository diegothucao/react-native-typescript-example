import React from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native'

import { priceDisplay } from '../util/util'
import ajax from '../util/ajax'

export interface Props {
  initialDealData: any,
  onBack: any 
}

class DealDetail extends React.Component<Props> {
  
  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  }

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
    this.setState({
      deal: fullDeal,
    })
  }

  openDealUrl = () => {
    Linking.openURL(this.state.deal.url)
  }

  render() {
    const { deal } = this.state
    return (
      <View>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
         <Image
             source = {{ uri: deal.media[this.state.imageIndex] }}
             style = {styles.image}
            />
        <View>
          <View>
            <Text style={styles.title}>{deal.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            {deal.user && (
              <View style={styles.user}>
                <Image
                  source={{ uri: deal.user.avatar }}
                  style={styles.avatar}
                />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          <View style={styles.description}>
            <Text>{deal.description}</Text>
          </View>
          <Button title="Buy this deal!" onPress={this.openDealUrl} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
})

export default DealDetail
