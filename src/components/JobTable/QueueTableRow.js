import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    TableRow,
    TableCell,
    IconChevronDown24,
    IconChevronUp24,
} from '@dhis2/ui'
import i18n from '@dhis2/d2-i18n'
import { ToggleJobSwitch } from '../Switches'
import QueueActions from './QueueActions'
import Status from './Status'
import NextRun from './NextRun'
import Schedule from './Schedule'
import QueuedJobTableRow from './QueuedJobTableRow'

const QueueTableRow = ({
    queue: {
        id,
        name,
        cronExpression,
        delay,
        status,
        nextExecutionTime,
        enabled,
        configurable,
        sequence,
    },
    refetch,
}) => {
    const [showJobs, setShowJobs] = useState(false)
    const handleClick = () => setShowJobs((prev) => !prev)
    const buttonStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    }

    return (
        <>
            <TableRow>
                <TableCell>
                    <button style={buttonStyle} onClick={handleClick}>
                        {showJobs ? <IconChevronUp24 /> : <IconChevronDown24 />}
                    </button>
                </TableCell>
                <TableCell role="rowheader">{name}</TableCell>
                <TableCell>{i18n.t('Queue')}</TableCell>
                <TableCell>
                    <Schedule cronExpression={cronExpression} delay={delay} />
                </TableCell>
                <TableCell>
                    <NextRun
                        nextExecutionTime={nextExecutionTime}
                        enabled={enabled}
                    />
                </TableCell>
                <TableCell>
                    <Status status={status} />
                </TableCell>
                <TableCell>
                    <ToggleJobSwitch
                        id={id}
                        checked={enabled}
                        disabled={!configurable}
                        refetch={refetch}
                    />
                </TableCell>
                <TableCell>
                    <QueueActions name={name} refetch={refetch} />
                </TableCell>
            </TableRow>
            {showJobs
                ? sequence.map((job) => (
                      <QueuedJobTableRow key={job.id} job={job} />
                  ))
                : null}
        </>
    )
}

const { shape, string, bool, number, func, arrayOf, object } = PropTypes

QueueTableRow.propTypes = {
    queue: shape({
        name: string.isRequired,
        enabled: bool.isRequired,
        id: string.isRequired,
        status: string.isRequired,
        type: string.isRequired,
        cronExpression: string,
        delay: number,
        nextExecutionTime: string,
        sequence: arrayOf(object).isRequired,
    }).isRequired,
    refetch: func.isRequired,
}

export default QueueTableRow
