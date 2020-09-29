import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { Icon, Label, Menu, Table, Select } from 'semantic-ui-react'
const DiscountTable = (props) => {
 
    return (
        <div>
            <Table celled style={{ width: '100%', overflow: 'auto' }}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Discount Name</Table.HeaderCell>
                        <Table.HeaderCell>Discount Code</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Amount/Percentage Off</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        props.discounts && props.discounts.length > 0 ?
                            props.discounts.map((discount, key) => (
                                <React.Fragment key={key}>
                                    <Table.Row>
                                        <Table.Cell>{discount.name}</Table.Cell>
                                        <Table.Cell>{discount.code}</Table.Cell>
                                        <Table.Cell>{discount.type}</Table.Cell>
                                        <Table.Cell>{discount.discount}</Table.Cell>
                                        <Table.Cell> <Select placeholder='Activate/Deactivate code' options={[{ key: 'active', value: 'active', text: 'Activate' },
                                            { key: 'inactive', value: 'active', text: 'Deactivate' }]} /></Table.Cell>
                                    </Table.Row>
                                </React.Fragment>
                            )) :
                            (<p>No data</p>)
                    }

                </Table.Body>
                {/* 
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer> */}
            </Table>
        </div>
    )
}


const mapStateToProps = (state) => ({
    gettingDiscounts: state.course.gettingDiscounts,
    discounts: state.course.discounts.data,
    discountError: state.course.discountError,
})


const mapDispatchToProps = {
    // myDiscounts
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscountTable)
