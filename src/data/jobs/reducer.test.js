import reducer, * as selectors from './reducer'
import * as types from './actionTypes'

describe('reducer', () => {
    const initialState = {
        lastUpdated: 0,
        errorMessage: '',
        isFetching: false,
        isDirty: false,
        result: [],
    }
    const fetchingState = {
        ...initialState,
        isFetching: true,
    }

    it('should return the initial state', () => {
        const actual = reducer(undefined, {})
        const expected = initialState

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_JOBS', () => {
        const actual = reducer(undefined, { type: types.FETCH_JOBS })
        const expected = fetchingState

        expect(actual).toEqual(expected)
    })

    it('should handle ENABLE_JOB', () => {
        const actual = reducer(undefined, { type: types.ENABLE_JOB })
        const expected = fetchingState

        expect(actual).toEqual(expected)
    })

    it('should handle DISABLE_JOB', () => {
        const actual = reducer(undefined, { type: types.DISABLE_JOB })
        const expected = fetchingState

        expect(actual).toEqual(expected)
    })

    it('should handle DELETE_JOB', () => {
        const actual = reducer(undefined, { type: types.DELETE_JOB })
        const expected = fetchingState

        expect(actual).toEqual(expected)
    })

    it('should handle RUN_JOB', () => {
        const actual = reducer(undefined, { type: types.RUN_JOB })
        const expected = fetchingState

        expect(actual).toEqual(expected)
    })

    it('should handle CREATE_JOB', () => {
        const actual = reducer(undefined, { type: types.CREATE_JOB })
        const expected = fetchingState

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_JOBS_SUCCESS', () => {
        const payload = {
            entities: {
                jobs: 'job',
            },
            result: ['job'],
        }
        const actual = reducer(fetchingState, {
            type: types.FETCH_JOBS_SUCCESS,
            meta: {
                receivedAt: 1,
            },
            payload,
        })
        const expected = {
            ...fetchingState,
            lastUpdated: 1,
            errorMessage: '',
            isFetching: false,
            isDirty: false,
            result: ['job'],
        }

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_JOBS_FAIL with an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.FETCH_JOBS_FAIL,
            meta: {
                receivedAt: 1,
            },
            error: new Error('error'),
        })
        const expected = {
            ...fetchingState,
            lastUpdated: 1,
            errorMessage: 'error',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle ENABLE_JOB_FAIL with an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.ENABLE_JOB_FAIL,
            error: new Error('error'),
        })
        const expected = {
            ...fetchingState,
            errorMessage: 'error',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle DISABLE_JOB_FAIL with an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.DISABLE_JOB_FAIL,
            error: new Error('error'),
        })
        const expected = {
            ...fetchingState,
            errorMessage: 'error',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle DELETE_JOB_FAIL with an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.DELETE_JOB_FAIL,
            error: new Error('error'),
        })
        const expected = {
            ...fetchingState,
            errorMessage: 'error',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle RUN_JOB_FAIL with an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.RUN_JOB_FAIL,
            error: new Error('error'),
        })
        const expected = {
            ...fetchingState,
            errorMessage: 'error',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle CREATE_JOB_FAIL with an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.CREATE_JOB_FAIL,
            error: new Error('error'),
        })
        const expected = {
            ...fetchingState,
            errorMessage: 'error',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle FETCH_JOBS_FAIL without an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.FETCH_JOBS_FAIL,
            meta: {
                receivedAt: 1,
            },
            error: new Error(),
        })
        const expected = {
            ...fetchingState,
            lastUpdated: 1,
            errorMessage:
                'Something went wrong, but no errormessage was provided.',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle ENABLE_JOB_FAIL without an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.ENABLE_JOB_FAIL,
            error: new Error(),
        })
        const expected = {
            ...fetchingState,
            errorMessage:
                'Something went wrong, but no errormessage was provided.',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle DISABLE_JOB_FAIL without an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.DISABLE_JOB_FAIL,
            error: new Error(),
        })
        const expected = {
            ...fetchingState,
            errorMessage:
                'Something went wrong, but no errormessage was provided.',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle DELETE_JOB_FAIL without an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.DELETE_JOB_FAIL,
            error: new Error(),
        })
        const expected = {
            ...fetchingState,
            errorMessage:
                'Something went wrong, but no errormessage was provided.',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle RUN_JOB_FAIL without an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.RUN_JOB_FAIL,
            error: new Error(),
        })
        const expected = {
            ...fetchingState,
            errorMessage:
                'Something went wrong, but no errormessage was provided.',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle CREATE_JOB_FAIL without an errormessage', () => {
        const actual = reducer(fetchingState, {
            type: types.CREATE_JOB_FAIL,
            error: new Error(),
        })
        const expected = {
            ...fetchingState,
            errorMessage:
                'Something went wrong, but no errormessage was provided.',
            isFetching: false,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle ENABLE_JOB_SUCCESS', () => {
        const actual = reducer(fetchingState, {
            type: types.ENABLE_JOB_SUCCESS,
        })
        const expected = {
            ...fetchingState,
            isFetching: false,
            isDirty: true,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle DISABLE_JOB_SUCCESS', () => {
        const actual = reducer(fetchingState, {
            type: types.DISABLE_JOB_SUCCESS,
        })
        const expected = {
            ...fetchingState,
            isFetching: false,
            isDirty: true,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle DELETE_JOB_SUCCESS', () => {
        const actual = reducer(fetchingState, {
            type: types.DELETE_JOB_SUCCESS,
        })
        const expected = {
            ...fetchingState,
            isFetching: false,
            isDirty: true,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle RUN_JOB_SUCCESS', () => {
        const actual = reducer(fetchingState, {
            type: types.RUN_JOB_SUCCESS,
        })
        const expected = {
            ...fetchingState,
            isFetching: false,
            isDirty: true,
        }

        expect(actual).toEqual(expected)
    })

    it('should handle CREATE_JOB_SUCCESS', () => {
        const actual = reducer(fetchingState, {
            type: types.CREATE_JOB_SUCCESS,
        })
        const expected = {
            ...fetchingState,
            isFetching: false,
            isDirty: true,
        }

        expect(actual).toEqual(expected)
    })
})

describe('getDidFetch', () => {
    it('should return whether it fetched', () => {
        const state = { lastUpdated: 10 }
        const expected = !!state.lastUpdated
        const actual = selectors.getDidFetch(state)

        expect(actual).toEqual(expected)
    })
})

describe('getIsFetching', () => {
    it('should return fetching state', () => {
        const state = { isFetching: true }
        const expected = state.isFetching
        const actual = selectors.getIsFetching(state)

        expect(actual).toEqual(expected)
    })
})

describe('getErrorMessage', () => {
    it('should return error message', () => {
        const state = { errorMessage: 'Message' }
        const expected = state.errorMessage
        const actual = selectors.getErrorMessage(state)

        expect(actual).toEqual(expected)
    })
})

describe('getResult', () => {
    it('should return the result', () => {
        const state = { result: ['id'] }
        const expected = state.result
        const actual = selectors.getResult(state)

        expect(actual).toEqual(expected)
    })
})

describe('getShouldFetch', () => {
    const initialState = {
        didFetchSuccessfully: false,
        errorMessage: '',
        isFetching: false,
        result: [],
    }

    it('should return false if currently fetching', () => {
        const state = { ...initialState, isFetching: true }
        const expected = false
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })

    it('should return true if it has an error message', () => {
        const state = { ...initialState, errorMessage: 'error' }
        const expected = true
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })

    it('should return true if it has not fetched yet', () => {
        const state = { ...initialState }
        const expected = true
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })

    it('should return true if it is dirty', () => {
        const state = { ...initialState, isDirty: true }
        const expected = true
        const actual = selectors.getShouldFetch(state)

        expect(actual).toEqual(expected)
    })
})
