import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

export interface Props {
  searchDeals: any,
  searchTerm?: string
}

class SearchBar extends React.Component<Props> {
  state = {
    searchTerm: ''
  }
  
  handleChange = (searchTerm: string) => {
    this.setState({ searchTerm }, () => {
      this.props.searchDeals(this.state.searchTerm)
    })
  }

  render() {
    return (
      <TextInput
        placeholder="Search All Deals"
        style={styles.input}
        defaultValue={this.props.searchTerm}
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