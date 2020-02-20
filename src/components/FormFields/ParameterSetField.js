import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { arrayOf, func, bool, string } from 'prop-types'
import { Field } from 'react-final-form'
import { SingleSelectField } from '@dhis2/ui-core'
import { SingleSelect } from '@dhis2/ui-forms'
import * as rootSelectors from '../../rootSelectors'
import { selectors as jobTypeSelectors } from '../../data/job-types'
import { actions, selectors } from '../../data/parameter-set'
import { InlineError } from '../Errors'

export const DumbParameterSetField = ({
    didFetch,
    endpoint,
    errorMessage,
    fetchParameterSetIfNeeded,
    jobType,
    label,
    name,
    options,
    parameterName,
}) => {
    useEffect(() => {
        fetchParameterSetIfNeeded(endpoint, jobType, parameterName)
    }, [fetchParameterSetIfNeeded, endpoint, jobType, parameterName])

    // Show loading state when options are loading
    if (!didFetch) {
        return (
            <label>
                <div>{label}</div>
                <SingleSelectField loading />
            </label>
        )
    }

    if (errorMessage) {
        return <InlineError message={errorMessage} />
    }

    if (options.length === 0) {
        return (
            <label>
                <div>{label}</div>
                <SingleSelectField disabled helpText="No options available" />
            </label>
        )
    }

    return (
        <label>
            <div>{label}</div>
            <Field
                name={name}
                component={SingleSelect}
                options={options.map(({ option }) => ({
                    value: option,
                    label: option,
                }))}
            />
        </label>
    )
}

DumbParameterSetField.propTypes = {
    didFetch: bool.isRequired,
    endpoint: string.isRequired,
    errorMessage: string.isRequired,
    fetchParameterSetIfNeeded: func.isRequired,
    jobType: string.isRequired,
    label: string.isRequired,
    name: string.isRequired,
    options: arrayOf(string).isRequired,
    parameterName: string.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    const { jobType, parameterName } = ownProps
    const jobTypes = rootSelectors.getJobTypes(state)
    const parameterSet = rootSelectors.getParameterSet(state)

    return {
        endpoint: jobTypeSelectors.getParameterOptionEndpoint(
            jobTypes,
            jobType,
            parameterName
        ),
        didFetch: selectors.getDidFetch(parameterSet, jobType, parameterName),
        errorMessage: selectors.getErrorMessage(
            parameterSet,
            jobType,
            parameterName
        ),
        options: selectors.getParameterSet(
            parameterSet,
            jobType,
            parameterName
        ),
    }
}

const mapDispatchToProps = {
    fetchParameterSetIfNeeded: actions.fetchParameterSetIfNeeded,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DumbParameterSetField)
