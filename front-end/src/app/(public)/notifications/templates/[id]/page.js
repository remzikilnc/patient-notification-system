import React, { Fragment } from 'react';
import { getNotificationsTemplate } from '@/actions/notifications/templates/id';

async function Page({params}) {
  const data = await getNotificationsTemplate(params.id);
  return (
    <Fragment>
      {data.message}
    </Fragment>
  );
}

export default Page;
