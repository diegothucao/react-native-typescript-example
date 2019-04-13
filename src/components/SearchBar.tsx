import React from 'react'
//import debounce from 'lodash.debounce'
import { TextInput, StyleSheet } from 'react-native'

export interface Props {
  searchDeals: any
}

class SearchBar extends React.Component<Props> {
  state = {
    searchTerm: '',
  }

  //debouncedSearchDeals = debounce(this.props.searchDeals, 300)
  
  handleChange = (searchTerm: string) => {
    this.setState({ searchTerm }, () => {
     // this.debouncedSearchDeals(this.state.searchTerm)
      this.props.searchDeals(this.state.searchTerm)
    })
  }

  render() {
    return (
      <TextInput
        placeholder="Search All Deals"
        style={styles.input}
        onChangeText={this.handleChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 16,
  },
})

export default SearchBar