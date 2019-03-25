import React, { Component } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  withStyles,
} from '@material-ui/core';

import styles from './app.styles';
import { CHAIN_ID } from './config';
import { NETWORK } from './constants';
import GHUSDContract from './components/GHUSDContract';
import AddressNameService from './components/AddressNameService';
import MiningContracts from './components/MiningContracts';
import Settings from './components/Settings';

class App extends Component {
  state = {
    selectedTab: 0,
    currentAddress: undefined,
    network: undefined,
    mmError: undefined,
  };

  componentDidMount() {
    if (!window.web3) {
      this.setState({ currentAddress: undefined, network: undefined });
      return;
    }

    // Set account
    window.web3.eth.getAccounts((err, accounts) => {
      if (err) {
        this.setState({ mmError: `Error fetching accounts: ${err.message}` });
        return;
      }

      if (accounts[0]) {
        console.info('Found Metamask account:', accounts[0]);
        this.setState({ currentAddress: accounts[0] });
      }
    });

    // Set network
    window.web3.version.getNetwork((err, network) => {
      if (err) {
        this.setState({ mmError: `Error fetching network: ${err.message}` });
        return;
      }

      if (network === CHAIN_ID.MAINNET) {
        console.info('Found Metamask network:', network);
        this.setState({ network: NETWORK.MAINNET });
      } else if (network === CHAIN_ID.TESTNET) {
        console.info('Found Metamask network:', network);
        this.setState({ network: NETWORK.TESTNET });
      } else {
        this.setState({ mmError: `Invalid Chain ID: ${network}` });
      }
    });
  }

  handleTabChange = (event, value) => {
    this.setState({ selectedTab: value });
  };

  renderNotLoggedIn = () => {
    const { classes } = this.props;
    const { mmError } = this.state;
    return (
      <div className={classes.notLoggedInContainer}>
        <Typography className={classes.notLoggedInText}>
          Not logged into Metamask. Please log in and refresh the page.
        </Typography>
        <Typography className={classes.notLoggedInError}>
          {mmError}
        </Typography>
      </div>
    );
  }

  render() {
    const { selectedTab, currentAddress, network, mmError } = this.state;

    // Show not logged in page if no account found or incorrect network
    if (!currentAddress || !network || mmError) {
      return this.renderNotLoggedIn();
    }

    return (
      <div>
        <AppBar position="static">
          <Tabs value={selectedTab} onChange={this.handleTabChange}>
            <Tab label="Address Name Service" />
            <Tab label="GHUSD" />
            <Tab label="Mining Contracts" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && (
          <TabContainer>
            <AddressNameService currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {selectedTab === 1 && (
          <TabContainer>
            <GHUSDContract currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {selectedTab === 2 && (
          <TabContainer>
            <MiningContracts currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
        {selectedTab === 3 && (
          <TabContainer>
            <Settings currentAddress={currentAddress} network={network} />
          </TabContainer>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(App);

const TabContainer = withStyles(styles)((props) => {
  const { children, classes } = props;
  return (
    <Typography component="div" className={classes.tabContainer}>
      {children}
    </Typography>
  );
});
