import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'

export default class HeadBar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu >
                <Menu.Item
                    name='home'
                    as='a'
                    active={activeItem === 'home'}
                    href='https://pinnacleonline.org'
                />
               
                <Menu.Item
                    name='About Us'
                    as='a'
                    active={activeItem === 'About'}
                    href='https://pinnacleonline.org/about'
                />
               
               
                <Menu.Item
                    name='Tutoring at Pinnacle'
                    as='a'
                    active={activeItem === 'Tutoring'}
                    href='https://pinnacleonline.org/teach'
                />
                {/* <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder='Search...' />
                    </Menu.Item>
                    <Menu.Item
                        name='logout'
                        active={activeItem === 'logout'}
                        onClick={this.handleItemClick}
                    />
                </Menu.Menu> */}
            </Menu>
        )
    }
}