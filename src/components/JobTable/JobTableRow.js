import React from 'react'
import PropTypes from 'prop-types'
import { TableRow, TableCell } from '@dhis2/ui'
import { jobTypesMap } from '../../services/server-translations'
import { ToggleJobSwitch } from '../Switches'
import JobActions from './JobActions'
import QueueActions from './QueueActions'
import Status from './Status'
import NextRun from './NextRun'
import Schedule from './Schedule'

const JobTableRow = ({
    job: {
        id,
        name,
        type,
        cronExpression,
        delay,
        status,
        nextExecutionTime,
        enabled,
        configurable,
    },
    refetch,
    isJob,
}) => (
    <TableRow>
        <TableCell role="rowheader">{name}</TableCell>
        <TableCell>{jobTypesMap[type]}</TableCell>
        <TableCell>
            <Schedule cronExpression={cronExpression} delay={delay} />
        </TableCell>
        <TableCell>
            <NextRun nextExecutionTime={nextExecutionTime} enabled={enabled} />
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
            {isJob ? (
                <JobActions
                    id={id}
                    enabled={enabled}
                    configurable={configurable}
                    refetch={refetch}
                />
            ) : (
                <QueueActions name={name} refetch={refetch} />
            )}
        </TableCell>
    </TableRow>
)

const { shape, string, bool, number, func } = PropTypes

JobTableRow.propTypes = {
    isJob: bool.isRequired,
    job: shape({
        name: string.isRequired,
        enabled: bool.isRequired,
        id: string.isRequired,
        status: string.isRequired,
        type: string.isRequired,
        cronExpression: string,
        delay: number,
        nextExecutionTime: string,
    }).isRequired,
    refetch: func.isRequired,
}

export default JobTableRow
