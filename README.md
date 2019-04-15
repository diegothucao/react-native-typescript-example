# react-native-typescript-example
This is an essential example to build react-native app using Typescript

Step to run
1. Checkout this respo
2. `yarn install`
3. `react-native run-ios` OR `react-native run-android`

Define component 

```typescript 
import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import ajax from '../util/ajax'
import DealList from './DealList'
import DealDetail from './DealDetail'
import SearchBar from './SearchBar'

export interface Props {
}

interface IState {
  deals: any [],
  dealsFromSearch: any
  currentDealId: any
}


class App extends React.Component<Props> {
  state : IState = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  }

  async componentWillMount() {
  
  }

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals()
    this.setState({ deals })
  }

  searchDeals = async (searchTerm: string) => {
    let dealsFromSearch = []
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm)
    }
    this.setState({ dealsFromSearch })
  }

  setCurrentDeal = async(dealId: string) => {
    this.setState({
      currentDealId: dealId,
    })
  }

  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    })
  }
  
  currentDeal = () => {
    return this.state.deals.find(x => x.key === this.state.currentDealId)
  }

  render() {
    if (this.state.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail
            initialDealData={this.currentDeal()}
            onBack={this.unsetCurrentDeal}
          />
        </View>
      )
    }
    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0
        ? this.state.dealsFromSearch
        : this.state.deals
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    marginTop: 30,
  },
  header: {
    fontSize: 40,
  },
})

export default App
```

if you see any issue, please do not hesitate to create an issue here or can contact me via email: cao.trung.thu@gmail.com or https://www.linkedin.com/in/diegothucao/

Give me A STAR if you see it is helpful for you.

Thanks

references
1. https://facebook.github.io/react-native/docs/tutorial
2. https://github.com/jscomplete/react-native-essential-training
3. https://www.tutorialspoint.com/typescript/
4. https://www.tutorialspoint.com/es6
