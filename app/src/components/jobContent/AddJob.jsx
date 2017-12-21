import { connect } from 'react-redux';
import { compose, withProps, lifecycle, branch, renderComponent } from 'recompose';
import i18next from 'i18next';

import * as actionTypes from 'constants/actionTypes';
import Content from 'components/jobContent/Content';
import Loading from 'components/Loading';

const enhance = compose(
    connect(
        state => ({
            title: i18next.t('add_new_job'),
            job: state.jobs.changes,
            loaded: state.jobs.loaded && state.jobs.configuration.loaded,
            availableTypes: state.jobs.configuration.types,
            availableParameters: state.jobs.configuration.parameters,
            attributeOptions: state.jobs.configuration.attributeOptions,
            dirty: state.jobs.dirty,
        }),
        dispatch => ({
            discard: () => dispatch({ type: actionTypes.JOB_DISCARD }),
            save: job => dispatch({ type: actionTypes.JOB_POST, payload: { job } }),
            editJob: (fieldName, value) =>
                dispatch({ type: actionTypes.JOB_EDIT, payload: { fieldName, value } }),
        }),
    ),
    branch(props => !props.loaded, renderComponent(Loading)),
    lifecycle({
        componentWillUnmount() {
            this.props.discard();
        },
    }),
    withProps(() => ({
        saveLabel: 'Add job',
    })),
);

export default enhance(Content);
