import React from 'react'
import { shallow, mount } from 'enzyme'
import { DumbToggleJobSwitch as ToggleJobSwitch } from './ToggleJobSwitch'

describe('<ToggleJobSwitch>', () => {
    it('renders correctly', () => {
        const enableJob = () => {}
        const disableJob = () => {}
        const wrapper = shallow(
            <ToggleJobSwitch
                id="1"
                isFetching={false}
                checked={true}
                enableJob={enableJob}
                disableJob={disableJob}
            />
        )

        expect(wrapper).toMatchSnapshot()
    })

    it('calls enableJob when unchecked and checkbox changes to true', () => {
        const enableJob = jest.fn()
        const disableJob = () => {}
        const wrapper = mount(
            <ToggleJobSwitch
                id="1"
                isFetching={false}
                checked={false}
                enableJob={enableJob}
                disableJob={disableJob}
            />
        )

        wrapper.find('input').simulate('change', { target: { checked: true } })

        expect(enableJob).toHaveBeenCalledWith('1')
    })

    it('calls disableJob when checked and checkbox changes to false', () => {
        const disableJob = jest.fn()
        const enableJob = () => {}
        const wrapper = mount(
            <ToggleJobSwitch
                id="1"
                isFetching={false}
                checked={true}
                enableJob={enableJob}
                disableJob={disableJob}
            />
        )

        wrapper.find('input').simulate('change', { target: { checked: false } })

        expect(disableJob).toHaveBeenCalledWith('1')
    })
})
