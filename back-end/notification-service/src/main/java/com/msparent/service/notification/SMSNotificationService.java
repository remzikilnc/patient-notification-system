package com.msparent.service.notification;

import com.msparent.model.Criteria;
import com.msparent.model.Template;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service("SMS")
@Slf4j
public class SMSNotificationService implements NotificationService{


    @Override
    public void sendNotifications(Template template, Criteria criteria) {
       // Send SMS notification
    }
}
