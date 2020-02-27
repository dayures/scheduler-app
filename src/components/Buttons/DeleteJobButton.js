import React from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '@dhis2/ui-core'
import { actions } from '../../data/modal'
import { modalTypes } from '../Modal'

export const DumbDeleteJobButton = ({ id, showModal }) => (
    <Button
        destructive
        onClick={() =>
            showModal({ type: modalTypes.DELETE_JOB, props: { id } })
        }
    >
        Delete
    </Button>
)

DumbDeleteJobButton.propTypes = {
    id: string.isRequired,
    showModal: func.isRequired,
}

const mapDispatchToProps = {
    showModal: actions.showModal,
}

export default connect(
    null,
    mapDispatchToProps
)(DumbDeleteJobButton)
