import '@percy/cypress'
import '@testing-library/cypress/add-commands'
import { enableAutoLogin, enableNetworkShim } from '@dhis2/cypress-commands'

enableAutoLogin()
enableNetworkShim()
