/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import 'intl';
import { strings } from '../../../locales/strings.js';

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = strings['en-US']

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en', messages }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}


export function shallowWithIntl(node, { context }) {
    return shallow(
        nodeWithIntlProp(node),
        {
            context: Object.assign({}, context, {intl}),
        }
    );
}

//TODO: I dispatch:phantomjs I get 'undefined is not an object evaluating ref2.context'
//TODO: WHY??
export function mountWithIntl(node, { context, childContextTypes }) {
    return mount(
        nodeWithIntlProp(node),
        {
            context: Object.assign({}, context, {intl}),
            childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes)
        }
    );
}


// TODO: workaround
export function mountWrapIntl(node) {
  return mount(
    <IntlProvider locale={'en-US'} messages={messages}>
    { node }
    </IntlProvider>
  )
}
