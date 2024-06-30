package com.msparent.service.notification;

import com.msparent.model.Criteria;
import com.msparent.model.Template;

public interface NotificationService {
    void sendNotifications(Template template, Criteria criteria);
}