import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { Switch } from '@dhis2/ui'
import { useJobSchedules } from '../../hooks/job-schedule'

/* istanbul ignore next */
const mutation = {
    resource: 'jobConfigurations',
    id: ({ id }) => id,
    type: 'update',
    partial: true,
    data: ({ enabled }) => ({ enabled }),
}

const ToggleJobSwitch = ({ id, checked, disabled }) => {
    const [toggleJob, { loading }] = useDataMutation(mutation)
    const { refetch } = useJobSchedules()
    const enabled = !checked

    return (
        <Switch
            name={`toggle-job-${id}`}
            disabled={disabled || loading}
            checked={checked}
            onChange={() => {
                toggleJob({ id, enabled }).then(refetch)
            }}
            ariaLabel={i18n.t('Toggle job')}
        />
    )
}

const { bool, string } = PropTypes

ToggleJobSwitch.propTypes = {
    checked: bool.isRequired,
    disabled: bool.isRequired,
    id: string.isRequired,
}

export default ToggleJobSwitch
