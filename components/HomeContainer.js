import React from 'react'
import Head from 'react-helmet'
import {
  withPhenomicApi,
  query,
  BodyRenderer
} from '@phenomic/preset-react-app/lib/client'
import { Link, withRouter } from 'react-router'
import { LocalLink } from '../intl'
import { FormattedMessage, injectIntl } from 'react-intl'

import { InstantSearch, SearchBox, PoweredBy } from 'react-instantsearch/dom'

import Layout from './Layout'
import MeetupPreview from './MeetupPreview'
import NextMeetup from './NextMeetup'

const Home = ({ meetups, router }) => (
  <Layout>
    <Head>
      <title>Sanja.JS - JS em São José dos Campos</title>
      <meta name="description" content="" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/react-instantsearch-theme-algolia@4.4.2"
      />
    </Head>
    <div className="hero">
      <div className="container">
        <h2>
          <FormattedMessage id="HOME_HERO_TITLE" />
        </h2>
        <NextMeetup />
      </div>
    </div>
    {/* <div className="container meetups">
      <InstantSearch
        appId="KQPF9BC268"
        apiKey="5eabe9bbceee31443c075723136fa826"
        indexName="paris.js-meetups"
      >
        <div className="meetups__header">
          <h2 className="meetups__title --withChevron">
            <FormattedMessage id="HOME_PREVIOUS_MEETUP" />
          </h2>
          <SearchInput router={router} />
          <PoweredBy />
        </div>
        <ul className="meetups__list">
          {meetups &&
            meetups.node &&
            meetups.node.list &&
            meetups.node.list.map(meetup => (
              <li key={meetup.id}>
                <MeetupPreview {...meetup} />
              </li>
            ))}
        </ul>
        <p>
          {meetups &&
            meetups.node &&
            meetups.node.hasNextPage && (
              <LocalLink to={`/after/${meetups.node.next}`}>
                <FormattedMessage id="HOME_PREVIOUS_MEETUP" />
              </LocalLink>
            )}
        </p>
      </InstantSearch>
    </div> */}
  </Layout>
)

const SearchInput = injectIntl(({ intl, router }) => {
  const localeSubPath = intl.locale === 'fr' ? '' : `${intl.locale}/`
  return (
    <SearchBox
      onFocus={() => router.push(`/${localeSubPath}search`)}
      translations={{
        placeholder: intl.formatMessage({ id: 'SEARCH_PLACEHOLDER' })
      }}
    />
  )
})

const HomeContainer = withPhenomicApi(withRouter(Home), props => ({
  meetups: query({
    path: 'content/meetups',
    limit: 12,
    after: props.params.after
  })
}))

export default HomeContainer
