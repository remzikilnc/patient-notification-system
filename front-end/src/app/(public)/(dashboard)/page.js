'use client';

import { MdHealthAndSafety } from 'react-icons/md';
import HomeStatusCard from '@/components/home/status/card';
import { BiHealth } from 'react-icons/bi';
import React, { Fragment, useEffect, useState } from 'react';
import fetchServer from '@/lib/fetch-server';
import UILoadingSkeleton from '@/components/ui/loading/skeleton';

const fetchPatientsInfo = async () => {
    const res = await fetchServer({ endpoint: '/patients/ok', cache: 'no-store' });
    return res.json();
};

const fetchNotificationsInfo = async () => {
    const res = await fetchServer({ endpoint: '/notifications/ok', cache: 'no-store' });
    return res.json();
};
export default function Page() {
    const [patientsInfo, setPatientsInfo] = useState(null);
    const [notificationsInfo, setNotificationsInfo] = useState(null);
    const [isBothLoaded, setIsBothLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const patientsResponse = await fetchPatientsInfo();
            setPatientsInfo(patientsResponse);

            const notificationsResponse = await fetchNotificationsInfo();
            setNotificationsInfo(notificationsResponse);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (patientsInfo && notificationsInfo) {
            setIsBothLoaded(true);
        }
    }, [patientsInfo, notificationsInfo]);

    const handleNotificationSystemClick = async () => {
        const notificationsResponse = await fetchNotificationsInfo();
        setNotificationsInfo(notificationsResponse);
    }

    const handlePatientSystemClick = async () => {
        const patientsResponse = await fetchPatientsInfo();
        setPatientsInfo(patientsResponse);
    }
    return (
      <div>
          <title>PN | Dashboard</title>
          <div className="grid grid-cols-2 gap-x-6">
              {!isBothLoaded ? (
                <Fragment>
                    <UILoadingSkeleton className="rounded-md" height={100} />
                    <UILoadingSkeleton className="rounded-md" height={100} />
                </Fragment>
              ) : (
                <Fragment>
                    <HomeStatusCard
                      onClick={handlePatientSystemClick}
                      status={patientsInfo?.status === 'OK'}
                      message={patientsInfo?.message}
                      Icon={BiHealth}
                      title="Patient System"
                    />
                    <HomeStatusCard
                      onClick={handleNotificationSystemClick}
                      status={notificationsInfo?.status === 'OK'}
                      message={notificationsInfo?.message}
                      Icon={MdHealthAndSafety}
                      title="Notification System"
                    />
                </Fragment>
              )}
          </div>
      </div>
    );
}