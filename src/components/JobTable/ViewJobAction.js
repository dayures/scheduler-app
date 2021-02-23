import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { MenuItem } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import history from '../../services/history'

const ViewJobAction = ({ id }) => (
    <MenuItem
        dense
        onClick={() => history.push(`/view/${id}`)}
        label={i18n.t('View')}
    />
)

const { string } = PropTypes

ViewJobAction.propTypes = {
    id: string.isRequired,
}

export default ViewJobAction
