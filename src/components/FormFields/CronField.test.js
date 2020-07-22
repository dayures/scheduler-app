import React from 'react'
import { mount } from 'enzyme'
import { ReactFinalForm } from '@dhis2/ui'
import { useHumanReadableCron } from '../../hooks/human-readable-cron'
import CronField from './CronField'

const { Form } = ReactFinalForm

jest.mock('../../hooks/human-readable-cron', () => ({
    useHumanReadableCron: jest.fn(),
}))

afterEach(() => {
    jest.resetAllMocks()
})

describe('<CronField>', () => {
    it('shows a human readable schedule if a cron expression exists', () => {
        const cronExpression = '0 0 * ? * *'
        const makeHumanReadable = value => `Human readable version of ${value}`
        const expected = makeHumanReadable(cronExpression)

        useHumanReadableCron.mockImplementation(makeHumanReadable)

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <CronField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="cronExpression"]')
            .simulate('change', { target: { value: cronExpression } })

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-help' })
            .text()

        expect(actual.includes(expected)).toBe(true)
    })

    it('does not show an error for valid cron expressions', () => {
        const cronExpression = '0 0 * ? * *'

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <CronField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="cronExpression"]')
            .simulate('change', { target: { value: cronExpression } })
            .simulate('blur')

        const actual = wrapper.find({
            'data-test': 'dhis2-uiwidgets-inputfield-validation',
        })

        expect(actual.length).toBe(0)
    })

    it('shows an error for invalid cronExpressions', () => {
        const cronExpression = 'not a cron expression'

        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {() => (
                    <form>
                        <CronField />
                    </form>
                )}
            </Form>
        )

        wrapper
            .find('input[name="cronExpression"]')
            .simulate('change', { target: { value: cronExpression } })
            .simulate('blur')

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-validation' })
            .text()

        expect(actual).toBe('Please enter a valid CRON expression')
    })

    it('shows an error that the field is required on empty values', () => {
        const wrapper = mount(
            <Form onSubmit={() => {}}>
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <CronField />
                    </form>
                )}
            </Form>
        )

        // Trigger validation
        wrapper.find('form').simulate('submit')

        const actual = wrapper
            .find({ 'data-test': 'dhis2-uiwidgets-inputfield-validation' })
            .text()

        expect(actual).toBe('A CRON expression is required')
    })
})
