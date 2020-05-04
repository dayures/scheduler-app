import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { Button } from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { DeleteJobModal } from '../Modal'

const DeleteJobButton = ({ id }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <React.Fragment>
            <Button destructive onClick={() => setShowModal(true)}>
                {i18n.t('Delete')}
            </Button>
            {showModal && (
                <DeleteJobModal id={id} hideModal={() => setShowModal(false)} />
            )}
        </React.Fragment>
    )
}

const { string } = PropTypes

DeleteJobButton.propTypes = {
    id: string.isRequired,
}

export default DeleteJobButton
