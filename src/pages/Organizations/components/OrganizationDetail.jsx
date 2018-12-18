import React, { Fragment } from 'react';
import { Trans, t } from '@lingui/macro';
import { I18n} from '@lingui/react';
import {
  Card,
  CardHeader,
  CardBody,
  PageSection,
  PageSectionVariants
} from '@patternfly/react-core';
import {
  Switch,
  Link,
  Route
} from 'react-router-dom';

import Tab from '../../../components/Tabs/Tab';
import Tabs from '../../../components/Tabs/Tabs';
import getTabName from '../utils';


const OrganizationDetail = ({
  location,
  match,
  parentBreadcrumbObj,
  organization,
  params,
  currentTab
}) => {
  // TODO: set objectName by param or through grabbing org detail get from api
  const { medium } = PageSectionVariants;
  const tabList=['details', 'access', 'teams', 'notifications'];

  const deleteResourceView = () => (
    <Fragment>
      <Trans>{`deleting ${currentTab} association with orgs  `}</Trans>
      <Link to={{ pathname: `${match.url}`, search: `?${params.toString()}`, state: { breadcrumb: parentBreadcrumbObj, organization } }}>
        <Trans>{`confirm removal of ${currentTab}/cancel and go back to ${currentTab} view.`}</Trans>
      </Link>
    </Fragment>
  );

  const addResourceView = () => (
    <Fragment>
      <Trans>{`adding ${currentTab}   `}</Trans>
      <Link to={{ pathname: `${match.url}`, search: `?${params.toString()}`, state: { breadcrumb: parentBreadcrumbObj, organization } }}>
        <Trans>{`save/cancel and go back to ${currentTab} view`}</Trans>
      </Link>
    </Fragment>
  );

  const resourceView = () => (
    <Fragment>
      <Trans>{`${currentTab} detail view  `}</Trans>
      <Link to={{ pathname: `${match.url}/add-resource`, search: `?${params.toString()}`, state: { breadcrumb: parentBreadcrumbObj, organization } }}>
        <Trans>{`add ${currentTab}`}</Trans>
      </Link>
      {'  '}
      <Link to={{ pathname: `${match.url}/delete-resources`, search: `?${params.toString()}`, state: { breadcrumb: parentBreadcrumbObj, organization } }}>
        <Trans>{`delete ${currentTab}`}</Trans>
      </Link>
    </Fragment>
  );


  return (
    <PageSection variant={medium}>
      <Card className="at-c-orgPane">
        <CardHeader>
          <I18n>
            {({ i18n }) => (
              <Tabs labelText={i18n._(t`Organization detail tabs`)}>
                {tabList.map(tab => (
                  <Tab
                    key={tab}
                    tab={tab}
                    location={location}
                    match={match}
                    currentTab={currentTab}
                    breadcrumb={parentBreadcrumbObj}
                  >
                  {getTabName(tab)}
                  </Tab>
                ))}
              </Tabs>
            )}
          </I18n>
        </CardHeader>
        <CardBody>
          {(currentTab && currentTab !== 'details') ? (
            <Switch>
              <Route path={`${match.path}/delete-resources`} component={() => deleteResourceView()} />
              <Route path={`${match.path}/add-resource`} component={() => addResourceView()} />
              <Route path={`${match.path}`} component={() => resourceView()} />
            </Switch>
          ) : (
            <Fragment>
              {'detail view  '}
              <Link to={{ pathname: `${match.url}/edit`, state: { breadcrumb: parentBreadcrumbObj, organization } }}>
                {'edit'}
              </Link>
            </Fragment>
          )}
        </CardBody>
      </Card>
    </PageSection>
  );
};

export default OrganizationDetail;
